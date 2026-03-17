import '../css/style.css';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

import { Environment } from './environment.js';
import { Inputs } from './inputs.js';
import { createPhysicsBodies, createKinematicMouse } from './entities.js';

async function init() {
    // 1. Configurar visual e inputs
    const env = new Environment();
    const input = new Inputs(env.camera);

    // 2. Inicializar motor de física
    await RAPIER.init();
    const world = new RAPIER.World({ x: 0, y: 0, z: 0 }); // Gravidade zero

    // 3. Criar entidades
    const { bodies } = createPhysicsBodies(env.scene, world);
    const { mouseGlow, mouseMesh, mouseLight, mouseBody } = createKinematicMouse(env.scene, world);

    // 4. Loop de animação
    function animate() {
        requestAnimationFrame(animate);

        world.step();

        // Sincronizar interação de mouse
        const mouse3D = input.getMouse3D();
        mouseBody.setNextKinematicTranslation(mouse3D);
        mouseMesh.position.copy(mouse3D);  // O corpo
        mouseGlow.position.copy(mouse3D);  // A aura brilhante
        mouseLight.position.copy(mouse3D); // A luz física

        // Processar física direcional (atração do mouse ou central)
        const origin = new THREE.Vector3(0, 0, 0);

        bodies.forEach(({ mesh, rigidBody }) => {
            rigidBody.resetForces(true);

            const currentPos = rigidBody.translation();
            const vecPos = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
            
            const targetPos = input.isMouseDown ? mouse3D : origin;
            const forceDirection = new THREE.Vector3().subVectors(targetPos, vecPos);

            const distance = vecPos.distanceTo(targetPos);
            const pull = 300.0 / distance; // Força de atração do mouse inversamente proporcional à distância
            
            const force = input.isMouseDown 
                ? forceDirection.normalize().multiplyScalar(pull) 
                : vecPos.multiplyScalar(-10.0); // Força de atração central

            rigidBody.addForce(force, true);

            // Sincroniza Three.js Mesh com a simulação Rapier
            mesh.position.copy(currentPos);
            mesh.quaternion.copy(rigidBody.rotation());
        });

        // Renderizar frame
        env.render();
    }

    animate();
}

init();