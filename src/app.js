// TODO - things to keep track of
// 1. Once the user is authenticated, you can use CloudKit's JavaScript API to access their iCloud Photos. 
// 2. You need to make sure that your CloudKit container is set up to allow access to the user's iCloud Photos, 
//    and that your web app has the necessary permissions to access the photos.
// 3. Use the CloudKit API to query the database and retrieve the metadata for the photos you want to display in your app.
// 4. Use the CloudKit API to download the photos and display them in your web app.
// 5. Once finished, split code into separate .js files (app.js and cloudkit.js) and use webpack to bundle them together.

"use strict";
require('dotenv').config({ path: '../.env' });
// const CloudKit = require('../cloudkit');
const appleAuth = require('../apple-auth');
const appleSignin = require("../apple-signin-auth");

const flashCardPage = document.querySelector("#flash-card-page");
const landingPage = document.querySelector("#landing-page");
// const signInBtn = document.querySelector("#apple-sign-in-button");// need this still??
const submit = document.querySelector('#submit-btn');
const filterList = document.querySelector('.filter-list');
const filterInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');
let currentAlbums = [];
let userIdentity = null;

console.log(process.env.NODE_ENV);
console.log(process.env.ICLOUD_CONTAINER);
console.log(process.env.ICLOUD_API_KEY);
console.log(process.env.ICLOUD_REDIRECT_URI);

//* SET UP CLOUDKIT
CloudKit.configure ({
  containers: [{
    containerIdentifier: process.env.ICLOUD_CONTAINER,
    apiTokenAuth: {
        apiToken: process.env.ICLOUD_API_KEY,
        persist: true, // creates a cookie that can be used to re-authenticate the user
        serverToServerKeyAuth: {
          keyID: process.env.APPLE_KEY_ID,
          privateKeyFile: '../VBMAPP-AuthKey_5V3RA3367C.p8'
        },
      },
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
  }]
});

const container = CloudKit.getDefaultContainer();
const publicDB = CloudKit.getDefaultContainer().publicCloudDatabase;
const privateDB = CloudKit.getDefaultContainer().privateCloudDatabase;

//* SIGN IN WITH APPLE
const signInApple = async () => {
  const response = await window.AppleID.auth.signIn();
  console.log("signInApple: " + response);
  const user = response.user;
  const authorization = response.authorization;
  const token = authorization.id_token;
  try {
    const { sub: userAppleId } = await appleSignin.verifyIdToken(token, {
      audience: process.env.ICLOUD_CONTAINER,
      ignoreExpiration: true,
    });
    console.log("User ID: ", userAppleId);
    handleSignInWithApple(authorization);
  } catch (err) {
    console.error("Error verifying Apple ID token: ", err);
  }
  return response;  
};

document.addEventListener('AppleIDSignInOnSuccess', (event) => {
  console.log("Apple ID sign in successful: ", event.detail.data);
});

document.addEventListener('AppleIDSignInOnFailure', (event) => {
  console.log("Apple ID sign in failed: ", event.detail.error);
});

// Configure the Apple auth object with your app's configuration
const auth = new appleAuth({
  clientId: process.env.ICLOUD_CONTAINER,
  teamId: process.env.APPLE_TEAM_ID,
  keyId: process.env.APPLE_KEY_ID,
  privateKeyPath: '../VBMAPP-AuthKey_5V3RA3367C.p8',
});

const handleSignInWithApple = async (authorization) => {
  try {
    // Exchange the authorization code for an access token and ID token
    const { access_token, id_token } = await auth.accessToken(authorization.code);
    // Verify the ID token using the apple-auth library
    const { sub: userAppleId } = await appleSignin.verifyIdToken(id_token, {
      audience: process.env.ICLOUD_CONTAINER,
      ignoreExpiration: true,
    });
    console.log("User ID: ", userAppleId); // Now can fetch photos from iCloud
  } catch (error) {
    console.error(error);
  }
};

// Query the database for photos
const query = { /* your query here */ };
publicDB.performQuery(query)
  .then((response) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle the error
  });

// container.setUpAuth().then((userInfo) => {
//   if(userInfo) {
//     // this.gotoAuthenticatedState(userInfo);
//     console.log(userInfo + " " + "is authenticated.");
//   } else {
//     // this.gotoUnauthenticatedState();
//     console.log(userInfo + " " + "is not authenticated.");
//   }
// });

// container.whenUserSignsIn().then((userInfo) => {
//   console.log(userInfo + " " + "just signed in.");
// });
// container.whenUserSignsOut().then((userInfo) => {
//   console.log(userInfo + " " + "just signed out.");
// });


// CloudKit.getAuthStatus().then((response) => {
//   if (response.status === 'AUTHORIZED') {
//     console.log("User is already signed in.");
//     landingPage.classList.add("hide");
//     flashCardPage.classList.remove("hide");
//     fetchAlbums();
//   } else {
//     console.log("User is not signed in.");
//     signInBtn.addEventListener("click", () => {
//       CloudKit.signIn({
//         scope: 'email',
//         redirectURI: process.env.ICLOUD_REDIRECT_URI
//       }).then((response) => {
//         console.log(response);
//         if (response.isSuccess) {
//           landingPage.classList.add("hide");
//           flashCardPage.classList.remove("hide");
//           userIdentity = response.userIdentity;
//           fetchAlbums();
//         } else {
//           console.error('Error signing in:', response.error);
//         };
//       });
//     });
//   };
// });
console.log(process.env.NODE_ENV);
console.log(process.env.ICLOUD_CONTAINER);
console.log(process.env.ICLOUD_API_KEY);
console.log(process.env.ICLOUD_REDIRECT_URI);

//* CREATING KEYWORD LIST FOR USER TO CHOOSE FROM 
// Using album names as keywords 
const fetchAlbums = () => {
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
  database.performQuery(albumQuery).then((response) => {
    if (response.hasErrors) {
      console.error(response.errors[0]);
    } else {
      let records = response.records;
      for (let i = 0; i < records.length; i++) {
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
const fetchPhotos = (albumNames, qtys) => {
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
  Promise.all(promises).then((responses) => {
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
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  };
  return array;
};

// Helper function for displaying photos
const displayPhotos = (photos) => {
  allImages.innerHTML = ""; // Clears existing photos on page
  for (let i = 0; i < photos.length; i++) {
  let img = document.createElement("img");
  img.src = photos[i];
  allImages.appendChild(img);
  };
};
// } else {
//   // if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config({
//       path: `${__dirname}/../.env`
//     });
//   // }
  // }