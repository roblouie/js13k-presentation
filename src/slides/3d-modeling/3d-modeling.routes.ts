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

export const threeDModelingRoutes = [
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
  { slide: LightingVisualization, notes: [] },
  { slide: RenderingGraphics1, notes: [] },
  { slide: RenderingGraphics2, notes: [
    'Touch on GLSL syntax and that we need a vertex shader and fragment shader',
    ] },
  { slide: VertexShader, notes: [
    'This is a slightly simplified version of the real shader'
    ] },
  { slide: FragmentShader, notes: [
      'This is a slightly simplified version of the real shader'
    ] },
  { slide: MeshExample2, notes: [
    `Reminder on vertex normals and how they point in the direction a vertex "points"`
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
  ).done_()`
    ] },
  { slide: MeshExample3, notes: [] },
  { slide: ModelerJoining2, notes: [
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
  // TODO: Slide(s) on texture mapping and spread texture coords
  // TODO: At least basic intro slide(s) on shadows
];