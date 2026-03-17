# Magnet: Projeto Three.js & Rapier
Seja bem-vindo! 👋
Este projeto é um experimento interativo em 3D que combina o motor de renderização tridimensional do Three.js e o processamento de física do Rapier.

![Preview](./public/magnet_preview_1.gif)

## 🛠️ Tecnologias
* **Vite**: Bundler para desenvolvimento rápido.
* **Three.js**: Biblioteca principal para renderização WebGL.
* **Rapier**: Motor de física performático para cálculos de colisão e corpos rígidos.

## 🪄 Funcionalidades
* Lógica separada em módulos independentes (arquitetura modular).
* Sistema de atração magnética baseado na posição do mouse e distância.
* Simulação de 100 corpos rígidos com formas geométricas variadas e colisores otimizados.
* O cursor do mouse atua como uma fonte de luz.

## 📁 Estrutura do projeto
A organização do código segue princípios de responsabilidade única:
* ```environment.js```: Configuração de cena, câmera, luzes e redimensionamento.
* ```inputs.js```: Gerenciamento de eventos de mouse e cálculos de Raycasting.
* ```entities.js```: Fábrica de criação de malhas (meshes) e corpos físicos (rigid bodies).
* ```main.js```: Orquestrador assíncrono e loop de animação.

## ⚙️ Como funciona
1. Inicializa uma cena.
2. Estabelece um mundo operado por leis físicas com gravidade zero.
3. Executa o raycasting e renderiza a cena cerca de 60 vezes por segundo.
4. A cada frame, as matrizes de posição e rotação dos rigid bodies são copiadas para as meshes do Three.js.

## 🔧 Instalação e Execução
1. Clone o repositório:  
`git clone https://github.com/renansgoncalves/magnet.git`
2. Instale as dependências:  
`npm install`
3. Inicie o servidor de desenvolvimento:  
`npm run dev`

## 📖 Referências
Inspirado no projeto [*Three.js Project: Variations on Physics*](https://github.com/bobbyroe/physics-with-rapier-and-three.git) de **Robot Bobby**.