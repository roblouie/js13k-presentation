import type { RouteRecordRaw } from 'vue-router';
import Slide0 from "./0/Slide0.vue";
import Slide1 from "./1/Slide1.vue";
import Slide2 from "./2/Slide2.vue";
import Slide3 from "./3/Slide3.vue";
import Slide4 from "./4/Slide4.vue";
import Slide5 from "./5/Slide5.vue";
import Slide6 from "./6/Slide6.vue";
import {howSmallIs13kRoutes} from "./how-small-is-13k/how-small-is-13k.routes.ts";
import {generateRoutesFromList} from "../utils.ts";
import {demoVideoRoutes} from "./demo-video/demo-video.routes.ts";
import {howTexturesWorkRoutes} from "./how-textures-work/how-textures-work.routes.ts";
import {threeDModelingRoutes} from "./3d-modeling/3d-modeling.routes.ts";
import GameDevOverview from "./3/GameDevOverview.vue";
import {audioRoutes} from "./audio/audio.routes.ts";
import {buildProcessRoutes} from "./build-process/build-process.routes.ts";

const slideRoutesInt = generateRoutesFromList([
  { slide: Slide0, notes: []},
  { slide: Slide1, notes: []},
  { slide: GameDevOverview, notes: []},
  { slide: Slide2, notes: [
    'Touch on the passion and coolness behind creative problem solving and finding creative solutions to do things that seem impossible',
      'Touch on remembering as a kid that some games did more and it seemed cool'
    ]},
  { slide: Slide3, notes: []},
  { slide: Slide4, notes: []},
  { slide: Slide5, notes: []},
  { slide: Slide6, notes: []},
]);

export const slideRoutes = [
  ...slideRoutesInt,
  ...generateRoutesFromList(howSmallIs13kRoutes),
  ...generateRoutesFromList(demoVideoRoutes),
  ...generateRoutesFromList(audioRoutes),
  ...generateRoutesFromList(howTexturesWorkRoutes),
  ...generateRoutesFromList(threeDModelingRoutes),
  ...generateRoutesFromList(buildProcessRoutes),
];
