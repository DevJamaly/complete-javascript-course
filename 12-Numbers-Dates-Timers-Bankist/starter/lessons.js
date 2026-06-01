'use strict';

//=====================CONVERTING AND CHECKING NUMBERS=========================
// JS uses 64-bit floating point (IEEE 754) for ALL numbers — no separate int/float types
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
console.log(Number.isInteger(23 / 0)); // false — 23/0 is Infinity, not an integer
