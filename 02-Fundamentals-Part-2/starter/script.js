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
function logger() {
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
console.log(appleOrangeJuice);

