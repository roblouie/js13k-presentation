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

export const gpuRoutes = [
  { slide: GpuIntro, notes: [] },
  { slide: GameboyVram, notes: [
      'Make sure to talke about palettes'
    ] },
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

];
