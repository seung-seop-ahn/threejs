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

const directionLight = new THREE.DirectionalLight(0xffffff, 5);
directionLight.castShadow = true;
directionLight.position.set(3, 3, 5);
directionLight.lookAt(0, 0, 0);

scene.add(directionLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ffff, side: THREE.FrontSide });
const frontSide = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSide.position.y = 0.5
frontSide.position.z = 4;
frontSide.castShadow = true;
frontSide.receiveShadow = true;
scene.add(frontSide);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, side: THREE.BackSide });
const backSide = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSide.position.set(2, 0.5, 4);
backSide.position.y = 0.51;
backSide.receiveShadow = true;
scene.add(backSide);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const doubleSide = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSide.position.set(4, 0.5, 4);
doubleSide.receiveShadow = true;
scene.add(doubleSide);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;

const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnot.position.set(-4, 1, 0);
torusKnot.castShadow = true;
torusKnot.receiveShadow = true;
scene.add(torusKnot);

const torusKnotLamberMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
torusKnotLamberMaterial.emissive = new THREE.Color(0x0000ff);
torusKnotLamberMaterial.emissiveIntensity = 0.2;

const torusKnotLamber = new THREE.Mesh(torusKnotGeometry, torusKnotLamberMaterial);
torusKnotLamber.position.set(-2, 1, 0);
torusKnotLamber.castShadow = true;
torusKnotLamber.receiveShadow = true;
scene.add(torusKnotLamber);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff);
torusKnotPhongMaterial.shininess = 100;

const torusKnotPhong = new THREE.Mesh(torusKnotGeometry, torusKnotPhongMaterial);
torusKnotPhong.position.set(0, 1, 0);
torusKnotPhong.castShadow = true;
torusKnotPhong.receiveShadow = true;
scene.add(torusKnotPhong);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnotBasic = new THREE.Mesh(torusKnotGeometry, torusKnotBasicMaterial);
torusKnotBasic.position.set(2, 1, 0);
torusKnotBasic.castShadow = true;
torusKnotBasic.receiveShadow = true;
scene.add(torusKnotBasic);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff });
torusKnotDepthMaterial.opacity = 0.5;
torusKnotDepthMaterial.transparent = true;

const torusKnotDepth = new THREE.Mesh(torusKnotGeometry, torusKnotDepthMaterial);
torusKnotDepth.position.set(4, 1, 0);
torusKnotBasic.castShadow = true;
torusKnotBasic.receiveShadow = true;
scene.add(torusKnotDepth);

const textureLoader = new THREE.TextureLoader();

// * [Syncronous]
// textureLoader.load("/dgdg.png", (tx) => {
// const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
// const textureBoxMaterial = new THREE.MeshBasicMaterial({ map: tx });
//   const textureBox = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial);
//   textureBox.position.set(6, 1, 0);
//   scene.add(textureBox);
// });

// * [Asyncronous]
const texture = await textureLoader.loadAsync("/dgdg.png");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureBoxMaterial = new THREE.MeshBasicMaterial({ map: texture });
const textureBox = new THREE.Mesh(textureBoxGeometry, textureBoxMaterial);
textureBox.position.set(6, 1, 0);
scene.add(textureBox);

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
  textureBox.rotation.y += 0.01;
}

render();


