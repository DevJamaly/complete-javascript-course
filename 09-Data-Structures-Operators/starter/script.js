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

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [`sat`]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// const openingHours = {
//   thu: {
//     open: 12,
//     close: 22,
//   },
//   fri: {
//     open: 11,
//     close: 23,
//   },
//   sat: {
//     open: 0, // Open 24 hours
//     close: 24,
//   },
// };

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //ES6 enhanced object literals allows us to add object literals into another just by using the same variable name
  openingHours,

  order(starterIndex, mainIndex) {
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

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(
      `Customer ordered Pizza with ${mainIngredient} ${otherIngredients.length > 0 ? `and ${otherIngredients}` : `only`}`,
    );
    // console.log(mainIngredient);
    // console.log(otherIngredients);
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
/* const arr = [7, 8, 9];
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
console.log(restaurantCopy.name, restaurant.name); */

//----------------REST PATTTERN AND PARAMETERS------------------------
/* //1)==========DESTRUCTURING=========
//While spread operator expands an array into its individual elements the rest pattern uses the exact same syntax to collect multiple elements and condense them into an array
const arr = [1, 2, ...[3, 4]]; //This is spread operator since its on the right side of '='
console.log(arr);

//This is rest syntax since on the left side of '='
//Here using rest patterns takes the remaining elements of the array and combines them into the others array
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const allFoods = [...restaurant.mainMenu, ...restaurant.starterMenu];
//The rest syntax gathers all the remaining elements and not any skipped ones. Thus it has to be last in the de-structuring assignment and there can only be one
const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(allFoods);
console.log(pizza, risotto, otherFood);

//OBJECTS
// const { sat, ...weekdays } = restaurant.openingHours;
const {
  openingHours: {
    sat: {},
    ...weekdays
  },
} = restaurant;
console.log(weekdays);

//2)==========FUNCTIONs=========
//We will use REST parameters to get n number of arguments
//Here the REST syntax in the parameter is taking all arguments and packing it into an array
function add(...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
  return sum;
}

add(2, 3);
add(5, 3, 7, 2);

const x = [23, 5, 7];
add(...x); //we use spread opterator to unpack the array to arguments

restaurant.orderPizza(
  'perpperoni',
  'mushrooms',
  'meatballs',
  'pizza sauce',
  'capsicum',
);
restaurant.orderPizza('mushrooms'); */

//----------------SHORT CIRCUITING (&& AND ||)------------------------
/* //logical operators can:
//1. use ANY data type
//2. return ANY data type
//3. they can do short-circuiting OR short-circuit evaluation

console.log(`-----------OR------------`);
//When using OR logical operator if the first operand is a truthy value then it will immediately return that
console.log(3 || 'Taha'); //this will give 3 as the answer, showing us that we dont only have to use boolean values with these logical operators
console.log('' || 'Taha'); //Will give Taha since empty string is a falsey value
console.log(true || 0); //True is truthy value and will be returned immediately
console.log(undefined || null); //Undefined is falsey value but since null (falsey) is the only one left that is returned

//OR will keep short-circuiting until it gets to a truthy value and return that
console.log(undefined || 0 || '' || null || 'Hello' || 23 || null);

//If the number of guests is zero then both condition checks will fail since 0 is falsey value
restaurant.numGuests = 0;

//Here we check if NumGuests exists in retaurant and if not then return 10
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//This does the same as above. NumGuests is falsey so it short-circuits OR and returns 10
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log(`-----------AND------------`);
//The AND operator short-cricuits when the first value is falsey and returns that value immediately without even evaluating the next value
console.log(0 && 'Taha'); //This will return 0 since 0 is falsey and its returned
console.log(7 && 'Taha'); //This will return 'Taha' since 7 is truthy and so it moves to the next one and returns that

//The AND operator keeps going on truthy values until it hits a falsey and returns that or hits the last value and returns that
console.log('Hello' && 23 && null && 'taha');

//Here we are checking if orderPizza (method) exists and then calling it
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

//We do the same thing here as above if restauran.orderPizza is truthy (exists) then the next part is evaluated and returned calling the function
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach'); */

//----------------NULLISH COALESCING OPERATOR------------------------
/* //If the number of guests is zero then both condition checks will fail since 0 is falsey value
restaurant.numGuests = 0;

//Here we check if NumGuests exists in retaurant and if not then return 10
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

//This does the same as above. NumGuests is falsey so it short-circuits OR and returns 10
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

//Nullish coalescing operator works with null-ish values rather than false-y values
//Nullish values : null and undefined (NOT 0 or '')
//Besides that it works the same as OR logical operator
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); */

//----------------MODERN OPERATORS------------------------
/* const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
  isOpen: false,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
  isOpen: true,
};

///-----LOGICAL OR ASSIGNMENT OPERATOR
// //Here we are checking if restuarant has numGuests property and if not assign a default value
// rest1.numGuests = rest1.numGuests || 10;

// //Using the OR assignment operator we can do the same thing as above in shorthand
// rest2.numGuests ||= 10;

///-----NULLISH ASSIGNMENT OPERATOR
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

///-----LOGICAL AND ASSIGNMENT OPERATOR
//Here we short-circuting && and if the rest2owner exists (truthy) then we set it to anonymous
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

//Logical AND assignemnt operator will assign a value to a variable if its truthy
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

//IN CONCLUSION
//AND will find true and assign it
//OR will find false and assign it
//Nullish will find null/undefined and assign it

console.log(rest1);
console.log(rest2); */

//----------------FOR OF LOOP------------------------
/* const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//This loop iterates over all the items in the array and gives them as elements.
//Its abstracted so that we dont need to keep track of counters etc.
//It also gives us access to continue and break
for (const item of menu) {
  console.log(item);
}

//The entries function returns an array that consits of array element wherein each elemnt has the array item and its index
// console.log([...menu.entries()]);
// for (const item of menu.entries()) {
//   // console.log(item);
//   console.log(`${item[0]}: ${item[1]}`);
// }
//We can de-structure the array item from entries as seperate variables for easier access
for (const [i, item] of menu.entries()) {
  console.log(`${i + 1}: ${item}`);
} */

//----------------ENHANCED OBJECT LITERALS------------------------
//ES6 enhanced object literals allows us to add object literals into another just by using the same variable name

//For methods now we dont need to declare the 'function' keyword !
// order: function (p1, p2) {} --> order(p1,p2){}

//We can compute property names instead of having to write them down literally
