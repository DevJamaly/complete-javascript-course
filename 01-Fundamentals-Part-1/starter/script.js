/* let js = 'amazing';
if (js === "amazing") alert("Javascript is fun");

let firstName = "Taha"; //Default convention for variable names 
let last_name = "Dama"; //Alternative but not preffered 
let PI = 3.145; // Constant variable naming is all CAPS 
let firstCompany = "B.U.T" 
let myCurrentCompany = "S.B.E"

console.log("my name is " + firstName + " and i work at " + myCurrentCompany); */


// --------------DATA TYPES---------------
/* let jsIsFun = true;

console.log(jsIsFun);
console.log(typeof(jsIsFun));

jsIsFun = 'YES!';
console.log(jsIsFun);
console.log(typeof(jsIsFun));

let year;
console.log(year);
console.log(typeof(year));

year = 1991;
console.log(year);
console.log(typeof(year));

year = null;
console.log(year);
console.log(typeof(year)); */

// --------------VARIABLE DECLARATIONS---------------
/* let age = 30;
age = 31;

const birthYear = 1991;
// birthYear = 1990; // This is an error because const cannot be changed

var job = "Programmmer"; // never use var.
job = "Teacher";

console.log(typeof(job)); */

// --------------BASIC OPERATORS---------------
/* // Math operators
const currentYear = 2037;
const ageJonas = currentYear - 1991;
const ageSarah = currentYear - 2018;
console.log(ageJonas, ageSarah);
// 2**3 means 2 to the power of 3 = 2*2*2
console.log(ageJonas*2, ageJonas/10, 2**3); 

const firstName = 'Taha';
const lastName = 'Jamaly';
console.log(firstName + ' ' + lastName);

// Assignment operators 
let x = 10 + 5; //15
x += 10; // x = x + 10 == 25
x *= 4; // 100
x /= 4; // 25
x++; //26
x--; //25
console.log(x);

// Comparision operators 
console.log(ageJonas > ageSarah); //>, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(currentYear - 1991 > currentYear - 2018); */

// --------------OPERATOR PRECEDENCE---------------
/* const currentYear = 2037;
const ageJonas = currentYear - 1991;
const ageSarah = currentYear - 2018;

console.log(currentYear - 1991 > currentYear - 2018);

let x , y;
x = y = 25 - 10 - 5; // x = y = 10 -> y = 10 -> x = y
console.log(`X: ${x} | Y: ${y}`);

const avgAgeSimple = ageJonas + ageSarah / 2;
const avgAgeBracketed = (ageJonas + ageSarah) / 2;
console.log(`ageJonas: ${ageJonas} | ageSarah: ${ageSarah} | ageAvg: ${avgAgeSimple}`)
console.log(`ageJonas: ${ageJonas} | ageSarah: ${ageSarah} | ageAvg: ${avgAgeBracketed}`)
 */

// --------------STRING AND TEMPLATE LITERALS---------------
/* const firstName = 'Taha';
const job = 'Programmer';
const birthYear = 1996;
const currentYear = 2026;

//string concatination
const taha = "I'm " + firstName + ", a " + (currentYear-birthYear) + " year old " + job;
console.log(taha);

//template literals 
const tahaNew = `I'm ${firstName}, a ${currentYear-birthYear} year-old ${job}`;
console.log(tahaNew);
console.log(`Just a regular string....`);
console.log
(`String with
multiple 
lines`) */

// --------------IF/ELSE STATEMENTS---------------
/* const age = 15;
const isOldEnough = age >= 18;

//Control structure allows code execution flow control
if (isOldEnough) {
    console.log(`Mark can start driving license`);
}else {
    const yearsLeft = 18 - age;
    console.log(`Mark is too young wait another ${yearsLeft} years`);
}

const birthYear = 1996; 
let century;

if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}
console.log(`you are born in the ${century} century`); */

// --------------TYPE CONVERSION AND COERCION---------------
/* // type conversion
const inputYear = '1991';
console. log (Number(inputYear), inputYear);
console. log (Number(inputYear) + 18);

console. log (Number('Jonas'));
console. log(typeof NaN) ;

console. log(String(23), 23);

// type coercion
console.log('I am ' + 23 + ' years old');
console.log('23' - '10' - 3);
console.log('23' / '2');

let n = '1' + 1;
n -= 1;
console.log(n);

let x = 2+3+4+'5';
console.log(x); //95

let y = '10'-'4'-'3'-2+'5';
console.log(y); //15 */

// --------------TRUTHY AND FALSY VALUES---------------
/* //5 Falsy values: 0, '', undefined, null, NaN
//Truthy values: number > 0 and non-empty strings

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean('Jonas'));
console.log(Boolean({}));
console.log(Boolean(10));

const money = 10;
if(money){ console.log("Don't spend it all"); }
else { console.log("You should get a job!"); }

let height = 0;
if(height){
    console.log("YAY! height is defined");
}else {
    console.log("Height is undefined");
} */

// --------------EQUALITY OPERATORS---------------
/* const age = 18; //assignment 
if(age === 18) console.log(`You just became an adult! (strict)`); //strict equality check 
if(age == 18) console.log(`You just became an adult! (loose)`); //loose equality check 

const favourite = Number(prompt("What is your favourtie number?"));
console.log(favourite);
console.log(typeof favourite);

if(!favourite) {
    console.log(`Sorry! Cannot evaluate this`);
}else if(favourite === 23) {
    console.log(`Cool! 23 is an amazing number!`);
}else if (favourite === 7) {
    console.log(`7 is also a cool number!`);
}else {
    console.log("This number is out of range!");
}

if(favourite !== 23) console.log(`Why not 23?`); */

// --------------EQUALITY OPERATORS---------------