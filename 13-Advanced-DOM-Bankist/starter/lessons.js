'use strict';

//====================SELECT, CREATE, DELETE ELEMENTS====================
// document = entire HTML doc; these properties give direct access to key elements without querying
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
});

//====================STYLES AND CLASSES====================
