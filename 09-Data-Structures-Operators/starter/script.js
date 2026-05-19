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
/* //ES6 enhanced object literals allows us to add object literals into another just by using the same variable name

//For methods now we dont need to declare the 'function' keyword !
// order: function (p1, p2) {} --> order(p1,p2){}

//We can compute property names instead of having to write them down literally */

//----------------OPTIONAL CHAINING------------------------
/* // console.log(restaurant.openingHours.mon.open);
//When we try to access nested property in an obect we need to make sure all parents exisit!
console.log(restaurant.openingHours.mon && restaurant.openingHours.mon.open);

//In ES6 we can use optional chaining to check if object is not null-ish if so then access it else return undefined making accessing nested properties or objects a lot more easier.
console.log(restaurant?.openingHours?.mon?.open);

for (const day of weekdays) {
  // console.log(day);
  const openingTime = restaurant?.openingHours?.[day]?.open;
  console.log(
    openingTime != null
      ? `Restaurant opens at ${openingTime} on ${day}`
      : `The restaurant doesnt open on ${day}`,
  );
}

//Methods
//We can check if moethods exist using the optional chaining and use the undefined result to show a default value using the nullish coalescing operator
console.log(restaurant?.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant?.orderRisotto?.(0, 1) ?? 'Method does not exist');

//Array
const users = [
  { name: 'Taha', email: 'hello@tjamaly.com' },
  { name: 'Jonas', email: 'hello@jonas.io' },
];
console.log(users[0]?.name ?? 'User array empty');
console.log(users[1]?.name ?? 'User array only has one value');
console.log(users[2]?.name ?? 'User array only has two value'); */

//----------------LOOPING OBJECTS------------------------
/* //Object.keys returns an array of that object's property names
const properties = Object.keys(openingHours);
console.log(properties);

// const openStr = `We are open on ${properties.length} days: ${properties.join(', ')}`;
let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

//Object.values returns an array of that object's values only!
// const values = Object.values(openingHours);
const values = Object.values(restaurant);
console.log(values);

//Object.entries returns an array that contains the property name and values
const entries = Object.entries(openingHours);
console.log(entries);

//Here we take the entries and de-structure it in the loop itself into variables for easy use
for (const [propertyName, { open, close }] of entries) {
  console.log(`On ${propertyName} we open at ${open} and close at ${close}`);
} */

//----------------SETS------------------------
/* //Sets are introduced in ES6
//It is a collection of unique values and cannot have duplicates also the order is irreleveant since they are unique
//Here the orders Set contains duplicates but those are ignored/deleted
const ordersSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto', 'Pizza']);
console.log(ordersSet);

//Even a string is technically an array so we can use it to initialize a set
console.log(new Set('Jonas'));

//This will give us the length of the set (How many elements in it! REMEMBER all elements must be unique)
console.log(ordersSet.size);
//checks if the set contains the given element and returns true or false
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Bread'));
//Add allows you to insert elements into the set (THEY MUST BE UNIQUE or are ignored !)
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet);
//delete allows you to remove elments from the set
ordersSet.delete('Risotto');
ordersSet.delete('Potato');
console.log(ordersSet);

//Set does not have an index we can use to access elements
//It doesnt make sense to retrieve values from a set since they are unique and un-ordered they are mainly used as a dictionary to check if it contains a certain value.
console.log(ordersSet[0]);
//Clear delets all elements in the set and resets it
// ordersSet.clear();
// console.log(ordersSet);

//We can loop over the set! just like any other iterable
for (const order of ordersSet) {
  console.log(order);
}

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
console.log(staff);
//Here we create a new set using the staff array and then we use the spread operator to unpack it and create an array! This way all duplicates are removed and we get a unique elements array
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size);
console.log(new Set('TahaShabbirJamaly').size); */

//----------------MODERN SETS------------------------
/* //Finds the common elements between the two sets and returns a set with those elements
//We can use this to find common elements within arrays! so just convert them to sets and use intersections.
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log([...commonFoods]);
console.log(`Intersection: `, commonFoods);

//The union method takes all the unique elements from either sets and combines them into one set.
const foodFusion = italianFoods.union(mexicanFoods);
//Here we merge both arrays using spread operator, conver it to set and then back to array by using spread operator on the new set created!
const foodFusionArr = [...new Set([...italianFoods, ...mexicanFoods])];
console.log(foodFusionArr);

//The difference method gives us the unique elements present in the calling set and not in the argument set! It returns a set with those unique elements
//Here the order of what set is calling and which is argument matters.It will return the unique values of the one calling and remove any that exist in the argument set
const uniqueItalian = italianFoods.difference(mexicanFoods);
const uniqueMexican = mexicanFoods.difference(italianFoods);
console.log(uniqueItalian, uniqueMexican);

//The symmetric difference method gives us the elements which
const uniqueItalianMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);
console.log(uniqueItalianMexicanFoods);

//There are methods which allow us to know if a set is part of another set (3methods)
// .isSubsetOf(otherSet) Returns true if every element in the calling set exists in otherSet. Think of it as asking "am I fully contained within you?"
const basics = new Set(['tomatoes', 'garlic']);
console.log(basics.isSubsetOf(italianFoods)); // true — both exist in italianFoods

// .isSupersetOf(otherSet) The reverse — returns true if the calling set contains all elements of otherSet. "Do I fully contain you?"
console.log(italianFoods.isSupersetOf(basics)); // true — italianFoods has everything basics has

// .isDisjointFrom(otherSet) Returns true if the two sets have zero elements in common — they're completely separate.
const deserts = new Set(['tiramisu', 'churros']);
console.log(deserts.isDisjointFrom(basics)); // true — no overlap at all
console.log(italianFoods.isDisjointFrom(mexicanFoods)); // false — they share tomatoes and garlic */

//----------------MAPS------------------------
/* // Map is a data structure that stores key-value pairs, similar to objects, but with two key advantages: any value can be used as a key (numbers, booleans, objects, arrays — not just strings), and insertion order is always preserved.
const restMap = new Map();

//You can use set to add entries with key,value pairs and it returns the map!
restMap.set('name', 'Classico Italiano');
restMap.set(1, 'Firenze, Italy');
console.log(restMap.set(2, 'Lisbon, Portugal'));
//Since the set method returns the upadted map we can use it to chain adding entries
restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are close :(');
console.log(restMap);

//The get method can be used to get the value by passing the key as argument. The datatype of the key matters and must be the same!
console.log(restMap.get('name'));
console.log(restMap.get(true));
console.log(restMap.get(1));
//Here we are using the ability to have boolean as keys to code logic using logical operators
const time = 21;
console.log(
  restMap.get(time > restMap.get('open') && time < restMap.get('close')),
);

//checks if the key exists in the map and return true or false
console.log(restMap.has('categories'));

//delete allows us to remove entries from the map! it return boolean for whether the deletion was sucessful or not !
//Object properties can also be deleted using the delete operator but its an expensive and slow operation and is not recommended
console.log(restMap.delete(2));
console.log(restMap.size); // number of entries
console.log(restMap.clear()); // wipe everything

const arr = [1, 2];
// restMap.set([1, 2], 'Test');
restMap.set(arr, 'Test');
console.log(restMap);
console.log(restMap.get([1, 2])); //Doesnt work because the arrays are objects and the 2 arrays are different objects and thus different references !
console.log(restMap.get(arr)); //This now works because we are passing the same reference

//This line uses a DOM element as a key — something only a Map can do.
restMap.set(document.querySelector('h1'), 'Heading');
console.log(restMap);

//The most practical use case is storing metadata or state about DOM elements without touching the elements themselves.
//Instead of stuffing extra data into the element via custom attributes like data-click-count, you keep it cleanly stored in the Map and just use the element as the lookup key. The element is the reference — so as long as it exists in the DOM, you can always retrieve its associated data with elementMap.get(btn).
// const elementMap = new Map();

// const btn = document.querySelector('button');
// elementMap.set(btn, { clickCount: 0, isDisabled: false });

// btn.addEventListener('click', () => {
//   const data = elementMap.get(btn);
//   data.clickCount++;
//   console.log(`Clicked ${data.clickCount} times`);
// });

const question = new Map([
  ['question', 'What is the best programming language in the world ?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);

//The map initialization and structure is very similar to object.entries which consts of an array containing elements each with a key(property) and a value
console.log(Object.entries(openingHours));
// You can convert an object to a map very simply by initialzing a new map and using the Object.entries as the argument
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number.parseInt(prompt('Select one of the answers 1,2 or 3'));
console.log(question.get(answer === question.get('correct')));

//Convert map to an array by just using spread operator an unpacking the map into an array
console.log([...question]);
console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]); */

//----------------STRINGS------------------------
/* const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);
console.log(airline.length);
console.log('B737'.length);

//indexOf returns the index of the first occurence of the given substring or -1 if it doesnt exist
console.log(airline.indexOf('r'));
//indexOf returns the index of the last occurence of the given substring or -1 if it doesnt exist
console.log(airline.lastIndexOf('r'));
//Remember the searching of substring is case sensitive
console.log(airline.indexOf('Portugal'));
//slice returns a substring and takes a start and end index
//note that it returns a new string and doesnt mutate the original string. You cannot mutate primitive string!
console.log(airline.slice(4));
//It starts(inclusive) at index 4 and ends(exclusive) at index 6
//The length of the substring will always be end-start => 7-4=3
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' '))); //From beginning to first space (first word)
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //From last space +1 (to remove space) to end of string (last word)
//giving a negative start/end position will start the index reverse from the end
//So -2 is the same as length - 2
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

function checkMiddleSeat(seat) {
  //B ane E are middle seats
  const seatID = seat.slice(-1);
  if (seatID === 'B' || seatID === 'E')
    console.log('You got the middle seat 😒');
  else console.log(`You got lucky 😎`);
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// When you access a method or property on a string primitive in JavaScript (like "hello".toUpperCase()), JS temporarily wraps that primitive in a String object — this is called boxing — giving it access to all the methods on String.prototype. The moment the operation is done, that wrapper object is thrown away. This exists because primitives are intentionally lightweight (just raw values in memory), but the language still wants them to behave conveniently like objects when needed, so boxing quietly bridges that gap without you ever having to think about it.
console.log('hello'.toUpperCase());
// JS secretly does:
console.log(new String('hello').toUpperCase()); // → "HELLO"
// then immediately discards the wrapper object
console.log(typeof new String('taha'));
//REMEMBER! all string methods return a primitive string
console.log(typeof new String('taha').toUpperCase());

console.log(airline.toLowerCase());
console.log('taha'.toUpperCase());

//Fix capitalization in name
const passenger = 'tAhA';
fixPassengerNames(passenger);
// const passengerLower = passenger.toLowerCase();
// const passengerCorrect =
//   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// console.log(passengerCorrect);

function fixPassengerNames(passengerName) {
  const passengerNameLower = passengerName.toLowerCase();
  return passengerNameLower[0].toUpperCase() + passengerNameLower.slice(1);
}

//Check email
const email = 'hello@tjamaly.com';
const loginEmail = '  Hello@TJamaly.com  \n';
console.log(compareEmail(email, loginEmail));
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

function compareEmail(emailEntry1, emailEntry2) {
  const normalizedEmail1 = emailEntry1.toLowerCase().trim();
  const normalizedEmail2 = emailEntry2.toLowerCase().trim();
  return normalizedEmail1 === normalizedEmail2;
}

//replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceGB, priceUS);

const announcement =
  'All pasengers please come to boarding door 23, Boarding door 23!';
//Replace only replaces the first occurence of the sub string !
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate')); //This will replace all occurences

//Regular Expression
console.log(announcement.replace(/door/g, 'gate'));

//Booleans
const planeA = 'Airbus 320 neo';
console.log(planeA.includes('A320')); //It is case sensitive
console.log(planeA.includes('Boeing'));
console.log(planeA.startsWith('Air'));

if (planeA.startsWith('Airbus') && planeA.endsWith('neo'))
  console.log('PlaneA is part of the new Airbus family');
else console.log('PlaneA is not part of the new Airbus family');

// Exmaples
const checkBaggage = function (items) {
  console.log(items);
  const baggae = items.toLowerCase();
  if (baggae.includes('knife') || baggae.includes('gun'))
    console.log(`You are NOT allowed on board`);
  else console.log(`Welcome aboard!`);
};
checkBaggage('I have a laptop, some Food and a pocket kNiFe');
checkBaggage('I have some soCks and Camera');
checkBaggage('Got some snaCKs and a Gun for protection');

//Split and Join
//Split breaks the string into an array of substrings based on the divider string
console.log('a+very+nice+string'.split('+'));
console.log('Taha Shabbir Dama'.split(' '));
const [firstName, lastName] = 'Taha Dama'.split(' ');
console.log(firstName, lastName);
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

function capitalizeNames(name) {
  console.log(name);
  const names = name.toLowerCase().trim().split(' ');
  console.log(names);
  const namesUpper = [];
  // for (let n of names) namesUpper.push(n[0].toUpperCase() + n.slice(1));
  for (let i = 0; i < names.length; i++)
    names[i] = names[i].replace(names[i][0], names[i][0].toUpperCase());
  // names = names.map(word => word[0].toUpperCase() + word.slice(1));
  // name = names.join(' ');
  // console.log(namesUpper.join(' '));
  console.log(names.join(' '));
}
capitalizeNames('jessica ann smith davies');
capitalizeNames('tAha shAbbIr Jamaly');

//Padding a string
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '-'));

function maskCreditCard(number) {
  let ccString = number + '';
  ccString = ccString.slice(-4).padStart(ccString.length, '*');
  return ccString;
}

console.log(maskCreditCard(2345672635478234));
console.log(maskCreditCard('5634892764091824'));

//REPEAT
const message2 = 'Bad weather... All Departures delayed \n';
console.log(message2.repeat(5));

function planesInLine(n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
}

planesInLine(8);
planesInLine(3);
planesInLine(18);
*/

//----------------STRINGS CHALLENGE------------------------
const flightsData = flights
  .toLowerCase()
  .split('+')
  .map(word => word.trim().slice(1));
// console.log(flightsData);

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flightData of flightsData) {
  let [type, from, to, time] = flightData.split(';');
  type = type
    .split('_')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
  type = type.startsWith('Delayed') ? '🔴 ' + type : type.trim();
  from = getCode(from);
  to = getCode(to);
  time = time.replace(':', 'h');
  const output = `${type} from ${from} to ${to} (${time})`.padStart(50, ' ');
  console.log(output);
  // console.log(type, from, to, time);
}
