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
  setWidth: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.number');
    }
    this.node.style.width = value;
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

const bodyElement = {
  setColor: function (value) {
    if (!this.node) {
      this.node = document.querySelector('body');
    }
    this.node.style.backgroundColor = value;
  },
};

const highScoreElement = {
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.highscore');
    }
    this.node.textContent = value;
  },
};

const inputFieldElement = {
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.guess');
    }
    this.node.value = value;
  },
  getValue: function () {
    if (!this.node) {
      this.node = document.querySelector('.guess');
    }
    return this.node.value;
  },
};

let scoreValue = 20;
let secretNum;
let highScoreValue = 0;

function SetSecretNum() {
  secretNum = Math.floor(Math.random() * 20) + 1;
}

function checkScore() {
  const guess = Number(inputFieldElement.getValue());
  console.log(guess);

  //When there is no input !
  if (!guess) {
    msgElement.setValue('⛔ No Number!');
    bodyElement.setColor('#b34747');
  }

  // When player wins
  else if (guess === secretNum) {
    msgElement.setValue('🎉 Correct Number !');
    bodyElement.setColor('#60b347');
    secretNumElement.setWidth('30rem');
    secretNumElement.setValue(secretNum);
    if (scoreValue > highScoreValue) highScoreValue = scoreValue;
    highScoreElement.setValue(highScoreValue);
  }

  //When guess is wrong
  else if (guess != secretNum) {
    if (scoreValue > 1) {
      msgElement.setValue(guess > secretNum ? '📈 Too high!' : '📉 Too low!');
      scoreValue--;
      scoreElement.setValue(scoreValue);
      bodyElement.setColor(guess > secretNum ? '#b39647' : '#478bb3');
    } else {
      scoreValue = 0;
      scoreElement.setValue(scoreValue);
      msgElement.setValue('💥 You lost the game!');
      bodyElement.setColor('#3f1b1b');
    }
  }
}

function resetGame() {
  console.log(`RESET GAME BUTTON PRESSED`);
  scoreValue = 20;
  scoreElement.setValue(scoreValue);
  SetSecretNum();
  secretNumElement.setValue('?');
  bodyElement.setColor('#222');
  secretNumElement.setWidth('15rem');
  inputFieldElement.setValue(null);
  msgElement.setValue('Start guessing...');
}

const checkBtn = document.querySelector('.check');
checkBtn.addEventListener('click', checkScore);

const resetBtn = document.querySelector('.again');
resetBtn.addEventListener('click', resetGame);

SetSecretNum();
