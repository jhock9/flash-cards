require('dotenv').config()
const API_URL_KEY = process.env.API_URL_KEY;
const airplanes = [];

// const allImages = document.querySelector(".images-container");
// const newImagesButton = document.querySelector("#next");

// AIRPLANES
const getAirplanes = async function () {
  // fetch 10 image datasets based on API search parameter
  const fetchAirplanes = await fetch('${API_URL_KEY}&q=airplane&category=transportation&per_page=10&page=1');
  const airplanesData = await fetchAirplanes.json();
  // fetch the images from the datasets
  airplanesData.hits.forEach(function(image) {
  airplanes.push(image.webformatURL);
  });
};

getAirplanes();