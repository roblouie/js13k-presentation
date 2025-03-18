import Modeler from "./Modeler.vue";
import IntroToThreeD1 from "./IntroToThreeD1.vue";
import IntroToThreeD2 from "./IntroToThreeD2.vue";
import IntroToThreeD3 from "./IntroToThreeD3.vue";
import IntroToThreeD4 from "./IntroToThreeD4.vue";
import IntroToThreeD5 from "./IntroToThreeD5.vue";
import IntroToThreeD6 from "./IntroToThreeD6.vue";
import IntroToThreeD7 from "./IntroToThreeD7.vue";
import IntroToThreeD8 from "./IntroToThreeD8.vue";
import IntroToThreeD1point5 from "./IntroToThreeD1point5.vue";
import SceneGraphCode from "./SceneGraphCode.vue";
import EnhancedDomPointCode from "./EnhancedDomPointCode.vue";
import ProjectionMatrixVisualization from "./ProjectionMatrixVisualization.vue";
import LightingVisualization from "./LightingVisualization.vue";
import RenderingGraphics1 from "./RenderingGraphics1.vue";
import RenderingGraphics2 from "./RenderingGraphics2.vue";
import VertexShader from "./VertexShader.vue";
import FragmentShader from "./FragmentShader.vue";
import MeshExample3 from "../how-small-is-13k/MeshExample3.vue";
import MeshExample2 from "../how-small-is-13k/MeshExample2.vue";
import ModelerLandscape from "./ModelerLandscape.vue";
import ModelerJoining1 from "./ModelerJoining1.vue";
import ModelerJoining2 from "./ModelerJoining2.vue";
import Shadows1 from "./Shadows1.vue";
import Shadows4 from "./Shadows4.vue";
import Shadows2 from "./Shadows2.vue";
import Shadows3 from "./Shadows3.vue";
import GraphicsSummary from "./GraphicsSummary.vue";
import ModelingIntro from "./ModelingIntro.vue";

export const threeDModelingRoutes = [
  { slide: ModelingIntro, notes: [] },
  { slide: IntroToThreeD1, notes: [
    `Talk about vectors being 2-3 numbers`,
    `Vectors have a magnitude and a direction`,
      `When positioning things, we still use vectors, but assume an origin of 0,0, but this isn't required`,
      `The translate css examples are examples of moving from a place other than the origin, explain this by showing the direction and magnitude`,

    ] },
  { slide: IntroToThreeD1point5, notes: [
    'Mention winding order as important to drawing triangles from points'
    ] },
  { slide: IntroToThreeD2, notes: [
    'Matrices can be multiplied by each other, as seen here.',
      'This simply involves multiplying and adding the numbers in rows of one to the columns of the other'
    ] },
  { slide: IntroToThreeD3, notes: [] },
  { slide: IntroToThreeD4, notes: [] },
  { slide: IntroToThreeD5, notes: [] },
  { slide: IntroToThreeD6, notes: [] },
  { slide: IntroToThreeD7, notes: [] },
  { slide: IntroToThreeD8, notes: [

    'Next slide: DOMPoint and DOMMatrix built into browser'
    ] },
  { slide: EnhancedDomPointCode, notes: [
    `The browser has DOMPoint and DOMMatrix built in`,
      `This is great for free matrix multiplication, but not much else`,
      `EnhancedDOMPoint extends DOMPoint so it can still be used with DOMMatrix, but has more features`,
    ] },
  { slide: SceneGraphCode, notes: [] },
  { slide: ProjectionMatrixVisualization, notes: [] },
  { slide: LightingVisualization, notes: ['Talk about normals and comparing to light normal'] },
  { slide: RenderingGraphics1, notes: ['Talk about playstation, sega saturn, and pc graphics cards at the time doing triangle sorting'] },
  { slide: RenderingGraphics2, notes: [
    'Touch on GLSL syntax and that we need a vertex shader and fragment shader',
    ] },
  { slide: VertexShader, notes: [
    'This is a slightly simplified version of the real shader',
      'Talk about flow into vert shader out to fragment shader, as the tex coords do'
    ] },
  { slide: FragmentShader, notes: [
      'This is a slightly simplified version of the real shader',
      'Talk about clamping litPercent, you cant have a black hole',
    ] },
  { slide: Modeler, notes: [
    'Start by changing the width, height, and depth',
      'Introduce the overall idea of shaping triangles. If a cube is a bunch of triangles and a bunch of triangles can form any shape...a cube can be any shape?',
      'Then switch to wireframe mode and show changing the number of triangles',
      'Swap back to solid view briefly to show the cube is the same, then go back to wireframe',
      `Now modify each vertex to normalize it, reminder on normalization keeps the direction but normalizes the distance to 1`,
      `new MoldableCube(10, 10, 10, 5, 5, 5)
  .modifyEachVertex(vertex => {
    vertex.normalize_();
  })
  .done_();`,
      `new MoldableCube(10, 10, 10, 5, 5, 5)
  .spherify(5)
  .done_();`,
      `Now switch back to solid view to show the problem with lighting. The normals are still from the cube shape`,
      `Talk about winding order and that combined with 3 points to define a plane mean we can determine face direction`,
      `If we average the face direction of all faces shared by a vertex, we can calculate it's normal`,
      `new MoldableCube(10, 10, 10, 5, 5, 5)
  .spherify(5)
  .computeNormals()
  .done_();
      `,
      `new MoldableCube(10, 10, 10, 5, 5, 5)
  .modifyEachVertex(vertex => {
    const originalAxis = vertex.y;
    vertex.y = 0;
    vertex.normalize_().scale_(5);
    vertex.y = originalAxis;
  }).done_();`,
      `Talk about being able to loop through vertices and select them based on filter functions, etc, and the ability to combine cubes into larger shapes`,
    ] },
  { slide: ModelerLandscape, notes: [
    `Start by putting a rectangle on the svg`,
      `<rect x="80" y="80" width="100" height="100" fill="#333" />`,
      `Then remind about the noise we generate...`,
      `<filter height="100%" id="rw" width="100%" x="0" y="0">
    <feTurbulence baseFrequency="0.1" numOctaves="1" type="fractalNoise"/>
  </filter>
  <rect filter="url(#rw)" height="100%" width="100%"/>`,
      `Add the radial gradient below the filter but above the rect`,
      `<defs>
    <radialGradient id="ring">
      <stop offset="10%" stop-color="#000" />
      <stop offset="80%" stop-color="#000" />
      <stop offset="95%" stop-color="#f00" />
    </radialGradient>
  </defs>

  <circle cx="128" cy="128" r="50" fill="url('#ring')" />`,
      'Replace the gradient and circle with test',
      `<text x="64" y="128" fill="#f00" font-size="80">Cool</text>`,
    ] },
  { slide: ModelerJoining1, notes: [
    `Talk about mergability of cubes`,
      `new MoldableCube(10, 10, 10, 1, 1, 1)
  .merge(
    new MoldableCube(5, 15, 10, 1, 1, 1)
    .translate_(7.5, 2.5)
    .done_()
  ).done_()`,
      `Show how the textures don't line up`
    ] },
  { slide: MeshExample3, notes: [`Reminder of how texture coordinates work`] },
  { slide: ModelerJoining2, notes: [
    'Show how the texture coordinates work on the rendered shapes, causing the stretching',
    `new MoldableCube(10, 10, 10, 1, 1, 1)
.spreadTextureCoords()
  .merge(
    new MoldableCube(5, 15, 10, 1, 1, 1)
    .translate_(7.5, 2.5)
        .spreadTextureCoords()
    .done_()
  ).done_()`,
      'Show adding params to spreadTextureCoords to change scaling',
      'By exploiting behavior in texture sampling, I can make textures seamlessly tile across multiple shapes all joined together',
    ] },
  { slide: Shadows1, notes: [
    `Directional shadows are in general not too hard to do. Render the scene from the point of view of the light first, but rather than rendering
    colors, render the depths only`,
      `Then render the scene from the point of view of the camera, but for each pixel, check it's depth against the same pixel from
       the point of view of the light. If the rendered pixel has more depth than what is in the depth map, it is behind an object and is shadowed.`
    ] },
  { slide: Shadows2, notes: [
    'Here we see a visual representation of a depth map from the point of view of a light'
    ] },
  { slide: Shadows3, notes: [
    'Here is the normally rendered scene on the left, depth map on the right',
      'Comparing pixels, the pixel at the arrow will have a greater depth than the value returned from the same spot as the depth map, so it is behind an object and in shadow.'
    ] },
  { slide: Shadows4, notes: [
    `This is all fine and good for directional lights like the sun, or even spotlights, as they only have a single direction`,
      `What about point lights, like a lamp in a room, which shines light out in all directions?`,
      `Remember the skymap? Anywhere you look at that skymap, you will hit a pixel`,
      `If we render the scene from the point of view of the light, 6 times each with a 90 degree viewpoint, rotating the "camera" exactly each time, we can render depths onto a cubemap`,
      `Now if we also sample these when rendering our scene, we can cast shadows in all directions`,
    ]
  },
  { slide: GraphicsSummary, notes: [] },
];