"use strict";
// require('./main.css');
// if (typeof window !== 'undefined' && window.process && window.process.env && window.process.env.NODE_ENV === 'production') {

const flashCardPage = document.querySelector("#flash-card-page");
const landingPage = document.querySelector("#landing-page");
const signInBtn = document.querySelector("#apple-sign-in-button");// need this still??
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

//* CONFIGURING CLOUDKIT & ICLOUD USER AUTHENTICATION
// window.addEventListener('cloudkitloaded', () => {
  console.log('listening for cloudkitloaded');
  CloudKit.configure ({
    containers: [{
      containerIdentifier: process.env.ICLOUD_CONTAINER,
      apiTokenAuth: {
          apiToken: process.env.ICLOUD_API_KEY,
          persist: true, // keeps user signed in after closing/reopening browser
          // useAuth: true
          signInButton: {
            id: 'apple-sign-in-button',
            theme: 'black' // Other options: 'white', 'white-with-outline'.
          },
        },
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'development'
    }]
  });
  console.log('cloudkitloaded');

  let container = CloudKit.getDefaultContainer();
  container.setUpAuth().then((userInfo) => {
    if(userInfo) {
      // this.gotoAuthenticatedState(userInfo);
      console.log(userInfo + " " + "is authenticated.");
    } else {
      // this.gotoUnauthenticatedState();
      console.log(userInfo + " " + "is not authenticated.");
    }
  });

  container.whenUserSignsIn().then((userInfo) => {
    console.log(userInfo + " " + "just signed in.");
  });
  container.whenUserSignsOut().then((userInfo) => {
    console.log(userInfo + " " + "just signed out.");
  });


  // let TILViewModel = () => {
  //   console.log("get default container");
  //   let container = CloudKit.getDefaultContainer();
    
  //   console.log("set publicDB");
  //   let publicDB = container.publicCloudDatabase;
  //   this.items = ko.observableArray();

  //   // Fetch public records
  //   this.fetchRecords = () => {
  //     console.log("fetching records from " + publicDB);
  //     let query = { recordType: 'Acronym', sortBy: [{ fieldName: 'short'}] };
      
  //     // Execute the query.
  //     return publicDB.performQuery(query).then((response) => {
  //       if (response.hasErrors) {
  //         console.error(response.errors[0]);
  //         return;
  //       }
  //       let records = response.records;
  //       let numberOfRecords = records.length;
  //       if (numberOfRecords === 0) {
  //         console.error('No matching items');
  //         return;
  //       }
  //       this.items(records);
  //     });
  //   };

  //   this.displayUserName = ko.observable('Unauthenticated User');
  //   this.gotoAuthenticatedState = (userInfo) => {
  //     if(userInfo.isDiscoverable) {
  //       this.displayUserName(userInfo.firstName + ' ' + userInfo.lastName);
  //     } else {
  //       this.displayUserName('userInfo.userRecordName');
  //     }
    
  //     container
  //     .whenUserSignsOut()
  //     .then(this.gotoUnauthenticatedState);
  //   };
    
  //   this.gotoUnauthenticatedState = (error) => {
  //     this.displayUserName('Unauthenticated User');
    
  //     container
  //     .whenUserSignsIn()
  //     .then(this.gotoAuthenticatedState)
  //     .catch(this.gotoUnauthenticatedState);
  //   };
    
  
  //   container.setUpAuth().then((userInfo) => {
  //     console.log("setUpAuth");
  //     this.fetchRecords(); // Don't need user auth to fetch public records
    
  //     if (userInfo) {
  //       this.gotoAuthenticatedState(userInfo);
  //     } else {
  //       this.gotoUnauthenticatedState();
  //     }
  //   });
  // }
  
  // ko.applyBindings(new TILViewModel());
// });



// CloudKit.getAuthStatus().then((response) => {
//   if (response.status === 'AUTHORIZED') {
//     console.log('User is already signed in');
//     landingPage.classList.add("hide");
//     flashCardPage.classList.remove("hide");
//     fetchAlbums();
//   } else {
//     console.log('User is not signed in');
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