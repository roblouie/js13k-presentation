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

export const gpuRoutes = [
  { slide: GpuIntro, notes: [] },
  { slide: GameboyVram, notes: [
      'Make sure to talke about palettes'
    ] },
  { slide: GameboyPalettes, notes: [] },
  { slide: MemoryMap, notes: [] },
  { slide: GameboyVramMetroid, notes: [] },
  { slide: GbDrawingModes, notes: [
      'To implement these three drawing modes, we first need to account for how they are controlled.'
    ] },
  { slide: LcdcDiagram, notes: [] },
  { slide: MemoryMap, notes: [] },
  { slide: LcdcClassImp, notes: [
      'Next we need to talk about timing'
    ] },
  { slide: EmulatorTiming, notes: [] },
    { slide: GpuStage1, notes: [] },
    { slide: InstrCycleTiming, notes: [] },
  { slide: InstructionWithCycleTime, notes: [] },
  { slide: MainEmuLoop, notes: [] },
  { slide: GpuStates, notes: [] },
  { slide: GpuStateLoop, notes: [] },
  { slide: BackgroundGuideImage, notes: [] },
  { slide: TetrisBackground, notes: [] },
  { slide: MetroidBackground, notes: [] },
  { slide: BackgroundPixelToDraw, notes: [] },
  { slide: BackgroundFindBlock, notes: [] },
  { slide: BackgroundGuideImage, notes: [] },
  { slide: TileFound, notes: [
      `We found the tile, but we're only drawing a single pixel. Which value do we want?`
    ] },
  { slide: BackgroundFindUpperLeft, notes: [] },
  { slide: BackgroundPixelToDraw, notes: [] },
  { slide: TileLaidOUt, notes: [
      `Talk about 16 bytes per tile allowing us to take our tile index and multiply by 16 to get the address of our tile`,
        `Then we can use the pixel y position in the tile times two to get the address of the row of pixels, 
        in our case, row 2 * 2 bytes = byte 4. We can read that 16-bit value, then use pixel x position to find our two bits`,
        `Then we use that to look up the color in the background palette, and draw the color to the screen.`,
    ] },

  { slide: WindowDiagram, notes: [] },
  { slide: MetroidWindow, notes: [] },
  { slide: WindowRegisters, notes: [] },
  { slide: SpritesTetris, notes: [] },
  { slide: SpriteRegisters, notes: [] },

];
