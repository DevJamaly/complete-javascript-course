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

const clickEventHandler = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    msgElement.setValue('⛔ No Number!');
  } else {
    msgElement.setValue(guess);
  }
};

// const message = document.querySelector('.message');
// console.log(message.textContent);
// function setMessageValue(value) {
//   message.textContent = value;
// }

const msgElement = {
  a: 1,
  setValue: function (value) {
    if (!this.node) {
      this.node = document.querySelector('.message');
    }
    this.node.textContent = value;
  },
};

const checkBtn = document.querySelector('.check');
// checkBtn.addEventListener('click', function () {
//   console.log(document.querySelector('.guess').value);
// });
checkBtn.addEventListener('click', clickEventHandler);
