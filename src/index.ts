import { BoxGeometry, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import JellyHead from "./JellyHead";

const startTime = Date.now();
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// To create a cube, we need a BoxGeometry. This is an object that contains all the points (vertices) and fill (faces) of the cube. We'll explore this more in the future.
const geometry = new BoxGeometry(1, 1, 1);

// In addition to the geometry, we need a material to color it.
const material = new MeshBasicMaterial({ color: 0x00ff00 });

// A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
const cube = new Mesh(geometry, material);
scene.add(cube);

const head = new JellyHead(50, new LineBasicMaterial({ color: 0xff00ff }))
scene.add(head)

camera.position.z = 50;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function animate() {
  const time = (startTime - Date.now()) / 1000;
  head.update(time)

  // scene.rotation.x += 0.01;
  // scene.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate();

