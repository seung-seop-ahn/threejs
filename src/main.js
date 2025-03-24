import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.shadowMap.type = THREE.BasicShadowMap; // low quality
// renderer.shadowMap.type = THREE.PCFShadowMap; // medium quality
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // high quality
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.castShadow = true;
directionLight.position.set(3, 4, 5);
directionLight.lookAt(0, 0, 0);
directionLight.shadow.mapSize.set(4096, 4096); // enhance shadow quality
directionLight.shadow.camera.top = 2;
directionLight.shadow.camera.bottom = -2;
directionLight.shadow.camera.left = -2;
directionLight.shadow.camera.right = 2;
directionLight.shadow.camera.near = 0.1;
directionLight.shadow.camera.far = 100;
const directionLightHelper = new THREE.DirectionalLightHelper(directionLight, 1);
scene.add(directionLight);
scene.add(directionLightHelper);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();


