import NumberSystemsIntro from "./NumberSystemsIntro.vue";
import BaseTen from "./BaseTen.vue";
import EarlyComputer1 from "./EarlyComputer1.vue";
import EarlyComputer2 from "./EarlyComputer2.vue";
import EarlyComputer3 from "./EarlyComputer3.vue";
import CharacterDisplay from "./CharacterDisplay.vue";
import BitsAndBytes from "./BitsAndBytes.vue";
import BytesInUse from "./BytesInUse.vue";
import BytesAsColors from "./BytesAsColors.vue";


export const numberSystemsRoutes = [
  { slide: NumberSystemsIntro, notes: [] },
  { slide: BaseTen, notes: [] },
  { slide: EarlyComputer1, notes: [] },
  { slide: EarlyComputer2, notes: [] },
  { slide: BaseTen, notes: [
      `Mention the position labels are in decimal, but if we actually used binary for everything, they'd look the same as decimal`
    ] },
  { slide: EarlyComputer3, notes: [] },
  { slide: CharacterDisplay, notes: [
      'Mention looking for a standard for characters',
      'Mention non-printable characters like newline, tab, space, delete, etc',
        'After adding 8th bit, explain the power of 2, 7 being a prime number but 8 is evenly divisibly in halfs or quarters'
    ] },
  { slide: BitsAndBytes, notes: [] },
  { slide: BytesInUse, notes: ['Mention encryption keys using 128-bit or 265-bit encryption'] },
  { slide: BaseTen, notes: ['Show hexadecimal'] },
  { slide: BytesAsColors, notes: [
      'Bytes are always numbers, but can be interpreted as many different things',
        `Mention that there is a 4th byte, alpha, which I didn't show here`,
    ] },

];
