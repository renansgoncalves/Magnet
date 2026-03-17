## Mesh, Rigid Body e Collider
Com a importação do Rapier, é importante entender o que significa 'mesh', 'rigid body' e 'collider' ao determinar as propriedades de um corpo.

* Mesh:         A representação visual de um objeto no Three.js. Composta por geometria (vértices) e material (aparência).
                Não possui propriedades físicas inerentes.
* Rigid Body:   A entidade lógica no motor de física (Rapier). Armazena propriedades como massa, velocidade, posição, forças aplicadas
                e tipo de movimento (dinâmico, estático ou cinemático).
* Collider:     A forma geométrica invisível acoplada ao Rigid Body que define os limites para detecção de colisões.
                Determina como o objeto interage fisicamente com outros.

## Materiais
Para a criação de um material no Three.JS, podemos utilizar:

### Basic
* Descrição:    Ignora sombras e luzes. Ou seja, não executa cálculos de luz e, portanto, não exige poder de processamento.
                Ideal para objetos wireframes ou objetos que devem parecer que brilham sozinhos.
* Nome técnico: MeshBasicMaterial
* Custo (GPU):  ⭐
### Matcap
* Descrição:    Também ignora sombras e luzes. Ou seja, também não executa cálculos de luz e também não exige poder de processamento.
                No entanto, permite a importação de textura, podendo fornecer uma impressão de iluminação, já que não será dinâmica.
* Nome técnico: MeshMatcapMaterial
* Custo (GPU):  ⭐
### Normal
* Descrição:    Também ignora sombras e luzes. Ou seja, também não executa cálculos de luz e também não exige poder de processamento.
                Define as cores das faces do corpo como vermelho, verde e azul, como em RGB. Muito útil para debug.
* Nome técnico: MeshNormalMaterial
* Custo (GPU):  ⭐
### Lambert
* Descrição:    Modelo de sombreamento para superfícies não-brilhantes (difusas). Calcula a iluminação nos vértices, resultando em
                boa performance, mas com precisão menor que modelos por pixel.
* Nome técnico: MeshLambertMaterial
* Custo (GPU):  ⭐⭐
### Phong
* Descrição:    Modelo de sombreamento para superfícies brilhantes com reflexos especulares (Blinn-Phong). Calcula a luz em cada pixel,
                permitindo realces de brilho localizados.
* Nome técnico: MeshPhongMaterial
* Custo (GPU):  ⭐⭐⭐
### Toon
* Descrição:    Implementação de Cel Shading. Utiliza uma rampa de cores para criar transições de luz e sombra em degraus, conferindo
                um visual de desenho animado ou ilustração.
* Nome técnico: MeshToonMaterial
* Custo (GPU):  ⭐⭐⭐
### Standard
* Descrição:    'Physically Based Rendering' (PBR). Utiliza propriedades de metalicidade e rugosidade para simular materiais reais.
                Garante realismo através da conservação de energia e suporte a mapas de ambiente.
* Nome técnico: MeshStandardMaterial
* Custo (GPU):  ⭐⭐⭐⭐
### Physical
* Descrição:    Extensão do material Standard com recursos avançados de renderização, como camada de verniz (clearcoat),
                brilho em tecidos (sheen) e transmissão de luz por refração.
* Nome técnico: MeshPhysicalMaterial
* Custo (GPU):  ⭐⭐⭐⭐⭐

## Colisores
Para a criação de um colisor no Rapier, podemos utilizar:

* Primitivos:    Formas geométricas básicas (esfera, cubo, cápsula, cilindro). São extremamente performáticos e recomendados para a
                 maioria dos objetos simples.
* Compound:      Agrupamento de vários colisores primitivos em um único Rigid Body para formar uma silhueta complexa e otimizada.
* Convex Hull:   Gera o menor volume convexo que envolve uma nuvem de pontos ou uma malha. É o colisor personalizado mais eficiente
                 para formas irregulares.
* Decomposition: Processo que quebra uma malha côncava complexa em várias subpartes convexas menores (V-HACD). Ideal para objetos ocos
                 ou com cavidades.
* Trimesh:       Mapeia exatamente a malha de triângulos da geometria visual. É preciso, porém computacionalmente caro, sendo geralmente
                 restrito a objetos estáticos (cenários).