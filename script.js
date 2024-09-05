// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create the jagged wormhole (torus spinning like a wheel)
const wormholeGeometry = new THREE.TorusGeometry(10, 3, 16, 100);

// Make the torus jagged by displacing its vertices
const wormholeVertices = wormholeGeometry.attributes.position.array;
for (let i = 0; i < wormholeVertices.length; i += 3) {
    const offset = Math.random() * 0.5; // Adjust this value for more or less jaggedness
    wormholeVertices[i] += offset;
    wormholeVertices[i + 1] += offset;
    wormholeVertices[i + 2] += offset;
}

wormholeGeometry.attributes.position.needsUpdate = true;

const wormholeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
    opacity: 0.8,
    transparent: true
});
const wormhole = new THREE.Mesh(wormholeGeometry, wormholeMaterial);
scene.add(wormhole);

// Create the black void in the center of the wormhole
const voidGeometry = new THREE.CircleGeometry(4, 32);
const voidMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const voidMesh = new THREE.Mesh(voidGeometry, voidMaterial);
voidMesh.position.z = -0.1;
voidMesh.rotation.x = Math.PI / 2;
scene.add(voidMesh);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

// Create clouds and lightning around the wormhole
const cloudTexture = new THREE.TextureLoader().load('clouds.png'); // Replace with your cloud texture path
const cloudGeometry = new THREE.TorusGeometry(11, 2, 16, 100);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    opacity: 0.7,
    transparent: true
});
const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloud);

camera.position.z = 30;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the torus like a wheel
    wormhole.rotation.z += 0.02;
    cloud.rotation.z -= 0.005;

    // Animate stars moving towards the wormhole
    const positions = starsGeometry.attributes.position.array;
    for (let i = 2; i < positions.length; i += 3) {
        positions[i] += 0.2;
        if (positions[i] > 1000) {
            positions[i] = -1000;
        }
    }
    starsGeometry.attributes.position.needsUpdate = true;

    // Simulate more intense lightning by randomly changing cloud opacity and brightness
    if (Math.random() > 0.8) {
        cloud.material.opacity = Math.random() * 0.9 + 0.3;
        cloud.material.color.setHSL(0.6, 1, Math.random()); // Brighten clouds with flashes
    }

    renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Audio: Continuous music player across pages
const audioElement = document.getElementById('background-music');

if (localStorage.getItem('audioTime')) {
    audioElement.currentTime = localStorage.getItem('audioTime');
}

window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audioElement.currentTime);
});

// Navigate to homepage on clicking the text
document.getElementById('welcome-text').addEventListener('click', () => {
    window.location.href = 'https://bralexander1.github.io/wormhole/homepage.html'; // Replace with your actual homepage URL
});
// Toggle audio functionality
const audio = document.getElementById('background-audio');
const toggleButton = document.getElementById('audio-toggle');

toggleButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        toggleButton.textContent = 'Turn Audio Off';
    } else {
        audio.pause();
        toggleButton.textContent = 'Turn Audio On';
    }
});
