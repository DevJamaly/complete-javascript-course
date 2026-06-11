'use strict';

//===================CONSTRUCTOR FUNCTIONS====================
// Constructor function — capital P is a convention to signal
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
