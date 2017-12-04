import * as THREE from 'three';

class Robot {
  group = new THREE.Group();
  robotBones = [];
  joints = [];
  colors = [0xaaaaaa, 0xbbbbbb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];
  wireframe = false;

  constructor() {
    this.thickness = 1;

    // test only
    const cube = this.createBox(0, 0, 5, 1.5, 0.3, 5);
    const base = this.createJoint(0, 0, 1, 2, 2, 2, 0, 0, 0);
    const shoulder = this.createJoint(0, 0, 8, 1, 4, 2, 0, 0, 0);
    base.rotation.x = (Math.PI / 2);
    shoulder.rotation.z = (Math.PI / 2);

    this.group.add(cube);
    this.group.add(base);
    this.group.add(shoulder);
  }

  createBox(x = 0, y = 0, z = 0, w = 1, h = 1, d = 1) {
    const wThickened = Math.abs(w) + this.thickness;
    const hThickened = Math.abs(h) + this.thickness;
    const dThickened = Math.abs(d) + this.thickness;

    const material = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, wireframe: this.wireframe });
    const geometry = new THREE.CubeGeometry(
      wThickened,
      hThickened,
      dThickened,
    );
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);

    return cube;
    // const arm = new THREE.Object3D();
    // arm.position.set(x, y, z);
    // arm.add(mesh);

    // return arm;
  }

  createJoint(x, y, z, radius, h, d, min, max) {
    const jointGeo1 = new THREE.CylinderGeometry(radius, radius, h, 24, 2, false, -min, (2 * Math.PI) - (max + min));
    const joint = new THREE.Mesh(jointGeo1, new THREE.MeshBasicMaterial({ color: 0xffbb00, wireframe: this.wireframe }));

    joint.position.set(x, y, z);
    return joint;
  }
}

export default Robot;
