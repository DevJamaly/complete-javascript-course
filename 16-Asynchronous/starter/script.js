'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://countries-api-836d.onrender.com/countries/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

//=====================AJAX===========================================

const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`,
  );
  request.send();

  request.addEventListener('load', function (e) {
    console.log(e);
    console.log(this.responseText);
    const [country] = JSON.parse(this.responseText);
    console.log(country);
    renderCountryCard(country);
  });
};

const renderCountryCard = function (country) {
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

  countriesContainer.insertAdjacentHTML('beforeend', cardHTML);
  countriesContainer.style.opacity = 1;
};

getCountryData('uae');
getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');

//=====================CALLBACK HELL===========================================
