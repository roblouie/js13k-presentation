<script setup lang="ts">

import BaseSlideTemplate from "@/BaseSlideTemplate.vue";
import {highlight, languages} from "prismjs";
import {PrismEditor} from "vue-prism-editor";
import {ref} from "vue";

const code = ref(`export class GPU {
  static ScreenWidth = 160;
  static ScreenHeight = 144;
  private static HeightIncludingOffscreen = 154;

  private static CyclesPerHBlank = 204;
  private static CyclesPerScanlineOam = 80;
  private static CyclesPerScanlineVram = 172;
  private static CyclesPerScanline = GPU.CyclesPerHBlank + GPU.CyclesPerScanlineOam + GPU.CyclesPerScanlineVram;
  private static CyclesPerVBlank = 4560;
  private static ScanlinesPerFrame = 144;
  static CyclesPerFrame = (GPU.CyclesPerScanline * GPU.ScanlinesPerFrame) + GPU.CyclesPerVBlank;

  screen: EnhancedImageData;
  private cycleCounter = 0;

  private windowLinesDrawn = 0;

  colors = [
    { red: 255, green: 255, blue: 255 },
    { red: 192, green: 192, blue: 192 },
    { red: 96, green: 96, blue: 96 },
    { red: 0, green: 0, blue: 0 },
  ]

  constructor() {
    this.screen = new EnhancedImageData(GPU.ScreenWidth, GPU.ScreenHeight);
  }

  tick(cycles: number) {
    this.cycleCounter += cycles;

    switch (lcdStatusRegister.mode) {
      case LcdStatusMode.SearchingOAM:
        if (this.cycleCounter >= this.cyclesPerScanlineOam) { // 80 cycles
          this.cycleCounter -= this.cyclesPerScanlineOam;
          lcdStatusRegister.mode = LcdStatusMode.TransferringDataToLCD;
        }
        break;

      case LcdStatusMode.TransferringDataToLCD:
        if (this.cycleCounter >= this.cyclesPerScanlineVram) { // 172 cycles
          this.cycleCounter -= this.cyclesPerScanlineVram;

          lcdStatusRegister.mode = LcdStatusMode.InHBlank;
        }
        break;

      case LcdStatusMode.InHBlank:
        if (this.cycleCounter >= GPU.CyclesPerHBlank) { // 204 cycles
          this.drawScanline();

          this.cycleCounter -= GPU.CyclesPerHBlank;

          lineYRegister.value++;

          if (lineYRegister.value === GPU.ScreenHeight) { // 144 lines
            lcdStatusRegister.mode = LcdStatusMode.InVBlank;
          } else {
            lcdStatusRegister.mode = LcdStatusMode.SearchingOAM;
          }
        }
        break;

      case LcdStatusMode.InVBlank:
        if (this.cycleCounter >= GPU.CyclesPerScanline) {
          lineYRegister.value++;

          this.cycleCounter -= GPU.CyclesPerScanline;

          if (lineYRegister.value === GPU.HeightIncludingOffscreen) { // 154 lines
            lcdStatusRegister.mode = LcdStatusMode.SearchingOAM;
            lineYRegister.value = 0;
          }
        }
        break;
    }
  }

  drawScanline() {
    if (!lcdControlRegister.isLCDControllerOperating) {
      return;
    }

    let backgroundLineValues: number[] = [];
    if (lcdControlRegister.isBackgroundDisplayOn) {
      backgroundLineValues = this.drawBackgroundLine();
    }

    let windowLineValues: number[] = [];
    if (lcdControlRegister.isWindowingOn) {
      windowLineValues = this.drawWindowLine();
    }

    if (lcdControlRegister.isObjOn) {
      this.drawSpriteLine(backgroundLineValues, windowLineValues);
    }
  }

  drawBackgroundLine() {
    const backgroundLineValues = [];
    const bytesPerCharacter = 2;
    const characterDataStartAddress = lcdControlRegister.backgroundCharacterDataStartAddress;

    const palette = backgroundPaletteRegister.backgroundPalette;

    const scrolledY = asUint8(lineYRegister.value + scrollYRegister.value);
    const scrollXRegisterValue = scrollXRegister.value;

    for (let screenX = 0; screenX < GPU.ScreenWidth; screenX++) {
      const scrolledX = asUint8(screenX + scrollXRegisterValue);
      const tileMapIndex = this.getTileIndexFromPixelLocation(scrolledX, scrolledY);
      const tilePixelPosition = this.getUpperLeftPixelLocationOfTile(tileMapIndex);

      const xPosInTile = scrolledX - tilePixelPosition.x;
      const yPosInTile = scrolledY - tilePixelPosition.y;

      const bytePositionInTile = yPosInTile * bytesPerCharacter;

      const tileCharIndex = this.getTileCharacterIndex(tileMapIndex);
      const tileCharBytePosition = tileCharIndex * 16; // 16 bytes per tile

      const currentTileLineBytePosition = characterDataStartAddress + tileCharBytePosition + bytePositionInTile;
      const lowerByte = memory.readByte(currentTileLineBytePosition);
      const higherByte = memory.readByte(currentTileLineBytePosition + 1);

      const paletteIndex = this.getPixelInTileLine(xPosInTile, lowerByte, higherByte, false);
      backgroundLineValues.push(paletteIndex);

      const paletteColor = palette[paletteIndex];
      const color = this.colors[paletteColor];

      this.screen.setPixel(screenX, lineYRegister.value, color.red, color.green, color.blue);
    }

    return backgroundLineValues;
  }

  private drawWindowLine() {
    if (lineYRegister.value < windowYRegister.value || windowXRegister.value > 166) {
      return [];
    }

    const windowLineValues = [];
    const bytesPerCharacter = 2;
    let windowTileMap: Uint8Array | Int8Array;

    const tileMapStart = lcdControlRegister.windowTileMapStartAddress;

    const characterDataStartAddress = lcdControlRegister.backgroundCharacterDataStartAddress;
    const palette = backgroundPaletteRegister.backgroundPalette;

    if (lcdControlRegister.backgroundCharacterData === 0) {
      const originalData = memory.memoryBytes.subarray(tileMapStart, tileMapStart + 0x1000);
      windowTileMap = new Int8Array(originalData);
    } else {
      windowTileMap = memory.memoryBytes.subarray(tileMapStart, tileMapStart + 0x1000);
    }

    const yPositionInTileset = this.windowLinesDrawn;

    // Per the gameboy docs, valid values for the window X register are 7 - 166, with 7 being the left edge of the
    // screen. So to draw starting at the left edge of the screen, we subtract 7.
    const correctedWindowX = windowXRegister.value - 7;

    for (let screenX = 0; screenX < GPU.ScreenWidth; screenX++) {
      // If the current pixel is to the left of the start of the window, skip to the next horizontal pixel
      if (screenX < correctedWindowX) {
        windowLineValues.push(0);
        continue;
      }

      const xPositionInTileset = screenX - correctedWindowX;

      const tileMapIndex = this.getTileIndexFromPixelLocation(xPositionInTileset, yPositionInTileset);
      const tilePixelPosition = this.getUpperLeftPixelLocationOfTile(tileMapIndex);

      const xPosInTile = xPositionInTileset - tilePixelPosition.x;
      const yPosInTile = yPositionInTileset - tilePixelPosition.y;

      const bytePositionInTile = yPosInTile * bytesPerCharacter;
      const relativeOffset = lcdControlRegister.backgroundCharacterData === 0 ? 128 : 0;
      const tileCharIndex = windowTileMap[tileMapIndex] + relativeOffset;
      const tileCharBytePosition = tileCharIndex * 16; // 16 bytes per tile

      const currentTileLineBytePosition = characterDataStartAddress + tileCharBytePosition + bytePositionInTile;
      const lowerByte = memory.readByte(currentTileLineBytePosition);
      const higherByte = memory.readByte(currentTileLineBytePosition + 1);

      const paletteIndex = this.getPixelInTileLine(xPosInTile, lowerByte, higherByte, false);
      windowLineValues.push(paletteIndex);
      const paletteColor = palette[paletteIndex];
      const color = this.colors[paletteColor];

      this.screen.setPixel(screenX, lineYRegister.value, color.red, color.green, color.blue);
    }

    this.windowLinesDrawn++;

    return windowLineValues;
  }


  drawSpriteLine(backgroundLineValues: number[], windowLineValues: number[]) {
    const spriteOffsetX = -8;
    const spriteOffsetY = -16;
    const characterDataStart = 0x8000;
    const bytesPerLine = 2;
    const linesPerTileIndex = 8;
    const bytesPerTile = bytesPerLine * linesPerTileIndex;
    const maxObjectsPerLine = 10;

    const intersectingSprites = objectAttributeMemoryRegisters.filter(oamRegister => {
      const { xPosition, yPosition } = oamRegister;

      if (xPosition === 0 || yPosition == 0 || xPosition >= 168 || yPosition >= 160) {
        return false;
      }

      const spriteY = yPosition + spriteOffsetY;

      let scanlineIntersectsYAt = lineYRegister.value - spriteY;
      const lastLineOfSprite = lcdControlRegister.objectHeight - 1;

      if (oamRegister.isFlippedVertical) {
        scanlineIntersectsYAt = lastLineOfSprite - scanlineIntersectsYAt;
      }

      return scanlineIntersectsYAt >= 0 && scanlineIntersectsYAt <= lastLineOfSprite;
    });

    const prioritizedSprites = intersectingSprites
      .slice(0, maxObjectsPerLine)
      .sort((oamRegisterA, oamRegisterB) => {
        return (oamRegisterB.xPosition - oamRegisterA.xPosition) || (oamRegisterB.index - oamRegisterA.index);
      })

    prioritizedSprites.forEach(oamRegister => {
      const { xPosition, yPosition, characterCode, paletteNumber } = oamRegister;

      const spriteX = xPosition + spriteOffsetX;
      const spriteY = yPosition + spriteOffsetY;

      let scanlineIntersectsYAt = lineYRegister.value - spriteY;
      const lastLineOfSprite = lcdControlRegister.objectHeight - 1;

      if (oamRegister.isFlippedVertical) {
        scanlineIntersectsYAt = lastLineOfSprite - scanlineIntersectsYAt;
      }

      // For 8 x 16 sprites, the lowest bit must not be used, so it is cleared out here for 8x16
      const tileIndex = lcdControlRegister.objectHeight === 16 ? clearBit(characterCode, 0) : characterCode;

      const bytePositionInTile = scanlineIntersectsYAt * bytesPerLine;
      const tileCharBytePosition = tileIndex * bytesPerTile;
      const currentTileLineBytePosition = characterDataStart + tileCharBytePosition + bytePositionInTile;

      const lowerByte = memory.readByte(currentTileLineBytePosition);
      const higherByte = memory.readByte(currentTileLineBytePosition + 1);

      for (let xPixelInTile = 0; xPixelInTile < 8; xPixelInTile++) {
        const paletteIndex = this.getPixelInTileLine(xPixelInTile, lowerByte, higherByte, oamRegister.isFlippedHorizontal);

        const palette = objectPaletteRegisters[paletteNumber].palette;
        const paletteColor = palette[paletteIndex];
        const color = this.colors[paletteColor];
        const screenX = spriteX + xPixelInTile;

        const isBackgroundSolid = backgroundLineValues[screenX] !== 0;
        const isWindowSolid = windowLineValues[screenX] !== undefined && windowLineValues[screenX] !== 0;

        const isPixelBehindBackground = oamRegister.isBehindBackground && (isBackgroundSolid || isWindowSolid);

        if (paletteIndex !== 0 && !isPixelBehindBackground) {
          this.screen.setPixel(spriteX + xPixelInTile, lineYRegister.value, color.red, color.green, color.blue);
        }
      }
    });
  }

  private getTileCharacterIndex(tileMapIndex: number) {
    const address = lcdControlRegister.backgroundTileMapStartAddress + tileMapIndex;
    if (lcdControlRegister.backgroundCharacterData === 0) {
      return memory.readSignedByte(address) + 128;
    } else {
      return memory.readByte(address);
    }
  }

  private getTileIndexFromPixelLocation(x: number, y: number) {
    const tileSize = 8;
    const backgroundNumberOfTilesPerSide = 32;

    const tileX = Math.floor(x / tileSize);
    const tileY = Math.floor(y / tileSize);

    return (tileY * backgroundNumberOfTilesPerSide) + tileX;
  }

  private getUpperLeftPixelLocationOfTile(tile: number) {
    const tileSize = 8;
    const backgroundNumberOfTilesPerSide = 32;

    const posY = Math.floor(tile / backgroundNumberOfTilesPerSide);
    const posX = tile - posY * backgroundNumberOfTilesPerSide;

    return { x: posX * tileSize, y: posY * tileSize };
  }

  private getPixelInTileLine(xPosition: number, lowerByte: number, higherByte: number, isFlippedX: boolean) {
    const xPixelInTile = isFlippedX ? xPosition : 7 - xPosition;
    const shadeLower = getBit(lowerByte, xPixelInTile);
    const shadeHigher = getBit(higherByte, xPixelInTile) << 1;

    return shadeLower + shadeHigher;
  }
}`);

</script>

<template>
  <BaseSlideTemplate>
  <template v-slot:default>
    <div style="height: 90vh;">
      <PrismEditor class="my-editor" style="width: 95vw; font-size: 0.7em;" v-model="code" :highlight="code => highlight(code, languages.ts, 'ts')" />
    </div>

  </template>
  </BaseSlideTemplate>
</template>

<style scoped>

</style>