import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

const PALETTE = ['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#ff6d01', '#673ab7', '#009688', '#e91e63', '#3f51b5'];

export function createPhysicsBodies(scene, world,
    numBodies = 100) { // Número de corpos a serem criados

    const bodies = [];
    const geometries = [
        new THREE.BoxGeometry(0.6, 0.6, 0.6),
        new THREE.SphereGeometry(0.4, 16, 16),
        new THREE.TorusGeometry(0.4, 0.2, 8, 24)
    ];

    for (let i = 0; i < numBodies; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = new THREE.MeshPhongMaterial({
            color: new THREE.Color(PALETTE[Math.floor(Math.random() * PALETTE.length)])
        });

        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
            .setTranslation(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5
            )
            .setLinearDamping(14.0)
            .setAngularDamping(6.0);

        const rigidBody = world.createRigidBody(rigidBodyDesc);

        let colliderDesc;
        const vertices = geo.attributes.position.array;

        if (geo.type === 'BoxGeometry') colliderDesc = RAPIER.ColliderDesc.cuboid(0.3, 0.3, 0.3);
        else if (geo.type === 'SphereGeometry') colliderDesc = RAPIER.ColliderDesc.ball(0.4);
        else colliderDesc = RAPIER.ColliderDesc.convexHull(vertices); 
        
        world.createCollider(colliderDesc, rigidBody);
        bodies.push({ mesh, rigidBody });
    }

    return { bodies };
}

export function createKinematicMouse(scene, world, mouseSize = 0.3) {
    const loader = new THREE.TextureLoader();
    const glowTexture = loader.load('/rad-grad.png');

    const mouseGlow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending, // Faz o brilho "somar" com as cores do fundo
            depthWrite: false // Evita que a aura crie quadrados pretos ao redor de outros objetos
        })
    );
    mouseGlow.scale.set(2.5, 2.5, 2.5); // Tamanho da aura
    scene.add(mouseGlow);

    const mouseMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(mouseSize, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(mouseMesh);

    const mouseLight = new THREE.PointLight(0xffffff, 20, 10); 
    scene.add(mouseLight);

    const mouseBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased();
    const mouseBody = world.createRigidBody(mouseBodyDesc);

    const mouseColliderDesc = RAPIER.ColliderDesc.ball(mouseSize * 3);
    world.createCollider(mouseColliderDesc, mouseBody);

    return { mouseGlow, mouseMesh, mouseLight, mouseBody };
}