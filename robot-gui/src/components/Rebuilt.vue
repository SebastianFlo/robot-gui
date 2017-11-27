<template>
  <div>
    This will be the a rebuilt robot
    <h1>{{ msg }}</h1>
    <div class="rebuilt" ref="rebuilt"></div>
  </div>
</template>

<script>
  import * as THREE from 'three';
  import Robot from '../generators/Robot.js';

  const OrbitControls = require('three-orbit-controls')(THREE);


  export default {
    name: 'Rebuilt',
    data() {
      return {
        msg: 'Welcome to the three.js scene',
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        scene: undefined,
        camera: undefined,
        cameraOptions: {
          perspective: {
            fov: 35,
            near: 1,
            far: 10000
          },
          ortographic: {
            left: this.windowWidth / -2,
            right: this.windowWidth / 2,
            top: this.windowHeight / 2,
            bottom: this.windowHeight / -2,
            near: -500,
            far: 1000,
            zoom: 20,
          },
        },
        perspective: true,
        renderer: undefined,
        rendererOptions: {
          antialias: true, // to get smoother output
          preserveDrawingBuffer: false, // no screenshot -> faster?
        },
        lights: {
          ambient: undefined,
          directional: undefined,
        },
        controls: undefined,
        objects: {
          // cube: undefined,
          robot: new Robot(),
        },
        gridHelper: undefined,
        grid: {
          size: 10,
          step: 20,
        },
        axesHelper: undefined,
        axes: {
          size: 5,
        },
      };
    },
    methods: {
      animate() {
        window.requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
      },
      addToScene(object) {
        this.scene.add(object);
      },
      createCamera(perspective) {
        let camera;
        if (perspective) {
          const { fov, near, far } = this.cameraOptions.perspective;
          camera = new THREE.PerspectiveCamera(fov, this.windowWidth / this.windowHeight, near, far);
        } else {
          const { left, right, top, bottom, near, far, zoom } = this.cameraOptions.ortographic;
          camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
          camera.zoom = zoom;
          camera.updateProjectionMatrix();
        }

        camera.up.set(0, 0, 1);
        camera.position.set(25, 25, 25);

        return camera;
      },
    },
    mounted() {
      this.scene = new THREE.Scene();

      this.camera = this.createCamera(this.perspective);
      this.addToScene(this.camera);

      this.renderer = new THREE.WebGLRenderer(this.rendererOptions);
      this.renderer.setSize(this.windowWidth, this.windowHeight);
      this.renderer.setClearColor(0x333333);

      // lighting
      this.lights.ambient = new THREE.AmbientLight(0xaaaaaa);
      this.addToScene(this.lights.ambient);

      this.lights.directional = new THREE.DirectionalLight(0xaaaaaa);
      this.lights.directional.position.set(1, 1.3, 1).normalize();
      this.addToScene(this.lights.directional);

      // Append to DOM element
      this.$refs.rebuilt.appendChild(this.renderer.domElement);

      // Orbit Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.addEventListener('change', () => this.renderer.render(this.scene, this.camera));

      // the grid
      this.gridHelper = new THREE.GridHelper(this.grid.size, this.grid.step);
      this.gridHelper.rotation.x = Math.PI / 2;
      this.addToScene(this.gridHelper);

      // the axis
      this.axesHelper = new THREE.AxesHelper(this.axes.size);
      this.addToScene(this.axesHelper);

      // all the points and faces of the cube
      // const geometry = new THREE.BoxGeometry(1, 1, 1);
      // geometry needs a material, here it's the color green
      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
      // combine geometry and material in a mesh
      // this.objects.cube = new THREE.Mesh(geometry, material);

      // add cube to scene
      // this.addToScene(this.objects.cube);

      // Add robot to scene
      this.addToScene(this.objects.robot.group);

      // start it all
      this.animate();
    },
  };
</script>

<style>
  .rebuilt {
    width: 100%;
    height: 100%
  }
</style>
