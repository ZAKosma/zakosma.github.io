import * as THREE from 'three';

// init
const aspectRatio = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 10);
camera.position.z = 1;

const stereoCamera = new THREE.StereoCamera();
stereoCamera.aspect = 0.5; // Dividing the screen into two halves

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// update stereo camera
function updateStereoCamera() {
    stereoCamera.update(camera);
}

// animation
function animation(time) {
    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    updateStereoCamera();

    renderer.setScissorTest(true);

    renderer.setScissor(0, 0, window.innerWidth / 2, window.innerHeight);
    renderer.setViewport(0, 0, window.innerWidth / 2, window.innerHeight);
    renderer.render(scene, stereoCamera.cameraL);

    renderer.setScissor(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
    renderer.setViewport(window.innerWidth / 2, 0, window.innerWidth / 2, window.innerHeight);
    renderer.render(scene, stereoCamera.cameraR);

    renderer.setScissorTest(false);
}

renderer.setAnimationLoop(animation);
