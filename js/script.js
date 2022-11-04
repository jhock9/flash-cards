const allImagesContainer = document.querySelector(".images-container");
const imagesList = document.querySelector(".images-list");

const gitUserInfo = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const userData = await userInfo.json();
  displayUserInfo(userData);
};


// parameter "could" be passed based on filters
const getImages = async function () {
  const fetchImages = await fetch(__________);
  const imageData = await fetchImages.json();
  //console.log(imageApiData);
  
  const imageArray = [];
  imageArray.length = 8;
  for (const img in imageData) {
    imageArray.push(img);
  };
  
  displayImages(imageData);

  // pull images from api -- based on filter parameters
  // put into an array of 8 -- randomized
  // at least 3 images need to be the same type / have same tag
  // 
};

const displayImages = function (image) {
  for (const image of images) {
    const imageItem = imagesList.createElement("li");
    imageItem.classList.add("image");
    imageItem.innerHTML = `<h3>"IMAGE PLACEHOLDER"}</h3>`;
    repoList.append(imageItem);      
  };
};

get newImages = function () {
  // when click "NEXT"
  // run getImages function
};
