import GpuIntro from "./GpuIntro.vue";
import GameboyVram from "./GameboyVram.vue";
import MemoryMap from "../ram-and-cartridge/MemoryMap.vue";
import GameboyVramMetroid from "./GameboyVramMetroid.vue";
import GbDrawingModes from "./GbDrawingModes.vue";
import LcdcDiagram from "./LcdcDiagram.vue";
import LcdcClassImp from "./LcdcClassImp.vue";
import EmulatorTiming from "./EmulatorTiming.vue";
import GpuStage1 from "./GpuStage1.vue";
import InstrCycleTiming from "./InstrCycleTiming.vue";
import InstructionWithCycleTime from "./InstructionWithCycleTime.vue";
import MainEmuLoop from "./MainEmuLoop.vue";
import GpuStates from "./GpuStates.vue";
import GpuStateLoop from "./GpuStateLoop.vue";
import BackgroundGuideImage from "./BackgroundGuideImage.vue";
import TetrisBackground from "./TetrisBackground.vue";
import BackgroundPixelToDraw from "./BackgroundPixelToDraw.vue";
import MetroidBackground from "./MetroidBackground.vue";
import BackgroundFindBlock from "./BackgroundFindBlock.vue";
import TileFound from "./TileFound.vue";
import BackgroundFindUpperLeft from "./BackgroundFindUpperLeft.vue";
import GameboyPalettes from "./GameboyPalettes.vue";
import TileLaidOUt from "./TileLaidOUt.vue";
import WindowDiagram from "./WindowDiagram.vue";
import MetroidWindow from "./MetroidWindow.vue";
import WindowRegisters from "./WindowRegisters.vue";
import SpritesTetris from "./SpritesTetris.vue";
import SpriteRegisters from "./SpriteRegisters.vue";
import ObjPrioritySameX from "./ObjPrioritySameX.vue";
import ObjPriorityByX from "./ObjPriorityByX.vue";
import GpuRegisterImage from "./GpuRegisterImage.vue";
import FinalGpu from "./FinalGpu.vue";

export const gpuRoutes = [
  { slide: GpuIntro, notes: [
      `We talked about the memory area for character data, lets look at some of that:`
    ] },
  { slide: GameboyVram, notes: [
      'Make sure to talke about palettes',
        `This is not exactly how they are stored in ram...`
    ] },
  { slide: GameboyPalettes, notes: [] },
  { slide: MemoryMap, notes: [] },
  { slide: GameboyVramMetroid, notes: [
      `This is ALL the graphics! Always. Games can swap them out here, but this is all the graphics the
      gameboy can draw at any one time. Everything we see from here out is going to just draw these tiles
      at different positions in different layers.`
    ] },
  { slide: GbDrawingModes, notes: [
      'To implement these three drawing modes, we first need to account for how they are controlled.'
    ] },
  { slide: LcdcDiagram, notes: [
      `Our first external register. Lives at ff40 as seen here. Games can read and write this for graphic card info`
    ] },
  { slide: MemoryMap, notes: [
      `This is a good time to remind about memory registers in ff00 - ff80, as we will be using those`
    ] },
  { slide: LcdcClassImp, notes: [
      `There are a number of these types of registers that we will use to orchestrate drawing the background, sprites, and windows.`,
        `I won't be showing all of them, but they are all like this, mapped from the gameboy programming manual to the
        correct addresses and individual bits/bytes for different values`,
      'Next we need to talk about timing, which we have ignored so far, which is directly related to graphics card'
    ] },
    { slide: GpuRegisterImage, notes: [] },

    { slide: EmulatorTiming, notes: [] },
    { slide: GpuStage1, notes: [
        `Talk about drawing scanline by scanline, and the timing of that`
      ] },
    { slide: InstrCycleTiming, notes: [] },
  { slide: InstructionWithCycleTime, notes: [] },
  { slide: MainEmuLoop, notes: [] },
  { slide: GpuStates, notes: [] },
  { slide: GpuStateLoop, notes: [
      `We cycle through the different states, only taking action in hblank where we draw the scanline`,
        `Otherwise we simply keep other graphics card registers up to date so game code can read from them`
    ] },
  { slide: BackgroundGuideImage, notes: [] },
  { slide: TetrisBackground, notes: [] },
  { slide: MetroidBackground, notes: [] },
  { slide: BackgroundPixelToDraw, notes: [
      `Mention that we want to draw the pixel at position 0, 2 from tile 83. Explain the math at a basic level`
    ] },
  { slide: BackgroundFindBlock, notes: [
      `As the graphics card, all we know up front is that we are drawing pixels for a scanline.`,
        `We need to figure out what tile the current pixel lives in`
    ] },
  { slide: BackgroundGuideImage, notes: [] },
  { slide: TileFound, notes: [
      `We found the tile, but we're only drawing a single pixel. Which value do we want?`
    ] },
  { slide: BackgroundFindUpperLeft, notes: [
      `Walk through the math`,
        `Now we know what pixel in what tile to draw for our single pixel of our scanline,
        but how are the pixels stored in data?`
    ] },
  { slide: BackgroundPixelToDraw, notes: [] },
  { slide: TileLaidOUt, notes: [
      `Talk about 16 bytes per tile allowing us to take our tile index and multiply by 16 to get the address of our tile`,
        `Then we can use the pixel y position in the tile times two to get the address of the row of pixels, 
        in our case, row 2 * 2 bytes = byte 4. We can read that 16-bit value, then use pixel x position to find our two bits`,
        `Then we use that to look up the color in the background palette, and draw the color to the screen.`,
        `Summary: This is a little difficult to think about conceptually with allthe lookups, but it works like this:
        As the graphics card, we only know where the background is scrolled to and what pixel in what scanline to draw.
        We have to use that to go find which tile to read from memory, and then which pixel in that tile.
        We need a series of lookups to go from scrolled pixel position, to tile, to pixel in tile.`,
        `The good news is: ALL OTHER LAYERS USE THIS LOGIC`
    ] },

  { slide: WindowDiagram, notes: [] },
  { slide: MetroidWindow, notes: [] },
  { slide: WindowRegisters, notes: [] },
  { slide: SpritesTetris, notes: [] },
  { slide: SpriteRegisters, notes: [] },
  { slide: ObjPriorityByX, notes: [] },
  { slide: ObjPrioritySameX, notes: [] },

    { slide: FinalGpu, notes: [] },
];
