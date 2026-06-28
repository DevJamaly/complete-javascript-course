'use strict';

import { errorNotification } from './errorNotification.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

/* 
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

  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
  //   navigator.geolocation.getCurrentPosition(success, error, options);

  //   whereAmI();
  //   whereAmI(123456, 123456);
});
 */

//========================CODING CHALLENGE #2=============================
/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* const imagesContainer = document.querySelector('.images');
let currentImg = null;
btn.style.display = 'none';

const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    if (!imgPath) return reject(new Error('Image Path is empty!'));
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', e => {
      console.log(`IMAGE LOADED: `, e);
      imagesContainer.insertAdjacentElement('afterbegin', imgEl);
      return resolve(imgEl);
    });
    imgEl.addEventListener('error', e =>
      reject(new Error(`Image not found: ${imgPath}`)),
    );
  });
};

// ─────────────────────────────────────────────
// 1. ATTEMPT 1 FULL CHAIN
// ─────────────────────────────────────────────
// createImage('img/img-1.jpg')
//   .then(imgEl => {
//     currentImg = imgEl;
//     return wait(2);
//   })
//   .then(() => {
//     console.log(`2 seconds have passed, loading image 2`);
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(imgEl => {
//     currentImg = imgEl;
//     return wait(2);
//   })
//   .then(() => {
//     console.log(`2 seconds have passed, loading image 3`);
//     currentImg.style.display = 'none';
//     return createImage('img/img-3.jpg');
//   })
//   .then(imgEl => {
//     currentImg = imgEl;
//     return wait(2);
//   })
//   .then(() => {
//     console.log(`2 seconds have passed, hiding all`);
//     currentImg.style.display = 'none';
//   })
//   .catch(err => errorNotification.showError(err.message));

// ─────────────────────────────────────────────
// 2. ATTEMPT 2 MODULARIZATION BY EXTRACTING REPEATING LOGIC TO FUNCTION
// ─────────────────────────────────────────────
const showThenHide = (imgPath, seconds) =>
  createImage(imgPath)
    .then(imgEl => wait(seconds).then(() => imgEl))
    .then(imgEl => (imgEl.style.display = 'none'));

// showThenHide('img/img-1.jpg', 2)
//   .then(() => showThenHide('img/img-2.jpg', 2))
//   .then(() => showThenHide('img/img-3.jpg', 2))
//   .catch(err => errorNotification.showError(err.message));

// ─────────────────────────────────────────────
// 3. ATTEMPT 3 CHAINING WITH REDUCE
// ─────────────────────────────────────────────

const images = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
images
  .reduce(
    (chain, imgPath) => chain.then(() => showThenHide(imgPath, 2)),
    Promise.resolve(),
  )
  .catch(err => errorNotification.showError(err.message)); */

//========================CODING CHALLENGE #3=============================

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/

const imagesContainer = document.querySelector('.images');
btn.style.display = 'none';

const wait = function (seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
  return new Promise((resolve, reject) => {
    if (!imgPath) return reject(new Error('Image Path is empty!'));
    const imgEl = document.createElement('img');
    imgEl.src = imgPath;
    imgEl.addEventListener('load', e => {
      console.log(`IMAGE LOADED: `, e);
      imagesContainer.insertAdjacentElement('afterbegin', imgEl);
      return resolve(imgEl);
    });
    imgEl.addEventListener('error', e =>
      reject(new Error(`Image not found: ${imgPath}`)),
    );
  });
};

// ─────────────────────────────────────────────
// 1. ATTEMPT 1 FULL CHAIN
// ─────────────────────────────────────────────
const loadNPause = async function () {
  try {
    let imgEl = await createImage('img/img-1.jpg');
    console.log(imgEl);
    await wait(2);
    imgEl.style.display = 'none';

    imgEl = await createImage('img/img-2.jpg');
    console.log(imgEl);
    await wait(2);
    imgEl.style.display = 'none';

    imgEl = await createImage('img/img-3.jpg');
    console.log(imgEl);
    await wait(2);
    imgEl.style.display = 'none';
  } catch (error) {
    errorNotification.showError(error.message);
  }
};

// loadNPause();

// ─────────────────────────────────────────────
// 2. ATTEMPT 2 MODULARIZATION BY EXTRACTING REPEATING LOGIC TO FUNCTION
// ─────────────────────────────────────────────

const showThenHide = async function (imgPath, seconds) {
  let imgEl = await createImage(imgPath);
  await wait(seconds);
  imgEl.style.display = 'none';
};

const loadNPauseSequentially = async function () {
  try {
    await showThenHide('img/img-1.jpg', 2);
    await showThenHide('img/img-2.jpg', 2);
    await showThenHide('img/img-3.jpg', 2);
  } catch (error) {
    errorNotification.showError(error.message);
  }
};
// loadNPauseSequentially();

// ─────────────────────────────────────────────
// 3. ATTEMPT 3 LOOPING PROGRAMATICALLY
// ─────────────────────────────────────────────

const images = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
const pauseInterval = 2;

const loadNPauseProgrmatically = async function () {
  try {
    for (const imgPath of images) {
      await showThenHide(imgPath, pauseInterval); // ✅ awaited sequentially
    }
  } catch (error) {
    errorNotification.showError(error.message);
  }
};
// loadNPauseProgrmatically();

// ─────────────────────────────────────────────
// PART 2: Multiple Image loading
// ─────────────────────────────────────────────

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(imgPath => createImage(imgPath));
    console.log(imgs);
    const imgElements = await Promise.all(imgs);
    console.log(imgElements);
    imgElements.forEach(imgEl => imgEl.classList.add('parallel'));
  } catch (error) {
    errorNotification.showError(error.message);
  }
};

loadAll(images);
