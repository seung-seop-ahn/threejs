import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
camera.position.y = 1;

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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsule.position.set(3, 1.75, 0);
capsule.castShadow = true;
capsule.receiveShadow = true;
scene.add(capsule);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(-3, 1, 0);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0, 0.5, 1);
torus.castShadow = true;
torus.receiveShadow = true;
scene.add(torus);

const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.4, -0.1);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.5);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.4, -0.1);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);
starShape.lineTo(0, 1);

const starGeometry = new THREE.ShapeGeometry(starShape);
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const star = new THREE.Mesh(starGeometry, starMaterial);
star.position.set(0, 1, 2);
star.castShadow = true;
star.receiveShadow = true;
scene.add(star);

const extrudeSettings = {
  steps: 1,
  depth: 0.1,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.3,
  bevelSegments: 100,
  bevelOffset: 0,
}

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrude = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrude.position.set(2, 1.3, 2);
extrude.castShadow = true;
extrude.receiveShadow = true;
scene.add(extrude);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 1, -3);
sphere.castShadow = true;
sphere.receiveShadow = true;
scene.add(sphere);

const numPoints = 1000;
const positions = new Float32Array(numPoints * 3);

for(let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

const pointsGeometry = new THREE.BufferGeometry();
pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05 });
const points = new THREE.Points(pointsGeometry, pointsMaterial);
points.position.set(0, 0, -5);
scene.add(points);

const spherePoints = new THREE.Points(sphereGeometry, pointsMaterial);
spherePoints.position.set(0, 3, -5);
scene.add(spherePoints);

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


