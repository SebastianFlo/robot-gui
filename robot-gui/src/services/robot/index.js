// import Robot from './Robot';
// import gui from './UiDat';
// import storeManager from './State';
// import polyfill from './values.polyfill';
import { /* scene, renderer, camera, */ initScene } from './THREEScene';

// const logger = store => dispatch => (action, data) => {
//   console.group(`ACTION ${action}`);

//   console.log(`action: %c${action}`, 'color:green');
//   console.log('data: ', data);
//   console.log('%cstore before: ', 'color:orange', store.getState());

//   const newState = dispatch(action, data);
//   console.log('%cnew state: ', 'color:green', newState);
//   console.groupEnd();
//   return newState;
// };

// const mid = store => dispatch => (action, data) => {
//   const oldState = store.getState();
//   const oldStateCopy = JSON.parse(JSON.stringify(oldState));

//   const newState = dispatch(action, data);

//   function compare(o, n, os) {
//     for (const i of Object.keys(o).concat(Object.keys(n))) {
//       if (typeof n[i] === 'undefined') {
//         if (os === n) {
//           console.warn('nooohohoohoh did not change state, bro!');
//           console.warn('element was removed, but parent not changed');
//         }
//       } else if (typeof o[i] === 'undefined') {
//         if (os === n) {
//           console.warn('nooohohoohoh did not change state, bro!');
//           console.warn('element was added, but parent not changed');
//         }
//       } else if (!!o[i] && typeof o[i] === 'object') {
//         // console.log('aaaa')
//         //
//         compare(o[i], n[i], os[i]);
//       } else {
//         // TODO: Refactor this
//         if (typeof n[i] === 'undefined' || o[i] !== n[i]) {
//           // el deleted, or value not same
//           // value has changed todo iter over newState (missing ones were deleted, dont matter. new ones dont matter either hm....)

//           // new state cant be old state, if a child changed
//           if (os === n) {
//             console.warn('nooohohoohoh did not change state, bro!');
//             console.group(`state ${action}`);
//             console.log(`oldStateCopy: ${o[i]}`);
//             console.log(`oldState: %c${os[i]}`, 'color: red');
//             console.log(`newState: ${n[i]}`);
//             console.groupEnd();
//           }
//         }
//         // console.log(i, o[i] === n[i])
//       }
//     }
//   }
//   compare(oldStateCopy, newState, oldState);

//   return newState;
// };

// storeManager.applyMiddleware(logger, mid);
// /* POLYFILL */

// // TODO: Use external polyfill here
// polyfill();
// /* END POLYFILL */

class Hmi {
  constructor() {
    initScene();

//     /* THREEJS SCENE SETUP */
//     this.scene = scene;
//     this.renderer = renderer;
//     this.camera = camera;

//     /* END THREEJS SCENE SETUP */

//     /* DAT GUI */
//     const hmiGui = gui.addFolder('HMI');
//     gui.remember(this.state);

//     const fun = {
//       resetTargetAngles: () => {
//         Robot.dispatch('ROBOT_CHANGE_ANGLES', {
//           A0: 0,
//           A1: 0,
//           A2: 0,
//           A3: 0,
//           A4: 0,
//           A5: 0,
//         });
//       },
//     };

//     hmiGui.add(fun, 'resetTargetAngles').onChange(() => {});
  }
}

export default Hmi;
