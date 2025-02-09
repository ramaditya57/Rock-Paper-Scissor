let body_data = document.getElementById("body");

function display_body() {
  body_data.style.visibility = "visible";
  body_data.style.animation = "fadeIn 2s"; // Apply fadeIn animation
  body_data.style.opacity = 1; // Ensure opacity transition
}

window.onload = function() {
  setTimeout(display_body, 3000); // Call display_body after 3 seconds
};

// start this function when the game is ready
const gameReady = () => {
  let pScore = 0;
  let cScore = 0;
  const mes = document.querySelector('.messageDisplay h1');

  // function to run when the button is clicked
  const startGame = () => {
    const start = document.querySelector('.start');
    const introDisplay = document.querySelector('.first');
    const scoreDisplay = document.querySelector('.top');
    const gameDisplay = document.querySelector('.second');
    const bottom = document.querySelector('.bottom');

    // click event
    start.addEventListener('click', function () {
      introDisplay.classList.add('fadeOut');
      bottom.classList.add('fadeIn');
      scoreDisplay.classList.add('fadeIn');
      gameDisplay.classList.add('fadeIn');
      setTimeout(() => {
        introDisplay.style.display = 'none';
      }, 300);
    });
  };

  const playGame = () => {
    const btn = document.querySelectorAll('.btn');
    const imgs = document.querySelectorAll('img');
    const player = document.querySelector('.player');
    const computer = document.querySelector('.computer');

    // computer selection options
    const select = ['rock', 'paper', 'scissors'];

    // remove message animation after running
    mes.addEventListener('animationend', function () {
      this.style.animation = '';
    });

    // remove animation for each img element after running animation
    imgs.forEach(img => {
      img.addEventListener('animationend', function () {
        this.style.animation = '';
      });
    });

    // event listener for each button
    btn.forEach(bt => {
      bt.addEventListener('click', function () {
        // set the img back to the rock image
        player.src = 'assets/imgs/rock.png';
        computer.src = 'assets/imgs/rock.png';

        // remove the pointers to avoid double clicking
        btn.forEach(b => {
          b.style.pointerEvents = 'none';
        });

        // create a random choice for the computer
        let n = Math.floor(Math.random() * select.length);
        const playerSel = this.classList[1];
        const compSel = select[n];

        // add animation
        player.style.animation = 'shakePlayer 1s ease';
        computer.style.animation = 'shakeComputer 1s ease';
        mes.textContent = 'Shaking . . .';
        mes.style.animation = 'shaking 0.4s ease';

        // timer after running
        setTimeout(() => {
          computer.src = `assets/imgs/${compSel}.png`;
          player.src = `assets/imgs/${playerSel}.png`;

          // put back the pointer events after running
          btn.forEach(b => {
            b.style.pointerEvents = 'all';
          });

          // evaluate who won the game
          evaluateResult(playerSel, compSel);
        }, 1000);
      });
    });
  };

  const evaluateResult = (player, comp) => {
    // set the evaluation after 200 milliseconds
    setTimeout(() => {
      // if the player is rock
      if (player === 'rock') (comp === 'scissors' ? win() : comp === 'paper' ? lose() : tie());
      // if the player is paper
      if (player === 'paper') (comp === 'rock' ? win() : comp === 'scissors' ? lose() : tie());
      // if the player is scissors
      if (player === 'scissors') (comp === 'paper' ? win() : comp === 'rock' ? lose() : tie());
    }, 600);
  };

  // if the player wins
  const win = () => {
    const plScore = document.querySelector('.plScore');

    // remove animation after
    plScore.addEventListener('animationend', function () {
      this.style.animation = '';
    });

    pScore = pScore + 1;
    mes.textContent = 'You Win!';
    plScore.textContent = pScore;
    plScore.style.animation = 'addScore 0.2s ease';
  };

  // if the player loses
  const lose = () => {
    const comScore = document.querySelector('.comScore');

    // remove animation after
    comScore.addEventListener('animationend', function () {
      this.style.animation = '';
    });

    cScore = cScore + 1;
    mes.textContent = 'You lose!';
    comScore.textContent = cScore;
    comScore.style.animation = 'addScore 0.2s ease';
  };

  // when the game is tied
  const tie = () => {
    mes.textContent = `It's a tie!`;
  };

  // start the game
  startGame();
  playGame();
};

gameReady();
