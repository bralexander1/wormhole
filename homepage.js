// Initialize scene, camera, and renderer for the homepage
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add starfield background
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Create planets (small spheres)
const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x8A2BE2 }); // Example: Blue-Violet color
const planet1 = new THREE.Mesh(planetGeometry, planetMaterial);
planet1.position.set(-10, 5, -20);
scene.add(planet1);

const planet2 = new THREE.Mesh(planetGeometry, planetMaterial);
planet2.position.set(15, -10, -30);
scene.add(planet2);

// Position the camera
camera.position.z = 10;

// Animate function to move the camera and render the scene
function animate() {
    requestAnimationFrame(animate);

    // Camera floating effect
    camera.position.x += Math.sin(Date.now() * 0.001) * 0.05;
    camera.position.y += Math.cos(Date.now() * 0.001) * 0.05;

    // Render the scene
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Save the current playback time before the page unloads
window.addEventListener('beforeunload', function() {
    const audio = document.getElementById('background-music');
    localStorage.setItem('audioTime', audio.currentTime);
});

// When the new page loads, resume from the last saved time
window.addEventListener('load', function() {
    const audio = document.getElementById('background-music');
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime !== null) {
        audio.currentTime = savedTime;
    }
    audio.play();

    // Make the text "Super Nova Coming Soon" glow and change colors
    const homepageText = document.getElementById('homepage-text');
    let colorIndex = 0;
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
    setInterval(() => {
        homepageText.style.color = colors[colorIndex];
        homepageText.style.textShadow = `0 0 10px ${colors[colorIndex]}, 0 0 20px ${colors[colorIndex]}, 0 0 30px ${colors[colorIndex]}`;
        colorIndex = (colorIndex + 1) % colors.length;
    }, 500);
});

// Toggle audio functionality
const audio = document.getElementById('background-audio');
const toggleButton = document.getElementById('audio-toggle');
const audioIcon = document.getElementById('audio-icon');

toggleButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        audioIcon.src = wormhole/speaker_on.png;
    } else {
        audio.pause();
        audioIcon.src = wormhole/speaker_off.png;
    }
});