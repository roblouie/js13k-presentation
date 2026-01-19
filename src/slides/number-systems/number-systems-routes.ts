import BaseTen from "./BaseTen.vue";
import EarlyComputer1 from "./EarlyComputer1.vue";
import EarlyComputer3 from "./EarlyComputer3.vue";
import CharacterDisplay from "./CharacterDisplay.vue";
import BitsAndBytes from "./BitsAndBytes.vue";
import BytesInUse from "./BytesInUse.vue";
import BytesAsColors from "./BytesAsColors.vue";


export const numberSystemsRoutes = [
  { slide: BaseTen, notes: [
      `Just because we only have 0-9, does that mean we can only represent quantities of 0-9?`,
      `Why do we use base 10? We have ten fingers?`
      ] },
  { slide: EarlyComputer1, notes: [`Computers do not have ten fingers. They have on or off`] },
  { slide: BaseTen, notes: [
      `Just because we only have 0 or 1, does that mean we can only represent 0-1?`,
      `Mention the position labels are in decimal, but if we actually used binary for everything, they'd look the same as decimal`
    ] },
  { slide: EarlyComputer3, notes: [] },
  { slide: CharacterDisplay, notes: [
      'Mention looking for a standard for characters',
      'Mention non-printable characters like newline, tab, space, delete, etc',
        'After adding 8th bit, explain the power of 2, 7 being a prime number but 8 is evenly divisibly in halfs or quarters',
        'Mention easier human representation as well, which we will get to...'
    ] },
  { slide: BitsAndBytes, notes: [] },
  { slide: BytesInUse, notes: ['Mention encryption keys using 128-bit or 265-bit encryption'] },
  { slide: BaseTen, notes: ['Show hexadecimal, this is a convenient way to represent bytes, just like binary is convenient for bits'] },
  { slide: BytesAsColors, notes: [
      'Bytes are always numbers, but can be interpreted as many different things',
          `Here's a representation of a color...which you might be familiar with.`,
        `Mention that there is a 4th byte, alpha, which I didn't show here`,
    ] },

];
