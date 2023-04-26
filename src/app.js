const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');

//* GOOGLE SIGN-IN
// Fetch environental variables for Google Identity Services (GIS)
let nodeEnv, googleClientID, googleApiKey;

const fetchConfig = async () => {
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

// Configure GIS library
const initGoogleSignIn = () => {
  const onloadElement = document.getElementById('g_id_onload');

  google.accounts.id.initialize({
    client_id: googleClientID,
    callback: handleCredentialResponse,
    on_failure: onSignInFailure
  });

  setTimeout(() => {
    google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
    );
  }, 500);

  gapi.load('client', loadGoogleApiClient);
};

// Load Google Photos API client library
const loadGoogleApiClient = async () => {
  try {
    await gapi.client.load('https://content.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest');
    console.log('Google Photos API loaded');
  } catch (error) {
    console.error('Error loading Google Photos API:', error);
  }
};

// Handle authentication response by sending to server for validation/authorization
const handleCredentialResponse = async (response) => {
  console.log('Credential response:', response);
  const id_token = response.credential;

  try {
    const serverResponse = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token }),
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

  // Get user profile information from the id_token
  const decodedIdToken = JSON.parse(atob(id_token.split('.')[1]));

  console.log('Decoded ID token:', decodedIdToken);
  console.log(`ID: ${decodedIdToken.sub}`);
  console.log(`Name: ${decodedIdToken.name}`);
  console.log(`Image URL: ${decodedIdToken.picture}`);
  console.log(`Email: ${decodedIdToken.email}`);

  // Initialize the gapi client with the access token
  console.log('Initializing gapi client');
  await gapi.client.init({
    apiKey: googleApiKey,
    clientId: googleClientID,
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/photoslibrary/v1/rest'],
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly'
  });
  console.log('gapi client initialized');

  // Set the access token for the gapi client
  console.log('Setting ID token for gapi client');
  gapi.client.setToken({ id_token });
  console.log('ID token set for gapi client:', id_token);
  
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
