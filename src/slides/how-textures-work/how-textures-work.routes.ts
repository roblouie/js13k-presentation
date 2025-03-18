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
import SkyboxAside2 from "./SkyboxAside2.vue";
import Perlin3dNoise1 from "./Perlin3dNoise1.vue";
import Perlin3dNoise2 from "./Perlin3dNoise2.vue";
import Svg1 from "./Svg1.vue";
import Svg2 from "./Svg2.vue";
import Svg3 from "./Svg3.vue";
import Svg4 from "./Svg4.vue";
import TextureIntro from "./TextureIntro.vue";

export const howTexturesWorkRoutes = [
  { slide: TextureIntro, notes: [] },
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
  { slide: PerlinNoise5, notes: ['When combined with different colors and some small tweaks, this does work'] },
  { slide: SkyboxAside1, notes: ['Talk about tiling textures. Click the upper left box to show the borders'] },
  { slide: SkyboxAside2, notes: ['Talk about how the skybox wraps around so the left and right edges of top meet the top edges of back and right'] },
  { slide: SkyboxAside1, notes: ['Now click upper middle box to rotate it showing that tiling doesnt work here'] },
  { slide: PerlinNoise6, notes: ['Talk about generating 3d noise and slicing off edges.', 'Analogy of hollowing out wood and getting consistent wood grain'] },
  { slide: Perlin3dNoise1, notes: [] },
  { slide: Perlin3dNoise2, notes: [
    `Graphics cards are extremely good at doing math and making pixels a color, which is what this is. Could make it 100x the size
    and it would run 1000x faster`,
      `However, graphics cards can only do that. They don't have fonts, they don't have built in ways of drawing shapes, applying filters
      flipping, mirroring, etc, like you can do in an html canvas`,
      `This also would still result in quite a lot of code.`,
      `There is a way to leverage the platform of the browser, which in turn can leverage the graphics card for you`,
    ] },
  { slide: PerlinNoise6, notes: ['A reminder of the code needed to generate the noise.'] },
  { slide: Svg1, notes: [
    `All svg props:
    baseFrequency: num (can also be separate x and y)
    numOctaves: num
    seed: num
    stitchTiles:  stitch | noStitch
    type: fractalNoise | turbulence`,
    ] },
  { slide: Svg2, notes: [] },
  { slide: Svg3, notes: ['Talk about dealing with skybox seams by first just making a continuous left-back-right-front image, then fading out the far left and right'] },
  { slide: Svg4, notes: ['Talk about the radial gradiant to fade clouds, and the radial gradient to brighten them around the moon'] },
];
