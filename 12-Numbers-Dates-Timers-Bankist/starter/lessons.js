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
/* // ── NUMERIC SEPARATORS ───────────────────────────────────────────────────────
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

const FILE_PERMISSIONS = 0b1111_1111_1111; // 12 bits — grouped in 4s, much clearer */

//=====================BIG INT=========================
/* // ── WHY BigInt EXISTS ─────────────────────────────────────────────────────────
// Regular JS numbers (64-bit float) can only safely represent integers up to 2^53 - 1
// Beyond that, precision is lost and results become unreliable
console.log(2 ** 53 - 1); // 9007199254740991 — the ceiling
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 — same value, built-in constant
console.log(Number.MAX_SAFE_INTEGER + 10); // still 9007199254741001? maybe, maybe not — unsafe zone

// ── CREATING BigInt ───────────────────────────────────────────────────────────
// Method 1: append n — exact, what you see is what you get
console.log(485536812225444833551244582247521122586699n);

// Method 2: BigInt() constructor — ⚠️ dangerous with huge literals
// The number is parsed as a regular float first (losing precision), THEN converted
console.log(BigInt(485536812225444833551244582247521122586699)); // already imprecise!
// Rule: always use the n suffix for large numbers, never BigInt() with a literal

// ── OPERATIONS ───────────────────────────────────────────────────────────────
console.log(10000n + 10000n); // 20000n — works fine
console.log(321522456212354488n * 10000000000000n); // exact, no precision loss
// console.log(Math.sqrt(16n)); // ❌ Math methods don't work with BigInt

const huge = 21554832001255485332210145236n;
const num = 23;
// console.log(huge * num);          // ❌ can't mix BigInt and regular Number — throws TypeError
console.log(huge * BigInt(num)); // ✅ convert num to BigInt first

// ── COMPARISONS ───────────────────────────────────────────────────────────────
console.log(20n > 15); // true  — cross-type comparison works fine with > < >= <=
console.log(20n === 20); // false — strict equality: different types (bigint vs number), no coercion
console.log(typeof 20n); // 'bigint' — its own primitive type
console.log(20n == 20); // true  — loose equality allows cross-type coercion
console.log(20n == '20'); // true  — loose equality coerces both to compare

// ── MIXING WITH STRINGS ───────────────────────────────────────────────────────
// BigInt CAN be concatenated with strings (auto-converts to string)
console.log(huge + ' is a REALLY BIG NUMBER!'); // works — n suffix is dropped in output

// ── DIVISION ─────────────────────────────────────────────────────────────────
console.log(10n / 3n); // 3n  — BigInt always returns integers, decimal is truncated
console.log(10 / 3); // 3.3333... — regular number keeps the decimal

// ── REAL WORLD EXAMPLE 1: Cryptography / unique IDs ──────────────────────────
// Crypto keys, blockchain hashes, and UUIDs are often 128–256 bit numbers
// Regular numbers would silently corrupt these values
const txHash =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;
const userId = BigInt('9007199254740993'); // safe way: pass as string to avoid precision loss

// ── REAL WORLD EXAMPLE 2: Financial systems / precise large calculations ───────
// Banks deal with huge integers (storing cents to avoid float errors) across millions of accounts
const totalSupply = 1_000_000_000_00n; // $1 billion in cents (avoids 0.1+0.2 float issue)
const interestRate = 315n; // 3.15% stored as integer (315 basis points)
const interest = (totalSupply * interestRate) / 10_000n; // exact — no float drift
console.log(interest); // 3150000000n — exactly $31,500,000.00 */

//=====================CREATING DATES=========================
/* // Three rules worth remembering:

// Month is always 0-indexed — 10 = November, add +1 when displaying
// Use ISO strings for storage — consistent, timezone-safe, universally parseable
// Use timestamps (.getTime()) for math — subtracting two dates gives you milliseconds, which you can then convert to anything

// ── CREATING DATES ────────────────────────────────────────────────────────────
// 4 ways to create a date — all use the Date constructor

const now = new Date(); // current date & time at moment of execution
console.log(now);

// From a date string — JS tries to parse it (can be unreliable with custom formats)
console.log(new Date('Tue Jun 02 2026 10:51:53')); // reliable — JS-generated string format
console.log(new Date('December 24, 2015')); // works but avoid — parsing is browser-dependent

// From an ISO string (safest string format — always use this for storing/passing dates)
console.log(account1.movementsDates[0]); // '2019-11-18T21:31:17.178Z' — raw ISO string
console.log(new Date(account1.movementsDates[0])); // parsed into a proper Date object

// From explicit values: new Date(year, month, day, hour, min, sec)
// ⚠️ month is 0-indexed — 0 = January, 10 = November, 11 = December
console.log(new Date(2037, 10, 19, 15, 23, 5)); // Nov 19 2037, 15:23:05
console.log(new Date(2037, 10, 33, 15, 23, 5)); // day 33 overflows → Dec 03 (JS auto-corrects)

// From a timestamp (milliseconds since Jan 1, 1970 — "Unix Epoch")
console.log(new Date(0)); // Jan 01 1970 — the origin point (epoch)
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after epoch (3days × 24h × 60m × 60s × 1000ms)
console.log(3 * 24 * 60 * 60 * 1000); // 259200000 — this number IS the timestamp

// ── WORKING WITH DATES ────────────────────────────────────────────────────────
const future = new Date(2037, 10, 19, 15, 23); // Nov 19 2037, 15:23
console.log(future);

// Getters — extract individual components from a date
console.log(future.getFullYear()); // 2037 — always use getFullYear(), never getYear() (deprecated)
console.log(future.getMonth()); // 10   — 0-indexed, so 10 = November ⚠️
console.log(future.getDate()); // 19   — day of the month
console.log(future.getDay()); // 4    — day of week (0 = Sunday, 4 = Thursday)
console.log(future.getHours()); // 15
console.log(future.getMinutes()); // 23
console.log(future.getSeconds()); // 0

console.log(future.toISOString()); // '2037-11-19T13:23:00.000Z' — standardized string, best for storing
console.log(future.getTime()); // timestamp in ms — use for date math (subtraction, comparison)

// Convert timestamp back to a Date object
console.log(new Date(future.getTime())); // same date — useful for cloning a date

console.log(Date.now()); // current timestamp in ms — lightweight alternative to new Date() when you just need the number

// Setters — mutate the date directly
future.setFullYear(2040);
console.log(future); // same date but year changed to 2040 (setMonth, setDate etc. also exist)

// ── REAL WORLD EXAMPLE 1: Days until an event ────────────────────────────────
// Subtract two timestamps and convert ms → days
const eventDate = new Date(2026, 11, 25); // Dec 25 2026
const today = new Date();
const msPerDay = 24 * 60 * 60 * 1000;
const daysLeft = Math.ceil((eventDate.getTime() - today.getTime()) / msPerDay);
console.log(`${daysLeft} days until Christmas`);

// ── REAL WORLD EXAMPLE 2: Logging & auditing ─────────────────────────────────
// Store ISO strings in DB, convert back to Date only when displaying
const auditLog = {
  action: 'User login',
  userId: 'u_4821',
  timestamp: new Date().toISOString(), // '2026-06-02T10:51:53.000Z' — stored in DB
};

// Later, when displaying to user:
const logDate = new Date(auditLog.timestamp);
console.log(
  `Action performed on: ${logDate.getDate()}/${logDate.getMonth() + 1}/${logDate.getFullYear()}`,
);
// +1 on getMonth() because it's 0-indexed — easy bug to miss */

//=====================CALCULATING WITH DATES=========================
/* // ── DATE MATH ──────────────────────────────────────────────────────────────
// Dates convert to timestamps (ms) when used in math operations
// Unary + does the same as getTime() — converts Date → number explicitly
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); // 2138277780000 — timestamp in ms

// Subtracting two dates gives difference in ms → convert to whatever unit you need
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1);
// Math.abs() ensures result is always positive regardless of argument order

const days1 = calcDaysPassed(new Date(2026, 5, 2), new Date(2026, 5, 12));
console.log(days1 / (1000 * 60 * 60 * 24)); // 10 — ms → seconds → minutes → hours → days

const days2 = calcDaysPassed(new Date(2026, 5, 12), new Date(2026, 5, 2));
console.log(days2 / (1000 * 60 * 60 * 24)); // 10 — same result, Math.abs handles reversed order */

//=====================INTERNATIONALIZATION=========================

// ── Intl.DateTimeFormat ───────────────────────────────────────────────────────
// Built-in API for locale-aware date formatting — no libraries needed
const now = new Date();

const options = {
  hour: 'numeric', // 12 or 13 depending on locale
  minute: 'numeric', // 05 or 5
  day: '2-digit', // 02
  month: 'long', // June (full name)
  year: 'numeric', // 2026
  weekday: 'long', // Tuesday (full name)
};

// navigator.language reads the user's browser locale — e.g. 'en-US', 'ar-AE', 'de-DE'
// This means the format automatically matches what the user is used to seeing
const locale = navigator.language;
const intlDate = new Intl.DateTimeFormat(locale, options).format(now);
console.log(intlDate);
// en-US → "Tuesday, June 02, 2026, 12:40 PM"
// ar-AE → "الثلاثاء، ٢ يونيو ٢٠٢٦، ١٢:٤٠ م"
// de-DE → "Dienstag, 2. Juni 2026, 12:40 Uhr"

// ── REAL WORLD EXAMPLE 1: E-commerce order confirmation ──────────────────────
// Show estimated delivery date formatted for the user's country
const deliveryDate = new Date(2026, 5, 12);

const deliveryFormatted = new Intl.DateTimeFormat(navigator.language, {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
}).format(deliveryDate);

console.log(`Estimated delivery: ${deliveryFormatted}`);
// en-US → "Estimated delivery: Friday, June 12"
// ar-AE → "Estimated delivery: الجمعة، ١٢ يونيو"

// ── REAL WORLD EXAMPLE 2: Multi-timezone meeting scheduler ───────────────────
// Show the same meeting time in different cities simultaneously
const meetingTime = new Date('2026-06-10T09:00:00Z'); // UTC time stored on server

const cities = [
  { label: 'Dubai', locale: 'en-AE', timeZone: 'Asia/Dubai' },
  { label: 'London', locale: 'en-GB', timeZone: 'Europe/London' },
  { label: 'New York', locale: 'en-US', timeZone: 'America/New_York' },
];

cities.forEach(({ label, locale, timeZone }) => {
  const formatted = new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    timeZone, // key option — converts the same UTC time to each city's local time
  }).format(meetingTime);
  console.log(`${label}: ${formatted}`);
});
// Dubai:    1:00 PM
// London:   10:00 AM
// New York: 5:00 AM
