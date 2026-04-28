// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 23;
const y = 'Taha';

if (x === 23) console.log(`value is 23`);
const calcAge = birthYear => 2037 - birthYear;
const calcAgeFull = (birthYear, currentYear) => currentYear - birthYear;
console.log(`my age is ${calcAgeFull(1996, 2026)}`);
