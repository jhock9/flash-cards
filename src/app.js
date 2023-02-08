"use strict";
import './main.css';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

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
