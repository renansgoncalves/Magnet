## *Mesh*, *Rigid Body* e *Collider*
Com a importação do Rapier, é importante entender o que significa 'mesh', 'rigid body' e 'collider' ao determinar as propriedades de um corpo.

* Mesh: 
* Rigid Body: 
* Collider: 

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
* Descrição:    ...
* Nome técnico: MeshLambertMaterial
* Custo (GPU):  ⭐⭐
### Phong
* Descrição:    ...
* Nome técnico: MeshPhongMaterial
* Custo (GPU):  ⭐⭐⭐
### Toon
* Descrição:    ...
* Nome técnico: MeshToonMaterial
* Custo (GPU):  ⭐⭐⭐
### Standard
* Descrição:    ...
* Nome técnico: MeshStandardMaterial
* Custo (GPU):  ⭐⭐⭐⭐
### Physical
* Descrição:    ...
* Nome técnico: MeshPhysicalMaterial
* Custo (GPU):  ⭐⭐⭐⭐⭐

## Colisores
Para a criação de um colisor no Rapier, podemos utilizar:

* Primitivos: ...
* Compound: ...
* Convex Hull: ...
* Decomposition: ...
* Trimesh: ...