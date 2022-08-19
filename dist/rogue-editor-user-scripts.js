"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rogue-editor-user-scripts"] = factory();
	else
		root["rogue-editor-user-scripts"] = factory();
})(self, function() {
return (self["webpackChunk_name_"] = self["webpackChunk_name_"] || []).push([["rogue-editor-user-scripts"],{

/***/ "./Assets/rogue_packages/rogue-cannon/Components/_Editor/CannonBodyWireframe.ts":
/*!**************************************************************************************!*\
  !*** ./Assets/rogue_packages/rogue-cannon/Components/_Editor/CannonBodyWireframe.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CannonBodyWireframe)
/* harmony export */ });
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rogue-engine */ "rogue-engine");
/* harmony import */ var rogue_engine__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rogue_engine__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Shapes_CannonBox_re__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Shapes/CannonBox.re */ "./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonBox.re.ts");
/* harmony import */ var _Shapes_CannonSphere_re__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shapes/CannonSphere.re */ "./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonSphere.re.ts");
/* harmony import */ var _Shapes_CannonShape__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Shapes/CannonShape */ "./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonShape.ts");
/* harmony import */ var _Shapes_CannonCylinder_re__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Shapes/CannonCylinder.re */ "./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonCylinder.re.ts");
/* harmony import */ var _Shapes_CannonTrimesh_re__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Shapes/CannonTrimesh.re */ "./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonTrimesh.re.ts");
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });







class CannonBodyWireframe extends rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor() {
    super(...arguments);
    this.selectedObjects = [];
    this.colliders = [];
    this.wireframeMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ wireframe: true, emissive: new three__WEBPACK_IMPORTED_MODULE_1__.Color("#00FF00"), color: new three__WEBPACK_IMPORTED_MODULE_1__.Color("#000000") });
    this.handleOnComponentAdded = { stop: () => {
    } };
    this.handleOnComponentRemoved = { stop: () => {
    } };
    this.handleOnPlay = { stop: () => {
    } };
    this.resetHandler = /* @__PURE__ */ __name((component) => {
      component instanceof _Shapes_CannonShape__WEBPACK_IMPORTED_MODULE_4__["default"] && this.setupImpostors();
    }, "resetHandler");
  }
  start() {
    this.handleOnComponentAdded.stop();
    this.handleOnComponentRemoved.stop();
    this.handleOnPlay.stop();
    this.handleOnComponentAdded = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.onComponentAdded(this.resetHandler);
    this.handleOnComponentRemoved = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.onComponentRemoved(this.resetHandler);
    this.handleOnPlay = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.Runtime.onPlay(() => {
      this.handleOnComponentAdded.stop();
      this.handleOnComponentRemoved.stop();
      this.cleanupImpostors();
    });
  }
  afterUpdate() {
    const selectedObjects = window["rogue-editor"].Project.selectedObjects;
    if (!this.arraysAreEqual(selectedObjects, this.selectedObjects)) {
      this.selectedObjects = selectedObjects.slice(0);
      this.setupImpostors();
    }
    if (this.selectedObjects.length === 0)
      return;
    this.updateImpostors();
  }
  updateImpostors() {
    this.colliders.forEach((impostor) => {
      this.updateColliderMesh(impostor.userData.cannonShape, impostor);
    });
  }
  cleanupImpostors() {
    this.colliders.forEach((impostor) => {
      impostor.userData.cannonShape = null;
      rogue_engine__WEBPACK_IMPORTED_MODULE_0__.App.currentScene.remove(impostor);
      rogue_engine__WEBPACK_IMPORTED_MODULE_0__.dispose(impostor);
    });
    this.colliders = [];
  }
  setupImpostors() {
    this.cleanupImpostors();
    this.selectedObjects.forEach((selected) => {
      selected.traverse((object) => {
        const objComponents = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.components[object.uuid];
        if (!objComponents)
          return;
        objComponents.forEach((component) => {
          if (!(component instanceof _Shapes_CannonShape__WEBPACK_IMPORTED_MODULE_4__["default"]))
            return;
          let impostor = rogue_engine__WEBPACK_IMPORTED_MODULE_0__.App.currentScene.getObjectByName("EDITOR_OBJECT_BB_" + object.uuid);
          if (impostor)
            return;
          impostor = this.getColliderMesh(component);
          if (impostor) {
            impostor.name = "EDITOR_OBJECT_BB_" + object.uuid;
            impostor.userData.isEditorObject = true;
            rogue_engine__WEBPACK_IMPORTED_MODULE_0__.App.currentScene.add(impostor);
          } else {
            return;
          }
          impostor.userData.cannonShape = component;
          this.colliders.push(impostor);
        });
      });
    });
  }
  arraysAreEqual(array1, array2) {
    if (array1.length !== array2.length)
      return false;
    return array1.every((element, i) => {
      return array2[i] === element;
    });
  }
  getColliderMesh(component) {
    if (component instanceof _Shapes_CannonBox_re__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      return new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxBufferGeometry(), this.wireframeMaterial);
    }
    if (component instanceof _Shapes_CannonCylinder_re__WEBPACK_IMPORTED_MODULE_5__["default"]) {
      const radiusTop = component.radiusTopOffset;
      const radiusBottom = component.radiusBottomOffset;
      const height = component.heightOffset;
      const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.CylinderBufferGeometry(radiusTop, radiusBottom, height, component.segments), this.wireframeMaterial);
      return mesh;
    }
    if (component instanceof _Shapes_CannonSphere_re__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      const scale = component.object3d.scale;
      const maxSide = Math.max(scale.x, scale.y, scale.z);
      const radius = component.radiusOffset * maxSide;
      const compensatedRadius = radius + radius * 0.01;
      const segments = 15;
      return new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.SphereBufferGeometry(compensatedRadius, segments, segments), this.wireframeMaterial);
    }
    if (component instanceof _Shapes_CannonTrimesh_re__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      if (!component.shape)
        component.createShape();
      if (component.shape) {
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        const mesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, this.wireframeMaterial);
        const points = [];
        for (let i = 0; i < component.shape.vertices.length; i += 3) {
          const point = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(component.shape.vertices[i], component.shape.vertices[i + 1], component.shape.vertices[i + 2]);
          points.push(point);
        }
        geometry.setFromPoints(points);
        return mesh;
      }
    }
    return;
  }
  updateColliderMesh(component, mesh) {
    if (component instanceof _Shapes_CannonBox_re__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      component.object3d.getWorldScale(mesh.scale);
      mesh.scale.set(component.sizeOffset.x * mesh.scale.x, component.sizeOffset.y * mesh.scale.y, component.sizeOffset.z * mesh.scale.z);
    }
    if (component instanceof _Shapes_CannonCylinder_re__WEBPACK_IMPORTED_MODULE_5__["default"]) {
      const radiusTop = component.radiusTopOffset;
      const radiusBottom = component.radiusBottomOffset;
      const height = component.heightOffset;
      if (mesh.geometry instanceof three__WEBPACK_IMPORTED_MODULE_1__.CylinderBufferGeometry) {
        if (mesh.geometry.parameters.radiusTop !== radiusTop || mesh.geometry.parameters.radiusBottom !== radiusBottom || mesh.geometry.parameters.height !== height || mesh.geometry.parameters.radialSegments !== component.segments) {
          mesh.geometry.dispose();
          mesh.geometry = new three__WEBPACK_IMPORTED_MODULE_1__.CylinderBufferGeometry(radiusTop, radiusBottom, height, component.segments);
        }
      }
      component.object3d.getWorldScale(mesh.scale);
    }
    if (component instanceof _Shapes_CannonSphere_re__WEBPACK_IMPORTED_MODULE_3__["default"]) {
      const scale = component.object3d.scale;
      const maxSide = Math.max(scale.x, scale.y, scale.z);
      const radius = component.radiusOffset * maxSide;
      if (mesh.geometry instanceof three__WEBPACK_IMPORTED_MODULE_1__.SphereBufferGeometry) {
        if (mesh.geometry.parameters.radius !== radius) {
          let segments = 10 * radius;
          if (segments < 15)
            segments = 15;
          if (segments > 50)
            segments = 50;
          mesh.geometry.dispose();
          mesh.geometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereBufferGeometry(radius, segments, segments);
        }
      }
    }
    component.object3d.getWorldPosition(mesh.position);
    component.object3d.getWorldQuaternion(mesh.quaternion);
  }
  onBeforeRemoved() {
    this.handleOnComponentAdded.stop();
    this.handleOnComponentRemoved.stop();
    this.handleOnPlay.stop();
    this.cleanupImpostors();
  }
}
__name(CannonBodyWireframe, "CannonBodyWireframe");
CannonBodyWireframe.isEditorComponent = true;
rogue_engine__WEBPACK_IMPORTED_MODULE_0__.registerComponent(CannonBodyWireframe);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/_Editor/CannonBodyWireframe.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/CannonBody.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/CannonConfig.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Constraints/CannonConstraint.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Constraints/CannonDistanceConstraint.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Constraints/CannonHingeConstraint.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Constraints/CannonLockConstraint.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Constraints/CannonPointToPointConstraint.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Controllers/CannonSimpleCharacterController.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Controllers/CannonVehicleController.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Material/CannonContactMaterial.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Material/CannonMaterial.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Material/SetCannonMaterial.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Objects/CannonRaycastVehicle.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Objects/CannonSpring.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Objects/CannonWheel.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonBox.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonCylinder.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonShape.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonSphere.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Components/Shapes/CannonTrimesh.re.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/index.ts"), __webpack_exec__("./Assets/rogue_packages/rogue-cannon/Lib/RogueCannon.ts"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=rogue-editor-user-scripts.js.map