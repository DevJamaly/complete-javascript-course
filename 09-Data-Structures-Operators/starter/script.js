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

  //In this function we are taking an object as a parameter and de-structuring it immediately to get the variables.
  //We can also define default values for the de-structured variables
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order Recived! ${this.starterMenu[starterIndex]}, ${this.mainMenu[mainIndex]}. Will be delivered to ${address} at ${time}`,
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is you delicious paste with ${ing1}, ${ing2} and ${ing3}`,
    );
  },
};

//----------------ARRAY DESTRUCTURING------------------------
/* //This is a method to break down array and extract data from it into variables
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
console.log(first, second, third); */

//----------------OBJECT DESTRUCTURING------------------------
/* //When de-structuring objects we need to make sure that variables are named the same as properties and they will be assigned accordingly
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//We can give the property name as an alias and use it to initialize variables with different names.
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//We can even give default values to the destructured variables
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables
let a = 111;
let b = 999;
let first = 1;
let second = 2;
const obj = { a: 23, b: 7, c: 14 };

//To mutate/assign values of a de-structured object to a existing variable we need to wrap the whole assignment in a circular brackets
({ a, b } = obj);
console.log(a, b);

//We can also use aliasing to assign the de-structured values to differently names variables
({ a: first, b: second } = obj);
console.log(first, second);

//Nested objects destructuring
const {
  openingHours: { fri: friday },
} = restaurant;

const {
  openingHours: {
    fri: { open: openingTime, close: closingTime },
  },
} = restaurant;

console.log(friday, openingTime, closingTime);

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Masakin Mohammediyah, Al Warqa 1',
  starterIndex: 1,
}); */

//----------------SPREAD OPERATOR------------------------
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

//The spread operator takes out the values from the array and appends it in the location provided
//We can use the spread operator wherever we would manually write multiple values
//The spread operator cannot be used instead of de-structuring since it doesnt create variables for us and just gives us all the individual values
const newArr = [1, 2, ...arr];
console.log(newArr);
//We can also use the spread operator to print out the indiviual elements in the array
console.log(...newArr);

const updatedMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(...updatedMenu);

// shallow copy of arrays can be created using spread operators just like with objects
const mainMenuCopy = [...restaurant.mainMenu];
console.log(mainMenuCopy);

//We can also merge two arrays together using the spread operator
const mergedMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(mergedMenu);

//Spread operator works on all 'iterables'
//Iterables : arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, "'", 's'];
console.log(...letters);

//Here we are creating an array by prompting the user 3 times to enter ingredients data
// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Let's make pasta! Ingredient 2?"),
//   prompt("Let's make pasta! Ingredient 3?"),
// ];
//Then we use the spread operator to send the 3 ingredients as variables to the function seperately
// restaurant.orderPasta(...ingredients);

// OBJECTS
//We can use the spread operator to create a shallow copy of the object and add new properties to it
const newRestaurant = {
  ...restaurant,
  founder: 'Gordon Ramsay',
  name: 'Yowzaa!',
  foundedIn: 1998,
  categories: [...restaurant.categories, 'Tomato'],
};
console.log(newRestaurant);
console.log(restaurant);

//Here we are making a shallow copy of the object. However since we just modify a primitive the changes are not reflected in both the original and the copy.
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Bistro Italiano';
console.log(restaurantCopy.name, restaurant.name);
