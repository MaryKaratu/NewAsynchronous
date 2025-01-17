'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = `
//    <article class="country">
//           <img class="country__img" src="${data.flags.svg}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)}people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
//             <p class="country__row"><span>💰</span>${data.currencies}</p>
//           </div>
//         </article>
//   `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('nigeria');
// getCountryData('usa');
// getCountryData('germany');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
         <img class="country__img" src="${data.flags.png}" />
         <div class="country__data">
           <h3 class="country__name">${data.name.common}</h3>
           <h4 class="country__region">${data.region}</h4>
           <p class="country__row"><span>👫</span>${(
             +data.population / 1000000
           ).toFixed(1)}people</p>
           <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
           <p class="country__row"><span>💰</span>${data.currencies[1]}</p>
         </div>
       </article>
 `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = function (country) {
//   //AJAX call country 1
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     // console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country 1
//     renderCountry(data);

//     //GetNeigbor country (2)
//     const [neighbor] = data.borders;

//     if (!neighbor) return;

//     //AJAX call country 2
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbor}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       //render country 2
//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('nigeria');
// getCountryAndNeighbour('usa');

// ///////////////////////////////////////
// //Callback hell
// setTimeout(() => {
//   console.log('1 seconds passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

////////////////////////////////////////////////////////////////MODERN METHOD OF AJAX CALL

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`).then(function (
//     response
//   ) {
//     console.log(response);
//     return response.json().then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
//   });
// };
const getJSON = function (url, errMsg = 'Something went wron') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
    return response.json();
  });
};

//simplified
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response =>
//      if (!response.ok)
//         throw new Error (`Country not found ($
//        {response.   status}))
//         return response.json())
//     .then(data => renderCountry(...data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}📛📛📛`);
//       renderError(`Something went wrong 📛📛📛 ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

////////////////////
//simplified
// const getCountryData = function (country) {
//   //country 1
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) throw new Error('No neighbour found!');

//       //country 2
//       return getJSON(
//         `https://restcountries.com/v3.1/alpha/${neighbour}`,
//         'Country not found'
//       );
//     })

//     .then(data => renderCountry(...data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}📛📛📛`);
//       renderError(`Something went wrong 📛📛📛 ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('nigeria');
// });

// getCountryData('fehsvdnss');

/////////////////////////////////////////////
//Challenge 1
const whereAmI = function (lat, lng) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.address.city}, ${data.address.country}`);
      const country = data.address.country;
      console.log(country);

      //render country
      return fetch(`https://restcountries.com/v3.1/name/${country}`);
    })
    .then(res => res.json())
    .then(data => renderCountry(...data, 'country'));

  // .catch(err => console.error(`${err.message}.📛`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
