'use strict';

// --------------STRICT MODE---------------
/* let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log(`I can drive`);

//Reserved words cause errors
// const interface = 'Audio';
// const private = 534; */


// --------------FUNCTIONS---------------
/* function logger() {
    console.log(`My name is Taha`);
}

//calling / running / inovking a function 
logger();

function fruitProcessor(appleCount, orangeCount) {
    console.log(appleCount, orangeCount);
    const juice = `Juice with ${appleCount} apples and ${orangeCount} oranges`;
    return juice;
}

const myJuice = fruitProcessor(5, 0);
console.log(myJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice); */

// --------------FUNCTION EXPRESSIONs---------------
const myAge = calculateAge(1996);

//function declaration is where we use the 'function' keyword to declare a function 
//A function declaration can be done after its usage. Although might not be a good idea
function calculateAge(birthYear) {
    return 2037 - birthYear;
}

// This is an anonymous function attached to an expression (Function expression)
//Remember expression must return a value and so does this function
//Functions are values in JS and thus can be saved accordingly
//A function expression cannoot be made after is usage
const calculateAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const myAge2 = calculateAge2(1996);
console.log(myAge, myAge2);
