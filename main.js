import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Earth
const earthTexture = new THREE.TextureLoader().load('./earth.jpg');
const earth_normalTexture = new THREE.TextureLoader().load('./earth.jpg');

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshStandardMaterial({
  map: earthTexture,
  normalMap: earth_normalTexture,
  side: THREE.DoubleSide,
});
const earth = new THREE.Mesh(geometry, material);

scene.add(earth);
earth.rotation.x += .2;
earth.rotation.z += -.1;

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars
const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
const starTexture = new THREE.TextureLoader().load('./galaxy_starfield.png');
const starMaterial = new THREE.MeshPhongMaterial({
  map: starTexture,
  side: THREE.DoubleSide,
  shininess: 0
});
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);
starField.position.setZ(100);


// Avatar
const now9Texture = new THREE.TextureLoader().load('./now9.jpg');
const now9 = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: now9Texture }));

scene.add(now9);


// Moon
const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-20);

now9.position.z = -5;
now9.position.x = 2;


// Camera
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.025;
  moon.rotation.z += 0.005;

  now9.rotation.y += 0.01;
  now9.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0009;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Loop
function animate() {
  requestAnimationFrame(animate);
  
  earth.rotation.y += 0.01;
  
  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();
