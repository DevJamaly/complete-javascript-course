'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

function showModalWindow(event) {
  //   const button = event.currentTarget;
  //   console.log(`Button Clicked ${button.textContent}`);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function hideModalWindow(event) {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

function handleKeyPress(event) {
  if (!event.key || event.key !== 'Escape') return;
  if (modal.classList.contains('hidden')) return;
  hideModalWindow();
}

//Add event listeners for the show modal buttons
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', showModalWindow);

//Add event listeners for close button on modal
btnCloseModal.addEventListener('click', hideModalWindow);
overlay.addEventListener('click', hideModalWindow);

//Add event listener for handling Esc key press in the window!
document.addEventListener('keydown', handleKeyPress);
