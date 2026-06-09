'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Smooth scrolling

//Page Navigation
//1. Add event listener to common parent
//2. Determine what element orginated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target;
  console.log(`target: ${target}`);

  //Matching strategy
  if (target.classList.contains('nav__link')) {
    console.log('link');

    const id = target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component
const operation = document.querySelector('.operations');
console.log(operation.innerHTML);

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
console.log(tabs);
console.log(tabsContainer);
console.log(tabsContent);

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const tabClicked = e.target.closest('.operations__tab');
  if (tabClicked == null) return; //Guard clause
  if (tabClicked.classList.contains('operations__tab--active')) return;
  console.log(tabClicked);

  //Activate tab
  [...tabClicked.parentElement.children].forEach(tab =>
    tab.classList.remove('operations__tab--active'),
  );
  tabClicked.classList.add('operations__tab--active');

  //Activate content area
  const tabID = tabClicked.getAttribute('data-tab');
  console.log(tabID);
  tabsContent.forEach(content => {
    if (content.classList.contains(`operations__content--${tabID}`))
      content.classList.add('operations__content--active');
    else content.classList.remove('operations__content--active');
  });
});

//Nav hover handling
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

const handleNavHover = function (e, opacity) {
  console.log(this);
  opacity = this;
  if (!e.target.classList.contains('nav__link')) return;
  const link = e.target;
  console.log(link);
  const siblings = nav.querySelectorAll('.nav__link');
  const logo = nav.querySelector('.nav__logo');
  [...siblings, logo].forEach(el => {
    if (el !== link) el.style.opacity = opacity;
  });
};

// Passing 'argument' into handler
nav.addEventListener('mouseover', handleNavHover.bind(0.5));
nav.addEventListener('mouseout', handleNavHover.bind(1));
