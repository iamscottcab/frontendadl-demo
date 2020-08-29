import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

var scene;
var camera;

var renderer;
var cube;

//#region  canvas-resize
let desiredAspectRatio = 1.45;
let initialCameraFOV;

function onWindowResize() {
    const newAspect = container.offsetWidth / container.offsetHeight;

    // Clamp the FoV between the initial fov and the new smaller fov but make sure it doesn't go past 180....
    camera.fov = Math.max(initialCameraFOV, Math.max(0, Math.min(initialCameraFOV * (desiredAspectRatio / newAspect), 180)));

    camera.aspect = newAspect;
    camera.updateProjectionMatrix();

    renderer.setSize( container.offsetWidth, container.offsetHeight );
}
//#endregion

function init() {

    // Absolutely required code!
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);

    // This is absolutely required (right now) but we don't want it to be
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // This stuff is super prescriptive and difficult to maintain!
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Some nice to haves for resize and lighting (you can ignore this if you're watching the demo)
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    initialCameraFOV = camera.fov;    

    // Make the camera somewhat responsive (it's only a demo!)
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    render();
}

function render() {
    requestAnimationFrame(render);

    // This stuff is super prescriptive and difficult to maintain!
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

if (WEBGL.isWebGLAvailable()) {
	init();
} else {
    var warning = WEBGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}