// All modules are executed in strict mode
// Importing module

// Despite appearing before the imports in source, this logs SECOND
// Modules are hoisted and evaluated before the importer's own code runs
// Console order: "Exporting Module" → "Importing module"
console.log(`Importing module`);

// ================= Exporting & Importing in ES6 ==================

// Style 1: named imports with renaming aliases
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('shampoo', 10);
// console.log(price, tq);

// Style 2: namespace import — entire module as a single object
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('oranges', 8);
// console.log(ShoppingCart.totalPrice, ShoppingCart.tq);

// Default import — no curly braces; we choose the local name (`add`)
import add from './shoppingCart.js';
add('chocolates', 4);

// Both import statements reference the same module — it's only loaded and evaluated once
// "Mixing exports" (default + named in one module) is valid but considered bad design
import { totalPrice as price, cart } from './shoppingCart.js';
console.log(price); // 237

add('pizza', 2);
add('bread', 4);
add('apples', 8);

// `cart` is a live binding to the same array in shoppingCart.js
// Every add() call mutated it, so all 4 items appear here even though we never pushed directly
console.log(cart);
