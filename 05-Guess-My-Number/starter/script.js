'use strict';

//--------------DOM QUERYING--------------------
//Document query selector allows us to get DOM elements
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
console.log(inputField.value);
