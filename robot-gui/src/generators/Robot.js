import * as THREE from 'three';

class Robot {
  group = new THREE.Group();
  robotBones = [];
  joints = [];
  colors = [0xaaaaaa, 0xbbbbbb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];

  constructor() {
    this.thickness = 1;

    // test only
    const cube = this.createCube(0, 0, 0, 10, 10, 10, 0, 0, 0);
    this.group.add(cube);
  }

  createCube(x, y, z, w, h, d, min, max, jointNumber) {
    const wThickened = Math.abs(w) + this.thickness;
    const hThickened = Math.abs(h) + this.thickness;
    const dThickened = Math.abs(d) + this.thickness;

    const material = new THREE.MeshLambertMaterial({ color: this.colors[jointNumber] });
    const geometry = new THREE.CubeGeometry(
      wThickened,
      hThickened,
      dThickened,
    );
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);

    const cube = new THREE.Object3D();
    cube.position.set(x, y, z);
    cube.add(mesh);

    return cube;
  }
}

export default Robot;
