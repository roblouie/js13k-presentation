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
import StackExplanation1 from "./StackExplanation1.vue";
import CpuClassStage9StackPushPop from "./CpuClassStage9StackPushPop.vue";

export const cpuRoutes = [
  { slide: CpuIntro, notes: [] },
  { slide: CpuMap, notes: [
      'Talk about the different color coded areas',
        'For our purposes for now, jus the yellow part is what we care about for cpu',
        'Cover the registers, PC, and SP at a super high level. Point out the side by side 8bit - 16bit nature',
        `Make sure to talk about the PC loading data into registers to do work. 
        "The registers are where the cpu runs logic". Adding, subtracting, etc.`,
        `Main cpu flow is pull data from ram into register(s), perform operations on those values, write back to memory`,
    ] },
  { slide: ProgramCounter, notes: ['Talk about similarities to js where it executes line by line, jumps on function.'] },
  { slide: JsDebuggerTrace1, notes: [] },
  { slide: CpuClassStage1, notes: [] },
  { slide: CartridgeHeaderSpec, notes: [`Real world example of tetris is next.`] },
  { slide: TetrisHeaderHex, notes: [`Here is the tetris rom in a hex editor. A hex editor lets you see the bytes of the file`,
    `On the right it shows those bytes as ascii text.`] },
  { slide: Nop, notes: [
      `Talk about games being written in assembly. NOP command goes in code editor, 0 comes out`
    ] },
  { slide: CpuClassStage2, notes: [
      `This emulates the first command of every single gameboy game ever made`,
        `Of course it does nothing so it doesn't accomplish much, but this is the pattern for ALL commands`,
        `Look up byte code for assembly instruction, and add a function at that point in the array,
        when program counter points to that byte, look it up and run it.`
    ] },
  { slide: TetrisHeaderHex, notes: [
      `This is a good time to talk about low byte - hight byte, and talk about human reading vs computer, 
      and show the address.`
    ] },
  { slide: JpInstr, notes: [
      `Explain JP nn assembly, and low and high byte`,
      `Hex editor shows hex, gameboy manual shows binary, so conversion up top.`,
    ] },
  { slide: CpuClassStage3, notes: [] },
  { slide: TetrisHeaderHex, notes: [] },
  { slide: LoadImmediate, notes: [
      `Remember our cpu loads data from meory into registers to do it's work. Here is a command for 
      loading data from memory into a register.`,
        `Talk about the assembly, and especially about the more advanced "compilation" with the register codes.`,
        `Show the different register codes changing the value in the top bar`,
        `Talk about how those register codes are used in every command with registers, LD, save, add, subtract`
    ] },
  { slide: CpuClassStage4, notes: [
      `show adding registers, then show each new command, including how each command subs out the bits
      for the register, and which register is used`,
        `Then talk about this being "pseudo-code", and messy. This is just one command that has exploded to
        8 commands. And each register isn't a byte / byte pair. We should fix these things.`,
        `"We should associate 111 with A, 000 with B, etc, since they are always used together.`
    ] },

  { slide: CpuRegisterClass, notes: [
      `In summary, we have associated the register code with the register, and allowed reading and writing as a byte`
    ] },
  { slide: DoubleCpuRegisterClass, notes: [
      `If you remember, the CPU can also read and write register pairs as 16-bit values, so this is used for that`,
        `AF, BC, etc`,
    ] },
  { slide: CpuRegisterCollectionClass, notes: [
      `Make sure to scroll down to show arrays!!!`
    ] },
  { slide: CpuClassStage4Comparison, notes: [] },
  { slide: CpuClassStage5, notes: [] },
  { slide: AddAInstruction, notes: [
      `Talk about the flag register, and how it helps knowing the result of what just happened.`,
        `Good analogy for HC and C, is HC is 9+1, C is 90 + 10. 99 + 1 would turn both on.`,
        `N is for subtraction, this is ADD, so the flag is turned off`
    ] },
  { slide: FlagRegister, notes: [] },
  { slide: FlagRegisterClass, notes: [] },
  { slide: CpuClassStage6AddInst, notes: [] },
  { slide: CpuClassStage7DecInstr, notes: [
      `This is like the -- instruction in js`
    ] },
  { slide: CpuClassStage8JpNz, notes: [] },
  { slide: AssemblyExplanation, notes: [
      `When devs write assembly, they use labels rather than hard coded memory addresses, as this would be impossible to maintain`,
        `During compilation, the label is replaced by the address of the next command.`,
        `I put our starting address at 0x0150 because that is the first address in a gameboy cartidge,
        but it doesn't matter. It depends where this code lives in the final compilation.`
    ] },
  { slide: JsDebuggerTrace1, notes: [
      `We've seen this video before, but we skipped over something important last time. *Play until hitting return statement`,
        `How does it know where to return from? We don't say return to line 128. If we did it wouldn't be a very flexible function
        it can be run from anywhere and return to anywhere...but how?`
    ] },
  { slide: StackExplanation1, notes: [] },
  { slide: CpuClassStage9StackPushPop, notes: [] },

    // TODO: Slides with call and return instructions
];
