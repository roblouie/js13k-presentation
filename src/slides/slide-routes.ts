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

const slideRoutesInt = generateRoutesFromList([
  { slide: Slide0, notes: []},
  { slide: Slide1, notes: []},
  { slide: Slide2, notes: []},
  { slide: Slide3, notes: []},
  { slide: Slide4, notes: []},
  { slide: Slide5, notes: []},
  { slide: Slide6, notes: []},
]);

export const slideRoutes = [
  ...slideRoutesInt,
  ...generateRoutesFromList(howSmallIs13kRoutes),
  ...generateRoutesFromList(demoVideoRoutes),
  ...generateRoutesFromList(howTexturesWorkRoutes)
]

// export const slideRoutes: Array<RouteRecordRaw> = [
//   {
//     component: Slide0,
//     meta: {
//       notes: [
//         'Touch on point 1',
//       ]
//     }
//   },
//   {
//     path: '2',
//     name: '2',
//     component: Slide1,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   {
//     path: '3',
//     name: '3',
//     component: Slide2,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   {
//     path: '4',
//     name: '4',
//     component: Slide3,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   {
//     path: '5',
//     name: '5',
//     component: Slide4,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   {
//     path: '6',
//     name: '6',
//     component: Slide5,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   {
//     path: '7',
//     name: '7',
//     component: Slide6,
//     meta: {
//       notes: [
//         'Touch on point 2'
//       ]
//     }
//   },
//   ...howSmallIs13kRoutes,
// ];