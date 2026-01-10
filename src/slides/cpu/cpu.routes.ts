import CpuIntro from "./CpuIntro.vue";
import CpuMap from "./CpuMap.vue";
import ProgramCounter from "./ProgramCounter.vue";
import JsDebuggerTrace1 from "./JsDebuggerTrace1.vue";
import CpuClassStage1 from "./CpuClassStage1.vue";

export const cpuRoutes = [
  { slide: CpuIntro, notes: [] },
  { slide: CpuMap, notes: [
      'Talk about the different color coded areas',
        'For our purposes for now, jus the yellow part is what we care about for cpu',
        'Cover the registers, PC, and SP at a super high level. Point out the side by side 8bit - 16bit nature',
    ] },
  { slide: ProgramCounter, notes: ['Talk about similarities to js where it executes line by line, jumps on function.'] },
  { slide: JsDebuggerTrace1, notes: [] },
  { slide: CpuClassStage1, notes: [] },
];
