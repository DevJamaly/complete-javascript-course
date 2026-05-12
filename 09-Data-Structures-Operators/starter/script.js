'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

//----------------ARRAY DESTRUCTURING------------------------
//This is a method to break down array and extract data from it into variables
const array = [2, 3, 4];
const a = array[0];
const b = array[1];
const c = array[2];
console.log(a, b, c);

const [x, y, z] = array;
console.log(x, y, z);

let [d, e, f] = array;
d = 10;
console.log(d, e, f);

// we dont need to de-structure all elements in an array we can just get the first 2 or something
// const [first, second] = restaurant.categories;
// console.log(first, second);

//we can also skip one if we leave a blank
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//Swapping variables using a temp
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

//Swapping using de-structuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

//De-structuring function reply that returns an array.
//This allows us to return multiple variables from the function
const order = restaurant.order(2, 0); //Traditional way
console.log(order);

//destructuring before recieving and creating 2 variables
const [starter, mains] = restaurant.order(2, 0);
console.log(starter, mains);

//Destructuring nested arrays
const nested = [2, 4, [5, 6]];
// const [two, , arr] = nested;
// console.log(two, arr);
const [two, , [five, six]] = nested;
console.log(two, five, six);

//we can set default values to destructured variables if we dont know the array length of data
const unknown = [8, 9];
let [first, second, third] = unknown;
console.log(first, second, third); //There is no 3rd element so it shows undefined
[first = 1, second = 1, third = 1] = unknown; //If we set default values then outOfBounds is not undefined
console.log(first, second, third);
