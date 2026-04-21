const country = "United Arab Emirates"; 
const contient = "Asia"
let population = 11.5;
const isIsland = false;
let language;

console.log("I live in " + country + " located in " + contient + " with a population of " + population + " million");

console.log("isIsland: " + isIsland + " | " + typeof(isIsland));
console.log("population: " + population + " | " + typeof(population));
console.log("country: " + country + " | " + typeof(country));
console.log("language: " + language + " | " + typeof(language));

language = "Arabic";
console.log("language: " + language + " | " + typeof(language));

// isIsland = true;

console.log(`population split = ${population/2} million`);
console.log(`increased population = ${population+1} million`);
console.log(`is ${country} population more than Finland ? = ${population > 6}`);
console.log(`is ${country} population less than average ? = ${population < 33}`);
console.log(`${country} is in ${contient}, and its ${population} miilion people speak ${language}`);