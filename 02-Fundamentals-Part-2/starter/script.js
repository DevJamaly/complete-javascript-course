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
/* const myAge = calculateAge(1996);

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
console.log(myAge, myAge2); */

// --------------ARROW FUNCTIONS---------------
/* const calculateAge2 = function (birthYear) {
    return 2037 - birthYear;
}

//Arrow function. In it the value is returned implicitly
//Used mainly for one liner functions
const calculateAge3 = birthYear => 2037 - birthYear;
const age3 = calculateAge3(1996);
console.log(age3);

//In case of an arrow function if you have brackets you have to return explicitly
const yearsUntilRetirement = (birthYear, retirementAge) => {
    const age = 2037 - birthYear;
    return retirementAge - age;
}
console.log(yearsUntilRetirement(1996, 70)); */

// --------------FUNCTION NESTING---------------
/* function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
    return juice;
}

console.log(fruitProcessor(2, 3)); */

// --------------ARRAYS---------------
/* const friend1 = 'Michael';
const friend2 = 'Steven';
const friend3 = 'Peter';

const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);
console.log(friends[0], friends[2]);
console.log(years[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

// We can mutate the array by changing the values in it. Also non-primitive values stored in const can still be mutated
friends[2] = 'Jay';
console.log(friends);
// friends = ['Bob', 'Alice']; //This is illegal

// For data within an array JS just expects an expression (somthing that will return/produce a value)
const currentYear = 2037;
const taha = ['Taha', 'Jamaly', currentYear - 1996, 'Programmer', friends];
console.log(taha);

//Excercise
const calcAge = function (birthYear) {
    return currentYear - birthYear;
}

const calcYears = [1990, 1967, 2002, 2010, 2018];
//Cannot pass an array as argument to a variable parameter declaration
// console.log(calcAge(calcYears));

const age1 = calcAge(calcYears[0]);
const age2 = calcAge(calcYears[1]);
const age3 = calcAge(calcYears[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(calcYears[0]), calcAge(calcYears[1]), calcAge(calcYears[years.length - 1])];
console.log(ages); */

// --------------ARRAY METHODS---------------
/* const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay'); //Adds elements to the end of the array and return new length of the array
console.log(friends);
console.log(newLength);

friends.unshift('John'); //Adds element to the start of the array
console.log(friends);

const popped = friends.pop(); //Removes last element from the array and returns the removed element
console.log(friends);
console.log(popped);

const firstElement = friends.shift(); //Removes first element from the array and returns it
console.log(friends);
console.log(firstElement);

console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));

friends.push(23);
console.log(friends.includes('Steven')); //Does strict check to compare
console.log(friends.includes('Bob'));
console.log(friends.includes('23'));

if (friends.includes('Peter')) console.log(`You have a friend called Peter`); */

// --------------OBJECTS---------------
/* const currentYear = 2037;
const friends = ['Michael', 'Steven', 'Peter'];
const tahaArray = ['Taha', 'Jamaly', currentYear - 1996, 'Programmer', friends];

const taha = {
    firstName: 'Taha',
    lastName: 'Jamaly',
    age: currentYear - 1996,
    job: 'Programmer',
    friends: friends
};

console.log(taha);
//If you use dotNotation to access an un-existing property you get undefined
console.log(taha.lastName);
console.log(taha['friends']);

const nameKey = 'Name';
console.log(taha[`first${nameKey}`]);
console.log(taha[`last${nameKey}`]);

const propertyKey = prompt("What do you wanna know about user? Choose between firstName, lastName, age, job and friends");
//If you use bracket notation to access an un-existing property you get undefined
if (taha[propertyKey]) console.log(`Showing user's ${propertyKey}: ${taha[propertyKey]}`);
else console.log(`Wrong Request! Choose between firstName, lastName, age, job and friends`);

taha.location = 'United Arab Emirates';
taha['twitter'] = '@tahaJamaly';
console.log(taha);

console.log(`${taha.firstName} has ${taha.friends.length} friends, and his best friend is called ${taha.friends[0]}`); */

// --------------OBJECT METHODS---------------
const currentYear = 2037;
const friends = ['Michael', 'Steven', 'Peter'];

const taha = {
    firstName: 'Taha',
    lastName: 'Jamaly',
    birthYear: 1996,
    job: 'Programmer',
    friends: friends,
    hasDriversLicense: true,

    //Any function attached to an object is called Method. You cannot do declaration functions
    // calcAge: birthYear => currentYear - birthYear
    // calcAge: function () {
    //     return currentYear - this.birthYear;
    // }
    calcAge: function () {
        this.age = currentYear - this.birthYear;
        return this.age;
    },
    description: function () {
        return `${this.firstName} is ${this.calcAge()}-year old ${this.job}. He has ${this.hasDriversLicense ? 'a' : 'no'} driver's license. He has ${this.friends.length} friends, and his best friend is called ${this.friends[0]}`;
    }
};

// console.log(taha.calcAge());
// console.log(taha['calcAge']());
// taha.calcAge();
// console.log(taha.age);
console.log(taha.description());