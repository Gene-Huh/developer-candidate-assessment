import Vue from 'vue';
import VueRouter from 'vue-router';
import Exercises from '@/views/Exercises';
import Exercise from '@/views/Exercise';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Exercises' },
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: Exercises,
  },
  {
    path: '/exercise/:id',
    name: 'Exercise',
    component: Exercise,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
