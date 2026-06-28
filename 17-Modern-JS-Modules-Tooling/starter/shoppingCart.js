// All modules are executed in strict mode
// Exporting Module
console.log('Exporting Module');

// ================= Exporting & Importing in ES6 ==================

/* // Not exported → private to this module; unlike scripts, modules don't leak to the global scope
const shippingCost = 10;

// Named export — shared as a live binding: importers reference this exact same array object
export const cart = [];

// Named export — inline style (exported at the point of declaration)
export const addToCart = function (product, quantity) {
  // Shorthand for { product: product, quantity: quantity }
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

// Named export after declaration — `as` sets the public name; internally still `totalQuantity`
export { totalPrice, totalQuantity as tq };

// Default export — only one allowed per module; anonymous is fine here
// The importer decides what name to use — not the exporting module
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
} */

// ================= AWAIT IN ES2022 ==================

// All three top-level awaits block sequentially — nothing below an await runs until it resolves
// Any module that imports this file will also wait for all of these to finish

console.log(`Start fetching users`); // Runs immediately

// Pauses until the HTTP response headers arrive (body not yet read)
const users = await fetch(`https://jsonplaceholder.typicode.com/users`);

// Pauses again — .json() streams and parses the response body asynchronously
const userData = await users.json();

console.log(userData);
console.log(`Finished fetching users, now processing data`);

// `userData` (callback param) shadows the outer `userData` array — same name, different type inside
// Outer: array of users | Inner: single user object per iteration
userData.forEach(userData => {
  console.log(`${userData.id}: ${userData.name}`);
});
