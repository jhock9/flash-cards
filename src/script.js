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


const displayImages = function (array) {
  array.forEach(function (value) {
    for (let i = 0; i < array.length; i++) {
      const div = document.createElement("div");
      div.classList.add("image");
      div.innerHTML =`
        <img src=${value} alt="airplane"/>`;  // airplanesData.hits.tags
      allImages.append(div);
    };
  });
};   
