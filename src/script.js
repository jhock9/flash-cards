// require('dotenv').config()
// import "./main.css"
const API_URL_KEY = process.env.API_URL_KEY;

const allImages = document.querySelector(".images-container");
// const newImagesButton = document.querySelector("#next");
const airplanes = [];

// AIRPLANES
const getAirplanes = async function () {
  // fetch 10 image datasets based on API search parameter
  const fetchAirplanes = await fetch('${API_URL_KEY}&q=airplane&category=transportation&per_page=10&page=1');
  const airplanesData = await fetchAirplanes.json();
  // add images to array 
  for (let i = 0, l = airplanesData.hits.length; i < l; i++) {
    const airplaneImg = airplanesData.hits[i].webformatURL;
    airplanes.push(airplaneImg);
  }
  shuffleImages(airplanes);
  displayImages(airplanes);
};
getAirplanes();

// Randomizes images displayed and shortens array length
const shuffleImages = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  array.length = 8;
};

// Displays images on page
const displayImages = function (array) {
  for (let image of array) {
    const img = document.createElement("img");
    img.classList.add("image", "center");
    img.src = image;
    allImages.append(img);
  }
};   