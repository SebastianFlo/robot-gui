<template>
  <div>
    This will be the a basic three.js test
    <h1>{{ msg }}</h1>
    <div class="scene" ref="scene"></div>
  </div>
</template>

<script>
  import * as THREE from 'three';

  const OrbitControls = require('three-orbit-controls')(THREE);

  export default {
    name: 'BasicThree',
    data() {
      return {
        msg: 'Welcome to the three.js scene',
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        scene: undefined,
        camera: undefined,
        renderer: undefined,
        controls: undefined,
        objects: {
          cube: undefined,
        },
      };
    },
    methods: {
      animate() {
        window.requestAnimationFrame(this.animate);
        this.objects.cube.rotation.y += 0.01;
        this.renderer.render(this.scene, this.camera);
      },
      addToScene(object) {
        this.scene.add(object);
      },
      moveCamera(axis, value) {
        this.camera.position[axis] = value;
        this.controls.update();
      },
    },
    mounted() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, this.windowWidth / this.windowHeight, 0.1, 1000);
      this.renderer = new THREE.WebGLRenderer();
      this.controls = new OrbitControls(this.camera);

      this.renderer.setSize(this.windowWidth, this.windowHeight);
      this.$refs.scene.appendChild(this.renderer.domElement);

      // all the points and faces of the cube
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // geometry needs a material, here it's the color green
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      // combine geometry and material in a mesh
      this.objects.cube = new THREE.Mesh(geometry, material);

      // add cube to scene
      this.addToScene(this.objects.cube);
      // move the camera a bit
      this.moveCamera('z', 5);

      // start it all
      this.animate();
    },
  };
</script>

<style>
  .scene {
    width: 100%;
    height: 100%
  }
</style>
