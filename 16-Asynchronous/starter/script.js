'use strict';

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
const renderError = function (msg) {
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
      /* error => alert(error), */
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
});
