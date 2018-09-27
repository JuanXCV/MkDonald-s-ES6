# MkDonald's

## Description

MkDonald's es un juego que consiste en hacer hamburguesas, hay un "player" que mueve un plato en la parte baja de la pantalla (movimiento en el eje X), y unos "ingredients", que van cayendo de arriba hacia abajo (movimiento en eje Y). Los "ingredients" pueden ser malos (enemies) o buenos (friends), el player debe ir esquivando los "enemis", y colisionando con los "friends".
Una colisión con un enemy, supone el fin del juego (GameOver), y una colisión con un friend suma puntos a tu "score", además añadirá ese ingrediente encima del plato(Tower Burger), por lo que el player crece en el eje Y, así aumentando la dificultad. El primer friend debe ser un pan de hamburguesa siempre, y el último también, así limpiando la hamburguesa actual, y comenzando otra nueva.

## MVP (DOM - CANVAS)

CANVAS , el MVP del juego será una versión sin la posibilidad de ir acumulando encima del plato (Tower Burger).

## Backlog
- Tower Burger
- Animación cada vez que una torre se completa
- Almacenamiento HighScore
- Diseño
- Imagenes
- Variedad de ingredientes con distintas puntuaciones
- Música
- Añadir pause

## Data structure

//**Game.js**//
function Game
Game.prototype._init
Game.prototype._startLoop
Game.prototype._updateAll
Game.prototype._renderAll
Game.prototype._clearAll
Game.prototype._spawnIngredient
Game.prototype._checkAllCollision
Game.prototype._isPlayerAlive
Game.prototype._updateUI
Game.prototype.onOver
Game.prototype.destroy

//**Player.js**//
function Player
Player.prototype.update 
Player.prototype.render
Player.prototype.setDirection 
Player.prototype._checkLimits 
Player.prototype.ckeckCollision

//**Ingredients.js**//
function Ingredients
Ingredient.prototype.update 
Ingredient.prototype.render 
Ingredient.prototype.isDeath
Ingredient.prototype.isWho 

## States y States Transitions
Definition of the different states and their transition (transition functions)
- buildSplash()
- SPLASH SCREEN
- handleSplashClick
-destroySplash()
- buildGame()
- GAME SCREEN
-handleGameOver
-destroyGame()
-buildGameOver
-GAME OVER SCREEN
-handleGameOverClick
-destroyGameOver
-buildGame
-GAME SCREEN

## Task
Crear todos los archivos y dar estructura html. (Crear repo de GitHub)
Dar contenido a Main.js 
Definir Game, Player e Ingredient constructors
Game.js - Definir _init( )
Game.js - Definir onOver(callback)
Game.js - Definir destroy( )
Game.js - Definir _startLoop( )
Definir update( ) de Player e Ingredient
Game.js - Definir _updateAll( spawnIngredient( ) )
Definir render( ) de Player e Ingredient
Game.js - Definir _renderAll( )
Game.js - Definir _clearAll( )
Ingredients.js - Definir isDeath( )
Player.js - Definir setDirection( )
Player.js - Definir checkLimits( )
Ingredients.js - Definir isWho( )
Game.js - Definir isPlayerAlive( )
Game.js - Definir updateUI( )
Player.js - Definir checkCollision( )
Game.js - Definir _chechAllCollisions( )
Player.js - Definir collided( )

## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)
