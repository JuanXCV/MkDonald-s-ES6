function builDom(html) {
  const div = document.createElement('div')
  div.innerHTML = html;
  return div.children[0];
}
function main() {
  const mainContainerElement = document.querySelector('#main-container')
  
  //Splash
  let splashElement = null;
  let splashButton = null;

  const handleSplashClick = () => {
    destroySplash();
    buildGame();
  }

  function buildSplash() {
    splashElement = builDom(`
      <main class="splash container">
        <div class='button make-button'>MAKE!</div>
      </main>
    `)
    mainContainerElement.appendChild(splashElement)
    splashButton = document.querySelector('.make-button')
    splashButton.addEventListener('click', handleSplashClick)
  }
  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick)
    splashElement.remove();
  }

  //Game

  let game = null;
  const handleGameOver = () => {
    destroyGame()
    buildGameOver(game.score)
  }
  function buildGame() {
    game = new Game(mainContainerElement);
    game.onOver(handleGameOver);
  }
  function destroyGame() {
    game.destroy()
  }

  //GameOver

  let gameOverElement = null;
  let gameOverButton = null;

  const handleGameOverClick = () => {
    destroyGameOver()
    buildGame()
  }
  function buildGameOver(score) {
    gameOverElement = builDom(`
    <main class="gameover container">
      <h1 class="gameover-title">Game Over</h1>
      <p>Score: <span class="score"></span></p>
      <div class='button button-gameover'>REMAKE!</div>
    </main>
    `)
    mainContainerElement.appendChild(gameOverElement);
    gameOverButton = document.querySelector('.button-gameover')
    gameOverButton.addEventListener('click', handleGameOverClick)

    const scoreElement = document.querySelector('.score')
    scoreElement.innerText = score;
  }
  function destroyGameOver() {
    gameOverButton.removeEventListener('click', handleGameOverClick)
    gameOverElement.remove()
  }
  buildSplash ();
}
document.addEventListener('DOMContentLoaded', main)