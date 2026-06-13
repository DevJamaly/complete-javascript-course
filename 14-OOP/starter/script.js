'use strict';

//===================CONSTRUCTOR FUNCTIONS====================
/* // Constructor function — capital P is a convention to signal
// "call this with new". JS doesn't enforce it, but breaking
// the convention causes silent bugs (this will point to the
// wrong object if called without new).
const Person = function (firstName, birthYear) {
  // `this` here is the empty object created by the `new` keyword.
  // These lines add properties directly onto that object.
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never add methods inside the constructor.
  // Every instance gets its OWN copy of the function in memory.
  // 1000 Person objects = 1000 identical calcAge functions.
  // Solution: add methods to Person.prototype instead
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

// What `new` does behind the scenes — in order:
// 1. Creates a new empty object {}
// 2. Calls Person(), binding `this` to that empty object
// 3. Links the object to Person.prototype (__proto__ = Person.prototype)
// 4. Returns the object automatically (no explicit return needed)
const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1995);

const taha = 'taha'; // plain string — not created with new, not linked to Person.prototype

console.log(jonas, matilda, jack);

// Returns 'object' — JS has no "Person" type.
// Constructor functions don't create new types, they create objects.
console.log(typeof jack);

// instanceof checks the prototype chain:
// jack.__proto__ === Person.prototype → true
console.log(jack instanceof Person); // true

// taha is a primitive string, not linked to Person.prototype
console.log(taha instanceof Person); // false
 */

//===================PROTOTYPES====================
/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Method lives on the prototype — ONE shared copy for all instances.
// `this` inside always refers to the instance that calls it.
// jonas.calcAge() → this = jonas. matilda.calcAge() → this = matilda.
Person.prototype.calcAge = function () {
  return 2037 - this.birthYear; // returns value instead of logging — now usable inside other methods
};

Person.prototype.printInfo = function () {
  console.log(`Hi i am ${this.firstName} and i am ${this.calcAge()} years old`);
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);

console.log(jonas.calcAge()); // 46 — jonas has no calcAge, JS walks up __proto__ and finds it on Person.prototype
matilda.printInfo(); // this = matilda throughout both printInfo and the calcAge call inside it

// Every object has __proto__ — the actual link to its prototype.
// jonas itself has no calcAge — JS walks up to __proto__ and finds it there.
console.log(jonas.__proto__);

// true — they're the same object in memory.
// Person.prototype IS the object that jonas.__proto__ points to.
console.log(jonas.__proto__ === Person.prototype);

// Same check, different syntax. true.
console.log(Person.prototype.isPrototypeOf(jonas));

// false — easy to misread this.
// Person.prototype is not the prototype OF the Person function.
// It's the prototype assigned TO instances Person creates.
// Think of it as Person.instancePrototype — the naming is misleading.
console.log(Person.prototype.isPrototypeOf(Person));

// Added AFTER jonas and matilda were created — yet both can access it.
// The prototype is a live link, not a snapshot taken at creation time.
// JS looks up the chain at the moment of access, finding it here.
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // both: 'Homo Sapiens'

// true — firstName was set via `this.firstName` directly on the object.
console.log(jonas.hasOwnProperty('firstName'));

// false — species lives on Person.prototype, not on jonas.
// Jonas can ACCESS it by walking the chain, but he doesn't OWN it.
console.log(jonas.hasOwnProperty('species')); */

//===================PROTOTYPE INHERITANCE====================
/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

Person.prototype.printInfo = function () {
  console.log(`Hi i am ${this.firstName} and i am ${this.calcAge()} years old`);
};

const jonas = new Person('Jonas', 1991);
const matilda = new Person('Matilda', 2017);
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// Climbing the chain manually: Person.prototype → Object.prototype → null
console.log(jonas.__proto__); // Person.prototype — methods like calcAge live here
console.log(jonas.__proto__.__proto__); // Object.prototype — top of chain, hasOwnProperty etc. live here
console.log(jonas.__proto__.__proto__.__proto__); // null — chain ends here

// .constructor points back to the function that created this prototype
//console.dir lists properties of a JS object
console.dir(Person.prototype.constructor); // logs Person() itself — circular reference back to the constructor

const arr = [3, 4, 3, 6, 6, 8, 9, 12, 3, 8];
// Arrays also follow the prototype chain — arr → Array.prototype → Object.prototype → null
console.log(arr.__proto__); // Array.prototype — where map, filter, reduce etc. live
console.log(arr.__proto__ === Array.prototype); // true — confirms the link
console.log(arr.__proto__.__proto__); // Object.prototype — arrays are objects too
console.log(arr.__proto__.__proto__.__proto__); // null

//DO NOT DO THIS !
// Extending built-in prototypes pollutes ALL arrays globally — breaks third-party code and future JS updates
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

// DOM elements have a deep chain — each level adds more specific behaviour
const h1 = document.querySelector('h1');
console.dir(h1); //h1
console.dir(h1.__proto__); //HTMLHeadingElement
console.dir(h1.__proto__.__proto__); //HTMLElement
console.dir(h1.__proto__.__proto__.__proto__); //Element
console.dir(h1.__proto__.__proto__.__proto__.__proto__); //Node
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__); //EventTarget — addEventListener lives here
console.dir(h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__); //Object
console.dir(
  h1.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__.__proto__,
); //null

// Functions are objects too — they have their own prototype chain
const incrementor = x => x + 1;
console.dir(incrementor); //incrementor()
console.dir(incrementor.__proto__); //anonymous — Function.prototype (call, bind, apply live here)
console.dir(incrementor.__proto__.__proto__); //Object — functions are objects at the end of the day
console.dir(incrementor.__proto__.__proto__.__proto__); //null
 */

// =================== ES6 Classes ====================
/* // Syntactic sugar over prototypal inheritance — classes don't introduce a new OOP model
// Under the hood it's still prototypes, just cleaner syntax

// class expression (same as a function expression — assigned to a variable)
const PersonEx = class {};

// class declaration (same as a function declaration)
class Person {
  species = 'Homo Sapiens'; // public field — set directly on each instance, NOT on prototype

  constructor(firstName, birthYear) {
    // runs automatically when `new Person()` is called
    // `this` refers to the newly created instance
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  // Methods defined here are added to Person.prototype — shared across all instances
  // NOT copied to each instance, saving memory
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  printInfo() {
    console.log(`Hi I am ${this.firstName} and i am a ${this.species}`);
  }
}

const jessica = new Person('Jessica', 1996);
console.log(jessica);
jessica.calcAge();

// confirms that jessica's prototype IS Person.prototype
// this is how jessica can access calcAge(), greet() etc.
console.log(jessica.__proto__ === Person.prototype); // true

// you can still manually add methods to the prototype outside the class — works the same way
Person.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};
jessica.greet();
jessica.printInfo();

// Key things to know about classes:
// 1. Not hoisted — unlike function declarations, you can't use a class before it's defined
// 2. First-class citizens — can be passed into and returned from functions
// 3. Always run in strict mode — no accidental globals or silent errors */

// ===================SETTER & GETTERS====================
/* const account = {
  owner: 'francis',
  transactions: [200, 580, -160, 450, 770],

  // GETTER — accessed like a property (account.latest), but runs a function under the hood
  // use case: compute/derive a value on the fly without storing it separately
  get latest() {
    return this.transactions.slice(-1).pop();
  },

  // SETTER — triggered by assignment syntax (account.latest = 50)
  // use case: intercept a write and do something with the value (here, push it)
  set latest(trn) {
    this.transactions.push(trn);
  },
};

console.log(account.latest);
account.latest = 50;
console.log(account.transactions);

class Person {
  constructor(fullName, birthYear) {
    // this.firstName = firstName;
    this.fullName = fullName; // hits the setter below immediately
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  printInfo() {
    console.log(`Hi I am ${this.firstName} and i am a ${this.species}`);
  }

  // GETTER — lets you use jessica.age instead of jessica.age()
  // reads like a stored value, but recalculates every time it's accessed
  get age() {
    return 2037 - this.birthYear;
  }

  // SETTER — intercepts this.fullName = '...' (including the constructor assignment above)
  // use case: validate input before storing it
  // writes to this._fullName instead of this.fullName to avoid calling itself recursively
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // GETTER — paired with the setter above so the outside world still reads it as .fullName
  // without this, jessica.fullName would be undefined (only _fullName exists on the object)
  get fullName() {
    return this._fullName;
  }
}

Person.prototype.species = 'Homo Sapiens';

const jessica = new Person('Jessica Davis', 1996);
console.log(jessica);
console.log(jessica.fullName);
console.log(jessica.age);

const walter = new Person('Walter White', 1965);
console.log(walter); */

// ===================STATIC METHODS====================
/* // Array.from is a STATIC method — it lives on Array itself, not on array instances
// that's why arr.from() below fails: instances don't inherit static methods
console.log(Array.from(document.querySelectorAll('h1'))); // converts NodeList → real array

const arr = [];
// console.log(arr.from([1, 2, 3, 4, 5, 6])); // ❌ TypeError: arr.from is not a function

class PersonClass {
  constructor(fullName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }

  printInfo() {
    console.log(`Hi I am ${this.firstName} and i am a ${this.species}`);
  }

  // static: belongs to PersonClass itself, NOT on PersonClass.prototype
  // instances can never access this — same principle as Array.from
  static hey() {
    console.log(`Hey there from person class!`);
  }
}

PersonClass.hey(); // ✅ works — called on the class itself
// new PersonClass('x', 1990).hey() // ❌ would throw — instances don't get static methods

// ─────────────────────────────────────────────

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Manually doing what `static` does inside a class — attaching directly to the constructor
// `this` inside hey() refers to Person (the function object it's called on), not an instance
Person.hey = function () {
  console.log(`Hey there from person constructor ! `);
  console.log(this); // logs the Person constructor function itself
};

Person.hey(); // ✅ works — called on the constructor directly

const jonas = new Person('Jonas', 1994);
console.log(jonas);
jonas.hey(); // ❌ TypeError — hey() is on Person, not Person.prototype, so instances can't reach it */

// ===================OBJECT CREATE====================
/* const PersonProto = {
  species: 'Homo Sapiens',

  calcAge() {
    return 2037 - this.birthYear;
  },

  // init is NOT a constructor — it's just a regular method that sets data on `this`
  // `this` will be whatever object calls it (steven, sarah, etc.)
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// Object.create creates a brand-new EMPTY object and sets its prototype to PersonProto
// no `new`, no constructor — just: "make an empty object whose __proto__ points here"
const steven = Object.create(PersonProto);

// since Object.create gives us a blank object, we set data manually
steven.firstName = 'Steven';
steven.birthYear = 1993;

console.log(steven); // { firstName: 'Steven', birthYear: 1993 }
console.log(steven.calcAge()); // calcAge not on steven → JS walks up to PersonProto → found
console.log(steven.__proto__); // PersonProto itself — confirms the link

const sarah = Object.create(PersonProto);
// init() does exactly what we did manually above for steven
// sarah.init(...) means `this` inside init = sarah, so it writes onto sarah
sarah.init('Sarah', 1979);

console.log(sarah);
console.log(sarah.calcAge()); */

// ===================Class Inheritance====================
/* // Constructor function — works like a C# class. 'this' refers to the new object being created.
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

// Methods live on the prototype, not the object itself.
// This means ALL Person instances share one copy of calcAge in memory instead of each having their own.
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // Like calling base() in C# — runs Person's constructor but using Student's 'this'.
  // Without this, mike would have 'course' but no 'firstName' or 'birthYear'.
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Manually wire Student into Person's prototype chain — this is what 'extends' does in ES6 classes.
// Side effect: the new Student.prototype has no own 'constructor' property (covered below).
Student.prototype = Object.create(Person.prototype);

// Must be AFTER Object.create — anything added before would be on the old Student.prototype, which just got replaced.
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// 'new' creates a blank object, sets its __proto__ to Student.prototype, runs the constructor, then returns the object.
const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge(); // 'calcAge' isn't on mike or Student.prototype — JS walks up the chain and finds it on Person.prototype.

// Walking the prototype chain manually — each step is one level "up" toward Object.
console.log(mike.__proto__); // Student.prototype → has 'introduce'. DevTools labels it "Person" because constructor is broken (see below).
console.log(mike.__proto__.__proto__); // Person.prototype → has 'calcAge'
console.log(mike.__proto__.__proto__.__proto__); // Object.prototype → all built-in methods (__defineGetter__, hasOwnProperty, etc.)
console.log(mike.__proto__.__proto__.__proto__.__proto__); // null → end of the chain

// BUG: Object.create replaced Student.prototype with a blank object that has no own 'constructor'.
// JS walks up the chain and finds Person.prototype.constructor = Person — incorrect.
console.dir(Student.prototype.constructor);

// instanceof checks the [[Prototype]] chain, NOT the constructor property — so it's unaffected by the bug above.
console.log(mike instanceof Student); // true — Student.prototype exists in mike's chain
console.log(mike instanceof Person); // true — Person.prototype exists in mike's chain
console.log(mike instanceof Object); // true — Object.prototype exists in mike's chain

// FIX: manually restore the constructor reference so Student.prototype correctly points back to Student.
Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor); // now correctly shows Student

// instanceof results are unchanged — the chain itself was never broken, only the label was.
console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

// Same chain as before — fixing constructor only added a label, it didn't change the actual prototype links.
// DevTools still shows "Person {introduce: f}" because it labels by __proto__.constructor (one level up), not own constructor.
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__);
console.log(mike.__proto__.__proto__.__proto__.__proto__); */

// ===================Class Inheritance ES6====================
/* class Person {
  constructor(fullName, birthYear) {
    // 'set fullName' setter is triggered here, not direct assignment
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  introduce() {
    // 'species' isn't on the instance — found up the prototype chain
    console.log(`Hi I am ${this.fullName} and i am a ${this.species}`);
  }

  // Static: called on the class itself (Person.hey()), not on instances
  static hey() {
    console.log(`Hey there 👋`);
  }

  // Getter: accessed like a property (martha.age), not a method call
  get age() {
    return 2037 - this.birthYear;
  }

  // Setter: intercepts 'this.fullName = ...' and validates before storing
  set fullName(name) {
    console.log(name);
    // Stores on '_fullName' to avoid infinite setter recursion
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  // Getter: exposes '_fullName' back as 'fullName' — completes the pair
  get fullName() {
    return this._fullName;
  }
}

// Added outside the class body — attaches to the prototype, shared across all instances
Person.prototype.species = 'Homo Sapien';

// 'extends' sets up the prototype chain: Student → Person
class Student extends Person {
  constructor(fullName, birthYear, course) {
    // 'super()' must come first — initializes 'this' via Person's constructor
    super(fullName, birthYear);
    this.course = course;
  }

  // Overrides Person's introduce() — same name, different behavior (polymorphism)
  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

const martha = new Student('Martha Jones', 2012, 'Computer Science');
console.log(martha);
martha.introduce(); // calls Student's introduce(), not Person's
console.log(martha.age); // inherited getter from Person — no override needed */

// ===================Class Inheritance Object.create====================
/* const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);

const StudentProto = Object.create(PersonProto);

StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
console.log(jay);
jay.introduce();
jay.calcAge(); */

// ===================Class Encapulation====================
/* // ─── 4 TYPES OF CLASS MEMBERS ────────────────────────────────────────────────
// 1. Public Fields    – accessible anywhere
// 2. Private Fields   – # prefix, only accessible inside the class
// 3. Public Methods   – the public API the outside world uses
// 4. Private Methods  – # prefix, internal helpers only
// + Each has a STATIC version (belongs to the class, not instances)

class Account {
  // ── PUBLIC FIELDS ─────────────────────────────────────────────────────────
  // Defined on the class body — exist on every instance automatically.
  // Equivalent to writing this.locale = ... inside the constructor.
  locale = navigator.language;
  bank = 'Bankist';

  // ── PRIVATE FIELDS ────────────────────────────────────────────────────────
  // The # prefix enforces true privacy — accessing from outside throws SyntaxError.
  // Must be declared here before use, even if the value is set in the constructor.
  #movements = []; // shared starting value for every instance
  #pin; // declared here, value assigned per-instance in constructor

  constructor(owner, currency, pin) {
    // Standard public instance properties — readable and writable from outside
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; // ← stored privately; acc1.pin returns undefined, not the value
    console.log(`Thanks for opening an account, ${this.owner}`);
  }

  // ── PUBLIC METHODS (The API) ──────────────────────────────────────────────
  // These are the ONLY intended ways for outside code to interact with the account.
  // This pattern is called "encapsulation" — hide the data, expose controlled actions.

  // Controlled read access to private data (outside code can't modify the array directly)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val); // adds positive value to the private array
  }

  withdrawal(val) {
    if (val <= 0) return; // guard clause — reject zero or negative withdrawals
    this.deposit(-val); // reuses deposit() with a negative — DRY principle
  }

  requestLoan(val) {
    // Internally calls a PRIVATE method — outside code cannot call #approveLoan directly
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Loan approved');
    }
  }

  // ── GETTER ────────────────────────────────────────────────────────────────
  // Accessed like a property (acc1.balance), not a method call (acc1.balance())
  get balance() {
    // BUG in original: was this.movements — should be this.#movements (private field)
    return this.#movements.reduce((sum, mov) => sum + mov, 0);
  }

  // ── PRIVATE METHOD ────────────────────────────────────────────────────────
  // Internal helper — not part of the public API.
  // Real-world version would check credit history, score, existing debt, etc.
  #approveLoan(val) {
    return true; // simplified: always approves
  }
}

// ─── USAGE ───────────────────────────────────────────────────────────────────
const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250); // ✅ uses public interface
acc1.withdrawal(140); // ✅ uses public interface

acc1.movements = []; // ⚠️ This does NOT affect #movements at all!
// It just creates a NEW public property called "movements"
// on the instance. #movements (private) remains intact.
// This is exactly why private fields exist.

acc1.requestLoan(1000); // ✅ goes through public method → internally calls #approveLoan
// acc1.#approveLoan(1000);// ❌ SyntaxError — private method, inaccessible from outside

console.log(acc1.pin); // undefined — "pin" is not a public property; #pin is private
// console.log(acc1.#movements); // ❌ SyntaxError — private field */

// ===================REAL WORLD EXAMPLE OF CLASSES====================
// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO: A streaming platform (think Netflix/Spotify)
// Demonstrates: public + private fields, encapsulation,
//               static members, inheritance
// ─────────────────────────────────────────────────────────────────────────────

class StreamingAccount {
  // ── PUBLIC FIELDS ──────────────────────────────────────────────────────────
  platform = 'StreamFlix';

  // ── PRIVATE FIELDS ─────────────────────────────────────────────────────────
  #password;
  #watchHistory = [];
  #isLoggedIn = false;

  // ── STATIC PRIVATE FIELD ───────────────────────────────────────────────────
  // Belongs to the CLASS — shared across all instances, not per-object
  static #totalUsers = 0;

  constructor(username, password) {
    this.username = username;
    this.#password = password;
    StreamingAccount.#totalUsers++; // increment global user count on each new account
    console.log(`✅ Account created for ${this.username}`);
  }

  // ── PUBLIC METHODS ─────────────────────────────────────────────────────────

  login(password) {
    // Private method used internally for validation
    if (!this.#verifyPassword(password))
      return console.log('❌ Wrong password');
    this.#isLoggedIn = true;
    console.log(`👋 Welcome back, ${this.username}!`);
    return this; // enables method chaining
  }

  logout() {
    this.#isLoggedIn = false;
    console.log(`👋 Goodbye, ${this.username}`);
  }

  watch(title) {
    // Guard: must be logged in to use this feature
    if (!this.#isLoggedIn) return console.log('❌ Please log in first');
    this.#logWatch(title); // private logging method
    console.log(`🎬 Now watching: "${title}"`);
    return this;
  }

  getHistory() {
    // Controlled READ access — outside code can see history but not modify it
    return [...this.#watchHistory]; // spread = returns a copy, not the real array
  }

  // ── GETTER ─────────────────────────────────────────────────────────────────
  // Read-only computed property — no setter means it can't be overwritten
  get totalWatched() {
    return this.#watchHistory.length;
  }

  // ── STATIC METHOD ──────────────────────────────────────────────────────────
  // Called on the CLASS itself: StreamingAccount.getUserCount()
  // Not available on instances — acc1.getUserCount() would throw
  static getUserCount() {
    return StreamingAccount.#totalUsers;
  }

  // ── PRIVATE METHODS ────────────────────────────────────────────────────────
  #verifyPassword(input) {
    return input === this.#password; // internal check — never exposed publicly
  }

  #logWatch(title) {
    this.#watchHistory.push({
      title,
      watchedAt: new Date().toLocaleDateString(),
    });
  }
}

// ── CHILD CLASS: PremiumAccount ──────────────────────────────────────────────
// Inherits everything from StreamingAccount and adds premium-only features
class PremiumAccount extends StreamingAccount {
  // Public field unique to Premium
  tier = 'Premium';

  // Private field unique to Premium
  #downloads = [];

  constructor(username, password, screens = 4) {
    super(username, password); // MUST come first — initializes the parent
    this.screens = screens; // how many screens can stream simultaneously
    console.log(`⭐ Premium plan activated — ${screens} screens`);
  }

  // Premium-only method — not available on base StreamingAccount
  download(title) {
    if (!this.getHistory().length)
      return console.log('❌ Watch something first');
    this.#downloads.push(title);
    console.log(`📥 Downloaded "${title}" for offline viewing`);
    return this;
  }

  get totalDownloads() {
    return this.#downloads.length;
  }
}

// ─── USAGE ───────────────────────────────────────────────────────────────────

const user1 = new StreamingAccount('alice', 'pass123');
user1.login('pass123').watch('Breaking Bad').watch('Inception');
console.log(user1.getHistory()); // [{title, watchedAt}, ...]
console.log(user1.totalWatched); // 2  ← via getter

const vip = new PremiumAccount('bob', 'securepass', 4);
vip.login('securepass').watch('Dune').download('Dune');
console.log(vip.totalDownloads); // 1
console.log(vip.tier); // "Premium"
console.log(vip.platform); // "StreamFlix" ← inherited public field

// Static method — called on the class, not an instance
console.log(StreamingAccount.getUserCount()); // 2

// Encapsulation in action:
console.log(user1.totalWatched); // ✅ 2 — via getter
// console.log(user1.#watchHistory);  // ❌ SyntaxError
// console.log(user1.#password);      // ❌ SyntaxError
// vip.download('Dune');              // ❌ if not logged in — blocked by watch guard
