import NumberSystemsIntro from "./NumberSystemsIntro.vue";
import BaseTen from "./BaseTen.vue";
import EarlyComputer1 from "./EarlyComputer1.vue";
import EarlyComputer2 from "./EarlyComputer2.vue";
import EarlyComputer3 from "./EarlyComputer3.vue";
import CharacterDisplay from "./CharacterDisplay.vue";
import BitsAndBytes from "./BitsAndBytes.vue";


export const numberSystemsRoutes = [
  { slide: NumberSystemsIntro, notes: [] },
  { slide: BaseTen, notes: [] },
  { slide: EarlyComputer1, notes: [] },
  { slide: EarlyComputer2, notes: [] },
  { slide: BaseTen, notes: [] },
  { slide: EarlyComputer3, notes: [] },
  { slide: CharacterDisplay, notes: [
      'Mention non-printable characters like newline, tab, space, delete, etc',
        'After adding 8th bit, explain the power of 2 and the use of the extra bit for like end of command'
    ] },
  { slide: BitsAndBytes, notes: [] },

];
