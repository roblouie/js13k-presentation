import { createRouter, createWebHistory } from 'vue-router';
import PresenterView from "./components/PresenterView.vue";
import ActiveGame from "./presentation-display/ActiveGame.vue";
import {slideRoutes} from "./slides/slide-routes.ts";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PresenterView,
  },
  {
    path: '/presentation',
    name: 'Presentation',
    component: ActiveGame,
    children: [
      ...slideRoutes
    ],
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
