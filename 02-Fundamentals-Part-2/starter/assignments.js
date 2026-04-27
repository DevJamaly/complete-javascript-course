'use strict';

// --------------FUNCTIONS---------------
/* function describeCountry(country, population, capitalCity) {
    const description = `${country} has ${population} million people and its capital city is ${capitalCity}`;
    return description;
}

const descPortugal = describeCountry('Portugal', 10, 'Lisbon');
const descGermany = describeCountry('Germany', 83, 'Berlin');
const descFinland = describeCountry('Finland', 6, 'Helsinki');

console.log(`
${descPortugal}
${descGermany}
${descFinland}
    `) */

// --------------FUNCTION EXPRESSIONS---------------    
function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

/* const percentageOfWorld2 = function (population) {
    return (population / 7900) * 100;
}

const percPortugal1 = percentageOfWorld1(10);
const percChina1 = percentageOfWorld1(1441);
const percUSA1 = percentageOfWorld1(332);

console.log(percPortugal1, percChina1, percUSA1);

const percPortugal2 = percentageOfWorld2(10);
const percChina2 = percentageOfWorld2(1441);
const percUSA2 = percentageOfWorld2(332);

console.log(percPortugal2, percChina2, percUSA2);

const percentageOfWorld3 = population => (population / 7900) * 100;

const percPortugal3 = percentageOfWorld3(10);
const percChina3 = percentageOfWorld3(1441);
const percUSA3 = percentageOfWorld3(332);

console.log(percPortugal3, percChina3, percUSA3); */

// --------------NESTED FUNCTIONS--------------- 
/* function describePopulation(country, population) {
    return `${country} has ${population} million people, which is about ${percentageOfWorld1(population)}% of the world`;
}

console.log(describePopulation('Portugal', 10));
console.log(describePopulation('China', 1441));
console.log(describePopulation('USA', 332));

// --------------ARRAYS--------------- 
const populations = [10, 1441, 332, 11.5];
console.log(`Array has 4 elements: ${populations.length === 4}`);
const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];
console.log(percentages); */

// --------------ARRAY METHODS--------------- 
/* const neighbours = ['Germany', 'Czechia', 'Slovakia', 'Hungary', 'Slovenia', 'Italy', 'Switzerland', 'Liechtenstein'];
console.log(neighbours);

neighbours.push('Utopia');
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes('Germany')) console.log(`Probably not a central european country :D`);

neighbours[2] = 'United Slovakia';
console.log(neighbours); */


// --------------OBJECTS--------------- 
/* const myCountry = {
    country: 'United Arab Emirates',
    capital: 'Abu Dhabi',
    language: 'Arabic',
    population: 11.5,
    neighbours: ['Oman', 'Bahrain', 'Saudi Arabia', 'Kuwait', 'Qatar'],
    describe: function () {
        console.log(`${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`);
    },
    checkIsland: function () {
        this.isIsland = this.neighbours.length > 0;
    }
}

myCountry.population += 2;
myCountry['population'] -= 2;

console.log(`${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`);

myCountry.describe();
myCountry.checkIsland();
console.log(myCountry.isIsland); */

// --------------OBJECT METHODS--------------- 
/* const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

if (john.calcBMI() > mark.calcBMI()) {
    console.log(`${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`);
} else {
    console.log(`${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`);
}*/

// --------------FOR LOOPS--------------- 
// for (let index = 0; index < 50; index++) {
//     console.log(`Voter number ${index + 1} is currently voting`);
// }

/* const populations = [10, 1441, 332, 11.5];
const percentages = [percentageOfWorld1(populations[0]), percentageOfWorld1(populations[1]), percentageOfWorld1(populations[2]), percentageOfWorld1(populations[3])];
const percentages2 = [];
for (let i = 0; i < populations.length; i++) {
    const population = populations[i];
    percentages2.push(percentageOfWorld1(population));
}
console.log(percentages);
console.log(percentages2); */

// --------------REVERSE AND NESTED LOOPS--------------- 
/* const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

for (let i = 0; i < listOfNeighbours.length; i++) {
    const element = listOfNeighbours[i];
    for (let j = 0; j < element.length; j++) {
        const neighbour = element[j];
        console.log(`Neighbour: ${neighbour}`);
    }
} */

// --------------WHILE LOOPS--------------- 
const listOfNeighbours = [['Canada', 'Mexico'], ['Spain'], ['Norway', 'Sweden', 'Russia']];

let i = 0;
while (i < listOfNeighbours.length) {
    const element = listOfNeighbours[i];
    let j = 0;
    while (j < element.length) {
        const neighbour = element[j];
        console.log(`Neighbour: ${neighbour}`);
        j++;
    }
    i++;
}


//--------------CHALLENGE #4--------------
// Let's improve Steven's tip calculator even more, this time using loops!

// Your tasks:
// - Create an array called bills containing all 10 test bill values.
// - Create empty arrays for the tips and the totals (tips and totals)
// - Use the calcTip function we wrote before (included in the starter code) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!


// TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86, and 52.


// BONUS:
// Write a function calcAverage which takes an array called arr as an argument. This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it if you feel like it:
// First, you will need to add up all values in the array. To do the addition, start by creating a variable sum that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the sum variable. This way, by the end of the loop, you have all values added together.
// To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements).
// Call the function with the totals array.

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}

/* Write your code below. Good luck! 🙂 */
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

for (let i = 0; i < bills.length; i++) {
    const billValue = bills[i];
    const tip = calcTip(billValue);
    tips.push(tip);
    totals.push(billValue + tip);
}
console.log(bills);
console.log(tips);
console.log(totals);

function calcAverage(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++)
        sum += arr[i];
    return sum / arr.length;
}

console.log(calcAverage(totals));