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
// console.log(operation.innerHTML);

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
// console.log(tabs);
// console.log(tabsContainer);
// console.log(tabsContent);

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

//Sticky Nav
const header = document.querySelector('.header');
const stickyNavHandler = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
  console.log(entry);
};
const headerObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const headerObserver = new IntersectionObserver(
  stickyNavHandler,
  headerObserverOptions,
);
headerObserver.observe(header);

// Reveal animation for section scrolling
const sections = document.querySelectorAll('section');
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    console.log(entry);
    entry.target?.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

sections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//Lazy loading images
const imageTargets = document.querySelectorAll('img[data-src]');
console.log(imageTargets);
const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting || !entry.target) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', e => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageTargets.forEach(img => imgObserver.observe(img));

//Slider Component
const slider = function () {
  const allSlides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let dots;
  let currentSlide = 0;
  const KEY_DIRS = { arrowleft: -1, arrowright: 1 };

  const createDots = () => {
    allSlides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`,
      );
    });
    dots = dotContainer.querySelectorAll('.dots__dot');
  };

  const highlightDot = index => {
    dots.forEach(dot => {
      dot.classList.toggle(
        'dots__dot--active',
        Number(dot.dataset.slide) === index,
      );
    });
  };

  const goToSlide = index => {
    allSlides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
    highlightDot(index);
  };

  const changeSlide = dir => {
    currentSlide = (currentSlide + dir + allSlides.length) % allSlides.length;
    goToSlide(currentSlide);
  };

  btnLeft.addEventListener('click', () => changeSlide(-1));
  btnRight.addEventListener('click', () => changeSlide(1));

  document.addEventListener('keydown', ({ key }) => {
    const dir = KEY_DIRS[key.toLowerCase()];
    if (dir) changeSlide(dir);
  });

  dotContainer.addEventListener('click', ({ target }) => {
    if (!target.classList.contains('dots__dot')) return;
    currentSlide = Number(target.dataset.slide);
    goToSlide(currentSlide);
  });

  const init = function () {
    createDots();
    goToSlide(0);
  };

  init();
};
slider();
