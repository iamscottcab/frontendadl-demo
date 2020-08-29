import * as THREE from 'three';
import { WEBGL } from 'three/examples/jsm/WebGL';

var scene;
var camera;

var renderer;
var cube;

const init = function() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    var geometry = new THREE.BoxGeometry();
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;
    animate();
}

var animate = function() {
    requestAnimationFrame(animate);

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