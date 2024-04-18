import { createWebHistory, createRouter } from "vue-router";




import adminlogin from "../views/auth/adminLogin.vue";
import sigupuser from "../views/auth/sigupuser.vue";
import userLogin from "../views/auth/userLogin.vue";
import quanlysach from "../views/admin/sach/quanly.vue";
import suasach from "../views/admin/sach/sua.vue";
import themsach from "../views/admin/sach/them.vue";
import quanlynxb from "../views/admin/nhaxuatban/quanly.vue";
import suanxb from "../views/admin/nhaxuatban/sua.vue";
import themnxb from "../views/admin/nhaxuatban/them.vue";
import Quanlyuser from "../views/admin/user/quanly.vue";


const routes = [
  

  //admin
  {
    path: '/admin/login', 
    name: 'login', 
    component: adminlogin,
  },
  {
    path: '/singup', 
    name: 'dangky', 
    component: sigupuser,
  },
  {
    path: '/login', 
    name: 'dangnhapnguoidung', 
    component: userLogin,
  },
  {
    path: '/admin/sach/quanly', 
    name: 'quanlysach', 
    component: quanlysach,
  },
  {
    path: "/admin/sach/sua/:id",
    name: "suasach",
    component: suasach,
    props: true
  },
  {
    path: '/admin/sach/them', 
    name: 'themsach', 
    component: themsach,
  },
  {
    path: '/admin/nxb/quanly', 
    name: 'quanlynxb', 
    component: quanlynxb,
  },
  {
    path: '/admin/nxb/sua/:id', 
    name: 'suanxb', 
    component:suanxb ,
    props: true
  },
  {
    path: '/admin/nxb/them', 
    name: 'themnxb', 
    component: themnxb,
  },
  {
    path: "/admin/user/quanly",
    name: "quanlyuser",
    component: Quanlyuser,
  },
  


];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
