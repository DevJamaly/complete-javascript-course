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
const myCountry = {
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
console.log(myCountry.isIsland);

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

