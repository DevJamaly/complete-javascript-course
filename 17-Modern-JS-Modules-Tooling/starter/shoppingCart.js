// All modules are executed in strict mode
// Exporting Module
console.log('Exporting Module');

// ================= Exporting & Importing in ES6 ==================

// Not exported → private to this module; unlike scripts, modules don't leak to the global scope
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
}
