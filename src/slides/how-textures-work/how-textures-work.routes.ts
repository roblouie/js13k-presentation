import GeneratingTextures2 from "./GeneratingTextures2.vue";
import GeneratingTextures1 from "./GeneratingTextures1.vue";
import SeededRandomGrid from "./SeededRandomGrid.vue";

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
];
