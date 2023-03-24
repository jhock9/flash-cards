// TODO - things to keep track of
// 1. Once the user is authenticated, you can use CloudKit's JavaScript API to access their iCloud Photos. 
// 2. You need to make sure that your CloudKit container is set up to allow access to the user's iCloud Photos, 
//    and that your web app has the necessary permissions to access the photos.
// 3. Use the CloudKit API to query the database and retrieve the metadata for the photos you want to display in your app.
// 4. Use the CloudKit API to download the photos and display them in your web app.
// 5. Once finished, split code into separate .js files (app.js and cloudkit.js) and use webpack to bundle them together.

"use strict";
// require('dotenv').config();
// const CloudKit = require('../cloudkit');

const flashCardPage = document.querySelector("#flash-card-page");
const landingPage = document.querySelector("#landing-page");
const signInBtn = document.querySelector("#apple-sign-in-button");
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');
let validAlbums = [];
let userIdentity = null;

console.log(process.env.NODE_ENV + " AND ALL other env variables logging out");

//* SIGN IN WITH APPLE

document.addEventListener('AppleIDSignInOnSuccess', (event) => {
  console.log("Apple ID sign in successful: ", event.detail.data);
  landingPage.classList.add("hide");
  flashCardPage.classList.remove("hide");

  fetchAlbumList();
});
document.addEventListener('AppleIDSignInOnFailure', (event) => {
  console.log("Apple ID sign in failed: ", event.detail.error);
});

// Check if the current page is the callback page
const urlParams = new URLSearchParams(window.location.search);
const isCallback = urlParams.get('callback') === 'true';

if (isCallback) {
  AppleID.auth.init({
    clientId: process.env.APPLE_CLIENT_ID,
    redirectURI: process.env.ICLOUD_REDIRECT_URI,
    scope: 'name email',
    state: 'state',
    usePopup: true
  });

  const signInWithApple = () => {
    const options = {
      clientId: process.env.APPLE_CLIENT_ID,
      scope: 'name email',
      redirectURI: process.env.CLOUD_REDIRECT_URI,
      usePopup: true
    };
  
    AppleID.auth.signIn(options);
  }

  AppleID.auth.parseResponse(window.location.search)
    .then(response => {
      console.log(response);
      window.location.replace('/src/index.html');
    })
    .catch(error => {
      console.error(error);
      window.location.replace('/src/index.html');
    });
} else {
  signInBtn.addEventListener("click", signInWithApple);
}

//* CONFIGURE CLOUDKIT JS

const configureCloudKit = () => {
  CloudKit.configure ({
    containers: [{
      containerIdentifier: process.env.ICLOUD_CONTAINER,
      apiTokenAuth: {
          apiToken: process.env.ICLOUD_API_KEY,
          persist: true, // creates a cookie that can be used to re-authenticate the user
          // serverToServerKeyAuth: {
          //   keyID: process.env.APPLE_KEY_ID,
          //   privateKeyFile: '../AuthKey.p8',
          // },
        },
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
    }]
  });

configureCloudKit();
  
const container = CloudKit.getDefaultContainer();
const publicDB = container.publicCloudDatabase;
const privateDB = container.privateCloudDatabase;

container.setUpAuth().then((userInfo) => {
  if(userInfo) {
    console.log(userInfo + " " + "is authenticated.");
  } else {
    console.log(userInfo + " " + "is not authenticated.");
  }
});

container.whenUserSignsIn().then((userInfo) => {
  console.log(userInfo + " " + "just signed in.");
});
container.whenUserSignsOut().then((userInfo) => {
  console.log(userInfo + " " + "just signed out.");
});


CloudKit.getAuthStatus().then((response) => {
  if (response.status === 'AUTHORIZED') {
    console.log("User is already signed in.");
    landingPage.classList.add("hide");
    flashCardPage.classList.remove("hide");
    fetchAlbumList();
  } else {
    console.log("User is not signed in.");
    signInBtn.addEventListener("click", () => {
      CloudKit.signIn({
        scope: 'email',
        redirectURI: process.env.ICLOUD_REDIRECT_URI
      }).then((response) => {
        console.log(response);
        if (response.isSuccess) {
          landingPage.classList.add("hide");
          flashCardPage.classList.remove("hide");
          userIdentity = response.userIdentity;
          fetchAlbumList();
        } else {
          console.error('Error signing in:', response.error);
        };
      });
    });
  };
});

//* CREATING OBJECT LIST FROM ALBUM NAMES
const fetchAlbumList = async () => {
  const albumQuery = {
    recordType: 'Album',
    filterBy: [{
      fieldName: 'parent',
      comparator: 'EQUALS',
      fieldValue: {
        value: 'VB-MAPP-FC'
      }
    }],
  };
  try {
    const response = await publicDB.performQuery(albumQuery);

    if (response.hasErrors) {
      console.error(response.errors[0]);
      return;
    }

    validAlbums = [];
    for (const record of response.records) {
      const albumName = record.fields.name.value;
      const photoCount = record.fields.photoCount.value;

      if (photoCount >= 10) {
        validAlbums.push(albumName);
      }
    }

    validAlbums.sort();
    createList(validAlbums);
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

// Adds album names to list
const createList = (validAlbums) => {
  const objectList = document.querySelector('.object-list');
  for (let albumName of validAlbums) {
    let div = document.createElement('div');
    div.classList.add('object-item', 'center');
    let label = document.createElement('label');
    label.classList.add('name', 'center');
    label.htmlFor = albumName;
    label.innerText = albumName;
    let input = document.createElement('input');
    input.classList.add('qty', 'center');
    input.type = 'text';
    input.id = albumName;
    input.placeholder = 0;
    div.appendChild(label);
    div.appendChild(input);
    objectList.appendChild(div);
  }
};

//* DISPLAY PHOTOS
submit.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent form submission
  let selectedAlbums = [];
  let selectedQtys = [];
  objectInputs.forEach(input => {
    if (input.value) {
      selectedAlbums.push(input.id);
      selectedQtys.push(input.value);
      input.value = 0; // Reset the quantity value
    }
  });
  await fetchPhotos(selectedAlbums, selectedQtys);
});

const fetchPhotos = async (albumNames, qtys) => {
  let promises = [];
  for (let i = 0; i < albumNames.length; i++) {
    let query = {
      recordType: 'Photo',
      filterBy: [{
        fieldName: 'album',
        comparator: 'EQUALS',
        fieldValue: {
          value: albumNames[i]
        }
      }],
      desiredKeys: ['image', 'fileName']
    };
    promises.push(publicDB.performQuery(query));
  };

  try {
    const responses = await Promise.all(promises);
    let allPhotos = [];
    for (let i = 0; i < responses.length; i++) {
      let response = responses[i];
      let records = response.records;
      let albumPhotos = [];
      for (let record of records) {
        let photo = {
          image: record.fields.image.value,
          fileName: record.fields.fileName.value
        };
        albumPhotos.push(photo);
      };
      
      shuffleArray(albumPhotos);
      albumPhotos = albumPhotos.slice(0, qtys[i]);
      allPhotos = allPhotos.concat(albumPhotos);
    };
    shuffleArray(allPhotos);
    displayPhotos(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

// Helper function to randomize array length based on user input
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

// Helper function for displaying photos
const displayPhotos = (photos) => {
  allImages.innerHTML = "";
  for (let i = 0; i < photos.length; i++) {
  let img = document.createElement("img");
  img.src = photos[i].image;
  allImages.appendChild(img);
  };
};