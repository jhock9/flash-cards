require('dotenv').config()
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const allImages = document.querySelector(".images-container");
const newImagesButton = document.querySelector("#next");

// AIRPLANES
const getAirplanes = async function () {
  const fetchAirplanes = await fetch('${API_URL}?key=${API_KEY}&q=airplane&category=transportation&per_page=8&page=1');
  const airplanesData = await fetchAirplaneData.json();

  const fetchAirplaneImages = await fetch (airplanesData.webformatURL);
  const airplaneImages = await fetchAirplaneImages.json();

  const airplanes = [];
  for (const airplane in airplaneImages) {
    airplanes.push(airplane);
  };
  // TODO randomize array

  displayImages(airplanes);

  // TODO random merge with another array, total of 8 (3 % 5)

  // 
};

const displayImages = function (airplanes) {
  const div = document.createElement("div");
  div.classList.add("image");
  div.innerHTML = 
    <img src=${_____} alt=${_____}/>;
  allImages.append(div);      
};   


// newImagesButton.addEventListener("click", function () {
//   getImages();
// });

// TODO add filtering functions