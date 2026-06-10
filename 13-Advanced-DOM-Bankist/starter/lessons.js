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
/* const randomInt = (min, max) =>
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

// By default all listeners use bubbling. The .nav listener here opts into capturing with true, so it jumps ahead of the queue and runs first. */

//====================EVENT DELEGATION====================
/* // ---- NAIVE APPROACH (commented out) ----
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
}); */

//====================DOM TRAVERSAL====================
/* const h1 = document.querySelector('h1');

// ---- TRAVERSING DOWN (children) ----
console.log(h1.querySelectorAll('.highlight')); // finds ALL .highlight descendants, no matter how deeply nested
console.log(h1.childNodes); // every node: elements, text nodes, comments — rarely useful
console.log(h1.children); // only direct child ELEMENTS, not text/comment nodes

h1.firstElementChild.style.color = 'cyan'; // first direct child element
h1.lastElementChild.style.color = 'orangered'; // last direct child element

// ---- TRAVERSING UP (parents) ----
console.log(h1.parentNode); // immediate parent node (includes non-element nodes)
console.log(h1.parentElement); // immediate parent element — almost always use this over parentNode

// .closest() = opposite of querySelectorAll
// walks UP the tree and returns the nearest ancestor matching the selector
// (also matches the element itself — see below)
console.log(h1.closest('.header'));
h1.closest('.header').style.background = 'var(--gradient-secondary)'; // finds ancestor .header
h1.closest('h1').style.background = 'var(--gradient-primary)'; // matches h1 itself — closest() is self-inclusive

// ---- TRAVERSING SIDEWAYS (siblings) ----
// JS only gives you direct prev/next — no "get all siblings" built-in
console.log(h1.previousElementSibling); // sibling element directly before h1
console.log(h1.nextElementSibling); // sibling element directly after h1

console.log(h1.previousSibling); // previous node (could be a text/whitespace node)
console.log(h1.nextSibling); // next node (could be a text/whitespace node)

// ---- ALL SIBLINGS workaround ----
// Go up to parent, grab all its children, filter out h1 itself
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)'; // shrinks every sibling, leaves h1 alone
}); */

//====================TABBED COMPONENT====================
/* const operation = document.querySelector('.operations');
console.log(operation.innerHTML);

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event delegation — one listener on the container instead of one per tab
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  // Tabs have a <span> inside them — clicking the span makes e.target the span, not the tab
  // .closest() walks up from wherever the click landed and finds the actual tab button
  const tabClicked = e.target.closest('.operations__tab');

  // Guard clause 1: click landed in the container but not on any tab (e.g. a gap)
  if (tabClicked == null) return;

  // Guard clause 2: tab is already active, nothing to do
  if (tabClicked.classList.contains('operations__tab--active')) return;

  // ---- Activate tab button ----
  // Remove active class from all sibling tabs, then add it only to the clicked one
  [...tabClicked.parentElement.children].forEach(tab =>
    tab.classList.remove('operations__tab--active'),
  );
  tabClicked.classList.add('operations__tab--active');

  // ---- Activate matching content panel ----
  // data-tab="1" on the button links it to .operations__content--1
  // This is the data attribute pattern: HTML holds the mapping, JS reads it
  const tabID = tabClicked.getAttribute('data-tab');

  tabsContent.forEach(content => {
    if (content.classList.contains(`operations__content--${tabID}`))
      content.classList.add('operations__content--active'); // show matched panel
    else content.classList.remove('operations__content--active'); // hide all others
  });
}); */

//====================REALTIME STYLING====================
/* const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');

// Defined as a regular function (not arrow) so that `this` can be set by .bind()
const handleNavHover = function (e, opacity) {
  // `this` is not the element here — it's whatever was passed into .bind()
  // i.e. 0.5 on mouseover, 1 on mouseout
  console.log(this);
  opacity = this; // grab the bound value — the `opacity` parameter above is never actually used

  if (!e.target.classList.contains('nav__link')) return; // guard: ignore clicks on non-links

  const link = e.target; // the specific nav link being hovered
  const siblings = nav.querySelectorAll('.nav__link');
  const logo = nav.querySelector('.nav__logo');

  // Fade everything except the hovered link
  [...siblings, logo].forEach(el => {
    if (el !== link) el.style.opacity = opacity;
  });
};

// ✅ bind returns a NEW function with `this` locked to 0.5
// When the event fires: handleNavHover(e) runs, and inside, this === 0.5
nav.addEventListener('mouseover', handleNavHover.bind(0.5));
nav.addEventListener('mouseout', handleNavHover.bind(1)); */

//====================STICKY NAVIGATION====================
/* const section1 = document.getElementById('section--1');
const navBar = document.querySelector('.nav');

// getBoundingClientRect() returns the element's position RELATIVE to the viewport
// .top = distance from the top of the viewport to the top of section1
// Captured ONCE at page load, when section1 is at its natural position
const initalCoord = section1.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY); // how many px the page has been scrolled from the very top
  console.log(initalCoord); // static snapshot — same value every time

  // scrollY > initalCoord.top means: user has scrolled PAST where section1 starts
  // → make nav sticky
  // scrollY ≤ initalCoord.top means: user is still ABOVE section1
  // → remove sticky
  if (window.scrollY > initalCoord.top) navBar.classList.add('sticky');
  else navBar.classList.remove('sticky');
}); */

//====================INTERSECTION OBSERVER API====================
// const section1 = document.getElementById('section--1');

// // Callback fires when section1 crosses a threshold — NOT on every scroll event
// // `entries` = array of IntersectionObserverEntry objects (one per observed element)
// // `observer` = the observer instance itself (useful if you want to unobserve inside the callback)
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//     // Each `entry` contains:
//     // entry.isIntersecting → true/false: is the element currently visible?
//     // entry.intersectionRatio → how much of the element is visible (0.0 to 1.0)
//     // entry.target → the actual DOM element being observed
//     // entry.boundingClientRect → element's size and position
//     // entry.rootBounds → size of the root (viewport in this case)
//   });
// };

// const obsOptions = {
//   root: null, // null = use the viewport as the container to observe against
//   // could be any scrollable element e.g. document.querySelector('.modal')
//   threshold: [0, 0.2], // callback fires at TWO points:
//   // 0   → when even 1px of section1 enters/leaves the viewport
//   // 0.2 → when 20% of section1 is visible/hidden
//   // threshold: 1 would mean 100% of element must be visible
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // start watching section1
// // observer.unobserve(section1) → stop watching a specific element
// // observer.disconnect()       → stop the observer entirely

//----------------------------------------
// Real world example 1 — lazy loading images as they scroll into view:
// const lazyImages = document.querySelectorAll('img[data-src]');
// // Images start with a blurred placeholder in `src`, real URL stored in `data-src`

// const loadImage = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;

//   // Swap placeholder with real image once it's near the viewport
//   entry.target.src = entry.target.dataset.src;

//   // Remove blur filter only AFTER the real image has finished loading
//   entry.target.addEventListener('load', () =>
//     entry.target.classList.remove('lazy-img'),
//   );

//   observer.unobserve(entry.target); // job done, stop watching this image
// };

// const imageObserver = new IntersectionObserver(loadImage, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px', // start loading 200px BEFORE the image enters viewport
//   // so user never sees the placeholder
// });

// lazyImages.forEach(img => imageObserver.observe(img));

//----------------------------------------
// Real world example 2 — Reveal sections on scroll (fade + slide up animation):
// const sections = document.querySelectorAll('.section');

// const revealSection = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;

//   // Remove the hidden class once section enters viewport → CSS handles the animation
//   entry.target.classList.remove('section--hidden');

//   observer.unobserve(entry.target); // only animate once, no need to keep watching
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15, // wait until 15% of the section is visible before revealing
//   // prevents animation triggering too early
// });

// sections.forEach(section => {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden'); // hide all sections upfront
// });

//----------------------------------------
// Reveal animation for section scrolling
const sections = document.querySelectorAll('section');

// IntersectionObserver fires this on BOTH enter AND exit — entries is always an array
const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // guard: ignore the exit-viewport trigger
    console.log(entry);
    entry.target?.classList.remove('section--hidden');
    observer.unobserve(entry.target); // one-shot: stop watching once revealed
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // null = use the viewport
  threshold: 0.2, // trigger when 20% of the section is visible
});

sections.forEach(section => {
  // added via JS, not CSS — so sections stay visible if JS is disabled (progressive enhancement)
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});
