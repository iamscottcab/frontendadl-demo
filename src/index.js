import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var scene;
var camera;

var renderer;
var clock;
var mixer;

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

    // Some nice to haves for resize and lighting (you can ignore this if you're watching the demo)
    scene.background = new THREE.Color('rgb(254, 254, 235)');
    renderer.physicallyCorrectLights = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Import the loader
    var loader = new GLTFLoader();

    // Load the file
    loader.load('models/scene.gltf', (gltf) => {

        // Use the blender camera for our scene (nice no more creating one!)
        camera = gltf.cameras[0];
        initialCameraFOV = camera.fov;

        // Play some animations!
        clock = new THREE.Clock(true);
        mixer = new THREE.AnimationMixer(gltf.scene.children.find(child => child.name === 'Armature'));
        const anim = mixer.clipAction(gltf.animations[0]);
        anim.play();

        // Add the whole blender scene to the three.js scene!
        scene.add(gltf.scene);

        // Make the camera somewhat responsive (it's only a demo!)
        window.addEventListener('resize', onWindowResize, false);
        onWindowResize();

        render();
    });
}

function render() {
    // Our render function is so tidy!!!
    requestAnimationFrame(render);
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
};

if (WEBGL.isWebGLAvailable()) {
	init();
} else {
    var warning = WEBGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}