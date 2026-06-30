// Object.freeze() = shallow immutability. Prevents reassignment of top-level
// properties (array indices here), enforcing "don't mutate state" as a rule,
// not just a convention.
const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);
// This line would throw in strict mode (or silently fail otherwise) because
// the array is frozen — proof that freeze actually blocks mutation.
// budget[0].value = 1000;
// console.log(budget);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

// Old approach: isFinite check assumes `user` is already resolved and
// in scope — fragile and not reusable across different limit objects.
// const limit = isFinite(spendingLimits[user]) ? spendingLimits[user] : 0;

// Optional chaining (?.) returns undefined instead of throwing if `limits`
// is null/undefined. Nullish coalescing (??) falls back to 0 only for
// null/undefined — unlike ||, it won't wrongly override a legit 0 limit.
// Also more flexible: takes `limits` as a parameter instead of relying on
// the closure variable `spendingLimits`.
const getLimit = (limits, user) => limits?.[user] ?? 0;

// Pure function: same inputs always produce the same output, no mutation
// of `state` or any outside variable, no side effects (no logging here).
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas', // default parameter, used when `user` arg is omitted
) {
  const cleanUser = user.toLowerCase();
  // Earlier version: same logic written as if/return instead of a ternary.
  // Functionally identical, just less "expression-based."
  // if (value > getLimit(cleanUser)) return state;
  // return [...state, { value: -value, description, user: cleanUser }];

  // Ternary instead of if/return: keeps the function a single expression,
  // reinforcing "this just computes and returns a value."
  // Spread (...state) creates a NEW array instead of pushing onto `state`,
  // preserving immutability.
  return value > getLimit(limits, cleanUser)
    ? state // over limit -> reject the expense, return original state unchanged
    : [...state, { value: -value, description, user: cleanUser }];
};

// Each call produces a new array; previous budgets are untouched.
// This chaining is only possible because addExpense doesn't mutate.
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'Going to movies 🍿',
  'Matilda',
);
// 'Jay' has no entry in spendingLimits -> getLimit returns 0 -> any
// positive value exceeds it -> expense rejected, state passed through as-is.
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'Jay');

// .map() returns a new array — each entry is either spread into a new
// object with a `flag` added, or returned untouched. No entry is mutated.
const checkExpenses = function (state, limit) {
  return state.map(entry =>
    entry.value < -getLimit(limit, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry,
  );

  // Earlier imperative version: mutates `entry` directly inside a for-of
  // loop, and relies on the outer `budget` variable instead of `state`.
  // Both of these break the "pure function" rule the refactor fixes.
  // for (const entry of budget)
  //   if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};
const checkedBudget = checkExpenses(newBudget3, spendingLimits);

const logBigExpenses = function (state, bigLimit) {
  // First refactor attempt: filter -> map -> join pipeline. Clear but
  // creates two intermediate arrays before the final string.
  // const bigExpenses = state
  //   .filter(entry => entry.value <= -bigLimit)
  //   .map(entry => entry.description.slice(-2))
  //   .join('/');

  // .reduce() builds a single string accumulator in one pass — a more
  // declarative replacement for both the pipeline above and the manual
  // loop below.
  const bigExpenses = state.reduce((str, entry) => {
    return entry.value > -bigLimit
      ? str // expense too small -> skip, pass accumulator through unchanged
      : `${str} ${entry.description.slice(-2)} /`; // append emoji + separator
  }, ''); // '' = initial accumulator value
  return bigExpenses.slice(0, -1); // trim the trailing '/'

  // Original imperative version: manual for-of loop with string
  // concatenation (+=) and a side-effecting console.log instead of return.
  // let output = '';
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
  // output = output.slice(0, -2); // Remove last '/ '
  // console.log(output);
};

console.log(checkedBudget);
console.log(logBigExpenses(checkedBudget, 500));
