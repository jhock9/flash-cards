// require('dotenv').config()
// const API_URL_KEY = process.env.API_URL_KEY;
// const API_URL = process.env.API_URL;
// const API_KEY = process.env.API_KEY;
const airplanes = [];

// const allImages = document.querySelector(".images-container");
// const newImagesButton = document.querySelector("#next");

// TODO create a test.js file and work out of there, and it to the .env file so it doesnt get uploaded to Github

// ! Hidden API script
  // const fetchAirplanes = await fetch('${API_URL}?key=${API_KEY}&q=airplane&category=transportation&per_page=10&page=1');
  // const fetchAirplanes = await fetch('${API_URL_KEY}&q=airplane&category=transportation&per_page=10&page=1');

// AIRPLANES
const getAirplanes = async function () {
  // fetch 10 image datasets based on API search parameter
  // ! Insert API script here before uploading to Github

  // ! 
  const airplanesData = await fetchAirplanes.json();
  // fetch the images from the datasets
  airplanesData.hits.forEach(function(image) {
    // console.log(image.webformatURL);
    airplanes.push(image.webformatURL);
  });
  // console.log(airplanes);
  // displayImages(airplanes); // ? is this needed ?
  // TODO random merge with another array, total of 8 (3 % 5)
};

// console.log(getAirplanes());

// getAirplanes();
// console.log(airplanes);

//   // randomize image indexes ex 1
// const shuffle1 = function (array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   };
//   return array;
// };
// console.log (shuffle1(airplanes));

//   // randomize image indexes wx 2
// const shuffle2 = function (array) {
//   return array.sort( function (){
//     0.5 = Math.random();
//   });
// };
// console.log (shuffle2(airplanes));


//  // ? what is this for?
// const displayImages = function (airplanes) {
//   const div = document.createElement("div");
//   div.classList.add("image");
//   div.innerHTML = 
//     <img src=${_____} alt=${_____}/>;
//   allImages.append(div);      
// };   

//  // get new images
// newImagesButton.addEventListener("click", function () {
//   getImages();
// });

// TODO add filtering functions