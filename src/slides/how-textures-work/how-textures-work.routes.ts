import GeneratingTextures2 from "./GeneratingTextures2.vue";
import GeneratingTextures1 from "./GeneratingTextures1.vue";
import SeededRandomGrid from "./SeededRandomGrid.vue";
import SeededRandomGrid2 from "./SeededRandomGrid2.vue";
import PerlinNoise1 from "./PerlinNoise1.vue";
import PerlinNoise2 from "./PerlinNoise2.vue";
import PerlinNoise3 from "./PerlinNoise3.vue";
import PerlinNoise4 from "./PerlinNoise4.vue";

export const howTexturesWorkRoutes = [
  { slide: GeneratingTextures1, notes: [] },
  { slide: GeneratingTextures2, notes: [
    'Using the final example below, start with introducing the fract function, then adding the multiplication',

    `Final Code Example:
    
function seededRandom(x) {
  const fract = (n) => n - Math.floor(n);
  return fract(Math.sin(x) * 1);
}
    `
    ] },

  { slide: SeededRandomGrid, notes: [] },
  { slide: SeededRandomGrid2, notes: [
      "You can scale this up, but other than making it black and white for tv static, it isn't good for much on it's own"
    ]
  },
  { slide: PerlinNoise1, notes: [] },
  { slide: PerlinNoise2, notes: [] },
  { slide: PerlinNoise3, notes: [] },
  { slide: PerlinNoise4, notes: [] }
];
