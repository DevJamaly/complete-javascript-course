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
//Callback functions make it easy to split and re-use code
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
['Jonas', 'Martha', 'Adam'].forEach(logHighFive);
