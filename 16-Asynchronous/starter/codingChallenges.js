'use strict';
import { errorNotification } from './errorNotification.js';

//========================CODING CHALLENGE #1==============================
/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getJson = function (url, errorMsg = 'Error: ') {
  return fetch(url).then(response => {
    if (!response.ok) throw Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const isValidCoords = (lat, lng) => {
  // isFinite catches NaN, Infinity, strings, null, undefined in one shot
  if (!Number.isFinite(lat) || !Number.isFinite(lng))
    throw new Error('Coordinates must be valid numbers');

  if (lat < -90 || lat > 90)
    throw new Error(`Invalid latitude: ${lat} (must be -90 to 90)`);

  if (lng < -180 || lng > 180)
    throw new Error(`Invalid longitude: ${lng} (must be -180 to 180)`);
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

const whereAmI = function (lat, lng) {
  try {
    isValidCoords(lat, lng); // sync — caught here ✓
  } catch (error) {
    errorNotification.showError(`Invalid coords: ${error.message}`);
    return;
  }

  getJson(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
    'Could not process location!',
  )
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}`);
      return getJson(
        `https://countries-api-836d.onrender.com/countries/alpha/${data.countryCode}`,
        'Country not found! ',
      );
    })
    .then(data => renderCountryCard(data))
    .catch(error =>
      errorNotification.showError(`Something went wrong: ${error.message}`),
    ) // async errors caught here ✓
    .finally(() => {
      btn.style.opacity = 0;
      countriesContainer.style.opacity = 1;
    });
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

btn.addEventListener('click', e => {
  const success = pos => whereAmI(pos.coords.latitude, pos.coords.longitude);
  const error = err =>
    errorNotification.showError(`ERROR(${err.code}): ${err.message}`);

  //   whereAmI(52.508, 13.381);
  //   whereAmI(19.037, 72.873);
  //   whereAmI(-33.933, 18.474);
  navigator.geolocation.getCurrentPosition(success, error, options);

  //   whereAmI();
  //   whereAmI(123456, 123456);
});
