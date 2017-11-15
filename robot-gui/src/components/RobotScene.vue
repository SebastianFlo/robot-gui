<template>
  <div>
    This will be the three.js scene
    <h1>{{ msg }}</h1>
    <div ref="container" id="container"></div>
  </div>
</template>

<script>
  import InitRobot from '../services/robot/index.js';

  export default {
    name: 'RobotScene',
    data() {
      return {
        msg: 'Welcome to the robot scene',
      };
    },
    mounted() {
      // const initRobot = new InitRobot();
    },
    methods: {

    },
  };
</script>

<style>
</style>
