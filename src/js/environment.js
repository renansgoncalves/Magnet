import * as THREE from 'three';

export class Environment {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        // Cena e neblina
        this.scene = new THREE.Scene();
        // this.scene.fog = new THREE.Fog(0x000000, 5, 15);

        // Câmera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
        this.camera.position.z = 8;

        // Renderizador
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        document.body.appendChild(this.renderer.domElement);

        this.setupLights();
        this.setupResize();
    }

    // Configura as luzes da cena
    setupLights() {
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
        this.scene.add(hemiLight);
        
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 5, 5);
        this.scene.add(dirLight);
    }

    // Configura redimensionamento responsivo
    setupResize() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}