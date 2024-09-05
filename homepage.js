import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Add stars to the background
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0x888888 });
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
}

// Add planets (small spinning spheres)
function createPlanet(size, color, xPos) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color });
    const planet = new THREE.Mesh(geometry, material);

    planet.position.x = xPos;
    scene.add(planet);
    
    return planet;
}

// Light source (simulating the sun)
const sunLight = new THREE.PointLight(0xffffff, 1, 1000);
sunLight.position.set(100, 100, 100);
scene.add(sunLight);

// Planets
const planet1 = createPlanet(5, 0xff6347, -30);
const planet2 = createPlanet(3, 0x1e90ff, 50);

// Camera position
camera.position.z = 100;

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the planets on the x-axis
    planet1.rotation.x += 0.01;
    planet2.rotation.x += 0.01;

    renderer.render(scene, camera);
}
animate();

// Adjust for window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Audio toggle button functionality
const audioElement = document.getElementById('background-audio');
const audioIcon = document.getElementById('audio-icon');
const audioToggle = document.getElementById('audio-toggle');

audioToggle.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        audioIcon.src = "wormhole/speaker_on.png"; // Show speaker on icon
    } else {
        audioElement.pause();
        audioIcon.src = "wormhole/speaker_off.png"; // Show speaker off icon
    }
});
