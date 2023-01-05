import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import HomeView from "@/views/HomeView.vue";
import BookView from "@/views/BookView.vue";
import AutorView from "@/views/AuthorView.vue";
import NotFound from "@/views/notfound/NotFound.vue";

export const routesNamed = {
  home: "home",
  livros: "livros",
  autores: "autores",
};

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  return savedPosition || { top: 0, left: 0 };
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: routesNamed.home,
    component: HomeView,
  },
  {
    path: "/livros/:id",
    name: routesNamed.livros,
    component: BookView,
  },
  {
    path: "/autores",
    name: routesNamed.autores,
    component: AutorView,
  },
  {
    path: "/not-found",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/not-found",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

export default router;
