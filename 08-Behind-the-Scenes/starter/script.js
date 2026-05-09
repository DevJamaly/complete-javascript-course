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
console.log(this); //In glboal scope 'this' is the window object

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
f(); //Since we removed the function from the object the 'this' points to nothing causing errors in accessing variables in the 'this' scope
