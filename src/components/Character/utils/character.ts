import * as THREE from "three";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  _renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loadCharacter = () => {
    return new Promise<any>((resolve) => {
      // Replace the human avatar with a high-end abstract shape
      const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#4f46e5"),
        metalness: 0.9,
        roughness: 0.1,
        transmission: 0.5,
        thickness: 2,
        iridescence: 1,
        iridescenceIOR: 1.5,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(0.12, 0.12, 0.12);
      mesh.position.y = 10.5;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      scene.add(mesh);

      // Create a dummy GLTF-like object for compatibility with Scene.tsx
      const dummyGltf = {
        scene: mesh,
        animations: [],
      };

      // Set up simple rotation animation
      const clock = new THREE.Clock();
      const animate = () => {
        const delta = clock.getDelta();
        mesh.rotation.y += delta * 0.5;
        mesh.rotation.z += delta * 0.3;
        requestAnimationFrame(animate);
      };
      animate();

      resolve(dummyGltf);
      setCharTimeline(mesh, camera);
      setAllTimeline();
    });
  };

  return { loadCharacter };
};

export default setCharacter;
