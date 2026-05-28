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
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
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
console.log(movements);

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
console.log(movements.filter(deposit)); // which ones are deposits?
