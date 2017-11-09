<template>
  <div>
    This will be the three.js scene
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {
  Mesh,
  Group,
  Vector3,
  Object3D,
  ArrowHelper,
  CylinderGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial
} from 'three';

export default {
  name: 'RobotScene',
  data() {
    return {
      msg: 'Welcome to the robot scene',
      colors: [
        0xaaaaaa,
        0xbbbbbb,
        0xbcbcbc,
        0xcbcbcb,
        0xcccccc,
        0x0
      ],
      joints: [],
      robotBones: [],
      Group: new Group()
    };
  },
  mounted () {
  },
  methods: {
    createCube({
      x,
      y,
      z,
      w,
      h,
      d,
      min,
      max,
      jointCount
    }) {
      const thicken = 1;
      const wThickened = Math.abs(w) + thicken;
      const hThickened = Math.abs(h) + thicken;
      const dThickened = Math.abs(d) + thicken;

      const material = new MeshLambertMaterial({
        color: colors[jointCount]
      });

      const geometry = new CubeGeometry(wThickened, hThickened, dThickened);
      const mesh = new Mesh(geometry, material);

      mesh.position.set(w / 2, h / 2, d / 2);

      const group = new Object3D();
      group.position.set(x, y, z);
      group.add(mesh);

      console.log(`
        min: ${min}::max: ${max}
      `)

      // TODO: Why these values?
      const cilinderSizes = [0.8, 0.8, 0.8 * 2, 32, 32, false];
      const jointGeo1 = new CylinderGeometry(...cilinderSizes, -min, 2 * Math.PI - max + min);
      const jointGeoMax = new CylinderGeometry(...cilinderSizes, -max, max);
      const jointGeoMin = new CylinderGeometry(...cilinderSizes, 0, -min);
      const jointMesh1 = new Mesh(jointGeo1, new MeshBasicMaterial({ color: 0xffbb00 }));
      const jointMeshMax = new THREE.Mesh(jointGeoMax, new THREE.MeshBasicMaterial({ color: 0x009900 }));
      const jointMeshMin = new THREE.Mesh(jointGeoMin, new THREE.MeshBasicMaterial({ color: 0xdd2200 }));

      const joint = new Group();
      joint.add(jointMeshMax, jointMeshMin, jointMesh1);

      this.joints.push(joint);

      switch (jointNumber) {

        case 0:
          joint.rotation.x = Math.PI / 2;
          break;

        case 3:
          joint.rotation.z = Math.PI / 2;
          break;

        case 5:
          joint.rotation.x = Math.PI / 2;
          group.rotation.y = Math.PI;

          const arrowZ = new ArrowHelper(new Vector3(0, 0, 1), new Vector3(0, 0, 0), 3, 0x0000ff);
          arrowZ.line.material.linewidth = 4;
          group.add(arrowZ);

          const arrowY = new ArrowHelper(new Vector3(0, 1, 0), new Vector3(0, 0, 0), 3, 0x00ff00);
          arrowY.line.material.linewidth = 4;
          group.add(arrowY);

          const arrowX = new ArrowHelper(new Vector3(1, 0, 0), new Vector3(0, 0, 0), 3, 0xff0000);
          arrowX.line.material.linewidth = 4;
          group.add(arrowX);
          break;

        default:
          break;
      };

      group.add(joint);
      return group;
    }
  }
};
</script>

<style>
</style>
