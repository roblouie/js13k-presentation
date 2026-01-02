import BinaryOperationsIntro from "./BinaryOperationsIntro.vue";
import BitwiseOr from "./BitwiseOr.vue";
import BitwiseAnd from "./BitwiseAnd.vue";
import BitShift from "./BitShift.vue";
import PartsFromCssColor from "./PartsFromCssColor.vue";
import ArrayBuffer from "./ArrayBuffer.vue";
import ArrayBufferExample from "./ArrayBufferExample.vue";

export const bitwiseOpsRoutes = [
  { slide: BinaryOperationsIntro, notes: [] },
  { slide: BitwiseOr, notes: [] },
  { slide: BitwiseAnd, notes: [] },
  { slide: BitShift, notes: [] },
  { slide: PartsFromCssColor, notes: [] },
  { slide: ArrayBuffer, notes: [] },
  { slide: ArrayBufferExample, notes: [
      `const testBuffer = new ArrayBuffer(8);
const byteArray = new Uint8Array(testBuffer);
const twoByteArray = new Uint16Array(testBuffer);
const dataView = new DataView(testBuffer);
byteArray[0] = 0xff;
byteArray[1] = 0x10;
byteArray[2] = 0xa8;
byteArray[3] = 0x3c;

dataView.setUint16(0, 0x1234, true);
byteArray[0].toString(16);`
    ] },
];
