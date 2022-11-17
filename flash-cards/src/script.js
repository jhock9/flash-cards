// require('dotenv').config()
// import "./main.css"
const API_URL_KEY = process.env.API_URL_KEY;

const filterBtn = document.querySelector('#filter-btn');
// const filterInput = document.querySelector('#qty');
const filterList = document.querySelector('.filter-list');
const filterCon = document.querySelector('.filter-container');
const allImages = document.querySelector('.images-container');

const createObject = (keyword, category) => {
  const imagesName = {
    images: [],
    keyword: keyword,
    category: category,
  };
  return imagesName;
};

// * Transportation
const airplanes = createObject('airplane', 'transportation');
const boats = createObject('boat', 'transportation');
// * Nature
const trees = createObject('tree', 'nature');
const flowers = createObject('flower', 'nature');
// * People
const doctor = createObject('doctor', 'people');
const constructionWorker = createObject('construction worker', 'people');

const masterObjectArray = [boats, airplanes, trees, flowers, doctor, constructionWorker];

/* NOTE: Other image ideas
trains, helicopters, school buses, buses, firetrucks, police cars, ambulances, stop signs, railroad signs, 
traffic lights, clocks, watches, quarters, nickels, dimes, umbrellas, doctors, construction workers */

/* NOTE: Other category ideas for filtering
everyday items, signs, food, buildings, music, vehicles, animals (land, sea, air), holidays, weather */

/* NOTE: PIXABAY API Accepted Category Search Values
Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, 
animals, industry, computer, food, sports, transportation, travel, buildings, business, music */

// Fetch image data sets
const getImages = async (object) => { 
  // !! double check API KEY before syncing with GitHub
  const fetchImages = await fetch(`${API_URL_KEY}&q=${object.keyword}&category=${object.category}`);
  const imagesData = await fetchImages.json();
  createImagesArray(object, imagesData);  
};

// TODO delete this eventually
// Runs the entire script
const runProgram = function () {
  getImages(airplanes);
  getImages(boats);
  getImages(trees);
  getImages(flowers);
  getImages(doctor);
  getImages(constructionWorker);
  };
runProgram();

// Randomizes images displayed and shortens array length
const shuffleImages = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  };
  array.length = Math.floor(10);
  // displayImages(array);
};

// Displays images on page
const displayImages = (array) => {
  for (let image of array) {
    let img = document.createElement('img');
    img.classList.add('image', 'center');
    img.src = image;
    allImages.append(img);
  }
};

// Creates list of items to filter 
const createList = () => {
  masterObjectArray.sort(compare);
  for (let index of masterObjectArray) {
    let div = document.createElement('div');
      div.classList.add('filter-item', 'center');
    let label = document.createElement('label');
      label.classList.add('name', 'center');
      label.htmlFor = index.keyword;
      label.innerText = index.keyword;
    let input = document.createElement('input');
      input.className = 'center';
      input.id = 'qty';
      input.type = 'text';
      input.placeholder = 0;
    div.appendChild(label);
    div.appendChild(input);
    filterList.appendChild(div);
  };
};
createList();

// Array sorter function -- used to sort masterObjectArray in createList()
function compare(a, b) {
  let keyA = a.keyword;
  let keyB = b.keyword;
  let comp = 0;
  if (keyA > keyB) {
    comp = 1;
  } else if (keyA < keyB) {
    comp = -1;
  }
  return comp;
};