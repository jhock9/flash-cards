// TODO
// [ ] add function to Filter Button - create pop out filter menu for mobile styles (apply to tablet/desktop)

"use strict";
require('dotenv').config();
import "./test.css";

const flashCardPage = document.querySelector("#flash-card-page");
const landingPage = document.querySelector("#landing-page");
const signInBtn = document.querySelector("#apple-signin-btn");
const submit = document.querySelector('#submit-btn');
const filterList = document.querySelector('.filter-list');
const filterInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');
let currentAlbums = [];
let userIdentity = null;

//* CONFIGURING CLOUDKIT & ICLOUD USER AUTHENTICATION
CloudKit.configure ({
  containers: [{
    containerId: process.env.ICLOUD_CONTAINER,
    apiTokenAuth: {
        apiToken: process.env.ICLOUD_API_KEY,
        persist: true, // keeps user signed in after closing/reopening browser
        useAuth: true
    },
    environment: 'development' // or 'production'
  }]
});

CloudKit.on('error', (error) => {
  console.error(error);
});

CloudKit.getAuthStatus().then(function(response) {
  if(response.status === 'AUTHORIZED') {
    console.log('User is already signed in');
    landingPage.classList.add("hide");
    flashCardPage.classList.remove("hide");
    fetchAlbums();
  } else {
    console.log('User is not signed in');
    signInBtn.addEventListener("click", () => {
      CloudKit.signIn({
        scope: 'email',
        redirectURI: process.env.ICLOUD_REDIRECT_URI
      }).then((response) => {
        console.log(response);
        if(response.isSuccess) {
          landingPage.classList.add("hide");
          flashCardPage.classList.remove("hide");
          userIdentity = response.userIdentity;
          fetchAlbums();
        } else {
          console.error('Error signing in:', response.error);
        };
      });
    });
  };
});

//* CREATING KEYWORD LIST FOR USER TO CHOOSE FROM 
// Using album names as keywords 
function fetchAlbums() {
  let container = CloudKit.getDefaultContainer();
  let database = container.publicCloudDatabase;
  let albumQuery = {
    recordType: 'Albums',
    filterBy: [{
      fieldName: 'parent',
      comparator: 'EQUALS',
      fieldValue: {
        value: 'VB-MAPP-FC'
      }
    }],
  };
  database.performQuery(albumQuery).then(function(response) {
    if(response.hasErrors) {
      console.error(response.errors[0]);
    } else {
      let records = response.records;
      for(let i = 0; i < records.length; i++) {
        let record = records[i];
        let albumName = record.fields.name.value;
        currentAlbums.push(albumName);
      };
      createList(currentAlbums);
    };
  });
};
// setInterval(fetchAlbums, 86400000);

// Adds albums/keywords to list
const createList = (currentAlbums) => {
  currentAlbums.sort();
  for (let albumName of currentAlbums) {
    let div = document.createElement('div');
    div.classList.add('filter-item', 'center');
    let label = document.createElement('label');
    label.classList.add('name', 'center');
    label.htmlFor = albumName;
    label.innerText = albumName;
    let input = document.createElement('input');
    input.classList.add('qty', 'center');
    input.type = 'text';
    input.id = fileName;
    input.placeholder = 0;
    div.appendChild(label);
    div.appendChild(input);
    filterList.appendChild(div);
  }
};
createList(currentAlbums);

//* EXECUTE PROGRAM
submit.addEventListener('click', () => {
  let selectedAlbums = [];
  let selectedQtys = [];
  filterInputs.forEach(input => {
    if (input.value) {
      selectedAlbums.push(input.id);
      selectedQtys.push(input.value);
    }
  });
  fetchPhotos(selectedAlbums, selectedQtys);
  fetchAlbums();
});

//* FETCHING, SHUFFLING & DISPLAYING PHOTOS BASED ON USER INPUT
function fetchPhotos(albumNames, qtys) {
  let container = CloudKit.getDefaultContainer();
  let database = container.publicCloudDatabase;
  let promises = [];
  for (let i = 0; i < albumNames.length; i++) {
    let query = {
      recordType: 'Photos',
      filterBy: [{
        fieldName: 'album',
        comparator: 'EQUALS',
        fieldValue: {
          value: albumNames[i]
        }
      }]
    };
    promises.push(database.performQuery(query));
  };
  Promise.all(promises).then(function(responses) {
    let allPhotos = [];
    for (let response of responses) {
      let records = response.records;
      let albumPhotos = [];
      for (let record of records) {
        let photo = record.fields.image.value;
        albumPhotos.push(photo);
      };
      shuffleArray(albumPhotos);
      albumPhotos = albumPhotos.slice(0, qtys[i]);
      allPhotos = allPhotos.concat(albumPhotos);
    };
    shuffleArray(allPhotos);
    displayPhotos(allPhotos);
  });
};

// Helper function to randomize array length based on user input
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

// Helper function for displaying photos
function displayPhotos(photos) {
  allImages.innerHTML = ""; // Clears existing photos on page
  for (let i = 0; i < photos.length; i++) {
  let img = document.createElement("img");
  img.src = photos[i];
  allImages.appendChild(img);
  };
};

// //!! variables not needed
// const filterCon = document.querySelector('.filter-container');
// let masterObjectArray = [];
// const resultsArray = [];
// const displayArray = [];
// // Copy of masterObjectArray
// resultsArray = masterObjectArray.slice(0);

// //!! NO LONGER NEEDED BECAUSE OF currentAlbums and CloudKit
// const createObject = (images, keyword, category) => {
//   const imagesName = {
//     images: images,
//     keyword: keyword,
//     category: category,
//     qty: 0,
//   };
//   masterObjectArray.push(imagesName);
// };

// //* NOTE: add new items here
// const airplanes = createObject([], 'airplane', 'transportation');
// const boats = createObject([], 'boat', 'transportation');
// const trees = createObject([], 'tree', 'nature');
// const flowers = createObject([], 'flower', 'nature');
// const doctor = createObject([], 'doctor', 'people');
// const constructionWorker = createObject([], 'construction worker', 'people');

// /* NOTE: Other item ideas
// trains, helicopters, school buses, buses, firetrucks, police cars, ambulances, stop signs, railroad signs, 
// traffic lights, clocks, watches, quarters, nickels, dimes, umbrellas, doctors, construction workers */

// /* NOTE: Other category ideas for filtering
// everyday items, signs, food, buildings, music, vehicles, animals (land, sea, air), holidays, weather */


// //!! NO LONGER NEEDED BECAUSE ARRAYS SORT ALPHABETICALLY AUTOMATICALLY
// // Helper function to alphabetize list
// function compare(a, b) {
//   let keyA = a.keyword;
//   let keyB = b.keyword;
//   let comp = 0;
//   if (keyA > keyB) {
//     comp = 1;
//   } else if (keyA < keyB) {
//     comp = -1;
//   };
//   return comp;
// };

// //!! NO LONGER NEEDED BECAUSE OF queryPhotos FUNCTION
// // Fetch image data set based on search criteria
// const getImages = async (objArray, query) => { 
//   for (let i = 0; i < objArray.length; i++) {
//     const queryResults = await CloudKit.publicCloudDatabase.query(query);
//     updateImages(objArray, queryResults); 
//  };
// };

// //!! NO LONGER NEEDED BECAUSE OF queryPhotos FUNCTION
// // Adds fetched images to object.images based on search criteria
// const updateImages = (objArray, query) => {
//   for (let i = 0; i < objArray.length; i++) {
//     CloudKit.publicCloudDatabase.query(query).then((response) => {
//       const results = response.records;
//       for (let j = 0; j < results.length; j++) {
//         objArray[i].images.push(results[j].fields.asset.value.downloadURL);
//       }
//     });
//   };
//   shuffleApiImages(objArray);
// };

// //!! NO LONGER NEEDED BECAUSE OF shuffleArray FUNCTION
// Randomizes API fetched images and shortens array length
// const shuffleApiImages = (objArray) => {
//   for (let i = 0; i < objArray.length; i++) {
//     for (let j = objArray[i].images.length - 1; j > 0; j--) {
//       const t = Math.floor(Math.random() * (j + 1));
//       const temp = objArray[j];
//       objArray[j] = objArray[t];
//       objArray[t] = temp;
//     };
//     objArray[i].images.length = Math.floor(objArray[i].qty);
//   };
// };

// //!! wrong code
// const displayImages = (objArray) => {
//   for (let i = 0; i < objArray.length; i++) {
//     for (let j = 0; j< objArray[i].images; j++) {
//     let img = document.createElement('img');
//     img.classList.add('image', 'center');
//     img.src = objArray[i].images;
//     allImages.append(img);
//     };
//   };
// }

// //!! NO LONGER NEEDED BECAUSE OF fetchPhotos FUNCTION
// const queryPhotos = (selectedKeywords) => {
//   let query = {}; 
//   for (let keyword in selectedKeywords) {
//     query.filterBy.push({
//       fieldName: 'keyword',
//       comparator: 'EQUALS',
//       fieldValue: {
//         value: keyword
//       }
//     });
//   };
//   return CloudKit.publicCloudDatabase.query(query).then((response) => {
//     let photos = response.records;
//     shuffleArray(photos);
//     return photos;
//   });
// };

// // Helper function to randomize array length based on user input
// const shuffleArray = (photos) => {
//   for (let i = photos.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1));
//     [photos[i], photos[j]] = [photos[j], photos[i]];
//   };
// };

// //!! NO LONGER NEEDED BECAUSE OF queryPhotos FUNCTION
// Main function that runs the entire program
// Alt checkItems function that combines next 3 functions and update objects 
// const runProgram = (objArray, imgArray) => {
//   for (let i = 0; i < filterInputs.length; i++) {
//     if (input.value > 0 && input.id === objArray[i].keyword) {
//       objArray[i].qty = value;
//     };
//   };
//   objArray[i].qty.filter(function (n) { // filterArray(objArray);
//     return n > 0;
//   });
//   displayImages(objArray, imgArray);
// };

// // Checks filter list to see if any values have been input
// const checkItems = (objArray) => {
//   for (let i = 0; i < filterInputs.length; i++) {
//     if (input.value > 0) {
//       updateObjects(objArray, input.id, input.value);
//     };
//   };
//   // return objArray;
// };
// // Updates object values 
// const updateObjects = (objArray, id, value) => {
//   for (let i in objArray) {
//     if (objArray[i].keyword === id) {
//       objArray[i].qty = value;
//     };
//     break;
//   };
//   // return objArray; // ? needed
// };

// //!! NO LONGER NEEDED BECAUSE OF cloudKit code
// const displayImages = (objArray, imgArray) => {
//   for (let i in objArray) {
//     imgArray.push(objArray[i].images.slice(0));
//   };
//   shuffleDisplayImages(imgArray);
//   for (let image of imgArray) {
//     let img = document.createElement('img');
//     img.classList.add('image', 'center');
//     img.src = image;
//     allImages.append(img);
//   };
// }

// // Randomizes filtered images to be displayed
// const shuffleDisplayImages = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     const temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   };
// };

// //!! misc functions not used
// // Filters array to only those with a qty value > zero
// // Use this if doesnt work in checkItems() -- just call this function
// const filterArray = (objArray) => {
//   for (let i = 0; i < objArray; i++) { 
//     objArray[i].qty.filter(function (n) {
//       return n > 0;
//     });
//   };
// };

// // alt filter function if other 2 dont work -- this is proven
// const filteredItems = (objArray) => {
//   for (let i in objArray) {
//     if (objArray[i].qty > 0) {
//       let newObjectArray = newObjectArray.push(objArray.slice(i, i + 1));
//     };
//   };
//   return newObjectArray;
// };

// ! after entering values and clicking submit, the whole page reloads -- or is it just clearing the values (which is good)

// // gets the individual array/okject/key => value -- prob dont need
// let filterArray = [];
// const sortArray = () => {
//   for (let index of masterObjectArray) {
//     let k = index.keyword;
//     filterArray.push(k);
//     filterArray.sort();
//   };
// };
// sortArray();
// // console.log(filterArray);

// // TODO function to expand/collapse filter section
// filterBtn.addEventListener("click", function (e) {
//   if (e.target.matches("#filter-button")) {
//     // ? not sure if this if statement is correct
//   }
// });
// // ? use any of this? coll would be filterBtn
// // let i;
// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   });
// }