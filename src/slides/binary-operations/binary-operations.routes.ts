import BinaryOperationsIntro from "./BinaryOperationsIntro.vue";
import BitwiseOr from "./BitwiseOr.vue";
import BitwiseAnd from "./BitwiseAnd.vue";
import BitShift from "./BitShift.vue";
import PartsFromCssColor from "./PartsFromCssColor.vue";
import ArrayBuffer from "./ArrayBuffer.vue";
import ArrayBufferExample from "./ArrayBufferExample.vue";
import BitOpSummary from "./BitOpSummary.vue";

export const bitwiseOpsRoutes = [
  { slide: BinaryOperationsIntro, notes: [] },
  { slide: BitwiseOr, notes: [
      `Point out that you can set bits with this`
    ] },
  { slide: BitwiseAnd, notes: [
      `Point out that you can clear bits with this`
    ] },
  { slide: BitShift, notes: [] },
  { slide: PartsFromCssColor, notes: [
      `First to .toString() with 10, 2, and 16 to show the number in different bases`,
      `Then show getting just the blue value with bitmask`,
      `Then show getting red with bit shift`,
        `Show getting green`,
        `Show changing green with |`,
    ] },
  { slide: BitOpSummary, notes: [] },
  { slide: ArrayBuffer, notes: [] },
  { slide: ArrayBufferExample, notes: [
      `Create byte arrays and show the lengths of byteArray vs twoByte array`,
      `Then show just getting the value out`,
        `Then add the setUint32 to show setting the full value, the array sets can then be removed`,
        `Show setting 8 or 16 bit values`,
      `const testBuffer = new ArrayBuffer(8);
const byteArray = new Uint8Array(testBuffer);
const twoByteArray = new Uint16Array(testBuffer);
const dataView = new DataView(testBuffer);
byteArray[0] = 0xff;
byteArray[1] = 0x10;
byteArray[2] = 0xa8;
byteArray[3] = 0xff;

dataView.setUint32(0, 0xffab3cb4);
dataView.setUint8(0, 0x00);
dataView.getUint32(0).toString(16);`
    ] },
];
