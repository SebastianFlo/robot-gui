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
    const arm = this.generateArm();
    this.group.add(arm);
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
    const material = new THREE.MeshLambertMaterial({ color: 0xffbb00, wireframe: this.wireframe });

    const joint = new THREE.Mesh(jointGeo1, material);

    joint.position.set(x, y, z);
    return joint;
  }

  createTip(x, y, z) {
    const tipGeo = new THREE.SphereGeometry(0.5, 4, 4);
    const tipMaterial = new THREE.MeshBasicMaterial({ color: 0xffbb00 });
    const tip = new THREE.Mesh(tipGeo, tipMaterial);

    const tipGroup = new THREE.Group();
    tipGroup.add(tip);

    const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 3, 0x0000ff);
    arrowZ.line.material.linewidth = 4;
    tipGroup.add(arrowZ);
    const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 3, 0x00ff00);
    arrowY.line.material.linewidth = 4;
    tipGroup.add(arrowY);
    const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 3, 0xff0000);
    arrowX.line.material.linewidth = 4;
    tipGroup.add(arrowX);
    tipGroup.position.set(x, y, z);

    return tipGroup;
  }

  generateArm(jointPositions) {
    // for (let i = 0; i < jointPositions.length; i++) {
    //   // create link and joints based on positions
    // }
    const arm = new THREE.Group();

    const base = this.createJoint(0, 0, 1, 3, 2, 2, 0, 0, 0);
    const baseLink = this.createBox(0, 0, 3.5, 2.5, 1, 2);
    const shoulder = this.createJoint(0, 0, 5, 1, 4, 2, 0, 0, 0);
    const shoulderLink = this.createBox(0, 0, 7.5, 2, 0.5, 4);
    const elbow = this.createJoint(0, 0, 10, 1, 4, 2, 0, 0, 0);
    const elbowLink = this.createBox(0, 2.5, 10, 2, 0.5, 4);
    const wrist = this.createJoint(-1.5, 3, 10, 0.5, 4, 2, 0, 0, 0);
    const tip = this.createTip(0, 5, 10);

    base.rotation.x = (Math.PI / 2);
    shoulder.rotation.z = (Math.PI / 2);
    elbow.rotation.z = (Math.PI / 2);
    elbowLink.rotation.x = (Math.PI / 2);
    wrist.rotation.z = (Math.PI / 2);

    arm.add(base);
    arm.add(baseLink);
    arm.add(shoulder);
    arm.add(shoulderLink);
    arm.add(elbow);
    arm.add(elbowLink);
    arm.add(wrist);
    arm.add(tip);

    return arm;
  }
}

export default Robot;
