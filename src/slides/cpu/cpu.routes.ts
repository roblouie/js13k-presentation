import CpuIntro from "./CpuIntro.vue";
import CpuMap from "./CpuMap.vue";
import ProgramCounter from "./ProgramCounter.vue";
import JsDebuggerTrace1 from "./JsDebuggerTrace1.vue";
import CpuClassStage1 from "./CpuClassStage1.vue";
import CartridgeHeaderSpec from "./CartridgeHeaderSpec.vue";
import TetrisHeaderHex from "./TetrisHeaderHex.vue";
import Nop from "./Nop.vue";
import CpuClassStage2 from "./CpuClassStage2.vue";
import JpInstr from "./JpInstr.vue";
import CpuClassStage3 from "./CpuClassStage3.vue";
import LoadImmediate from "./LoadImmediate.vue";
import CpuClassStage4 from "./CpuClassStage4.vue";
import FlagRegister from "./FlagRegister.vue";
import CpuRegisterClass from "./CpuRegisterClass.vue";
import DoubleCpuRegisterClass from "./DoubleCpuRegisterClass.vue";
import CpuRegisterCollectionClass from "./CpuRegisterCollectionClass.vue";
import CpuClassStage4Comparison from "./CpuClassStage4Comparison.vue";
import CpuClassStage5 from "./CpuClassStage5.vue";
import AddAInstruction from "./AddAInstruction.vue";
import FlagRegisterClass from "./FlagRegisterClass.vue";
import SettingAndClearingBits from "./SettingAndClearingBits.vue";
import CpuClassStage6AddInst from "./CpuClassStage6AddInst.vue";
import CpuClassStage7DecInstr from "./CpuClassStage7DecInstr.vue";
import CpuClassStage8JpNz from "./CpuClassStage8JpNz.vue";
import AssemblyExplanation from "./AssemblyExplanation.vue";

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
  { slide: CartridgeHeaderSpec, notes: [] },
  { slide: TetrisHeaderHex, notes: [] },
  { slide: Nop, notes: [] },
  { slide: CpuClassStage2, notes: [] },
  { slide: TetrisHeaderHex, notes: [] },
  { slide: JpInstr, notes: [] },
  { slide: CpuClassStage3, notes: [] },
  { slide: TetrisHeaderHex, notes: [] },
  { slide: LoadImmediate, notes: [] },
  { slide: CpuClassStage4, notes: [] },

    // TODO: Add slide(s) here that shows byte layout of registers, and reminds of the register and register pair codes
  { slide: CpuRegisterClass, notes: [] },
  { slide: DoubleCpuRegisterClass, notes: [] },
  { slide: CpuRegisterCollectionClass, notes: [] },
  { slide: CpuClassStage4Comparison, notes: [] },
  { slide: CpuClassStage5, notes: [] },
  { slide: AddAInstruction, notes: [] },
  { slide: FlagRegister, notes: [] },
  { slide: SettingAndClearingBits, notes: [] },
  { slide: FlagRegisterClass, notes: [] },
  { slide: CpuClassStage6AddInst, notes: [] },
  { slide: CpuClassStage7DecInstr, notes: [] },
  { slide: CpuClassStage8JpNz, notes: [] },
  { slide: AssemblyExplanation, notes: [] },

];
