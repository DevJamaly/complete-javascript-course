'use strict';

import { errorNotification } from './errorNotification.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://countries-api-836d.onrender.com/countries/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

//=====================AJAX===========================================
/* const getCountryData = function (countryName) {
  // XMLHttpRequest = the OLD way to make AJAX calls (before fetch() existed).
  // Still useful to learn because course builds up to fetch()/promises later.
  const request = new XMLHttpRequest();

  // .open() just CONFIGURES the request (method + URL) — doesn't send anything yet.
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
  );

  // .send() actually fires the request. This is the async part —
  // browser handles it in the background (Web API), JS moves on immediately.
  request.send();

  // Registering the callback AFTER .send() is fine — network requests always
  // take way longer than this one synchronous line, so the listener is
  // guaranteed to be attached before any response can arrive.
  request.addEventListener('load', function (e) {
    console.log(e); // the raw "load" event object — rarely useful directly

    // 'this' here = the `request` object (XMLHttpRequest instance), NOT undefined.
    // Why: this is a regular function, not an arrow function, so JS binds `this`
    // to whatever object the method was called on — here, addEventListener
    // calls it as request.<callback>(), so `this` = request.
    console.log(this.responseText); // raw JSON string response

    // API returns an ARRAY (even for one matching country), so destructure
    // the first element out instead of using JSON.parse(...)[0].
    const [country] = JSON.parse(this.responseText);
    console.log(country);

    renderCountryCard(country);
  });
};

const renderCountryCard = function (country) {
  // Small formatting helper, scoped inside since it's only used here.
  const formattedPopulation = population =>
    // population comes in as a string from the API — parseInt converts it,
    // divide by 1_000_000 (readable thanks to the numeric separator) to get
    // millions, .toFixed(1) rounds to 1 decimal, then append "M".
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  // insertAdjacentHTML('beforeend', ...) appends new HTML at the end of the
  // container's existing children — unlike `innerHTML +=`, it doesn't wipe
  // and re-parse everything already in there (better performance, preserves
  // existing event listeners on prior cards).
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);

  // Fades the container in (assumes CSS has a transition on opacity).
  countriesContainer.style.opacity = 1;
};

// Fires 4 requests essentially AT THE SAME TIME — JS doesn't wait for one
// to finish before starting the next, since .send() is non-blocking.
getCountryData('uae');
getCountryData('portugal');
getCountryData('usa');
getCountryData('germany'); */

//=====================CALLBACK HELL===========================================

/* const getCountryAndNeighbour = function (countryName) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
  );
  request.send();

  request.addEventListener('load', function (e) {
    const [country] = JSON.parse(this.responseText);
    console.log(country);

    //Render the country 1
    renderCountryCard(country);

    //Render neighbour country 2
    // Optional chaining (?.) — safely grabs the first border country code.
    // If `borders` is undefined (island nations, etc.), this returns
    // undefined instead of throwing an error.
    const neighbour = country.borders?.[0];

    // Guard clause — if there's no neighbour, stop here, no point firing
    // a second request for nothing.
    if (!neighbour) return;

    // SECOND request, nested INSIDE the first request's callback.
    // This only fires once country 1's data has already arrived —
    // it can't start any earlier since it needs `neighbour`'s code first.
    const request2 = new XMLHttpRequest();
    request2.open(
      'GET',
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
    );
    request2.send();

    request2.addEventListener('load', function (e) {
      console.log(this.responseText);
      const country2 = JSON.parse(this.responseText);
      console.log(country2);

      // 'neighbour' className lets CSS style this card differently
      // (e.g. smaller, indented) to visually show it's the related country.
      renderCountryCard(country2, 'neighbour');
    });
  });
};

const renderCountryCard = function (country, className = '') {
  // Default param: className defaults to '' so the original calls
  // (without a class) still work exactly like before.
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
  countriesContainer.style.opacity = 1;
};

getCountryAndNeighbour('uae');
// getCountryAndNeighbour('usa'); // commented out so the 2nd dataset doesn't mix with UAE's cards on screen

// 4 setTimeouts nested inside each other — each one only starts
// counting once the PREVIOUS one has already fired.
setTimeout(() => {
  console.log(`1 second has passed`);
  setTimeout(() => {
    console.log(`2 second has passed`);
    setTimeout(() => {
      console.log(`3 second has passed`);
      setTimeout(() => {
        console.log(`4 second has passed`);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000); */

//=====================PROMISES and FETCH API===========================================
/* // const request = new XMLHttpRequest();
// request.open(
//   'GET',
//   `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
// );
// request.send();

// const countryName = 'uae';
// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
// );
// console.log(request);

const getCountryData = function (countryName) {
  // fetch() fires an async HTTP GET and returns a Promise<Response>
  fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`)
    // Runs when the server responds — but body isn't parsed yet
    .then(function (response) {
      console.log(response);
      // .json() parses the body stream — also async, returns Promise<Data>
      // Must return it so the next .then() waits for it to resolve
      return response.json();
    })

    // Runs after .json() resolves — data is the actual parsed JS value
    .then(function (data) {
      console.log(data);
      renderCountryCard(data[0]); // API returns an array, grab first match
    });
};

const renderCountryCard = function (country) {
  // Converts raw population number to a readable "X.XM" string
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  // Appends new card without wiping existing DOM content (safer than innerHTML +=)
  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);

  // Fades the container in — relies on a CSS opacity transition
  countriesContainer.style.opacity = 1;
};

getCountryData('portugal'); */

//=====================CHAINING PROMISES===========================================
/* const getCountryData = function (countryName) {
  // Fetch 1: get the main country by name
  fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`)
    .then(response => response.json())
    .then(data => {
      renderCountryCard(data[0]);

      // ?.[0] guards if the API returns nothing
      // ?.borders?.[0] guards if the country has no borders (e.g. island nations)
      const neighbour = data?.[0].borders?.[0]; // alpha code e.g. "SAU"

      if (!neighbour) return; // no neighbour — exit early, skip Fetch 2

      // Returning the new Promise is what extends the chain —
      // without return, the next .then() fires immediately with undefined
      // instead of waiting for Fetch 2 to resolve
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
      );
    })
    // Only reaches here after Fetch 2 resolves — same parse pattern as above
    .then(response => response.json())
    .then(data => renderCountryCard(data, 'neighbour')); // className flags it as a neighbour card
};

const renderCountryCard = function (country, className = '') {
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
  countriesContainer.style.opacity = 1;
};

getCountryData('uae'); */

//=====================HANLDING REJECTED PROMISES===========================================
/* const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.color = 'crimson';
};

const getCountryData = function (countryName) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`)
    .then(
      response => response.json(),
      // .then() accepts a 2nd argument: a rejected-Promise handler,
      // but it only catches errors from THIS .then() — not the ones below.
      // .catch() at the end is cleaner since it catches the entire chain.
      // error => alert(error),
    )
    .then(data => {
      renderCountryCard(data[0]);
      const neighbour = data?.[0].borders?.[0];
      if (!neighbour) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
      );
    })
    .then(response => response.json())
    .then(data => renderCountryCard(data, 'neighbour'))

    // Any rejected Promise anywhere above propagates down the chain until
    // something handles it — .catch() sits at the bottom and catches all of them
    .catch(error => {
      console.error(error);
      renderError(`Something went wrong: ${error.message}`);
    })

    // Runs no matter what — success or failure — like a guaranteed cleanup step.
    // Think of it as the Promise equivalent of a try/catch/finally block.
    .finally(() => {
      btn.style.opacity = 0;
      countriesContainer.style.opacity = 1;
    });
};

const renderCountryCard = function (country, className = '') {
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

console.log(btn);

btn.addEventListener('click', e => {
  console.log(e);
  getCountryData('portugal');
}); */

//=====================THROWING ERRORS MANUALLY===========================================
/* const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.color = 'crimson';
};

// Reusable fetch helper — abstracts the fetch + parse + error check pattern
// so getCountryData doesn't repeat it for every request
const getJson = function (url, errorMsg = 'Error ') {
  return fetch(url).then(response => {
    console.log(response);

    // fetch() only rejects on network failure — NOT on 404/500 HTTP errors.
    // response.ok is false for any non-2xx status, so we manually throw
    // to force those cases into .catch() down the chain
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const getCountryData = function (countryName) {
  // getJson returns a Promise, so the chain starts here
  getJson(
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
    'Country not found! ',
  )
    .then(data => {
      renderCountryCard(data[0]);
      const neighbour = data?.[0].borders?.[0];

      // throw inside .then() rejects the Promise — skips all remaining .then()s
      // and drops straight into .catch(). Cleaner than a silent return.
      if (!neighbour) throw new Error('No Neighbours found!');

      return getJson(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`,
        'Country not found! ',
      );
    })
    .then(data => renderCountryCard(data, 'neighbour'))
    .catch(error => {
      console.error(error);
      renderError(`Something went wrong: ${error.message}`);
    })
    .finally(() => {
      btn.style.opacity = 0;
      countriesContainer.style.opacity = 1;
    });
};

const renderCountryCard = function (country, className = '') {
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

console.log(btn);

btn.addEventListener('click', e => {
  console.log(e);
  getCountryData('madagascar');
}); */

//=====================THE EVENT LOOP===========================================
/* // ============================================================
// SYNC code runs first — top to bottom, nothing waits
// ============================================================

console.log(`Test Start`); // [1] Runs immediately → "Test Start"

setTimeout(() => console.log(`0 sec timer`), 0);
// [2] Handed off to Web API. Callback goes to CALLBACK QUEUE after 0ms.
//     0ms doesn't mean "runs next" — it means "queued after 0ms".
//     Callback Queue has LOWER priority, so it waits.

Promise.resolve('Resolved Promise 1').then(res => console.log(res));
// [3] Already resolved. .then callback goes straight to MICROTASK QUEUE.

Promise.resolve('Resolved Promise 2').then(res => {
  for (let i = 0; i < 1_000_000_000_0; i++) {} // heavy blocking loop
  console.log(res);
});
// [4] Also already resolved. .then callback queued in MICROTASK QUEUE.
//     The heavy loop inside doesn't matter yet — it hasn't run.

console.log(`Test End`); // [5] Runs immediately → "Test End"

// ============================================================
// Call stack is now EMPTY. Event loop takes over.
// ============================================================

// MICROTASK QUEUE is drained FIRST (priority over Callback Queue):
//   [6] → "Resolved Promise 1"
//   [7] → heavy loop runs (blocks everything during this time)
//        → "Resolved Promise 2"

// Only NOW, with Microtask Queue empty, does Callback Queue get a turn:
//   [8] → "0 sec timer"

// ============================================================
// OUTPUT ORDER:
// 1. "Test Start"
// 2. "Test End"
// 3. "Resolved Promise 1"
// 4. "Resolved Promise 2"   ← delayed by the heavy loop
// 5. "0 sec timer"          ← despite being 0ms, runs LAST
// ============================================================ */

//=====================BUILDING PROMISES===========================================
/* // ─────────────────────────────────────────────
// 1. MANUALLY CREATING A PROMISE
// ─────────────────────────────────────────────
const lotteryPromise = new Promise(function (resolve, reject) {
  // This runs SYNCHRONOUSLY — the "lottery machine" starts immediately.
  // Think of this executor function as setting up the async operation.
  console.log(`Lottery draw is happening 🔮`);

  setTimeout(() => {
    // This runs ASYNC — the result arrives after 2s.
    // resolve() → fulfilled → .then() fires
    // reject()  → rejected  → .catch() fires
    if (Math.random() >= 0.5) resolve('You WIN 🎉');
    else reject(new Error('You lost 😣'));
  }, 2000);
});

// Consuming the promise
lotteryPromise
  .then(res => console.log(res)) // runs if resolved
  .catch(err => console.error(err)); // runs if rejected

// ─────────────────────────────────────────────
// 2. PROMISIFYING setTimeout
// ─────────────────────────────────────────────
// Wraps setTimeout in a Promise so it plays nicely in Promise chains.
// No reject needed — setTimeout can't fail.
// resolve is passed directly as the callback; calling it after N seconds
// fulfils the promise with no value (undefined), which is fine — we only
// care that time passed, not what value comes back.
const wait = seconds =>
  new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });

// ─────────────────────────────────────────────
// 3. CALLBACK HELL vs PROMISE CHAIN
// ─────────────────────────────────────────────
// ❌ Callback Hell (commented out) — each step nests deeper, unreadable.
// Each setTimeout must live INSIDE the previous one to fire sequentially.
// setTimeout(() => {
//   console.log(`1 second has passed`);
//   setTimeout(() => {
//     console.log(`2 second has passed`);
//     setTimeout(() => {
//       console.log(`3 second has passed`);
//       setTimeout(() => {
//         console.log(`4 second has passed`);
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// ✅ Promise Chain — flat, readable, same sequential behaviour.
// Each .then() returns a NEW promise (return wait(1)), so the next
// .then() only fires when that new promise settles. Without `return`,
// the chain wouldn't wait — all logs would fire simultaneously.
wait(1)
  .then(() => {
    console.log('1 second has passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second has passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second has passed');
    return wait(1);
  })
  .then(() => console.log('4 second has passed'));

// ─────────────────────────────────────────────
// 4. STATIC Promise.resolve / Promise.reject
// ─────────────────────────────────────────────
// Shortcuts — create an already-settled promise without new Promise().
// Useful when a function must return a promise but the value is already known.
Promise.resolve('Initial results').then(res => console.log(res)); // → "Initial results"
Promise.reject(new Error(`Error: ❌`)).catch(err => console.error(err)); // → Error: ❌

// ─────────────────────────────────────────────
// 5. REAL World Example
// ─────────────────────────────────────────────
// Simulates a network request (manual Promise, like lotteryPromise)
const authenticate = (username, password) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'taha' && password === '1234')
        resolve({ userId: 42, token: 'abc123' });
      else reject(new Error('Invalid credentials'));
    }, 1000);
  });

// Promisified delay — simulates a "loading" pause (like your wait())
const delay = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// Simulates fetching a user profile (returns already-known data → Promise.resolve shortcut)
const fetchProfile = userId =>
  Promise.resolve({ userId, name: 'Taha', role: 'developer' });

// Simulates a guaranteed server error → Promise.reject shortcut
const fetchBannedUser = () => Promise.reject(new Error('Account suspended'));

// ─── THE CHAIN ───────────────────────────────
authenticate('taha', '1234')
  .then(({ token }) => {
    console.log('✅ Logged in, token:', token);
    return delay(1); // artificial "loading" pause before next step
  })
  .then(() => fetchProfile(42)) // returns Promise.resolve → chain waits for it
  .then(profile => {
    console.log('👤 Profile loaded:', profile.name);
  })
  .catch(err => console.error('❌ Login failed:', err.message));
 */

//=====================PROMISIFYING===========================================
/* // navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err),
// );
// console.log('Getting position');

// ─────────────────────────────────────────────
// 1. PROMISIFYING THE GEOLOCATION API
// ─────────────────────────────────────────────
// getCurrentPosition() is callback-based. We wrap it in a Promise to fit it into a chain.
// Elegant trick: resolve/reject passed directly as success/error callbacks — no manual wrappers.
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// ─────────────────────────────────────────────
// 2. REUSABLE FETCH HELPER
// ─────────────────────────────────────────────
// fetch() only rejects on network failure, NOT on HTTP errors (404, 500 etc).
// We check response.ok manually and throw if bad — throwing inside .then() auto-triggers .catch().
const getJson = function (url, errorMsg = 'Error: ') {
  return fetch(url).then(response => {
    if (!response.ok) throw Error(`${errorMsg} (${response.status})`);
    return response.json(); // parsed result passed to next .then()
  });
};

// ─────────────────────────────────────────────
// 3. COORDINATE VALIDATION
// ─────────────────────────────────────────────
// Destructures coords in the parameter. Returns a Promise so it plugs into the chain as a .then() step.
// Any reject() skips all remaining .then() calls and lands in .catch().
// ⚠️ Bug without `return` before reject(): execution continues and could call resolve() too.
const isValidCoords = ({ latitude: lat, longitude: lng }) => {
  return new Promise((resolve, reject) => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng))
      return reject(new Error('Coordinates must be valid numbers'));

    if (lat < -90 || lat > 90)
      return reject(new Error(`Invalid latitude: ${lat} (must be -90 to 90)`));

    if (lng < -180 || lng > 180)
      return reject(
        new Error(`Invalid longitude: ${lng} (must be -180 to 180)`),
      );

    resolve({ lat, lng });
  });
};

// ─────────────────────────────────────────────
// 4. DOM RENDERER
// ─────────────────────────────────────────────
// Pure UI function — injects a country card into the DOM.
// className defaults to '' but accepts 'neighbour' for alternate styling.
const renderCountryCard = function (country, className = '') {
  // Inline helper: converts raw number → readable "X.XM" format
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

// ─────────────────────────────────────────────
// 5. MAIN CHAIN — whereAmI()
// ─────────────────────────────────────────────
// Each .then() receives the resolved value of the previous step.
// Each `return` is critical — without it the chain won't wait for the next promise (common bug).
const whereAmI = function () {
  getPosition() // Step 1: Get GPS coords from browser
    .then(pos => isValidCoords(pos.coords)) // Step 2: Validate → resolves {lat,lng} or rejects
    .then(({ lat, lng }) =>
      getJson(
        // Step 3: Reverse geocode → city/country name
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
        'Could not process location!',
      ),
    )
    .then(data => {
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return getJson(
        // Step 4: Fetch full country data via country code
        `https://countries-api-836d.onrender.com/countries/alpha/${data.countryCode}`,
        'Country not found! ',
      );
    })
    .then(data => renderCountryCard(data)) // Step 5: Render card to DOM
    .catch(
      (
        error, // One catch handles ANY rejection from ANY step above
      ) =>
        errorNotification.showError(`Something went wrong: ${error.message}`),
    )
    .finally(() => {
      // Runs regardless of success or failure
      btn.style.opacity = 0;
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI); */

//=====================ASYNC/AWAIT===========================================

// ─────────────────────────────────────────────
// 1. PROMISIFYING GEOLOCATION
// ─────────────────────────────────────────────

const getPosition = function () {
  return new Promise((resolve, reject) => {
    // Guard first — navigator.geolocation is undefined on unsupported browsers
    if (!navigator.geolocation)
      return reject(new Error('Geolocation is not supported by your browser'));
    // resolve/reject passed directly as success/error callbacks — no manual wrappers needed
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// ─────────────────────────────────────────────
// 2. COORDINATE VALIDATION (SYNC)
// ─────────────────────────────────────────────

// Synchronous — no Promise needed. throw here propagates up into whereAmI's try/catch
// because isValidCoords is called inside an async function with await context.
const isValidCoords = function ({ latitude: lat, longitude: lng }) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng))
    throw new Error('Coordinates must be valid numbers');

  if (lat < -90 || lat > 90)
    throw new Error(`Invalid latitude: ${lat} (must be -90 to 90)`);

  if (lng < -180 || lng > 180)
    throw new Error(`Invalid longitude: ${lng} (must be -180 to 180)`);

  return { lat, lng };
};

// ─────────────────────────────────────────────
// 3. REUSABLE FETCH HELPER (ASYNC)
// ─────────────────────────────────────────────

// async/await version of the Promise chain fetch pattern.
// fetch() only rejects on network failure — NOT on 404/500.
// We check response.ok manually and throw, which rejects the async function → triggers caller's catch.
const getJson = async function (url, errorMsg = 'Error: ') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return response.json(); // return await here is redundant — async already wraps it in a promise
};

// ─────────────────────────────────────────────
// 4. DOM RENDERER (SYNC, PURE UI)
// ─────────────────────────────────────────────

const renderCountryCard = function (country, className = '') {
  const formattedPopulation = population =>
    `${(Number.parseInt(population, 10) / 1_000_000).toFixed(1)}M`;

  const cardHTML = `
    <article class="country ${className}">
        <img class="country__img" src="${country.flag}" />
        <div class="country__data">
            <h3 class="country__name">${country.name}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${formattedPopulation(country.population)} people</p>
            <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
};

// ─────────────────────────────────────────────
// 5. MAIN FUNCTION — async/await + error handling
// ─────────────────────────────────────────────

// async makes this return a Promise automatically.
// await pauses execution at each step until the Promise settles —
// reads like synchronous code but behaves asynchronously.
const whereAmI = async function () {
  try {
    // Each await either resolves to a value or throws — throw jumps straight to catch.
    // This is equivalent to a .then() chain — each line depends on the previous.
    const pos = await getPosition();
    const { lat, lng } = isValidCoords(pos.coords); // sync throw caught by same try/catch

    // Sequential awaits — each fires only after the previous resolves.
    // Equivalent to chained .then() calls but without nesting or .catch() duplication.
    const geoData = await getJson(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      'Could not process location!',
    );

    const countryData = await getJson(
      `https://countries-api-836d.onrender.com/countries/alpha/${geoData.countryCode}`,
      'Country not found! ',
    );

    renderCountryCard(countryData);
  } catch (e) {
    // ONE catch handles every failure above — getPosition, isValidCoords, both getJson calls.
    // Any throw or rejected await lands here. Equivalent to .catch() at the end of a chain.
    errorNotification.showError(e.message);
    console.error(e);
  } finally {
    // Runs regardless of success or failure — equivalent to .finally() on a chain.
    // ⚠️ Container shows even on error — move opacity=1 into try if that's undesired.
    btn.style.opacity = 0;
    countriesContainer.style.opacity = 1;
  }
};

btn.addEventListener('click', whereAmI);
