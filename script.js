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
  const [currencyCode] = Object.keys(data.currencies);
  const currency = data.currencies[currencyCode].name;
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
           <p class="country__row"><span>💰</span>${currency}</p>
         </div>
       </article>
 `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
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
const getJSON = function (url, errMsg = 'Something went wrong') {
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
//       console.log(data);
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];

//       if (!neighbour) return;

//       //country 2
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found ($
//        {response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(...data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err}📛📛📛`);
//       renderError(`Something went wrong 📛📛📛 ${err.message}.Try again!`);
//     })
//     .finally(() => {
//       // countriesContainer.style.opacity = 1;
//     });
// };

////////////////////
// //simplified
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
// //Challenge 1
// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//   )
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.address.city}, ${data.address.country}`);
//       const country = data.address.country;
//       console.log(country);

//       //render country
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(...data, 'country'))
//     .catch(err => console.error(`${err.message}.📛`));
// };
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

//////////////////////
//Event Loop
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolve promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000; i++) {
//     console.log(res);
//   }
// });
// console.log('Test end');

//////////////////////////////////////////////
//Creating Promises
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lotter draw is happening');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You Win');
//     } else {
//       reject(new Error('You lost your money'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //Promisifyinf SetTimeout
// const wait = function (second) {
//   return new Promise(resolve => {
//     setTimeout(resolve, second * 1000);
//   });
// };
// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 seconds'));

// Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('problem')).catch(x => console.log(x));

////////////////////////////////////////
//Promisifying the Geolocation;
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.log(err)
// );

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getPosition().then(pos => console.log(pos));

// //Example 2
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       console.log(pos.coords);
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(
//         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//       );
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Problem with geocoding ${response.status}`);

//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.address.city}, ${data.address.country}`);
//       const country = data.address.country;
//       console.log(country);

//       //render country
//       return fetch(`https://restcountries.com/v3.1/name/${country}`);
//     })
//     .then(res => res.json())
//     .then(data => renderCountry(...data, 'country'))
//     .catch(err => console.error(`${err.message}.📛`));
// };

// btn.addEventListener('click', whereAmI);

//challenge

// const imgContainer = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', () => imgContainer.append(img));
//     resolve(img);
//   });

//   img.addEventListener('error', function () {
//     reject(img);
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('image 1 loaded');
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loa ded');
//     return wait(2);
//   })
//   .then(() => (currentImg.style.display = 'none'))
//   .catch(err => console.log('There was an error'));

/////////////////////////////
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
//consuming promise with async/await
// const whereAmI = async function () {
//   try {
// fetch('https://restcountries.com/v3.1/name/${country}').then(res =>
//   console.log(res)
// );
//Geolocation
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     //Reversed geocoding
//     const resGeo = await fetch(
//       `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//     );
//     if (!resGeo) throw new Error('Problem getting location data');

//     const dataGeo = await resGeo.json();

//     //Country Data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.address.country}`
//     );
//     if (!res) throw new Error('Problem getting country');

//     const data = await res.json();
//     console.log(data.name);
//     console.log(data);
//     renderCountry(...data);

//     return `You are in ${dataGeo.city}, ${dataGeo.address.country}`;
//   } catch (err) {
//     renderError(`Something went wrong ${err.message}`);

//     //Reject promise return from asyn function
//     throw err;
//   }
// };

// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`${err.message} 🌋`))
//   .finally(() => console.log('finish gettng location'));
// console.log('First');

// // try {
// //   let y = 1;
// //   const x = 2;
// //   x = 3;
// // } catch (err) {
// //   alert(err.message);
// // }

// (async function () {
//   try {
//     const city = await whereAmI();
//     console.log(city);
//   } catch (err) {
//     console.err(`${err.message}`);
//   }
//   console.log(`Finished getting location`);
// })();

////////////////
//Running Promises in Parallel
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // console.log(data1);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
//     //console.log([...data1.capital, ...data2.capital, ...data3.capital]);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);

//     console.log(data.flatMap(d => d[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get3Countries('portugal', 'canada', 'tanzania');

//Promise.race
// (async function () {
//   const res = await Promise.race([
//     getJSON(`https://restcountries.com/v3.1/name/italy`),
//     getJSON(`https://restcountries.com/v3.1/name/egypt`),
//     getJSON(`https://restcountries.com/v3.1/name/mexico`),
//   ]);
//   console.log(res[0]);
// })();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long`));
    }, (sec = 1000));
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/nigeria`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

//Promise.allSettled
Promise.allSettled([
  Promise.resolve('sucess'),
  Promise.reject('error'),
  Promise.resolve('Another sucess'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('sucess'),
  Promise.reject('error'),
  Promise.resolve('Another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

//Promise.any
Promise.any([
  Promise.resolve('sucess'),
  Promise.reject('error'),
  Promise.resolve('Another sucess'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
