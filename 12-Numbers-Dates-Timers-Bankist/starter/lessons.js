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
