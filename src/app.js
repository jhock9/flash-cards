const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');

let googleClientID;

const fetchConfig = async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
  
    googleClientID = config.GOOGLE_CLIENT_ID;
    console.log('Google Client ID LOADED.'); 
    
    initGoogleSignIn(); // Initialize Google Sign-In
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};
fetchConfig();

//* GOOGLE AUTHENTICATION

const initGoogleSignIn = () => {
  google.accounts.id.initialize({
    client_id: googleClientID,
    callback: handleCredentialResponse,
    on_failure: onSignInFailure
  });
  
  google.accounts.id.renderButton(
    document.getElementById('google-signin'),
    { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
  );

  // google.accounts.id.prompt();
};

const handleCredentialResponse = (response) => {
  console.log('handleCredentialResponse CALLED.');
  try {
    console.log('Encoded JWT ID token LOADED.')
    const userObject = jwt_decode(response.credential);
    console.log('Decoded User Info LOADED: ' + userObject);

  } catch (error) {
    console.error('Error decoding user credential:', error);
  }

  initCodeClient();
  getAuthCode();

// Call listAlbums with the access token
  listAlbums(response.credential);

  landingPage.classList.add('hide');
  flashCardPage.classList.remove('hide');
  // fetchAlbumList();
};

//* GOOGLE AUTHORIZATION
let codeClient;
const initCodeClient = () => { // or fetchAlbumList function
  console.log('initCodeClient CALLED.');
  codeClient = google.accounts.oauth2.initCodeClient({
    client_id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    ux_mode: 'popup',
    callback: (codeResponse) => { 
      console.log('Callback EXECUTED. codeResponse RECEIVED.');

      // // Send auth code to your backend platform
      // let code_receiver_uri = '/oauth2callback';

      // const xhr = new XMLHttpRequest();
      // xhr.open('POST', code_receiver_uri, true);
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // xhr.onload = () => {
      //   console.log('Signed in as: ' + xhr.responseText);
      // };
      // xhr.send('code=' + codeResponse.code);

      console.log('code: ' + codeResponse.code)
    }
  })
  console.log('codeClient UPDATED.');
};

// Send auth code to your backend platform
const sendCodeToServer = async (code) => {
  let code_receiver_uri = '/oauth2callback';

  try {
    const response = await fetch(code_receiver_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (response.ok) {
      console.log('Signed in as: ' + (await response.text()));
    } else {
      console.error('Error sending code:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending code:', error);
  }
};

const getAuthCode = () => {
  console.log('getAuthCode CALLED.');
  codeClient.requestCode();
}

// Sign in failure callback
const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

//* CREATING OBJECT LIST FROM ALBUM NAMES
const listAlbums = async (accessToken) => {
  try {
    console.log('listAlbums CALLED.');
    const url = 'https://photoslibrary.googleapis.com/v1/albums';
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Fetch COMPLETED.');

    if (response.ok) {
      const data = await response.json();
      console.log('Data Parsed:', data);
      // Use the data here
    } else {
      console.error('Error fetching albums:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};


// const fetchAlbumList = async () => {
//   try {
//     const response = await gapi.client.photoslibrary.albums.list({});
//     console.log('Albums list response:', response);
//     console.log('Access token in use:', gapi.client.getToken().access_token);
//     console.log('Received albums:', response.result.albums);
//     if (!response.result) {
//       console.error('Error fetching albums:', response);
//       return;
//     }
//     const validAlbums = [];
//     for (const album of response.result.albums) {
//       const albumName = album.title;
//       const photoCount = album.mediaItemsCount;
//       if (photoCount >= 10) {
//         validAlbums.push(albumName);
//       }
//     }
//     validAlbums.sort();
//     createList(validAlbums);
//   } catch (error) {
//     console.error('Error fetching albums:', error);
//   }
// };

// // Adds album names to list
// const createList = (validAlbums) => {
//   for (const albumName of validAlbums) {
//     const div = document.createElement('div');
//     div.classList.add('object-item', 'center');
//     const label = document.createElement('label');
//     label.classList.add('name', 'center');
//     label.htmlFor = albumName;
//     label.innerText = albumName;
//     const input = document.createElement('input');
//     input.classList.add('qty', 'center');
//     input.type = 'text';
//     input.id = albumName;
//     input.placeholder = 0;
//     div.appendChild(label);
//     div.appendChild(input);
//     objectList.appendChild(div);
//   }
// };

// //* DISPLAY PHOTOS
// submit.addEventListener('click', async (e) => {
//   e.preventDefault(); // Prevent form submission
//   const selectedAlbums = [];
//   const selectedQtys = [];
//   objectInputs.forEach((input) => {
//     if (input.value) {
//       selectedAlbums.push(input.id);
//       selectedQtys.push(input.value);
//       input.value = 0; // Reset the quantity value
//     }
//   });
//   await fetchPhotos(selectedAlbums, selectedQtys);
// });

// const fetchPhotos = async (albumNames, qtys) => {
//   const promises = [];

//   for (let i = 0; i < albumNames.length; i++) {
//     const query = {
//       albumId: albumNames[i],
//       pageSize: qtys[i],
//     };
//     promises.push(gapi.client.photoslibrary.mediaItems.search(query));
//   }

//   try {
//     const responses = await Promise.all(promises);
//     let allPhotos = [];
//     for (let i = 0; i < responses.length; i++) {
//       const response = responses[i].result;
//       const { mediaItems } = response;
//       const albumPhotos = [];
//       for (const mediaItem of mediaItems) {
//         const photo = {
//           image: mediaItem.baseUrl,
//           fileName: mediaItem.filename,
//         };
//         albumPhotos.push(photo);
//       }
//       shuffleArray(albumPhotos);
//       allPhotos = allPhotos.concat(albumPhotos);
//     }
//     shuffleArray(allPhotos);
//     displayPhotos(allPhotos);
//   } catch (error) {
//     console.error('Error fetching photos:', error);
//   }
// };

// // Helper function to randomize array length based on user input
// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Helper function for displaying photos
// const displayPhotos = (photos) => {
//   allImages.innerHTML = '';
//   for (let i = 0; i < photos.length; i++) {
//     const img = document.createElement('img');
//     img.src = photos[i].image;
//     allImages.appendChild(img);
//   }
// };