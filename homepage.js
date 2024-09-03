const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Create stars
const starsGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const positions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 2000;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);

    // Slow rotation for a floating effect
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
