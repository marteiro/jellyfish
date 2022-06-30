import { BoxGeometry, LineBasicMaterial, Mesh, MeshBasicMaterial, PerspectiveCamera, PointsMaterial, Scene, WebGLRenderer } from "three";
import JellyHead from "./JellyHead";

const startTime = Date.now();
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const head = new JellyHead(250, new LineBasicMaterial({ color: 0x9999ff }), new PointsMaterial({ color: 0xFFFFFF, size: 4, sizeAttenuation: false }))
head.rotateZ(.2);
head.translateY(3)
scene.add(head)

camera.position.z = 10;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


function animate() {
  const time = (startTime - Date.now()) / 1000;
  head.update(time)

  scene.rotation.y += 0.003;
  // scene.rotation.y += 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate();

