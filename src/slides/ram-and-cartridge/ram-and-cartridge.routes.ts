import RamAndCartridgeIntro from "./RamAndCartridgeIntro.vue";
import MemoryMap from "./MemoryMap.vue";
import GbMemoryClass from "./GbMemoryClass.vue";
import GbCartridgeClass from "./GbCartridgeClass.vue";
import LoadGameAndRam from "./LoadGameAndRam.vue";

export const ramAndCartridgeRoutes = [
  { slide: RamAndCartridgeIntro, notes: [] },
  { slide: MemoryMap, notes: [
      `Make sure to call out the registers, and how that graphics, sound, controls, 
everything is powered by writing to memory addresses`
    ] },
  { slide: GbMemoryClass, notes: [] },
  { slide: GbCartridgeClass, notes: [] },
  { slide: LoadGameAndRam, notes: [] },

];
