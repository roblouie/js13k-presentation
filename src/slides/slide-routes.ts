import type { RouteRecordRaw } from 'vue-router';
import OpeningSlide from "./OpeningSlide.vue";
import SecondSlide from "./SecondSlide.vue";

export const slideRoutes: Array<RouteRecordRaw> = [
  {
    path: '1',
    name: 'First',
    component: OpeningSlide,
    meta: {
      notes: [
        'Touch on point 1',
      ]
    }

  },
  {
    path: '2',
    name: 'Second',
    component: SecondSlide,
    meta: {
      notes: [
        'Touch on point 2'
      ]
    }
  }
];