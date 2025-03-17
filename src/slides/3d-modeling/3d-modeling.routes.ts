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

export const threeDModelingRoutes = [
  { slide: IntroToThreeD1, notes: [
    `Talk about vectors being 2-3 numbers`,
    `Vectors have a magnitude and a direction`,
      `When positioning things, we still use vectors, but assume an origin of 0,0, but this isn't required`,
      `The translate css examples are examples of moving from a place other than the origin, explain this by showing the direction and magnitude`,

    ] },
  { slide: IntroToThreeD1point5, notes: [] },
  { slide: IntroToThreeD2, notes: [
    'Matrices can be multiplied by each other, as seen here.',
      'This simply involves multiplying and adding the numbers in rows of one to the columns of the other'
    ] },
  { slide: IntroToThreeD3, notes: [] },
  { slide: IntroToThreeD4, notes: [] },
  { slide: IntroToThreeD5, notes: [] },
  { slide: IntroToThreeD6, notes: [] },
  { slide: IntroToThreeD7, notes: [] },
  { slide: IntroToThreeD8, notes: [] },
  { slide: EnhancedDomPointCode, notes: [
    `The browser has DOMPoint and DOMMatrix built in`,
      `This is great for free matrix multiplication, but not much else`,
      `EnhancedDOMPoint extends DOMPoint so it can still be used with DOMMatrix, but has more features`,
    ] },
  { slide: SceneGraphCode, notes: [] },
  { slide: Modeler, notes: [] },
];