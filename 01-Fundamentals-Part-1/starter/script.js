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