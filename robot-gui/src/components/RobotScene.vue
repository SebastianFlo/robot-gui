<template>
  <div>
    This will be the three.js scene
    <h1>{{ msg }}</h1>
    <div id="container"></div>
  </div>
</template>

<script>
  import InitRobot from '../services/robot/index.js';
  import InitDeps from '../services/dependencies.js';


  export default {
    name: 'RobotScene',
    data() {
      return {
        msg: 'Welcome to the robot scene',
      };
    },
    mounted() {
      const initRobot = new InitRobot();
      const initDeps = new InitDeps();
    },
    methods: {

    },
  };
</script>

<style>
</style>
