require('dotenv').config()
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;


const allImages = document.querySelector(".images-container");
const newImagesButton = document.querySelector("#next");

// ? parameter "could" be passed based on filters
const getImages = async function () {
  const fetchAirplanes = await fetch('${API_URL}?key=${API_KEY}&q=airplane');
  const airplanes = await fetchAirplanes.json();
  console.log(airplanes);
  


// ? adding the fetched images to an array
  // const imageArray = [];
  // imageArray.length = 8;
  // for (const img in imageData) {
  //   imageArray.push(img);
  // };
  
  // displayImages(airplanes);

  // pull images from api -- based on filter parameters
  // put into an array of 8 -- randomized
  // at least 3 images need to be the same type / have same tag
  // 
};

// const displayImages = function (image) {
//   for (const image of images) {
//     const div = document.createElement("div");
//     div.classList.add("image");
//     div.innerHTML = 
//       <img src=${_____} alt=${_____}/>;
//     allImages.append(div);      
//   };
// };   


// newImagesButton.addEventListener("click", function () {
//   getImages();
// });

// TODO add filtering functions