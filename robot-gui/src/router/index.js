import Vue from 'vue';
import Router from 'vue-router';
import RobotScene from '@/components/RobotScene';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RobotScene',
      component: RobotScene,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: RobotScene,
    },
  ],
});
