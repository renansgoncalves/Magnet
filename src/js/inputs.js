import * as THREE from 'three';

export class Inputs {
    constructor(camera) {
        this.camera = camera;
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();
        this.mouse3D = new THREE.Vector3();
        this.mathPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        
        this.isMouseDown = false;

        this.initListeners();
    }

    // Configura os listeners para movimento e clique do mouse
    initListeners() {
        window.addEventListener('mousemove', (event) => {
            this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('mousedown', () => this.isMouseDown = true);
        window.addEventListener('mouseup', () => this.isMouseDown = false);
    }

    // Calcula e retorna a posição atualizada do mouse no espaço 3D
    getMouse3D() {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        this.raycaster.ray.intersectPlane(this.mathPlane, this.mouse3D);
        return this.mouse3D;
    }
}