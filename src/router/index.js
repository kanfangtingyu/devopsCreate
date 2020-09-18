import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
// import UserLayout from '@/components/UserLayout';
import MqAppleView from '@/views/resources/mq/MqAppleView.vue';
import MqAddView from '@/views/resources/mq/MqAddView.vue';
import RedisAppleView from '@/views/resources/redis/RedisAppleView.vue';
import RedisAddView from '@/views/resources/redis/RedisAddView.vue';
import menu from '@/components/menu/menu.vue';
import Login from '@/views/user/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/menu',
    name: 'menu',
    component: menu,
    children: [
      { path: '/mqAppleView', name: 'mqAppleView', component: MqAppleView },
      { path: '/mqAddView', name: 'mqAddView', component: MqAddView },
      { path: '/redisAppleView', name: 'redisAppleView', component: RedisAppleView },
      { path: '/redisAddView', name: 'redisAddView', component: RedisAddView },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
