const country = "United Arab Emirates";
const contient = "Asia"
let population = 11.5;
const isIsland = false;
let language;
const avgPopulation = 33;

console.log("I live in " + country + " located in " + contient + " with a population of " + population + " million");

//Variable Types
/* console.log("isIsland: " + isIsland + " | " + typeof(isIsland));
console.log("population: " + population + " | " + typeof(population));
console.log("country: " + country + " | " + typeof(country));
console.log("language: " + language + " | " + typeof(language)); */

language = "Arabic";
// console.log("language: " + language + " | " + typeof (language));

//Strings and literal templates
const description = `${country} is in ${contient}, and its ${population} miilion people speak ${language}`;
/* console.log(`population split = ${population/2} million`);
console.log(`increased population = ${population+1} million`);
console.log(`is ${country} population more than Finland ? = ${population > 6}`);
console.log(`is ${country} population less than average ? = ${population < avgPopulation}`);
console.log(description); */

//If-Else
/* if (population > avgPopulation) {
    const resultantPopulation = population - avgPopulation;
    console.log(`${country}'s population is ${resultantPopulation} million above average`);
} else {
    const resultantPopulation = avgPopulation - population;
    console.log(`${country}'s population is ${resultantPopulation} million below average`);
} */

//Conversion & Coercion
/* console.log('9' - '5'); // -> 4
console.log('19' - '13' + '17'); // -> 617
console.log('19' - '13' + 17); // -> 23
console.log('123' < 57); // -> false
console.log(5 + 6 + '4' + 9 - 4 - 2); // -> 117 */

//Equality Operators
/* const numNeighbours = prompt('How many neighbour countries does your contry have?');
// const numNeighbours = Number(prompt('How many neighbour countries does your contry have?'));
if(numNeighbours === 1) console.log('Only 1 border');
else if (numNeighbours > 1) console.log(`More than 1 border`);
else console.log(`No borders`); */

//Logical Operators
if (language === 'English' && population < 50 && !isIsland) console.log(`You should live in ${country}`);
else console.log(`${country} does not meet your criteria`);

//Switch Statements 
switch (language.toLowerCase()) {
    case 'chinese':        
    case 'mandarin':
        console.log(`MOST number of native speakers!`) ; 
        break;
    case 'spanish':
        console.log(`2nd place in number of native speakers`) ;   
        break;
    case 'hindi':
        console.log(`Number 4`) ;    
        break;
    case 'arabic':
        console.log(`5th most spoken language`) ;   
        break;
    case 'english':
        console.log(`3rd place`) ;   
        break;

    default:
        console.log(`Great language too :D`) ;
        break;
}