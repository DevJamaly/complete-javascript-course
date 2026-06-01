'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: 'premium',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: 'standard',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: 'premium',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: 'basic',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//==================SIMPLE ARRAY METHODS=================
/* let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE — extracts a portion, does NOT mutate original
console.log(arr.slice(2)); // from index 2 to end → ['c','d','e']
console.log(arr.slice(2, 4)); // from index 2 up to (not including) 4 → ['c','d']
console.log(arr.slice(-2)); // last 2 elements → ['d','e']
console.log(arr.slice(-1)); // last 1 element → ['e']
console.log(arr.slice(1, -2)); // from index 1, exclude last 2 → ['b','c']
console.log(arr.slice()); // shallow copy of full array
console.log([...arr]); // same shallow copy using spread

// SPLICE — extracts elements but MUTATES the original array
// console.log(arr.splice(2));   // removes everything from index 2 onwards
// console.log(arr.splice(-1));  // removes last element
console.log(arr.splice(1, 2)); // removes 2 elements starting at index 1 → ['b','c']
console.log(arr); // original is now mutated → ['a','d','e']

// REVERSE — reverses in place, MUTATES the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // → ['f','g','h','i','j']
console.log(arr2); // arr2 itself is also mutated

// CONCAT — merges two arrays, does NOT mutate either
const letters = arr.concat(arr2); // same as [...arr, ...arr2]
console.log(letters); // → ['a','b','c','d','e','f','g','h','i','j']

// JOIN — joins all elements into a string with a separator, does NOT mutate
console.log(letters.join('-')); // → 'a-b-c-d-e-f-g-h-i-j'
console.log(letters); // array is unchanged */

//==================THE AT METHOD=================
/* // .at() method — Introduced in ES2022
// Works on both arrays and strings
// Main advantage: supports negative indexing (counts from the end)

const arr = [23, 11, 64];

// Classic bracket notation vs .at() — both do the same thing
console.log(arr[0]); // → 23
console.log(arr.at(0)); // → 23

// Getting the last element — 3 ways, .at() is the cleanest
console.log(arr[arr.length - 1]); // classic, verbose
console.log(arr.slice(-1)[0]); // works but hacky
console.log(arr.at(-1)); // cleanest — negative index counts from end → 64

// .at() also works on strings
console.log('jonas'.at(0)); // → 'j'
console.log('jonas'.at(-1)); // → 's' (last character) */

//==================ARRAYS FOR EACH=================
/* // Both loops do the same thing — iterate over an array with index + value
// movements.entries() returns [index, value] pairs → we destructure as [i, movement]

// FOR...OF — use when you need break / continue
for (const [i, movement] of movements.entries()) {
  console.log(
    `Movement ${i + 1}: ${
      movement > 0
        ? `you deposited ${movement}`
        : `you withdrew ${Math.abs(movement)}`
    }`,
  );
}

console.log(`------------FOR EACH-----------------`);

// forEach — use for simple iteration when you don't need break / continue
// callback receives: (currentValue, index, fullArray) — you can ignore any of them
// forEach always loops through EVERY element, no way to stop it early
movements.forEach((movement, i, arr) => {
  console.log(
    `Movement ${i + 1}: ${
      movement > 0
        ? `You deposited ${movement}`
        : `You withdrew ${Math.abs(movement)}`
    }`,
  );
}); */

//==================SETS & MAPS FOR EACH=================
/* // Maps preserve insertion order and allow any key type
currencies.forEach(function (value, key, map) {
  // Map's forEach: callback receives (value, key, map) — note value comes first
  console.log(`${key}:${value}`);
});

// Set: like an array but automatically removes duplicates
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// → Set(3) { 'USD', 'GBP', 'EUR' }  (duplicates dropped)
console.log(currenciesUnique);

currenciesUnique.forEach((value, _, map) => {
  // Set's forEach also passes (value, key, set), but key === value in a Set
  // _ is used to intentionally ignore the key parameter
  console.log(`${value}:${value}`); */

//==================MAP ARRAYS=================
/* const EUR_TO_USD = 1.1;

// map() transforms every element and returns a NEW array — original is untouched
const movementsUSD = movements.map(mov => mov * EUR_TO_USD);

console.log(movements); // original — unchanged
console.log(movementsUSD); // new array with converted values

// Same result as above, but using a manual for..of loop
// map() is just the cleaner, more expressive version of this pattern
const movementsUSD2 = [];
for (const mov of movements) {
  movementsUSD2.push(mov * EUR_TO_USD);
}
console.log(movements);
console.log(movementsUSD2);

// map() gets 3 args: current element, index, full array
// Here we use mov and i to build a human-readable description per transaction
// Math.abs() strips the minus sign so we don't print "withdrew -200"
const movementDesriptions = movements.map(
  (mov, i, arr) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`,
);
console.log(movementDesriptions); */

//==================FILTER ARRAYS=================
/* // filter() returns a NEW array with only elements that pass the condition
// positive movements = deposits
const deposits = movements.filter(mov => mov > 0);
console.log(deposits);

// negative movements = withdrawals
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// Same result as deposits above, but with a manual for..of loop
// filter() is preferred — shorter, chainable, and fits the functional style
const desposisFor = [];
for (const mov of movements) {
  if (mov > 0) desposisFor.push(mov);
}
console.log(desposisFor); */

//==================REDUCE ARRAYS=================
/* console.log(movements);

// reduce() collapses the entire array into a single value
// acc = running total, curr = current element, 0 = starting value of acc

// Using reduce with a function expression call
// const balance = movements.reduce(function (accumulator, current, i, array) {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + current;
// }, 0);

//Using reduce with an arrow function
const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

// Same result — manual running total with a for..of loop
// reduce() is the cleaner version of exactly this pattern
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// reduce() isn't just for summing — it can compute ANY single value
// here we use it to find the largest number in the array
// logic: if current element beats the running max, it becomes the new max
// starting value is movements[0] instead of 0 — important! using 0 would break if all values are negative
const max = movements.reduce(
  (max, curr) => (curr > max ? curr : max),
  movements[0],
);
console.log(max); */

//==================CHAINING ARRAY METHODs=================
/* const EUR_TO_USD = 1.1;

// Method chaining — each method passes its result to the next
// Step 1: filter()  — keep only deposits (positive values)
// Step 2: map()     — convert each deposit from EUR to USD
// Step 3: reduce()  — sum them all into one total
const totalDepositInUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * EUR_TO_USD)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositInUSD);

// Chaining can hurt performance on large arrays — each method loops through the array again
// Never chain methods that mutate the original array (e.g. splice, reverse) — it causes unpredictable bugs */

//==================FIND IN ARRAY=================
/* // find() returns the FIRST element that passes the condition — not an array, just the element itself
// unlike filter() which returns ALL matches as a new array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// practical use case — find a specific object in an array by a property value
// stops as soon as it finds the first match
console.log(accounts);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// same result as above but with a manual for..of loop
// find() is the cleaner version of this pattern
let accountFor;
for (const account of accounts) {
  if (account.owner === 'Jessica Davis') accountFor = account;
}
console.log(accountFor); */

//==================FIND LAST IN ARRAY=================
/* console.log(movements);

// findLast() — same as find() but searches from the END of the array
// useful when you want the most recent match, not the first one
const lastWithdrawal = movements.findLast(mov => mov < 0);
console.log(lastWithdrawal);

// Step 1: find the largest movement by absolute value (ignores +/- sign)
// Math.abs() used so withdrawals aren't disqualified just for being negative
const largestMov = movements.reduce(
  (max, curr) => (Math.abs(max) < Math.abs(curr) ? curr : max),
  movements[0],
);

// Step 2: findLastIndex() — like findIndex() but from the END
// gets the index of the most recent occurrence of that largest movement
const latestLargeMovementIndex = movements.findLastIndex(
  mov => mov === largestMov,
);

// Step 3: convert index to "how many movements ago" for a human-readable message
// e.g. if it's the last element, result is 1 (1 movement ago)
console.log(
  `Your latest largest movement ${largestMov} was ${movements.length - latestLargeMovementIndex} movements ago`,
); */

//==================SOME & EVERY=================
/* console.log(movements);

// includes() — checks if an EXACT value exists in the array, returns true/false
console.log(movements.includes(-130));

// some() — returns true if AT LEAST ONE element passes the condition
// like includes() but with a condition instead of exact match
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// every() — returns true only if ALL elements pass the condition
console.log(movements.every(mov => mov > 0)); // mixed array — false
console.log(account4.movements.every(mov => mov > 0)); // all deposits — true

// callbacks can be stored in a variable and reused across multiple methods
// keeps code DRY — define the condition once, use it anywhere
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // any deposits?
console.log(movements.every(deposit)); // all deposits?
console.log(movements.filter(deposit)); // which ones are deposits? */

//==================FLAT & FLAT MAP=================
/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // flat() removes one level of nesting by default

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // pass a depth argument to flatten deeper levels

// Step 1: map() extracts the movements array from each account -> array of arrays
const accountMovements = accounts.map(acc => acc.movements);
// Step 2: flat() merges them all into one single array
const allMovements = accountMovements.flat();
console.log(accountMovements);
console.log(allMovements);
// Step 3: reduce() sums everything up
const overallBalance = allMovements.reduce((sum, mov) => sum + mov);
console.log(overallBalance);

// Same as above but chained — cleaner but same 3 steps
const overallBalanceChained = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((sum, mov) => sum + mov);
console.log(overallBalanceChained);

// flatMap() = map() + flat() in one method — more performant, but only flattens ONE level deep
const overallBalanceOptimal = accounts
  .flatMap(acc => acc.movements)
  .reduce((sum, mov) => sum + mov);
console.log(overallBalanceOptimal); */

//==================SORTING ARRAYS=================
/* const owners = ['Jonmas', 'Zack', 'Adam', 'Mark'];
owners.sort(); // alphabetical, works fine — but mutates the original array!
console.log(owners); // ['Adam', 'Jonmas', 'Mark', 'Zack']

//Numbers
console.log(movements);
// ⚠️ Default .sort() converts numbers to strings first — gives wrong order
console.log(movements.sort()); // BAD: don't use this for numbers

// HOW THE COMPARATOR WORKS:
// .sort() compares two elements at a time: the one it's looking at (a) and the next one (b)
// Return NEGATIVE → keep order  (a stays before b)
// Return POSITIVE → swap order  (b moves before a)
// Ascending (smallest → largest)
movements.sort((a, b) => {
  if (a > b) return 1; // a is bigger → swap (push a forward)
  if (b > a) return -1; // b is bigger → keep (b should be ahead anyway)
});
console.log(movements);

// Descending (largest → smallest)
movements.sort((a, b) => {
  if (a > b) return -1; // a is bigger → keep (a should be ahead)
  if (b > a) return 1; // b is bigger → swap (push b forward)
});
console.log(movements);

// 💡 SHORTCUT for numbers (same result, less code):
movements.sort((a, b) => a - b); // ascending
console.log(movements);
movements.sort((a, b) => b - a); // descending
console.log(movements);
// Why it works: positive/negative result naturally tells sort() what to do */

/*
// =============================================
// THE GOLDEN RULE
// =============================================
// (a, b) => a - b   →  ASCENDING  (small → big)
// (a, b) => b - a   →  DESCENDING (big → small)
// =============================================

// ========== 1. NUMBERS ==========
const prices = [199, 45, 899, 12, 340];

prices.sort((a, b) => a - b); // [12, 45, 199, 340, 899]
prices.sort((a, b) => b - a); // [899, 340, 199, 45, 12]

// Real world: E-commerce "Sort by Price"


// ========== 2. STRINGS ==========
const names = ['Zack', 'adam', 'Mike', 'bella'];

names.sort(); // ⚠️ Capital letters sort BEFORE lowercase (Z before a)
              // ['Mike', 'Zack', 'adam', 'bella']

names.sort((a, b) => a.localeCompare(b)); // ✅ Correct alphabetical
                                           // ['adam', 'bella', 'Mike', 'Zack']

// Real world: Dropdown menus, contact lists, country selectors


// ========== 3. DATES ==========
const events = [
  { name: 'Conference', date: new Date('2024-06-15') },
  { name: 'Workshop',   date: new Date('2024-01-03') },
  { name: 'Meetup',     date: new Date('2024-11-20') },
];

// Earliest first
events.sort((a, b) => a.date - b.date);
// [Workshop (Jan), Conference (Jun), Meetup (Nov)]

// Latest first
events.sort((a, b) => b.date - a.date);
// [Meetup (Nov), Conference (Jun), Workshop (Jan)]

// Real world: Notification feeds, calendar apps, transaction history


// ========== 4. OBJECTS BY A PROPERTY ==========
const products = [
  { name: 'Laptop',  price: 1200, rating: 4.2 },
  { name: 'Mouse',   price: 25,   rating: 4.8 },
  { name: 'Monitor', price: 450,  rating: 3.9 },
];

// Sort by price
products.sort((a, b) => a.price - b.price);
// Mouse → Monitor → Laptop

// Sort by rating
products.sort((a, b) => b.rating - a.rating);
// Mouse (4.8) → Laptop (4.2) → Monitor (3.9)

// Sort by name alphabetically
products.sort((a, b) => a.name.localeCompare(b.name));
// Laptop → Monitor → Mouse

// Real world: Product listings, leaderboards, admin dashboards


// ========== 5. BOOLEANS (push items to end/front) ==========
const tasks = [
  { task: 'Buy groceries', done: true  },
  { task: 'Do laundry',    done: false },
  { task: 'Call bank',     done: true  },
  { task: 'Fix bug',       done: false },
];

// Incomplete tasks first (false before true)
tasks.sort((a, b) => a.done - b.done);
// [Do laundry, Fix bug, Buy groceries, Call bank]

// Real world: Todo apps (completed tasks sink to the bottom)


// ========== 6. CUSTOM PRIORITY ORDER ==========
const tickets = [
  { id: 1, priority: 'Low'    },
  { id: 2, priority: 'High'   },
  { id: 3, priority: 'Medium' },
  { id: 4, priority: 'High'   },
];

// You define the rank yourself
const priorityRank = { High: 1, Medium: 2, Low: 3 };

tickets.sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
// High → High → Medium → Low

// Real world: Support ticket systems, project management tools


// ========== ⚠️ IMPORTANT: SORT MUTATES ==========
const original = [3, 1, 2];
const sorted = original.sort(); // original is now ALSO sorted!

// Safe approach: copy first, then sort
const safeSorted = [...original].sort((a, b) => a - b); */

//==================ARRAY GROUPING=================
/* // Object.groupBy(array, callback)
// Splits an array into groups based on whatever label you return from the callback

//1. GROUP BY POSITIVE/NEGATIVE
console.log(movements);
const groupedMovements = Object.groupBy(movements, mov =>
  mov > 0 ? 'deposits' : 'withdrawals',
);
console.log(groupedMovements);

// 2. GROUP BY ACTIVITY LEVEL
const groupedByActivity = Object.groupBy(accounts, acc => {
  const movementCount = acc.movements.length;
  if (movementCount >= 8) return 'very active';
  if (movementCount >= 4) return 'active';
  if (movementCount >= 1) return 'moderate';
  return 'inactive';
});
console.log(groupedByActivity);

//3. GROUP BY TYPE
// ({ type }) is just shorthand for acc => acc.type
// Destructures 'type' directly from each account object
const groupedByType = Object.groupBy(accounts, ({ type }) => type);
console.log(groupedByType);

//4. REAL WORLD
// E-commerce — group orders by status
const orders = [
  { id: 1, item: 'Shoes', status: 'delivered' },
  { id: 2, item: 'Watch', status: 'pending' },
  { id: 3, item: 'Bag', status: 'delivered' },
  { id: 4, item: 'Phone', status: 'cancelled' },
];

const byStatus = Object.groupBy(orders, ({ status }) => status);
console.log(byStatus);

//CONTACTS: Group by First Letter
const contacts = ['Alice', 'Bob', 'Anna', 'Charlie', 'Brian'];

const byLetter = Object.groupBy(contacts, name => name[0]);
console.log(byLetter);

// FOOTBALL SQUAD: Group by Position
const squad = [
  { name: 'Ter Stegen', position: 'GK' },
  { name: 'Araújo', position: 'DEF' },
  { name: 'Pedri', position: 'MID' },
  { name: 'Gavi', position: 'MID' },
  { name: 'Lewandowski', position: 'FWD' },
  { name: 'Yamal', position: 'FWD' },
];

const byPosition = Object.groupBy(squad, ({ position }) => position);
console.log(byPosition); */

//==================CREATING AND FILLING ARRAYS=================
/* // --- new Array() behavior ---
const numbersArr = new Array(1, 2, 3, 4, 5, 6, 7, 8); // Multiple args → fills array with those values
console.log(numbersArr);

const x = new Array(7); // Single number arg → creates empty array of that LENGTH (not value!)
console.log(x);
console.log(x.map(() => 5)); // ❌ map() skips empty slots — still returns 7 empty slots

// --- fill(value, start, end) ---
// x.fill(1);          // Would fill ALL slots with 1
x.fill(1, 3, 5); // Fills slots 3 & 4 (end index is exclusive)
console.log(x);

numbersArr.fill(23, 4, 6); // Overwrites indexes 4 & 5 with 23
console.log(numbersArr);

// --- Array.from() ---
// Array.from({ length: n }, mapFn) — creates + fills an array in one step
// (unlike new Array(n) which leaves empty slots that map() can't iterate)

const y = Array.from({ length: 7 }, () => 1); // [1, 1, 1, 1, 1, 1, 1]
const z = Array.from({ length: 7 }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7] — _ is unused element, i is index
console.log(y);
console.log(z);

// Practical example: 100 random dice rolls (1–6)
const diceRolls = Array.from({ length: 100 }, () =>
  Math.floor(Math.random() * 6 + 1),
);
console.log(diceRolls);

// --- Renders bank account movements to the DOM ---
const displayMovements = function (movements, sort = false) {
  console.log(movements);
  containerMovements.innerHTML = ''; // Clear existing entries before re-rendering

  // If sort=true, sort a COPY (slice()) to avoid mutating the original array
  const movementsSorted = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements;

  movementsSorted.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal'; // Classify each movement
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${move}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // Prepend so newest appears on top
  });
};
displayMovements(account1.movements);

// --- Reads displayed movement values back from the DOM on balance click ---
labelBalance.addEventListener('click', event => {
  const nodes = document.querySelectorAll('.movements__value'); // Returns a NodeList (not an Array)
  console.log(nodes);

  // nodes.map(el => el.textContent); // ❌ NodeList has no .map() — must convert first

  const movementsUI = Array.from(nodes); // ✅ Option 1: Array.from() converts NodeList → Array
  const movementsUI2 = [...nodes]; // ✅ Option 2: spread operator does the same thing

  // Strip the '€' symbol and convert strings to numbers
  const movementValues = movementsUI.map(el =>
    Number(el.textContent.replace('€', '')),
  );
  console.log(movementValues);
}); */

//==================NON DESTRUCTIVE ALTERNATIVES=================
/* console.log(movements);

// --- 3 ways to reverse an array ---
// const reversedMovements = movements.reverse();        // ❌ Mutates original
// const reversedMovements = movements.slice().reverse();// ✅ Old workaround: copy first, then reverse
const reversedMovements = movements.toReversed(); // ✅ Modern (ES2023): returns new reversed array, original untouched
console.log(movements); // unchanged
console.log(reversedMovements); // reversed copy

// --- toSorted() — non-mutating sort ---
// Real-world: display a leaderboard by score without reordering the original player list
const players = [
  { name: 'Ali', score: 45 },
  { name: 'Sara', score: 90 },
  { name: 'Omar', score: 70 },
  { name: 'John', score: 32 },
];
const leaderboard = players.toSorted((a, b) => b.score - a.score); // highest first
console.log(leaderboard); // Sara, Omar, Ali
console.log(players); // original order preserved

// --- toSpliced(start, deleteCount, ...items) — non-mutating splice ---
// Real-world: remove a cancelled event from a schedule without mutating the original
const schedule = ['Meeting', 'Lunch', 'Workshop', 'Review'];
const updatedSchedule = schedule.toSpliced(1, 1); // remove 'Lunch'
console.log(updatedSchedule); // ['Meeting', 'Workshop', 'Review']
console.log(schedule); // original unchanged

// --- with(index, value) — non-mutating single-element update ---
// const movements[1] = 2000;          // ❌ Mutates original
const newMovements = movements.with(1, 2000); // ✅ Returns new array with only that index changed
console.log(newMovements); // updated copy
console.log(movements); // original unchanged
 */
//==================ARRAY PRACTICE=================
//1. Get the total money depositedi in the bank
const totalDeposit = accounts
  .flatMap(acc => acc.movements)
  .filter(trans => trans > 0)
  .reduce((sum, curr) => sum + curr, 0);
console.log(totalDeposit);

//2. Count how many deposits there have been with atleast 1000 dollars
const depositCount = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(depositCount);

const depositCountReduced = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, curr) => (curr >= 1000 ? ++count : count), 0); //we cannot use count++ since it increments but still returns the same value!
// .reduce((count, curr) => (curr >= 1000 ? count + 1 : count), 0);
console.log(depositCountReduced);

//3. Create an object which contains the sum of the deposits and withdrawals
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      // curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      return sums;
    },
    { deposits: 0, withdrawals: 0 },
  );
console.log(deposits, withdrawals);

//4. Convert any string to a title case, where first letter of each word is capitalized
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (str) {
  const exceptions = new Set([
    // Articles
    'a',
    'an',
    'the',
    // Coordinating conjunctions
    'and',
    'but',
    'or',
    'nor',
    'for',
    'so',
    'yet',
    // Short prepositions
    'at',
    'by',
    'in',
    'of',
    'on',
    'to',
    'up',
    'as',
    'via',
  ]);
  const capitalize = word => word[0].toUpperCase() + word.slice(1);

  return str
    .toLowerCase()
    .trim()
    .split(' ')
    .map((word, i) =>
      i === 0 || !exceptions.has(word) ? capitalize(word) : word,
    )
    .join(' ');
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
