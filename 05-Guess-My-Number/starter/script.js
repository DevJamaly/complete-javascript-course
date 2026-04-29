'use strict';

//--------------DOM QUERYING--------------------
/* //Document query selector allows us to get DOM elements
const msgElement = document.querySelector('.message');
console.log(msgElement.textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';
console.log(document.querySelector('.message').textContent);

const secretNum = document.querySelector('.number');
secretNum.textContent = Math.round(Math.random() * 19) + 1;
console.log(secretNum.textContent);

const score = document.querySelector('.score');
console.log(score.textContent);

const inputField = document.querySelector('.guess');
inputField.value = 23;
console.log(inputField.value); */

//--------------JS Event Handling--------------------
const msgElement = {
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.message');
    }
    this.node.textContent = value;
  },
};

const secretNumElement = {
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.number');
    }
    this.node.textContent = value;
  },
};

const scoreElement = {
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.score');
    }
    this.node.textContent = value;
  },
};

let scoreValue = 20;
let secretNum = Math.floor(Math.random() * 20) + 1;
let highScoreValue = 0;

const clickEventHandler = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  //When there is no input !
  if (!guess) {
    msgElement.setValue('⛔ No Number!');
    document.querySelector('body').style.backgroundColor = '#b34747';
  }

  // When player wins
  else if (guess === secretNum) {
    msgElement.setValue('🎉 Correct Number !');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    secretNumElement.setValue(secretNum);
    if (scoreValue > highScoreValue) highScoreValue = scoreValue;
    document.querySelector('.highscore').textContent = highScoreValue;
  }

  //When guess is wrong
  else if (guess != secretNum) {
    if (scoreValue > 1) {
      msgElement.setValue(secretNum > guess ? '📈 Too high!' : '📉 Too low!');
      scoreValue--;
      scoreElement.setValue(scoreValue);
      document.querySelector('body').style.backgroundColor =
        secretNum > guess ? '#b39647' : '#478bb3';
    } else {
      scoreValue = 0;
      scoreElement.setValue(scoreValue);
      msgElement.setValue('💥 You lost the game!');
      document.querySelector('body').style.backgroundColor = '#3f1b1b';
    }
  }

  /* //When guess is too high
  else if (guess > secretNum) {
    if (scoreValue > 1) {
      msgElement.setValue('📈 Too high!');
      scoreValue--;
      scoreElement.setValue(scoreValue);
      document.querySelector('body').style.backgroundColor = '#b39647';
    } else {
      scoreValue = 0;
      scoreElement.setValue(scoreValue);
      msgElement.setValue('💥 You lost the game!');
      document.querySelector('body').style.backgroundColor = '#3f1b1b';
    }
  }
  //When guess is too low
  else if (guess < secretNum) {
    if (scoreValue > 1) {
      msgElement.setValue();
      scoreValue--;
      scoreElement.setValue(scoreValue);
      document.querySelector('body').style.backgroundColor = '#478bb3';
    } else {
      scoreValue = 0;
      scoreElement.setValue(scoreValue);
      msgElement.setValue('💥 You lost the game!');
      document.querySelector('body').style.backgroundColor = '#3f1b1b';
    }
  } */
};

function resetGame() {
  console.log(`RESET GAME BUTTON PRESSED`);
  scoreValue = 20;
  scoreElement.setValue(scoreValue);
  secretNum = Math.floor(Math.random() * 20) + 1;
  secretNumElement.setValue('?');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.guess').value = null;
  msgElement.setValue('Start guessing...');
}

const checkBtn = document.querySelector('.check');
checkBtn.addEventListener('click', clickEventHandler);

const resetBtn = document.querySelector('.again');
console.log(resetBtn);
resetBtn.addEventListener('click', resetGame);
