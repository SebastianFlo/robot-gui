import {
  Mesh,
  Group,
  Vector3,
  Object3D,
  ArrowHelper,
  CubeGeometry,
  CylinderGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
} from 'three';

const THREERobot = function THREERobot(vInitial, limits, scene) {
  this.Group = new Group();

  this.robotBones = [];
  this.joints = [];

  const scope = this;

  let parentObject = this.Group;

  const colors = [0xaaaaaa, 0xbbbbbb, 0xbcbcbc, 0xcbcbcb, 0xcccccc, 0x0];

  function createCube(x, y, z, w, h, d, min, max, jointNumber) {
    const thicken = 1;

    const wThickened = Math.abs(w) + thicken;
    const hThickened = Math.abs(h) + thicken;
    const dThickened = Math.abs(d) + thicken;

    const material = new MeshLambertMaterial({ color: colors[jointNumber] });
    const geometry = new CubeGeometry(
      wThickened,
      hThickened,
      dThickened,
    );
    const mesh = new Mesh(geometry, material);

    mesh.position.set(w / 2, h / 2, d / 2);
    const group = new Object3D();
    group.position.set(x, y, z);
    group.add(mesh);

    console.log(min, max);

    const jointGeo1 = new CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, -min, (2 * Math.PI) - (max + min));
    const jointGeoMax = new CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, -max, max);
    const jointGeoMin = new CylinderGeometry(0.8, 0.8, 0.8 * 2, 32, 32, false, 0, -min);
    const jointMesh1 = new Mesh(jointGeo1, new MeshBasicMaterial({ color: 0xffbb00 }));
    const jointMeshMax = new Mesh(jointGeoMax, new MeshBasicMaterial({ color: 0x009900 }));
    const jointMeshMin = new Mesh(jointGeoMin, new MeshBasicMaterial({ color: 0xdd2200 }));

    const joint = new Group();
    joint.add(jointMeshMax, jointMeshMin, jointMesh1);

    scope.joints.push(joint);

    switch (jointNumber) {
      case 0:
        joint.rotation.x = Math.PI / 2;
        break;
      case 1:
        // joint.rotation.x = Math.PI / 2
        break;
      case 2:
        // joint.rotation.x = Math.PI / 2
        break;
      case 4:
        // joint.rotation.x = Math.PI / 2
        // joint.rotation.y = -Math.PI / 2
        break;
      case 3:
        joint.rotation.z = Math.PI / 2;
        // joint.rotation.y = Math.PI
        break;
      case 5: {
        // if the last joint add helpers
        joint.rotation.x = Math.PI / 2;
        group.rotation.y = Math.PI;
        const arrowZ = new ArrowHelper( new Vector3(0, 0, 1), new Vector3(0, 0, 0), 3, 0x0000ff);
        arrowZ.line.material.linewidth = 4;
        group.add(arrowZ);
        const arrowY = new ArrowHelper( new Vector3(0, 1, 0), new Vector3(0, 0, 0), 3, 0x00ff00);
        arrowY.line.material.linewidth = 4;
        group.add(arrowY);
        const arrowX = new ArrowHelper( new Vector3(1, 0, 0), new Vector3(0, 0, 0), 3, 0xff0000);
        arrowX.line.material.linewidth = 4;
        group.add(arrowX);
        break;
      }
      default:
        break;
    }

    group.add(joint);
    return group;
  }

  let x = 0;
  let y = 0;
  let z = 0;

  vInitial.push([0, 0, 0]); // add a 6th pseudo link for 6 axis
  for (let i = 0; i < vInitial.length; i++) {
    const link = vInitial[i];
    // generate a link and the corresponding joint
    const linkGeo = createCube(
      x,
      y,
      z,
      link[0],
      link[1],
      link[2],
      limits[i][0],
      limits[i][1],
      i,
    );
    x = link[0];
    y = link[1];
    z = link[2];
    console.log(link[0], link[1], link[2]);
    parentObject.add(linkGeo);
    parentObject = linkGeo;
    this.robotBones.push(linkGeo);
  }

  scene.add(this.Group);

  this.angles = [0, 0, 0, 0, 0, 0];
};

THREERobot.prototype = {
  setAngles(angles) {
    this.angles = angles;
    this.robotBones[0].rotation.z = angles[0];
    this.robotBones[1].rotation.y = angles[1];
    this.robotBones[2].rotation.y = angles[2];
    this.robotBones[3].rotation.x = angles[3];
    this.robotBones[4].rotation.y = angles[4];
    this.robotBones[5].rotation.z = angles[5];
  },

  setAngle(index, angle) {
    this.angles[index] = angle;
    this.setAngles(this.angles);
  },

  highlightJoint(jointIndex, hexColor) {
    if (jointIndex >= this.joints.length) {
      console.warn(
        `cannot highlight joint: ${jointIndex} (out of index: ${this
          .joints.length})`,
      );
    }
    if (hexColor) {
      this._colorObjectAndChildren(this.joints[jointIndex], hexColor);
    } else {
      this._resetObjectAndChildrenColor(this.joints[jointIndex]);
    }
  },

  _colorObjectAndChildren(object, hexColor) {
    const scope = this;
    object.traverse((node) => {
      scope._colorObject(node, hexColor);
    });
  },

  _colorObject(object, hexColor) {
    if (object.material) {
      if (!object.initalMaterial) {
        object.initalMaterial = object.material;
      }
      object.material = object.material.clone();
      object.material.color.setHex(hexColor);
    }
  },

  _resetObjectAndChildrenColor(object, hexColor) {
    const scope = this;
    object.traverse((node) => {
      scope._resetObjectColor(node);
    });
  },

  _resetObjectColor(object) {
    if (object.initalMaterial) {
      object.material = object.initalMaterial;
    }
  },
};

export default THREERobot;
