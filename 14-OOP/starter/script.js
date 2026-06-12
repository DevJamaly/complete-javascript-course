'use strict';

//===================CONSTRUCTOR FUNCTIONS====================
/* // Constructor function — capital P is a convention to signal
// "call this with new". JS doesn't enforce it, but breaking
// the convention causes silent bugs (this will point to the
// wrong object if called without new).
const Person = function (firstName, birthYear) {
  // `this` here is the empty object created by the `new` keyword.
  // These lines add properties directly onto that object.
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never add methods inside the constructor.
  // Every instance gets its OWN copy of the function in memory.
  // 1000 Person objects = 1000 identical calcAge functions.
  // Solution: add methods to Person.prototype instead
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// What `new` does behind the scenes — in order:
// 1. Creates a new empty object {}
// 2. Calls Person(), binding `this` to that empty object
// 3. Links the object to Person.prototype (__proto__ = Person.prototype)
// 4. Returns the object automatically (no explicit return needed)
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1995);

const taha = 'taha'; // plain string — not created with new, not linked to Person.prototype

console.log(jonas, matilda, jack);

// Returns 'object' — JS has no "Person" type.
// Constructor functions don't create new types, they create objects.
console.log(typeof jack);

// instanceof checks the prototype chain:
// jack.__proto__ === Person.prototype → true
console.log(jack instanceof Person); // true

// taha is a primitive string, not linked to Person.prototype
console.log(taha instanceof Person); // false
 */

//===================PROTOTYPES====================
/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Method lives on the prototype — ONE shared copy for all instances.
// `this` inside always refers to the instance that calls it.
// jonas.calcAge() → this = jonas. matilda.calcAge() → this = matilda.
Person.prototype.calcAge = function () {
  return 2037 - this.birthYear; // returns value instead of logging — now usable inside other methods
};

Person.prototype.printInfo = function () {
  console.log(`Hi i am ${this.firstName} and i am ${this.calcAge()} years old`);
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);

console.log(jonas.calcAge()); // 46 — jonas has no calcAge, JS walks up __proto__ and finds it on Person.prototype
matilda.printInfo(); // this = matilda throughout both printInfo and the calcAge call inside it

// Every object has __proto__ — the actual link to its prototype.
// jonas itself has no calcAge — JS walks up to __proto__ and finds it there.
console.log(jonas.__proto__);

// true — they're the same object in memory.
// Person.prototype IS the object that jonas.__proto__ points to.
console.log(jonas.__proto__ === Person.prototype);

// Same check, different syntax. true.
console.log(Person.prototype.isPrototypeOf(jonas));

// false — easy to misread this.
// Person.prototype is not the prototype OF the Person function.
// It's the prototype assigned TO instances Person creates.
// Think of it as Person.instancePrototype — the naming is misleading.
console.log(Person.prototype.isPrototypeOf(Person));

// Added AFTER jonas and matilda were created — yet both can access it.
// The prototype is a live link, not a snapshot taken at creation time.
// JS looks up the chain at the moment of access, finding it here.
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // both: 'Homo Sapiens'

// true — firstName was set via `this.firstName` directly on the object.
console.log(jonas.hasOwnProperty('firstName'));

// false — species lives on Person.prototype, not on jonas.
// Jonas can ACCESS it by walking the chain, but he doesn't OWN it.
console.log(jonas.hasOwnProperty('species')); */

//===================PROTOTYPE INHERITANCE====================
/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

Person.prototype.printInfo = function () {
  console.log(`Hi i am ${this.firstName} and i am ${this.calcAge()} years old`);
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// Climbing the chain manually: Person.prototype → Object.prototype → null
console.log(jonas.__proto__); // Person.prototype — methods like calcAge live here
console.log(jonas.__proto__.__proto__); // Object.prototype — top of chain, hasOwnProperty etc. live here
console.log(jonas.__proto__.__proto__.__proto__); // null — chain ends here

// .constructor points back to the function that created this prototype
//console.dir lists properties of a JS object
console.dir(Person.prototype.constructor); // logs Person() itself — circular reference back to the constructor

const arr = [3, 4, 3, 6, 6, 8, 9, 12, 3, 8];
// Arrays also follow the prototype chain — arr → Array.prototype → Object.prototype → null
console.log(arr.__proto__); // Array.prototype — where map, filter, reduce etc. live
console.log(arr.__proto__ === Array.prototype); // true — confirms the link
console.log(arr.__proto__.__proto__); // Object.prototype — arrays are objects too
console.log(arr.__proto__.__proto__.__proto__); // null

//DO NOT DO THIS !
// Extending built-in prototypes pollutes ALL arrays globally — breaks third-party code and future JS updates
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// DOM elements have a deep chain — each level adds more specific behaviour
const h1 = document.querySelector('h1');
console.dir(h1); //h1
console.dir(h1.__proto__); //HTMLHeadingElement
console.dir(h1.__proto__.__proto__); //HTMLElement
console.dir(h1.__proto__.__proto__.__proto__); //Element
console.dir(h1.__proto__.__proto__.__proto__.__proto__); //Node
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget — addEventListener lives here
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //Object
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__,
); //null

// Functions are objects too — they have their own prototype chain
const incrementor = x => x + 1;
console.dir(incrementor); //incrementor()
console.dir(incrementor.__proto__); //anonymous — Function.prototype (call, bind, apply live here)
console.dir(incrementor.__proto__.__proto__); //Object — functions are objects at the end of the day
console.dir(incrementor.__proto__.__proto__.__proto__); //null
 */

// =================== ES6 Classes ====================
/* // Syntactic sugar over prototypal inheritance — classes don't introduce a new OOP model
// Under the hood it's still prototypes, just cleaner syntax

// class expression (same as a function expression — assigned to a variable)
const PersonEx = class {};

// class declaration (same as a function declaration)
class Person {
  species = 'Homo Sapiens'; // public field — set directly on each instance, NOT on prototype

  constructor(firstName, birthYear) {
    // runs automatically when `new Person()` is called
    // `this` refers to the newly created instance
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods defined here are added to Person.prototype — shared across all instances
  // NOT copied to each instance, saving memory
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  printInfo() {
    console.log(`Hi I am ${this.firstName} and i am a ${this.species}`);
  }
}

const jessica = new Person('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

// confirms that jessica's prototype IS Person.prototype
// this is how jessica can access calcAge(), greet() etc.
console.log(jessica.__proto__ === Person.prototype); // true

// you can still manually add methods to the prototype outside the class — works the same way
Person.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
jessica.greet();
jessica.printInfo();

// Key things to know about classes:
// 1. Not hoisted — unlike function declarations, you can't use a class before it's defined
// 2. First-class citizens — can be passed into and returned from functions
// 3. Always run in strict mode — no accidental globals or silent errors */

// =================== ES6 Classes ====================
