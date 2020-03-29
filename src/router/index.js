import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '@/views/Register.vue';
import Notifications from '@/views/Notifications.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications
  }
];

const router = new VueRouter({
  routes
});

export default router;
