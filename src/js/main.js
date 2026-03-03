import '../css/style.css';
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 1, 1000);
camera.position.z = 8;

scene.fog = new THREE.Fog(0x000000, 5, 15);   // Neblina

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.toneMapping = THREE.ACESFilmicToneMapping;   // Melhora a resposta de luzes fortes e mantém detalhes nas sombras
renderer.outputColorSpace = THREE.SRGBColorSpace;     // Garante que as cores sejam exibidas corretamente em monitores modernos
document.body.appendChild(renderer.domElement);

// Iluminação
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemiLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// Inicialização do RAPIER
await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: 0, z: 0 });   // ({ x: 0, y: 0, z: 0 }) se refere às forças de gravidade, que nesse caso são nulas porque queremos uma gravidade central personalizada

// Criação dos 'rigid bodies'
const bodies = [];
const numBodies = 100;
const geometries = [
    new THREE.BoxGeometry(0.6, 0.6, 0.6),
    new THREE.SphereGeometry(0.4, 16, 16),
    new THREE.TorusGeometry(0.4, 0.2, 8, 24)
];

const palette = [
    '#4285f4', '#ea4335', '#fbbc05', '#34a853', '#ff6d01', '#673ab7', '#009688', '#e91e63', '#3f51b5'
]

for (let i = 0; i < numBodies; i++) {   // Determinação de instâncias singulares para cada 'rigid body'
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(palette[Math.floor(Math.random() * palette.length)])
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Descrição da física dos 'rigid bodies'
    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
        .setTranslation(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        )
        .setLinearDamping(14.0)
        .setAngularDamping(6.0);

    const rigidBody = world.createRigidBody(rigidBodyDesc);

    // Propriedades de colisão singulares para cada forma geométrica
    let colliderDesc;
    const vertices = geo.attributes.position.array;

    if (geo.type === 'BoxGeometry') colliderDesc = RAPIER.ColliderDesc.cuboid(0.3, 0.3, 0.3);
    else if (geo.type === 'SphereGeometry') colliderDesc = RAPIER.ColliderDesc.ball(0.4);
    else colliderDesc = RAPIER.ColliderDesc.convexHull(vertices);   // Para formas complexas, o RAPIER não tem um método direto, o que nos leva a recorrer a um método que leia a geometria e crie um colisor aproximado
    
    world.createCollider(colliderDesc, rigidBody);

    bodies.push({ mesh, rigidBody });
}

// Criação do corpo cinemático para o mouse
const mouseSize = 0.3;

const mouseMesh = new THREE.Mesh(
    new THREE.SphereGeometry(mouseSize, 32, 32),   // Tamanho da esfera, 'widthSegments' e 'heightSegments', respectivamente. Maior o número de seguimentos, mais suave a esfera, maior o custo de processamento
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
scene.add(mouseMesh);

const mouseBodyDesc = RAPIER.RigidBodyDesc.kinematicPositionBased();   // Descrição da física do corpo do mouse
const mouseBody = world.createRigidBody(mouseBodyDesc);

const mouseColliderDesc = RAPIER.ColliderDesc.ball(mouseSize * 3);   // O colisor do corpo do mouse é maior que sua forma (multiplicando seu tamanho por 3) para aumentar a área de interação
world.createCollider(mouseColliderDesc, mouseBody);

// Criação do raycasting
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();   // Responsável por armazenar as coordenadas normalizadas do mouse
const mouse3D = new THREE.Vector3();   // Responsável por armazenar a posição 3D do mouse no espaço da cena
const mathPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);   // Como o mouse não tem profundidade, criamos um plano infinito que interage com ele

window.addEventListener('mousemove', (event) => {   // Converte a posição em pixels do mouse para coordenadas normalizadas de -1 a 1, onde (0,0) é o centro da tela
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;        // A coordenada x é calculada dividindo a posição x do mouse pela largura da janela, multiplicando por 2 para obter um intervalo de 0 a 2, e subtraindo 1 para centralizar em torno de 0
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;       // A coordenada y é calculada de maneira semelhante, mas é invertida (multiplicando por -1) porque as coordenadas de tela têm a origem no canto superior esquerdo, enquanto as coordenadas normalizadas têm a origem no centro
});

// Controle de clique do mouse
let isMouseDown = false;

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);

// Loop de animação
function animate() {   // É executado cerca de 60 vezes por segundo
    requestAnimationFrame(animate);

    // Requisição para execução dos cálculos de física do RAPIER
    world.step();

    // Atualizar posição do mouse
    raycaster.setFromCamera(pointer, camera);           // Cria um raio que passa pela posição do mouse na tela e se estende para o espaço 3D da cena
    raycaster.ray.intersectPlane(mathPlane, mouse3D);   // Calcula a interseção do raio com o plano definido anteriormente, armazenando a posição 3D resultante em 'mouse3D'
    
    mouseBody.setNextKinematicTranslation(mouse3D);     // Atualiza a posição do 'rigid body' do mouse para a posição 3D calculada
    mouseMesh.position.copy(mouse3D);                   // Sincroniza a posição do 'mesh' do mouse com a posição do 'rigid body' dele

    // Aplicar forças e sincronizar os 'meshes' com os 'rigid bodies'
    bodies.forEach(({ mesh, rigidBody }) => {
        rigidBody.resetForces(true);   // Reseta as forças acumuladas do 'rigid body' para evitar que elas se acumulem indefinidamente


        // Gravidade central: empurra para (0,0,0)
        const currentPos = rigidBody.translation();   // Captura a posição atual (x, y, z) direto do motor de física RAPIER
        const vecPos = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);   // Converte os dados brutos da física em um vetor matemático do THREE.js

        const targetPos = isMouseDown ? mouse3D : new THREE.Vector3(0, 0, 0);       // Define o alvo da atração: a posição do mouse (clicado) ou a origem (solto)
        const forceDirection = new THREE.Vector3().subVectors(targetPos, vecPos);   // Calcula o vetor de direção que aponta do objeto atual para o alvo

        const distance = vecPos.distanceTo(targetPos);   // Calcula a distância real entre o objeto e o alvo para controle de intensidade
        const pull = 260.0 / (distance / 1.25);          // Aplica a regra de intensidade: quanto menor a distância, maior a força de atração
        const force = isMouseDown ? forceDirection.normalize().multiplyScalar(pull) : vecPos.multiplyScalar(-10.0);   // Se o mouse estiver pressionado, a força é direcionada para o mouse, caso contrário, é direcionada para o centro (0,0,0)

        rigidBody.addForce(force, true);   // Aplica a força calculada no 'rigid body' para mover o objeto fisicamente


        // Sincronizar a posição e rotação do 'mesh' com o 'rigid body'
        mesh.position.copy(currentPos);
        mesh.quaternion.copy(rigidBody.rotation());
    });

    renderer.render(scene, camera);
}

// Ajuste de janela
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();