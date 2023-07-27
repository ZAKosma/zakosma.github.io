import * as THREE from 'three';

const scene = new THREE.Scene();

// Set up the WebGLRenderer, which handles rendering to the session's base layer.
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    preserveDrawingBuffer: true,
    canvas: canvas,
    context: gl
});
renderer.autoClear = false;

// The API directly updates the camera matrices.
// Disable matrix auto updates so three.js doesn't attempt
// to handle the matrices independently.
const camera = new THREE.PerspectiveCamera();
camera.matrixAutoUpdate = false;

camera.position.z = 5;

// Initialize a WebXR session using "immersive-ar".
const session = await navigator.xr.requestSession("immersive-ar");
session.updateRenderState({
    baseLayer: new XRWebGLLayer(session, gl)
});

// A 'local' reference space has a native origin that is located
// near the viewer's position at the time the session was created.
const referenceSpace = await session.requestReferenceSpace('local');