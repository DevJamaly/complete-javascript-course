'use strict';

//--------------------VARIABLE SCOPES-------------------
/* // Declared in global scope
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //   console.log(firstName); //Accessing global variable through scope chain
  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const firstName = 'Moiz'; // JS will first check variable in current scope before scope chain
      const str = `Oh you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      output = 'NEW OUTPUT'; // modifying the parent variable in the child scope
    }

    // console.log(str); This is reference error since we are outside of the block scope
    console.log(`Are Millenial ? ${millenial}`); // This is accessible since var is function scoped and doesn't care about block scope at all !
    //console.log(add(20, 30)); //Functions are also block scope as long as we use strict mode
    console.log(output);
  }
  printAge();

  return age;
}

// calcAge(1996); //We get a reference error here because in linear execution we haven't come across the firstName variable yet !
const firstName = 'Taha';
calcAge(1996); */

//--------------------HOISTING AND TDZ-------------------
/* // Variable hoisting
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Taha';
let job = 'Programmer';
const year = 1996;

//Functions

console.log(addDecl(2, 3)); //Runs correctly since its hoisted and can run before initialization
// console.log(addExpr(2, 3)); //Reference error ! acts as a variable which is uninitialized.
// console.log(addArrow(2, 3)); //Shows not a function since var is hoisted but is undefined.

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

//Example on the dangers of 'var'

//We want to check if numProducts is 0 which is a falsey value so we delete the shopping cart
if (!numProducts) deleteShoppingCart(); // This runs and deletes cart since undefined is a falsey value and triggers this condition
var numProducts = 10;

function deleteShoppingCart() {
  console.log(`All products deleted!`);
}

var x = 1; //var shows up in the window object!
let y = 2;
const z = 3;

console.log(`X: ${x === window.x}`);
console.log(`Y: ${y === window.y}`);
console.log(`Z: ${z === window.z}`); */

//--------------------The 'THIS' Keyword-------------------
/* console.log(this); //In glboal scope 'this' is the window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // Inside the function scope 'this' is undefined
};
calcAge(1996);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // Inside the arrow function scope 'this' is window object because arrow doesnt have its own 'this' and uses the lexical scope (parent scope 'this' (global scope))
};
calcAgeArrow(1996);

const taha = {
  year: 1996,
  calcAge: function () {
    console.log(this); //'This' inside an object points to the object that called it
    console.log(2037 - this.year);
  },
};
taha.calcAge();

const matilda = {
  year: 2017,
};
matilda.calcAge = taha.calcAge; //assign the calcAge function in taha (a value) to calAge function in matilda
matilda.calcAge(); //Here the 'this' in calcAge will point to matilda since its the object calling that function.

const f = taha.calcAge;
console.log(f);
f(); //Since we removed the function from the object the 'this' points to nothing causing errors in accessing variables in the 'this' scope */

//--------------------'THIs' in Regular and Arrow Functions-------------------
/* var firstName = 'Matilda'; //Var when hoisted puts the variable in the window object.

const taha = {
  firstName: 'Taha',
  year: 1996,
  calcAge: function () {
    console.log(this); //'This' inside an object points to the object that called it
    console.log(2037 - this.year);

    const self = this; //This is a way to preserve the 'this' reference by assigning to a variable within the object literal scope itself.

    // SOLUTION 1
    // Even though this function is inside a METHOD it still acts as a regular function call and thus its 'this' is set to undefined.
    //  const isMillenial = function () {
    //   // console.log(
    //   //   this.year >= 1981 && this.year <= 1996
    //   //     ? 'YOU ARE A MILLENIAL'
    //   //     : 'YOU ARE NOT A MILLENIAL',
    //   // );
    //   console.log(
    //     self.year >= 1981 && self.year <= 1996
    //       ? 'YOU ARE A MILLENIAL'
    //       : 'YOU ARE NOT A MILLENIAL',
    //   );
    // };

    //SOLUTION 2 [ES6+]
    //If you use an arrow function then it uses the 'this' of its parent scope. And inside a METHOD the parent scope is the object literal itself. Allowing us access to the object literal's 'this'
    const isMillenial = () =>
      console.log(
        this.year >= 1981 && this.year <= 1996
          ? 'YOU ARE A MILLENIAL'
          : 'YOU ARE NOT A MILLENIAL',
      );
    isMillenial();
  },
  // When you use the 'this' keyword in arrow functions it will use the parent scope 'this' which for an object literal its parent is global scope. So 'this' becomes window object
  //DO NOT USE ARROW FUNCTIONS AS METHODS
  greet: () => console.log(`Hey ${this.firstName}`),
};
taha.greet();
taha.calcAge(1996);

function addFunc(a, b) {
  console.log(arguments);
  return a + b;
}

const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

addFunc(1, 2); //When sending the arguments to the function we can see them via the 'arguments' keyword
addExpr(3, 4, 8, 12); // You can send more arguments than the paramters defined. In this case all arguments sent can be access by the 'arguments' keyword
addArrow(5, 6); //In arrow methods the 'arguments' keyword is not defined and thus throws an error !
 */

//--------------------OBJECT REFERENCES-------------------
const jessica1 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

//When we assign to another object we dont make a copy instead we assign another reference to the same object in heap
//This is also another reason we can change property values of objects decalred using const, since we are not changing the reference but the object stored in heap
// const marriedJessica = jessica;
// marriedJessica.lastName = 'Davis';

//Modifying a object even within the function yeilds the same result since all references point to the same object in memory
function marryPerson(originalPerson, newLastName) {
  originalPerson.lastName = newLastName;
  return originalPerson;
}
const marriedJessica = marryPerson(jessica1, 'Davis');

console.log('Before:', jessica1);
console.log('After', marriedJessica);

const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
//We are using a spread opreator to make a copy of the jessica2 object which creates a new object in memory
const jessicaCopy = { ...jessica2 };
jessicaCopy.lastName = 'Davis'; //Now that we modify the property we dont mutate the original object

//This however doesnt work because the array is also an object and thus even in the original object it was only a reference which gets copied over!
//So when copying an object the primitives (Level1) are created anew but nested objects (Level2) are just copied over as references ! THIS IS A SHALLOW COPY
// jessicaCopy.family.push('Mary');
// jessicaCopy.family.push('John');

// console.log('Jessica:', jessica2);
// console.log('Jessica Copy:', jessicaCopy);

// DEEPY COPY/CLONE is created using structured clone (new JS) which does a deep copy of the object and now the clone and original have different arrays
const jessicaClone = structuredClone(jessica2);
jessicaClone.family.push('Mary');
jessicaClone.family.push('John');

console.log('Jessica:', jessica2);
console.log('Jessica Clone:', jessicaClone);
