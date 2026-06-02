'use strict';

//=====================CONVERTING AND CHECKING NUMBERS=========================
/* // JS uses 64-bit floating point (IEEE 754) for ALL numbers — no separate int/float types
console.log(23 === 23.0); // true — 23 and 23.0 are literally the same value in JS

// Base 10: digits 0–9 (what humans use)
// Binary (Base 2): only 0 and 1 (what computers use internally)
// Problem: some fractions (like 0.1) can't be represented exactly in binary
console.log(0.1 + 0.2); // 0.30000000000000004 — floating point precision error
console.log(0.1 + 0.2 === 0.3); // false — never use === to compare decimals in JS

// ── TYPE CONVERSION ──────────────────────────────────────────────────────────
console.log(Number('23')); // 23  — explicit conversion using Number()
console.log(+'23'); // 23  — shorthand: unary + coerces string to number

// ── PARSING ──────────────────────────────────────────────────────────────────
// parseInt/parseFloat read a string until they hit a non-numeric character
// Second argument (10) = radix — always pass 10 to ensure base-10 parsing
console.log(Number.parseInt('30px', 10)); // 30  — strips trailing 'px'
console.log(Number.parseInt('e24', 10)); // NaN — starts with a letter, can't parse

console.log(Number.parseFloat('2.5rem', 10)); // 2.5 — keeps the decimal
console.log(parseInt('2.5rem', 10)); // 2   — parseInt cuts off at the dot

// ── CHECKING FOR NaN ─────────────────────────────────────────────────────────
// isNaN() (global) coerces the value to a number first — can give misleading results
console.log(isNaN(20)); // false — 20 is a valid number
console.log(isNaN('20')); // false — '20' coerces to 20, which is valid ← gotcha!
console.log(isNaN(+'20C')); // true  — '20C' coerces to NaN, so yes it's NaN
console.log(isNaN(+23 / 0)); // false — 23/0 is Infinity, not NaN

// ── BETTER: Number.isFinite() ────────────────────────────────────────────────
// isFinite() is the go-to check for "is this a real usable number?"
// Number.isFinite() (static) does NOT coerce — stricter and more reliable
console.log(Number.isFinite(20)); // true  — valid finite number
console.log(Number.isFinite('20')); // false — string, no coercion, not a number
console.log(isFinite(+'20C')); // false — NaN is not finite
console.log(isFinite(+23 / 0)); // false — Infinity is not finite

// ── Number.isInteger() ───────────────────────────────────────────────────────
console.log(Number.isInteger(23)); // true  — whole number
console.log(Number.isInteger(23.0)); // true  — 23.0 === 23 in JS, still an integer
console.log(Number.isInteger(23 / 0)); // false — 23/0 is Infinity, not an integer */

//=====================MATH AND ROUNDING=========================
/* // ── ROOTS ────────────────────────────────────────────────────────────────────
console.log(Math.sqrt(25));    // 5 — square root via Math method
console.log(25 ** (1 / 2));   // 5 — same result using exponentiation operator (nth root trick)
console.log(8 ** (1 / 3));    // 2 — cube root: no Math.cbrt needed, just use (1/3)

// ── MIN / MAX ─────────────────────────────────────────────────────────────────
console.log(Math.max(5, 18, 25, 3, 16, 67));       // 67  — works as expected
console.log(Math.max(5, 18, '25', 3, 16, '67px')); // NaN — does NOT parse strings, coercion fails on '67px'
console.log(Math.min(5, 18, 25, 3, 16, 67));       // 3

// Math.PI = 3.14159... | parseFloat strips 'px' from '10px' → valid radius
console.log(Math.PI * Number.parseFloat('10px') ** 2); // area of circle with r=10

// ── RANDOM ───────────────────────────────────────────────────────────────────
// Math.random() → 0.0 to 0.999... (never reaches 1)
// * 6 → 0.0 to 5.999... | trunc → 0–5 | +1 → 1–6  (like a dice roll)
console.log(Math.trunc(Math.random() * 6) + 1);

// Better approach: a reusable random int function (inclusive of both min and max)
// Formula breakdown: random() * (max - min + 1) spreads the range, floor snaps down, + min shifts it up
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomInt(10, 20)); // random integer between 10 and 20 (inclusive)
console.log(randomInt(0, 3));   // random integer: 0, 1, 2, or 3

// ── ROUNDING INTEGERS ────────────────────────────────────────────────────────
// All Math rounding methods auto-coerce strings (like Number() does)

// Math.round → rounds to nearest integer (.5 and above goes up)
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

// Math.ceil → always rounds UP (ceiling)
console.log(Math.ceil('23.3')); // 24 — string coerced to number first
console.log(Math.ceil(23.9));   // 24

// Math.floor → always rounds DOWN (floor)
console.log(Math.floor(23.3));   // 23
console.log(Math.floor('23.9')); // 23 — string coerced to number first

// Math.trunc → simply removes the decimal, no rounding at all
console.log(Math.trunc('23.3')); // 23 — string coerced first

// ⚠️ trunc vs floor on NEGATIVES — they behave differently:
console.log(Math.trunc(-23.3)); // -23 — just drops decimal, closer to zero
console.log(Math.floor(-23.3)); // -24 — rounds down (away from zero for negatives)
// floor is generally preferred over trunc since it handles negatives more consistently

// ── ROUNDING DECIMALS: toFixed() ─────────────────────────────────────────────
// toFixed(n) rounds to n decimal places — but returns a STRING, not a number
// JS does "boxing" here: the primitive 2.7 is temporarily wrapped in a Number object to access .toFixed()

console.log((2.7).toFixed(0));      // "3"    — rounded, 0 decimals → string
console.log((2.7).toFixed(3));      // "2.700" — pads with zeros to reach 3 decimals → string
console.log((2.3458).toFixed(2));   // "2.35"  — rounds to 2 decimals → string
console.log(+(2.3458).toFixed(2));  // 2.35   — unary + converts the string back to a number */

//=====================THE REMAINDER OPERATOR=========================
/* // ── REMAINDER OPERATOR (%) ───────────────────────────────────────────────────
// % returns what's LEFT OVER after division, not the division result itself
console.log(5 % 2); // 1 — 5 = (2×2) + 1 leftover
console.log(5 / 2); // 2.5 — actual division result

console.log(8 % 3); // 2 — 8 = (3×2) + 2 leftover
console.log(8 / 3); // 2.666...

// ── EVEN / ODD CHECK ─────────────────────────────────────────────────────────
// Core idea: even numbers always divide by 2 with 0 remainder
console.log(6 % 2 === 0 ? 'isEven' : 'isOdd'); // isEven — 0 remainder
console.log(7 % 2 === 0 ? 'isEven' : 'isOdd'); // isOdd  — 1 remainder

const isEven = n => n % 2 === 0;
console.log(`8 is ${isEven(8) ? 'even' : 'odd'}`); // even
console.log(`23 is ${isEven(23) ? 'even' : 'odd'}`); // odd
console.log(`514 is ${isEven(514) ? 'even' : 'odd'}`); // even

// ── REAL WORLD USE CASE: styling every nth row ────────────────────────────────
// i % 2 === 0 catches every even index (0, 2, 4...) — classic zebra striping
document.querySelector('body').addEventListener('click', event => {
  const movementRows = Array.from(document.querySelectorAll('.movements__row'));
  movementRows.forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = '#123456'; // stripe even rows
  });
});

// ── REAL WORLD USE CASE: round robin (cycling through an array endlessly) ─────
// Problem: you have N items but want to loop back to index 0 after the last one
// Solution: currentIndex % array.length always keeps you within bounds

const servers = ['Server A', 'Server B', 'Server C'];
let requestCount = 0;

const getNextServer = () => servers[requestCount++ % servers.length];
//  request 0 → 0 % 3 = 0 → 'Server A'
//  request 1 → 1 % 3 = 1 → 'Server B'
//  request 2 → 2 % 3 = 2 → 'Server C'
//  request 3 → 3 % 3 = 0 → 'Server A' ← wraps back around

console.log(getNextServer()); // Server A
console.log(getNextServer()); // Server B
console.log(getNextServer()); // Server C
console.log(getNextServer()); // Server A — back to start */

//=====================NUMERIC SEPERATORS=========================
// ── NUMERIC SEPARATORS ───────────────────────────────────────────────────────
// Underscores (_) can be placed anywhere in a number to improve readability
// They are purely visual — JS ignores them completely at runtime

// Without separator: hard to tell if this is 287 billion or 28 billion
const diameter = 287_460_000_000; // 287460000000 — much easier to read
console.log(diameter); // 287460000000 — underscore is stripped, number is normal

const price = 345_99; // could represent 345.99 (cents notation: 34599 cents)
console.log(price); // 34599

// Same value, different readability intent — JS doesn't care, both equal 1500
const transferFee1 = 15_00; // read as: 15 dollars, 00 cents
const transferFee2 = 1_500; // read as: one thousand five hundred

const PI = 3.14_15; // works on decimals too — no effect on the actual value
console.log(PI); // 3.1415

// ⚠️ SEPARATORS ONLY WORK IN CODE — not in strings or parsed input
console.log(Number('230000')); // 230000 — works fine
console.log(Number('230_000')); // NaN    — Number() doesn't understand underscores in strings
console.log(parseInt('230_000')); // 230  — stops parsing at the underscore

// ── REAL WORLD EXAMPLE 1: Finance / large monetary values ────────────────────
const nationalDebt = 33_000_000_000_000; // $33 trillion — instantly readable
const annualBudget = 4_000_000_000; // $4 billion
const employeeSalary = 120_000; // $120,000

// ── REAL WORLD EXAMPLE 2: Permissions / bitmasks ─────────────────────────────
// Binary flags are often written in groups for readability
const READ = 0b100; // bit flags are hard to read without grouping
const WRITE = 0b010;
const EXECUTE = 0b001;

const FILE_PERMISSIONS = 0b1111_1111_1111; // 12 bits — grouped in 4s, much clearer
