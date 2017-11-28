<template>
  <div>
    This will be the a rebuilt robot
    <h1>{{ msg }}</h1>
    <div class="rebuilt" ref="rebuilt"></div>
  </div>
</template>

<script>
  import Scene from '../generators/Scene.js';
  import Robot from '../generators/Robot.js';

  export default {
    name: 'Rebuilt',
    data() {
      return {
        msg: 'Welcome to the three.js scene',
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        Scene: new Scene(),
        sceneOptions: {
          camera: {
            perspective: {
              fov: 35,
              near: 1,
              far: 10000,
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
          renderer: {
            antialias: true, // to get smoother output
            preserveDrawingBuffer: false, // no screenshot -> faster?
          },
          grid: {
            size: 10,
            step: 20,
          },
          axes: {
            size: 5,
          },
        },
        objects: {
          robot: new Robot(),
        },
      };
    },
    methods: {
      animate() {
        window.requestAnimationFrame(this.animate);
        this.Scene.render();
      },
    },
    mounted() {
      // Create Camera
      const { fov, near, far } = this.sceneOptions.camera.perspective;
      this.Scene.createPerspectiveCamera(fov, this.windowWidth / this.windowHeight, near, far);

      // Create Renderer
      this.Scene.createRenderer(this.sceneOptions.renderer);
      this.Scene.renderer.setSize(this.windowWidth, this.windowHeight);
      this.Scene.renderer.setClearColor(0x333333);

      // Create Lighting
      this.Scene.createAmbientLight(0xaaaaaa, 1);

      const directionalLight = this.Scene.createDirectionalLight(0xaaaaaa, 0.9);
      directionalLight.position.set(1, 1.3, 1).normalize();

      // Orbit Controls
      const controls = this.Scene.createControls();
      controls.addEventListener('change', () => this.Scene.renderer.render(this.Scene.scene, this.Scene.camera));

      // the grid
      const grid = this.Scene.createGrid(this.sceneOptions.size, this.sceneOptions.step);
      grid.rotation.x = Math.PI / 2;
      this.Scene.addToScene(grid);

      // the axis
      const axes = this.Scene.createAxes(this.sceneOptions.axes.size);
      this.Scene.addToScene(axes);

      // Add robot to scene
      this.Scene.addToScene(this.objects.robot.group);

      // Append to DOM element
      this.$refs.rebuilt.appendChild(this.Scene.renderer.domElement);

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
