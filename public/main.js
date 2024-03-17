
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cylinder to represent the sword
const geometry = new THREE.CylinderGeometry(0.5, 0.5, 10, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const cylinder = new THREE.Mesh(geometry, material);
// Move the cylinder so its bottom is near the origin
cylinder.geometry.translate(0, 5, 0); 
scene.add(cylinder);

// Adjust the sword's initial position
camera.position.z = 10;


var socket = io();

// Listen for the rotateSword event from the server
socket.on('rotateSword', (data) => {
    const { alpha, beta, gamma } = data;
    // Apply rotation - this example assumes the sword rotates around its Y axis (up)
    // Convert degrees to radians for Three.js, and adjust axes based on your model orientation
    cylinder.rotation.y = THREE.MathUtils.degToRad(alpha);
    cylinder.rotation.x = THREE.MathUtils.degToRad(beta);
    cylinder.rotation.z = THREE.MathUtils.degToRad(gamma);
});


// var form = document.getElementById('form');
// var input = document.getElementById('input');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//     socket.emit('chat message', input.value);
//     input.value = '';
//     }
// });

// socket.on('chat message', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();