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
// Both loops do the same thing — iterate over an array with index + value
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
});
