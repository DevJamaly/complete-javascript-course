// All modules are executed in strict mode
// Importing module

// Despite appearing before the imports in source, this logs SECOND
// Modules are hoisted and evaluated before the importer's own code runs
// Console order: "Exporting Module" → "Importing module"
console.log(`Importing module`);

// ================= Exporting & Importing in ES6 ==================

/* // Style 1: named imports with renaming aliases
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
console.log(cart); */

// ================= AWAIT IN ES2022 ==================

/* // Top-level await — ES2022 only; works in ES modules, not in regular scripts
// This module (and any module that imports it) pauses at each await until resolved

// Raw top-level await: simpler but not reusable — no wrapping function
// console.log(`1. Started operation`);
// const posts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// const data = await posts.json();
// console.log(data);
// console.log(`3. Fetched user posts`);

const getLastPost = async function () {
  const posts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  // fetch() resolves to a Response, not data — .json() is a second async step
  const data = await posts.json();
  console.log(data);
  // .at(-1) → last array element; cleaner than data[data.length - 1]
  return { title: data.at(-1).title, body: data.at(-1).body };
};

// Pre-ES2022 workaround: async functions return Promises, so .then() was the only option at module scope
// getLastPost().then(res => console.log(res));

// ES2022: top-level await unwraps the Promise directly — lastPost is the resolved value, not a Promise
const lastPost = await getLastPost();
console.log(lastPost);

// Static imports are always hoisted regardless of position in source
// ShoppingCart.js is fully evaluated before any code in this module runs
import * as ShoppingCart from './shoppingCart.js'; */

// ================= MODULE PATTERN ==================
/* // The pre-ES6 solution for encapsulation — an IIFE that acts like a module
//
// Problems with this pattern (why ES6 modules exist):
//   1. Still creates a GLOBAL variable (ShoppingCart2) — namespace collisions are possible
//   2. No dependency management — script load order in HTML <script> tags must be manually managed
//   3. No static analysis — tooling/bundlers can't see what depends on what
//   4. No tree-shaking — unused code can't be automatically removed
//
// ES6 modules fix all of this: each file IS its own scope (no globals), imports/exports
// are resolved statically at parse time, and bundlers (Webpack, Rollup) can manage the
// entire dependency graph automatically

const ShoppingCart2 = (function () {
  // Private — accessible only inside this IIFE; function scope is the only "module" JS had pre-ES6
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    // Even after the IIFE exits, this function still reads `cart` and `shippingCost` — see below
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`,
    );
  };

  // Private — not returned, permanently inaccessible outside
  const oderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // This object IS ShoppingCart2 — the public API
  // Primitives (totalPrice, totalQuantity) are VALUE copies — no link back to the originals
  // `cart` is a REFERENCE copy — ShoppingCart2.cart and addToCart's internal `cart` point to the SAME array
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})(); // IIFE: executes once immediately, then its execution context is gone

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);

// HOW IS THIS POSSIBLE? The IIFE finished executing — shouldn't its variables be gone?
//
// CLOSURES: when `addToCart` was created inside the IIFE, it didn't just capture the VALUES
// of `cart` and `shippingCost` — it captured a live reference to the IIFE's entire variable
// environment (its "backpack"). As long as `addToCart` exists and is reachable (via ShoppingCart2),
// the JS engine cannot garbage-collect that environment. The IIFE's scope lives on invisibly.
//
// WHY cart shows the pushed items:
// `ShoppingCart2.cart` and `addToCart`'s closed-over `cart` are the SAME array in memory —
// not two copies. addToCart mutates it via push(), and ShoppingCart2.cart reflects that instantly.
console.log(ShoppingCart2.cart); // [{product: 'apple', quantity: 4}, {product: 'pizza', quantity: 2}]

// undefined — shippingCost was never returned; the closure hides it permanently
console.log(ShoppingCart2.shippingCost); */

// ================= COMMON JS ==================
//
// CommonJS (CJS) is Node.js's original module system, created in 2009 — years before ES6 modules.
//
// WHY IT DOESN'T WORK IN BROWSERS:
//   `require()` is SYNCHRONOUS — it blocks execution until the entire file is loaded.
//   Browsers load files over a NETWORK (HTTP), so blocking would freeze the page entirely.
//   Browsers also have no built-in `require` or `module` globals — they're Node-only APIs.
//   ES6 import/export was purpose-built for browsers: statically analyzed, async-friendly.
//
// WHY IT WORKS IN NODE.JS:
//   Node reads files from the LOCAL FILESYSTEM (near-instant — synchronous blocking is fine).
//   Node secretly wraps every file in a function before running it, injecting these locals:
//   (function(exports, require, module, __filename, __dirname) { ...your code here... })
//   This is why `exports`, `require`, `module` exist as "globals" — they're actually parameters.

// ─── EXPORT ───────────────────────────────────────────────────────────────────

/* // `exports` is a shorthand reference to `module.exports` (the object Node actually sends out)
// Adding properties to `exports` defines your public API — everything else stays private
// ⚠ This code has a typo: `export.addToCart` should be `exports.addToCart` (missing the 's')
exports.addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};
// ⚠ Avoid: `exports = { addToCart }` — this BREAKS the reference to module.exports entirely
// Safe:    `exports.addToCart = ...`  — mutates the shared object instead of replacing it


// ─── IMPORT ───────────────────────────────────────────────────────────────────

// require() synchronously loads, executes, and CACHES the module — same as calling a function
// Returns whatever `module.exports` contains at the end of that file
// Destructuring here pulls only `addToCart` out of the returned exports object
const { addToCart } = require('./shoppingCart.js');
// Subsequent require('./shoppingCart.js') anywhere returns the CACHED result — not re-executed


// ─── REAL LIFE EXAMPLE ────────────────────────────────────────────────────────
// CommonJS is how virtually every Node.js server and npm package is structured.
// Here's what a real Express.js REST API looks like:

// userRoutes.js (one module per concern — same encapsulation principle as ES6 modules)
const express = require('express');       // npm package — loads from node_modules
const router  = express.Router();

const getUsers  = (req, res) => res.json([{ id: 1, name: 'Taha' }]);
const createUser = (req, res) => res.status(201).json({ created: true });

router.get('/',    getUsers);
router.post('/',   createUser);

module.exports = router;                  // export the whole router as one unit

// ─────────────────────────────────────────────────────────────────────────────
// app.js (entry point — requires the route file above)
const express  = require('express');
const app      = express();
const userRoutes = require('./userRoutes'); // cached after first load

app.use('/users', userRoutes);            // entire module consumed in one line
app.listen(3000, () => console.log('Server running on port 3000')); */

// ================= NPM LIBRARIES ==================
// Imports only cloneDeep from lodash-es (ES module build) — avoids loading the entire library
// Direct node_modules path needed here because there's no bundler resolving bare imports
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    // ⚠️ this is an ARRAY — matters for the bug below
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};

// Shallow copy — top-level props duplicated, but cart[] and user{} are still shared references
const stateClone = Object.assign({}, state);

const stateCloneLevel1 = {
  ...state, // brings in cart (ref) and user (ref)
  cart: { ...state.cart }, // ⚠️ BUG: spreading an array into {} produces { '0': ..., '1': ... }
  //    correct would be [...state.cart], though that still shares the item objects inside
  user: { ...state.user }, // ✅ new object — fully independent from state.user (it's flat, so spread is safe)
};

// Native deep clone — all nesting is fully independent, no shared refs
// Handles: Date, Map, Set, circular refs | Does NOT handle: functions, class instances
const stateCloneRecursive = structuredClone(state);

// Lodash deep clone — same result here, but handles more edge cases (functions, class prototypes)
const stateDeepClone = cloneDeep(state);

// Mutation happens AFTER all copies — this is what exposes whether each copy is truly independent
state.user.loggedIn = false;

console.log(stateClone); // user.loggedIn → false ❌  (shallow: user is the same object)
console.log(stateCloneLevel1); // user.loggedIn → true  ✅  (spread made a new user object)
// cart → plain object   ⚠️  ({ '0': ..., '1': ... }), not an array
console.log(stateCloneRecursive); // user.loggedIn → true  ✅  (fully independent deep clone)
console.log(stateDeepClone); // user.loggedIn → true  ✅  (fully independent deep clone)
