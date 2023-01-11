
import * as THREE from 'three';
import { AxesHelper, GridHelper, Vector3 } from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Renderer Creation
const renderer = new THREE.WebGLRenderer();
//Seting Size of renderer 
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Camera Creation --> PerspectiveCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .1, 1000);

const orbit = new OrbitControls(camera, renderer.domElement);

//Axis Helper Creation to see three axis
const axisHelper = new AxesHelper(3);
const gui = new dat.GUI();

const sphereOptions = {
    sphereColor: "#ffffff",
    wireFrame: true,
    speed: 0,
};
const planeOptions = {
    rotationx: 0.0,
    rotationy: 0.0,
    rotationz: 0.0,
}
//setting camera position
camera.position.set(0, 5, 30);

//updating orbit control at every scene
orbit.update();

//Creatig a Scene
const scene = new THREE.Scene();

//Creating a Box
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const boxMesh = new THREE.BoxGeometry(4, 4, 4);
const boxObject = new THREE.Mesh(boxMesh, boxMaterial);
boxObject.position.set(-4, 0, 0);

//Creating a Sphere
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const sphereMesh = new THREE.SphereGeometry(4);
const sphereObject = new THREE.Mesh(sphereMesh, sphereMaterial);
sphereObject.position.set(4, 0, 0);

//Creating a Plane
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const planeMesh = new THREE.PlaneGeometry(30, 30);
const planeObject = new THREE.Mesh(planeMesh, planeMaterial);
planeObject.rotation.x = 0.5 * Math.PI;
planeObject.position.set(0, 0, 0);



//Adding Gui
gui.addColor(sphereOptions, "sphereColor").onChange(function (e) {
    sphereObject.material.color.set(e);
});
gui.add(sphereOptions, "wireFrame").onChange(function (e) {
    sphereObject.material.wireframe = e;
});

gui.add(planeOptions, "rotationx", -1, 1).onChange(function (e) {
    planeObject.rotation.x = e * Math.PI;
});

gui.add(planeOptions, "rotationy", -1, 1).onChange(function (e) {
    planeObject.rotation.y = e * Math.PI;
});

gui.add(planeOptions, "rotationz", -1, 1).onChange(function (e) {
    planeObject.rotation.z = e * Math.PI;
});

gui.add(sphereOptions, "speed", 0, 0.1);

//Created a Ambient Light
const ambientLight = new THREE.AmbientLight(0x333333);

//Created a Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff,.8);
//Create a Grid
const gridHelper = new GridHelper(10);

//Animate the box
function animateBox(time) {
    boxObject.rotation.x = time / 1000;
    boxObject.rotation.y = time / 1000;
    renderer.render(scene, camera)
}

let step = 0;
function animateSphere(time) {
    step += sphereOptions.speed;
    sphereObject.position.y = 10 * Math.abs(Math.sin(step));
    renderer.render(scene, camera)
}

//Adding Object to the scene
scene.add(ambientLight);
scene.add(boxObject);
scene.add(sphereObject);
scene.add(planeObject);
scene.add(axisHelper);
scene.add(gridHelper);
scene.add(directionalLight);
renderer.setAnimationLoop(animateBox); renderer.setAnimationLoop(animateSphere);
