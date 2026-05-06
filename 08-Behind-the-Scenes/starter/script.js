'use strict';

// Declared in global scope
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
calcAge(1996);
