import Vue from 'vue';
import Router from 'vue-router';
import RobotScene from '@/components/RobotScene';
import BasicThree from '@/components/BasicThree';
import Rebuilt from '@/components/Rebuilt';

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
    {
      path: '/rebuilt',
      name: 'Rebuilt',
      component: Rebuilt,
    },
    // {
    //   path: '/settings',
    //   name: 'Settings',
    //   component: RobotScene,
    // },
  ],
});
