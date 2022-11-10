require('dotenv').config()
const API_URL_KEY = process.env.API_URL_KEY;
const airplanes = [];

const allImages = document.querySelector(".images-container");
// const newImagesButton = document.querySelector("#next");

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
  displayImages(airplanes);
};
getAirplanes();

// Displays images on page
const displayImages = function (array) {
  for (let image of array) {
    const img = document.createElement("img");
    img.classList.add("image", "center");
    img.src = image;
    allImages.append(img);
  }
};   