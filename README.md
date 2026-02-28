# Magnet: Projeto Three.js & Rapier
Seja bem-vindo! 👋
Este projeto é um experimento interativo em 3D que combina o motor de renderização tridimensional do Three.js e o processamento de física do Rapier.

![Preview](./public/magnet_preview_1.gif)

## 🛠️ Tecnologias
* **Vite**: Bundler para desenvolvimento rápido.
* **Three.js**: Biblioteca principal para visualização 3D.
* **Rapier**: Motor de física performático.

## 🪄 Funcionalidades
* Renderização em tempo real com Three.js.
* Simulação física interativa com Rapier.
* Objeto em cena controlado pelo mouse.

## ⚙️ Como funciona
1. Inicializa uma cena.
2. Estabelece um mundo operado por leis físicas com gravidade zero.
3. Gera 80 formas geométricas, além da que segue o mouse e permite a interatividade.
4. Executa o raycasting e renderiza a cena cerca de 60 vezes por segundo.

## 🔧 Instalação e Execução
1. Clone o repositório:  
`git clone https://github.com/renansgoncalves/magnet.git`
2. Instale as dependências:  
`npm install`
3. Inicie o servidor de desenvolvimento:  
`npm run dev`

## 📖 Referências
Inspirado no projeto [*Three.js Project: Variations on Physics*](https://github.com/bobbyroe/physics-with-rapier-and-three.git) de **Robot Bobby**.