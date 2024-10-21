import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webglCanvas'), antialias: true })
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
renderer.setClearColor(0x282828);
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const objLoader = new THREE.OBJLoader();
        const obj = objLoader.parse(e.target.result);
        scene.add(obj);
    };
    
    reader.readAsText(file);
});

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});