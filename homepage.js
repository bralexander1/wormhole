const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

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

    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;

    // Animate stars moving towards the viewer
    const positions = starsGeometry.attributes.position.array;
    for (let i = 2; i < positions.length; i += 3) {
        positions[i] += 0.05;
        if (positions[i] > 1000) {
            positions[i] = -1000;
        }
    }
    starsGeometry.attributes.position.needsUpdate = true;

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

