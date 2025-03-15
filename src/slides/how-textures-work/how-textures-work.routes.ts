import GeneratingTextures2 from "./GeneratingTextures2.vue";
import GeneratingTextures1 from "./GeneratingTextures1.vue";
import SeededRandomGrid from "./SeededRandomGrid.vue";
import SeededRandomGrid2 from "./SeededRandomGrid2.vue";
import PerlinNoise1 from "./PerlinNoise1.vue";
import PerlinNoise2 from "./PerlinNoise2.vue";
import PerlinNoise3 from "./PerlinNoise3.vue";
import PerlinNoise4 from "./PerlinNoise4.vue";
import PerlinNoise5 from "./PerlinNoise5.vue";
import PerlinNoise6 from "./PerlinNoise6.vue";
import SkyboxAside1 from "./SkyboxAside1.vue";

export const howTexturesWorkRoutes = [
  { slide: GeneratingTextures1, notes: [] },
  { slide: GeneratingTextures2, notes: [
    'Maybe start by showing math.random instead or in addition to sin',

    'Using the final example below, start with introducing the fract function, then adding the multiplication',

    `Final Code Example:
    
function seededRandom(x) {
  const fract = (n) => n - Math.floor(n);
  return fract(Math.sin(x) * 1);
}
    `
    ] },

  { slide: SeededRandomGrid, notes: [
    `While this is an ultra simple example, with a small amount of code (especially minified and zipped), we can turn one value into x colors.
    X can be whatever we want, without increasing the size of the code`,
    ] },
  { slide: SeededRandomGrid2, notes: [
      "You can scale this up, but other than making it black and white for tv static, it isn't good for much on it's own"
    ]
  },
  { slide: PerlinNoise1, notes: [] },
  { slide: PerlinNoise2, notes: [] },
  { slide: PerlinNoise3, notes: [] },
  { slide: PerlinNoise4, notes: [
    `Slightly simplified implementation where each corner just has a value between 0 and 255. This works but is less intuitive
    to visualize`
    ]
  },
  { slide: PerlinNoise5, notes: [] },
  { slide: SkyboxAside1, notes: [] },
  { slide: PerlinNoise6, notes: [] },

];
