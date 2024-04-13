import { createWebHistory, createRouter } from "vue-router";
import Book from "@/views/book.vue";
const routes = [
  {
    path: "/",
    name: "book",
    component: Book,
  },
//   hiển thị lỗi
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
