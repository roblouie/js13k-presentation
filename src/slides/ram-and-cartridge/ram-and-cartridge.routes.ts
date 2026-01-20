import RamAndCartridgeIntro from "./RamAndCartridgeIntro.vue";
import MemoryMap from "./MemoryMap.vue";
import GbMemoryClass from "./GbMemoryClass.vue";
import GbCartridgeClass from "./GbCartridgeClass.vue";
import LoadGameAndRam from "./LoadGameAndRam.vue";

export const ramAndCartridgeRoutes = [
  { slide: RamAndCartridgeIntro, notes: [] },
  { slide: MemoryMap, notes: [
      `Talk about this being from the gameboy programming guide`,
      `Point out the cartridge area vs the rest`,
        `Talk about character data being tiles, 8x8 pixel data used to make graphics. Game programmers will write code to copy the tiles into here`,
      `Make sure to call out the registers, and how that graphics, sound, controls, 
everything is powered by writing to memory addresses`,
    ] },
  { slide: GbMemoryClass, notes: [
      `Talk about the array buffer and data view just like we had before in the example`,
        `Array size is 0x10000, because that is the size of the memory, counting from 0, just like regular arrays`,
        `Cartridge is separate so it can be loaded in by the user when they select a rom, but it's needed here because 
        the cpu just reads and writes memory, it doesn't care if thats on the cartridge or device.`
    ] },
  { slide: GbCartridgeClass, notes: [] },
  // { slide: LoadGameAndRam, notes: [] },

];
