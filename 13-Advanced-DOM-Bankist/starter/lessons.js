'use strict';

//====================SELECT, CREATE, DELETE ELEMENTS====================
/* // document = entire HTML doc; these properties give direct access to key elements without querying
console.log(document);
console.log(document.documentElement); // <html> root element
console.log(document.head);
console.log(document.body);

// querySelector returns FIRST match; querySelectorAll returns a static NodeList (all matches)
const header = document.querySelector('.header');
console.log(header);
const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); //This is an HTML collection not a node list — live, auto-updates when DOM changes

console.log(document.getElementsByClassName('btn'));

//Creating/inserting elements
// header.insertAdjacentHTML('beforebegin', '<p> This is a line </p>');

// createElement builds the element in memory — not in the DOM until you insert it
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
// innerHTML used instead of textContent so the button tag gets parsed as real HTML, not a string
const cookieText = 'We use cookies for improved functionality and analytics.';
const cookieBtnHTML = `<button class="btn btn--close-cookie"> Got it! </button>`;
message.innerHTML = `${cookieText} ${cookieBtnHTML}`;
message.style.paddingTop = '1rem'; // inline styles set directly on the element's style attribute
message.style.paddingBottom = '1rem';
// header.prepend(message); // inserts as FIRST child of header
// header.append(message); //Element will only appear once in DOM — inserting moves it, not copies it
// header.append(message.cloneNode(true)); // cloneNode(true) = deep clone, includes all children

// before/after insert as a SIBLING outside the element; prepend/append insert as a CHILD inside it
header.before(message);
// header.after(message);

//Delete Elements
document.querySelector('.btn--close-cookie').addEventListener('click', e => {
  message.remove(); // removes element from DOM entirely
}); */

//====================STYLES AND CLASSES====================

/* const header = document.querySelector('.header');

// createElement builds the element in memory — not in the DOM until you insert it
const message = document.createElement('div');
message.classList.add('cookie-message');
const cookieText = 'We use cookies for improved functionality and analytics.';
const cookieBtnHTML = `<button class="btn btn--close-cookie"> Got it! </button>`;
message.innerHTML = `${cookieText} ${cookieBtnHTML}`;
header.before(message);

document.querySelector('.btn--close-cookie').addEventListener('click', e => {
  message.remove(); // removes element from DOM entirely
});

//Styling
// message.style.paddingTop = '1rem';
// message.style.paddingBottom = '1rem';
message.style.backgroundColor = '#37383d'; // inline styles set directly on the element's style attribute
message.style.width = '100%';

// .style only exposes styles YOU set via JS — anything from a stylesheet is invisible to it
console.log(message.style.height); //doesnt show up
console.log(message.style.backgroundColor); // shows because we set it above

// getComputedStyle reads the FINAL rendered style from the browser — CSS cascade + inheritance included
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).color); //this will show a value now
console.log(getComputedStyle(message).height);

// getComputedStyle returns strings like "40px" — parseFloat strips the unit so we can do math
const messageHeight = Number.parseFloat(getComputedStyle(message).height, 10);
message.style.height = messageHeight + 40 + 'px';

//in CSS root is the same as document element
// setProperty lets you update CSS custom properties (variables) directly from JS
document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributs
const logo = document.querySelector('.nav__logo');
// JS properties for standard HTML attributes (src, alt, href) return the ABSOLUTE resolved URL
console.log(logo.src); //this src gives the absolute path
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

//Non-standard
// custom/non-standard attributes are NOT auto-mapped to JS properties — must use getAttribute
console.log(logo.designer); //custom proprty cannot be accessed
console.log(logo.getAttribute('src')); //This src gives the relative path — exactly as written in HTML
console.log(logo.getAttribute('designer'));
logo.setAttribute('designer', 'Banksy'); // setAttribute works for both standard and custom attributes
console.log(logo.getAttribute('designer'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href); //gives absolute
console.log(link.getAttribute('href')); //gives relative

//Data attributes
// data-* attributes live on the dataset object, with keys camelCased: data-version-number → dataset.versionNumber
console.log(logo.dataset.versionNumber);

//Classes
// classList methods are the safe way to manage classes — they target individual classes, not all of them
logo.classList.add('c', 'j');
logo.classList.remove('s', 'e');
logo.classList.toggle('c'); // adds if absent, removes if present
logo.classList.contains('c'); // returns true/false — note: it's contains, not includes

//DONT USE
// className overwrites the ENTIRE class attribute — all existing classes are lost
logo.className = 'taha'; */

//====================SMOOTH SCROLLING====================
/* const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
console.log(btnScrollTo, section1);

btnScrollTo.addEventListener('click', function (event) {
  // getBoundingClientRect returns coords RELATIVE TO THE VIEWPORT (visible window), not the full document
  // so .top/.left change as you scroll — they shrink as the element approaches the top of the screen
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //   console.log(event.target.getBoundingClientRect());
  //   console.log(
  //     `Current scroll position (X/Y): ${window.pageXOffset}/${window.pageYOffset}`,
  //   );
  // pageXOffset/pageYOffset = how far the page has been scrolled from the document top — a fixed value
  //   console.log(
  //     `height/width of viewport: ${document.documentElement.clientWidth}|${document.documentElement.clientHeight}`,
  //   );

  //Scrolling (old school way)
  // window.scrollTo takes DOCUMENT coordinates (from page top), not viewport coords
  // so we add pageYOffset to convert: viewport-relative + scroll distance = absolute document position
  //   window.scrollTo(
  //     s1coords.left + window.pageXOffset,
  //     s1coords.top + window.pageYOffset,
  //   );

  //Smooth scrolling (old school way)
  // same math — just passing an options object to get smooth behavior
  //   window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth',
  //   });

  // modern way — browser handles all the coordinate math internally
  section1.scrollIntoView({ behavior: 'smooth' });
}); */

//====================EVENT HANDLERS====================
/* // Select the first <h1> element in the DOM
const h1 = document.querySelector('h1');

// Define the event handler as a named function (not anonymous)
// so it can be referenced later for removal
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // Alternative: remove the listener inside the handler itself (one-time trigger)
  // h1.removeEventListener('mouseenter', alertH1);
};

// Attach the handler — fires every time the mouse enters the h1
h1.addEventListener('mouseenter', alertH1);

// Auto-remove the listener after 5 seconds — the alert won't fire after that
// removeEventListener requires the exact same function reference used in addEventListener
// (anonymous functions can't be removed this way, which is why alertH1 is named)
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

// OLD SCHOOL approach — event handler assigned as a property
// Downside: only one handler per event type; assigning again overwrites the previous one
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// }; */

//====================EVENT BUBBLING====================
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

// CAPTURING PHASE: .nav fires first (listener set to true below)
// BUBBLING PHASE: click travels UP → .nav__link → .nav__links → .nav

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // e.target = element that was actually clicked (always .nav__link here)
  // e.currentTarget = element this listener is attached to (same as `this`)
  console.log(`LINK: ${e.target} | CURRENT: ${e.currentTarget}`);
  this.style.backgroundColor = randomColor();

  // Stops the event from bubbling up to .nav__links and .nav
  // Without this, all three listeners would fire on a .nav__link click
  e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.target can be .nav__link (click originated there and bubbled up)
  // e.currentTarget is always .nav__links (where this listener lives)
  console.log(`LINK: ${e.target} | CURRENT: ${e.currentTarget}`);
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    console.log(`LINK: ${e.target} | CURRENT: ${e.currentTarget}`);
    this.style.backgroundColor = randomColor();
  },
  true, // ← 3rd arg `true` = use CAPTURING phase (fires before bubbling listeners)
  // So .nav fires FIRST even though it's the outermost element
);

// The mental model:

// Capturing (top → down): .nav → .nav__links → .nav__link
// Target: the clicked element fires
// Bubbling (bottom → up): .nav__link → .nav__links → .nav

// By default all listeners use bubbling. The .nav listener here opts into capturing with true, so it jumps ahead of the queue and runs first.

//====================EVENT DELEGATION====================
// ---- NAIVE APPROACH (commented out) ----
// Attaches a separate listener to EACH .nav__link element
// Problem: if there are 10 links, you create 10 listeners — wasteful
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log(`Clicked: ${e.target}`);
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// ---- EVENT DELEGATION (better approach) ----
// 1. One listener on the parent (.nav__links) instead of one per child
// 2. Clicks on children bubble up to the parent, so we catch them all here
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const target = e.target; // the actual element that was clicked
  console.log(`target: ${target}`);

  // Guard check: bubbling means ANY click inside .nav__links reaches here
  // (e.g. clicking the gap between links). Only act if a .nav__link was clicked.
  if (target.classList.contains('nav__link')) {
    console.log('link');

    const id = target.getAttribute('href'); // e.g. "#section--1"
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
