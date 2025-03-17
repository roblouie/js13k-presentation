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
  { slide: Modeler, notes: [
    'Start by changing the width, height, and depth',
      'Then switch to wireframe mode and show changing the number of triangles',
      'Swap back to solid view briefly to show the cube is the same, then go back to wireframe',
      `Now modify each vertex to normalize it, reminder on normalization keeps the direction but normalizes the distance to 1`,
      `
 new MoldableCube(10, 10, 10, 5, 5, 5)
  .modifyEachVertex(vertex => {
    vertex.normalize_();
  })
  .done_();`,
      `
new MoldableCube(10, 10, 10, 5, 5, 5)
  .spherify(5)
  .done_();
      `,
      `Now switch back to solid view to show the problem with lighting. The normals are still from the cube shape`,
      `
  new MoldableCube(10, 10, 10, 5, 5, 5)
  .spherify(5)
  .computeNormals()
  .done_();
      `
    ] },
  // TODO: Slide(s) on texture mapping and spread texture coords
  // TODO: At least basic intro slide(s) on shadows
];