import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

class Scene {
  scene
  camera
  renderer
  constructor() {
    this.scene = new THREE.Scene();
  }
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  createRenderer(options) {
    this.renderer = new THREE.WebGLRenderer(options);
    return this.renderer;
  }
  createPerspectiveCamera(options) {
    this.camera = new THREE.PerspectiveCamera(options);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(25, 25, 25);
    this.addToScene(this.camera);
    return this.camera;
  }
  createOrthographicCamera(options, zoom) {
    this.camera = new THREE.OrthographicCamera(options);
    this.camera.zoom = zoom;
    this.camera.updateProjectionMatrix();
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(25, 25, 25);
    this.addToScene(this.camera);
  }
  createAmbientLight(color, intensity = 1) {
    const ambientLight = new THREE.AmbientLight(color);
    this.addToScene(ambientLight);
    return ambientLight;
  }
  createDirectionalLight(color, intensity = 1) {
    const directionalLight = new THREE.DirectionalLight(color);
    directionalLight.intensity = intensity;
    this.addToScene(directionalLight);
    return directionalLight;
  }
  createControls() {
    if (!this.camera || !this.renderer || !this.renderer.domElement) {
      throw new Error('No camera or renderer defined');
    }
    return new OrbitControls(this.camera, this.renderer.domElement);
  }
  createGrid(size, step) {
    return new THREE.GridHelper(size, step);
  }
  createAxes(size) {
    return new THREE.AxesHelper(size);
  }
  addToScene(object) {
    this.scene.add(object);
  }
}

export default Scene;
