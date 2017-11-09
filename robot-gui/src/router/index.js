import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import RobotScene from '@/components/RobotScene';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
  ],
});
