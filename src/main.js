import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

// const directionLight = new THREE.DirectionalLight(0xffffff, 5);
// directionLight.castShadow = true;
// directionLight.position.set(3, 3, 5);
// directionLight.lookAt(0, 0, 0);

// scene.add(directionLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(0, 0.5, 0);
box.castShadow = true;
box.receiveShadow = true;
scene.add(box);

// const ambientLight = new THREE.AmbientLight(0xffffff, 5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// directionalLight.position.set(3, 3, 5);
// directionalLight.castShadow = true;
// directionalLight.lookAt(0, 0, 0);
// scene.add(directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

// * [Box Material Color: 0xffffff]
// const hemisphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
// hemisphereLight.position.set(0, 1, 0);
// hemisphereLight.lookAt(0, 0, 0);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 1);
// scene.add(hemisphereLightHelper);

// const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
// pointLight.position.set(1, 1, 1);
// scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

// const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
// rectAreaLight.position.set(0, 1, 2);
// rectAreaLight.lookAt(0, 0, 0);
// scene.add(rectAreaLight);

// const targetObj = new THREE.Object3D();
// scene.add(targetObj);

// const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
// spotLight.position.set(0, 3, 0);
// spotLight.castShadow = true;
// spotLight.target = targetObj;
// spotLight.target.position.set(1, 0, 2);
// scene.add(spotLight);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

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


