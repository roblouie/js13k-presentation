import ImageExample from "./ImageExample.vue";
import ImageExampleAnswer from "./ImageExampleAnswer.vue";
import MeshExample1 from "./MeshExample1.vue";
import MeshExampleAnswer from "./MeshExampleAnswer.vue";
import MeshExample2 from "./MeshExample2.vue";
import MeshExample3 from "./MeshExample3.vue";
import MeshExampleAnswer2 from "./MeshExampleAnswer2.vue";
import AudioExample1 from "./AudioExample1.vue";
import AudioExample1Answer from "./AudioExample1Answer.vue";
import AudioExample2 from "./AudioExample2.vue";
import AudioExample2Answer from "./AudioExample2Answer.vue";

export const howSmallIs13kRoutes = [
  { slide: ImageExample, notes: [] },
  { slide: ImageExampleAnswer, notes: [] },
  { slide: MeshExample1, notes: [] },
  { slide: MeshExample2, notes: [] },
  { slide: MeshExample3, notes: [] },
  { slide: MeshExampleAnswer, notes: [] },
  { slide: MeshExampleAnswer2, notes: [
    'The playstation can render about 5000 polygons per frame. More or less depending on lighting, texturing, etc'
    ]
  },
  { slide: AudioExample1, notes: [] },
  { slide: AudioExample1Answer, notes: [] },
  { slide: AudioExample2, notes: [] },
  { slide: AudioExample2Answer, notes: [] },
];
