// import jwt_decode from "jwt-decode";

const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');

let nodeEnv;
let googleClientID;
let googleApiKey;
let access_token;

// Fetch and Config env. variables from server.js
const fetchConfig = async () => {
  console.log('Fetching configuration...');
  try {
    const response = await fetch('/config');
    const config = await response.json();
    console.log('Config:', config);

    nodeEnv = config.NODE_ENV;
    googleClientID = config.GOOGLE_CLIENT_ID;
    googleApiKey = config.GOOGLE_API_KEY;

    console.log('Google Client ID:', googleClientID);
    
    initGoogleSignIn(); // Initialize Google Sign-In
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};
fetchConfig();

//* Google Identity Services AUTHENTICATION

// Initialize GIS library
const initGoogleSignIn = () => {
  console.log('Initializing GIS...');
  google.accounts.id.initialize({
    client_id: googleClientID,
    callback: handleCredentialResponse,
    on_failure: onSignInFailure
  });

  google.accounts.id.renderButton(
    document.getElementById('google-signin'),
    { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
  );

  google.accounts.id.prompt();
  gapi.load('client', loadGoogleApiClient);
};

// Load Google Photos API client library
const loadGoogleApiClient = async () => {
  console.log('Loading Google Photos API...');
  try {
    await gapi.client.load('https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest');
    console.log('Google Photos API loaded');
  } catch (error) {
    console.error('Error loading Google Photos API:', error);
  }
};

//* Google Identity Services AUTHORIZATION
// Handle authentication response by sending to server for validation/authorization
const handleCredentialResponse = (response) => {
  console.log('Handling credential response...');
  try {
    console.log("Encoded JWT ID token: " + response.credential)
    const userObject = jwt_decode(response.credential);
    console.log("Decoded User Info: " + userObject);

    setTokenClient();

  } catch (error) {
    console.error('Error decoding user credential:', error);
  }
};

  // Initialize token client
const setTokenClient = () => {
  console.log('Initializing token client...');
  google.accounts.oauth2.initTokenClient({   
    client_Id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    callback: async (tokenResponse) => {
      try {
        console.log(tokenResponse);
        access_token = tokenResponse.access_token;
        console.log("Access token set: " + access_token);
        console.log('token client initialized');

        if(tokenResponse && access_token) {
          // Server Authentication
          try {
            const serverResponse = await fetch('/api/authenticate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ access_token }),
            });
      
            const serverResponseJson = await serverResponse.json(); 
            console.log('Server response JSON:', serverResponseJson); 
      
            if (!serverResponse.ok) {
              throw new Error('Server authentication failed');
            }
          } catch (error) {
            console.error('Error sending ID token to server:', error);
            return;
          }
        }
      } catch (error) {
        console.error('Error initializing token client:', error);
      }

      // Load Photos
      const loadPhotos = () => {
        console.log('Loading photos...');
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/photoslibrary/v1/albums');
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
        xhr.send();

        // Handle onload event
        xhr.onload = () => {
          if (xhr.status === 200) {
            var albums = JSON.parse(xhr.responseText);
            for (var i = 0; i < albums.length; i++) {
              console.log(albums[i].title);
            }
          } else {
            console.log('Error: ' + xhr.status);
          }
        };
      }

      loadPhotos();
    }
  });

  landingPage.classList.add('hide');
  flashCardPage.classList.remove('hide');
  fetchAlbumList();
};

// Sign in failure callback
const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

//* CREATING OBJECT LIST FROM ALBUM NAMES
const fetchAlbumList = async () => {
  console.log('Fetching album list...');
  try {
    const response = await gapi.client.photoslibrary.albums.list({});
    console.log('Albums list response:', response);
    console.log('Access token in use:', gapi.client.getToken().access_token);
    console.log('Received albums:', response.result.albums);

    if (!response.result) {
      console.error('Error fetching albums:', response);
      return;
    }

    const validAlbums = [];
    for (const album of response.result.albums) {
      const albumName = album.title;
      const photoCount = album.mediaItemsCount;

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
  console.log('Creating list...');
  for (const albumName of validAlbums) {
    const div = document.createElement('div');
    div.classList.add('object-item', 'center');
    const label = document.createElement('label');
    label.classList.add('name', 'center');
    label.htmlFor = albumName;
    label.innerText = albumName;
    const input = document.createElement('input');
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
  const selectedAlbums = [];
  const selectedQtys = [];
  objectInputs.forEach((input) => {
    if (input.value) {
      selectedAlbums.push(input.id);
      selectedQtys.push(input.value);
      input.value = 0; // Reset the quantity value
    }
  });
  await fetchPhotos(selectedAlbums, selectedQtys);
});

const fetchPhotos = async (albumNames, qtys) => {
  console.log('Fetching photos...');
  const promises = [];
  for (let i = 0; i < albumNames.length; i++) {
    const query = {
      albumId: albumNames[i],
      pageSize: qtys[i],
    };
    promises.push(gapi.client.photoslibrary.mediaItems.search(query));
  }

  try {
    const responses = await Promise.all(promises);
    let allPhotos = [];
    for (let i = 0; i < responses.length; i++) {
      const response = responses[i].result;
      const { mediaItems } = response;
      const albumPhotos = [];
      for (const mediaItem of mediaItems) {
        const photo = {
          image: mediaItem.baseUrl,
          fileName: mediaItem.filename,
        };
        albumPhotos.push(photo);
      }

      shuffleArray(albumPhotos);
      allPhotos = allPhotos.concat(albumPhotos);
    }
    shuffleArray(allPhotos);
    displayPhotos(allPhotos);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

// Helper function to randomize array length based on user input
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Helper function for displaying photos
const displayPhotos = (photos) => {
  allImages.innerHTML = '';
  for (let i = 0; i < photos.length; i++) {
    const img = document.createElement('img');
    img.src = photos[i].image;
    allImages.appendChild(img);
  }
};
