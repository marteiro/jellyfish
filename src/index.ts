import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube. We'll explore this more in the future.
const geometry = new THREE.BoxGeometry(1, 1, 1);

// In addition to the geometry, we need a material to color it.
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  animate();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
