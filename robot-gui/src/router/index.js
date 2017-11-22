import Vue from 'vue';
import Router from 'vue-router';
import RobotScene from '@/components/RobotScene';
import BasicThree from '@/components/BasicThree';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RobotScene',
      component: RobotScene,
    },
    {
      path: '/basic',
      name: 'BasicThree',
      component: BasicThree,
    },
    // {
    //   path: '/settings',
    //   name: 'Settings',
    //   component: RobotScene,
    // },
  ],
});
