'use strict';

//=====================DEFAULT PARAMETERS=====================
/* const bookings = [];

//You can assign default value to parameters with '='
//We can also use expression to calculate it not just literals !
//If using argument values to calculate paramter default then it has to be declared after the parameter whose argument we will use! it cannot be decalred before that
//We cannot skip parameters with default value on function calls. So if 2 and 3rd are default value parameters then i cannot only provide an arguemnt for 3rd and skip the 2nd
function createBooking(
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers,
) {
  //This is the old ES5 way of doing things
  //   numPassengers = numPassengers || 1;
  //   price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH514', 5);
createBooking('LH516', 2);
// createBooking('LH123',,1000); // wont work, you cannot skip arguments
createBooking('LH123', undefined, 1000); // instead we can do this */

//=====================ARGUEMNTS:VALUE vs REFERENCE=====================
/* // JS is always pass by value.
// Primitives: a copy is passed — original is never affected.
// Objects/Arrays: a copy of the reference is passed —
//   mutating properties WILL affect the original,
//   reassigning the variable WILL NOT.
// Rule: mutate = affects original. Reassign = doesn't.

const flight = 'LH234';
const taha = {
  name: 'Taha Jamaly',
  passport: 'J10987F4',
};

function checkIn(flightNum, passenger) {
  flightNum = 'LH999'; //Primitives are passed by value(copy) so it doesnt change (out of scope) when modified
  passenger.name = 'Mr. ' + passenger.name; //objects are passed by reference(mem add) so it is modified
  if (passenger.passport === 'J10987F4') alert('Checked In');
  else alert('Wrong Passort');
}

checkIn(flight, taha);
console.log(flight);
console.log(taha);

function newPassport(person) {
  person.passport = Math.trunc(Math.random() * 1000000000000);
}

newPassport(taha); //Modifying the object here mutates it and the original object is not modified
console.log(taha);
checkIn(flight, taha); //So when we checkIn the value in the original is no longer the same as before ! */

//=====================HIGHER ORDER FUNCTIONs=====================
/* //Callback functions make it easy to split and re-use code
//Callback functions allow us to create abstraction

// LOW-LEVEL functions: handle one specific transformation detail
const removeSpacesAndLowercase = function (string) {
  return string.replace(/ /g, '').toLowerCase();
};

const capitalizeFirstWord = function (string) {
  const [firstWord, ...remainingWords] = string.split(' ');
  return [firstWord.toUpperCase(), ...remainingWords].join(' ');
};

// Higher-order function: takes a string and a transformation function, doesnt care how its done
// applies the transformation and logs the original, result, and transformer name
const applyStringTransformation = function (inputString, transformFn) {
  console.log(`Original string:    ${inputString}`);
  console.log(`Transformed string: ${transformFn(inputString)}`);
  console.log(`Transformed by:     ${transformFn.name}`);
};

applyStringTransformation('Javascript is the best!', capitalizeFirstWord);
applyStringTransformation('Javascript is the best!', removeSpacesAndLowercase);

// Callback function: defined separately and passed by reference (without calling it)
// logHighFive is only executed when the 'click' event fires, not immediately
const logHighFive = function () {
  console.log('✋');
};

// addEventListener is a higher-order function — it receives logHighFive as a callback
// JS will automatically call it each time the user clicks anywhere on the page
document.body.addEventListener('click', logHighFive);

// forEach is a higher-order function — it takes logHighFive as a callback
// and automatically calls it once for each element in the array
['Jonas', 'Martha', 'Adam'].forEach(logHighFive); */

//=====================RETURNING FUNCTIONs=====================
/* // greet returns a NEW function — this is called a "closure"
// the returned function remembers 'greeting' even after greet() has finished
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

//this is the greeting function in arrow format! its a lot more confusing
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

// greeterHey is now the returned function, with 'greeting' locked in as 'Hey'
const greeterHey = greet('Hey');

// calling greeterHey only needs 'name' — it already remembers 'Hey'
greeterHey('Jonas'); // Hey Jonas
greeterHey('Steven'); // Hey Steven

//we can call the greet function and chain calling the return function in one line
greet('Hello')('Taha');
greetArrow('Wagwan')('Broski!!'); */

//=====================CALL & APPLY METHODS=====================
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  // 'this' here refers to the object that calls the method (lufthansa)
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`,
    );
    this.bookings.push({
      flight: `${this.iataCode} ${flightNum}`,
      name,
    });
  },
};

lufthansa.book(239, 'Taha Dama');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowing = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Copying the book method into the global scope as a standalone function
// it is now a regular function, NOT a method — so 'this' is undefined
const book = lufthansa.book;

// book(23, 'Sarah Williams'); // ❌ 'this' is undefined — would throw a TypeError

// .call() manually sets 'this' to eurowings, then passes the arguments
// this lets us reuse lufthansa's book method on a completely different object
book.call(eurowing, 23, 'SarahWilliams');
console.log(eurowing);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'John Hardman');
console.log(swiss);

// .apply() works exactly like .call() but takes arguments as an ARRAY
// instead of passing them one by one
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// .apply() is considered outdated — the modern alternative is .call() + spread operator
book.call(swiss, ...flightData); */

//=====================BIND METHODS=====================
/* // book.call(eurowing, 23, 'Sarah Williams');
// bind() returns a new function with `this` permanently set — doesn't call immediately
const bookEW = book.bind(eurowing); // bookEW is now always bound to eurowing
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Sarah Williams'); // call the bound function normally
console.log(eurowing);

// PARTIAL APPLICATION — pre-setting arguments, not just `this`
// The first arg (flightNum = 23) is locked in. Only the passenger name is needed later.
const bookEW23 = book.bind(eurowing, 23); //Partial application
bookEW23('John Spielman');

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//Here the this is button element
// Without bind, `this` inside buyPlane would be the button element (event listener behavior)
// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);

// addEventListener sets `this` to the DOM element — bind() fixes it back to lufthansa
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// Pass `null` as `this` (arrow functions ignore it anyway) and pre-set rate to 0.23
// addVAT is now a specialized version of addTax — only needs the value
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

// Same idea as bind partial application, but using a closure instead
const customTaxFn = function (taxRate) {
  return function (value) {
    return value + value * taxRate; // taxRate is remembered via closure
  };
};

// addIncomeTax is the returned inner function, with taxRate = 0.38 baked in
const addIncomeTax = customTaxFn(0.38);
console.log(addIncomeTax(100)); */

//=====================IIFE=====================
/* // Normal function — called once manually, still accessible in scope
const runOnce = function () {
  console.log('This will never run again!');
};

runOnce();

// IIFE — wrapping in () makes it an expression, the final () calls it immediately
// Variables inside are scoped here and unreachable from outside (data encapsulation)
(function () {
  console.log('This will never run again, For realz this time!');
  const isPrivate = 23;
})();

// console.log(isPrivate);

// Arrow function version of IIFE — same concept
(() => console.log('This arrow function will also never run again!'))();

// Modern alternative — blocks {} also scope let/const (no IIFE needed)
{
  const isPrivate = 23; // block-scoped, gone after }
  var notPrivate = 46; // var ignores blocks, leaks to outer scope
}

// console.log(isPrivate); // ReferenceError
console.log(notPrivate); // 46 — var escapes the block */

//=====================CLOSURES=====================
// a closure is a function that remembers the variables of its birthplace even after that scope is gone.
// passengerCount is private — nobody can touch it directly, only booker can.

// secureBooking's local scope will be "closed over" by the returned function
const secureBooking = function () {
  let passengerCount = 0;

  // This returned function keeps access to passengerCount even after secureBooking finishes
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// secureBooking has finished executing, but passengerCount lives on inside booker
const booker = secureBooking();

booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers — passengerCount persists across calls, but is inaccessible from outside

// console.dir lets you inspect the closure and see [[Scopes]] -> Closure -> passengerCount
console.dir(booker);

// Example 1 — closureFn is declared in outer scope, but assigned inside other functions
let closureFn;

const assignClosureA = function () {
  const numA = 23;
  // closureFn closes over numA — remembers this scope even after assignClosureA finishes
  closureFn = function () {
    console.log(numA * 2);
  };
};

const assignClosureB = function () {
  const numB = 777;
  // Re-assigning closureFn — it now closes over numB instead
  closureFn = function () {
    console.log(numB * 2);
  };
};

assignClosureA();
closureFn(); // 46 — closes over numA (23)
console.dir(closureFn); // [[Scopes]] shows Closure -> numA

// closureFn is re-assigned — old closure (numA) is gone, replaced by numB
assignClosureB();
closureFn(); // 1554 — closes over numB (777)
console.dir(closureFn); // [[Scopes]] shows Closure -> numB

// Example 2 — setTimeout callback closes over n and perGroup
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  // This callback runs AFTER boardPassengers finishes — but still accesses n and perGroup via closure
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

// This outer perGroup is ignored — closure has priority over same-named outer variables
const perGroup = 1000;
boardPassengers(180, 3);
