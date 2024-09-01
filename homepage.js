// Setting up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Creating a TorusKnot geometry to simulate a swirling black hole
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Creating a starfield effect
const starsGeometry = new THREE.BufferGeometry();
const starCount = 1000;
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

    // Animate the black hole (torus knot)
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    // Animate the stars moving towards the black hole
    starsGeometry.attributes.position.array.forEach((v, idx) => {
        if (idx % 3 === 2) {
            starsGeometry.attributes.position.array[idx] += 0.05;
            if (starsGeometry.attributes.position.array[idx] > 1000) {
                starsGeometry.attributes.position.array[idx] = -1000;
            }
        }
    });
    starsGeometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

animate();

// Adjust the scene when the window is resized
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});