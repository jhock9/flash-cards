const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flash-card-page');
// const signInBtn = document.querySelector("#sign-in-button");
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');
let config = {};

//* GOOGLE SIGN IN
const onSignIn = (googleUser) => {
  const profile = googleUser.getBasicProfile();
  console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
  console.log(`Name: ${profile.getName()}`);
  console.log(`Image URL: ${profile.getImageUrl()}`);
  console.log(`Email: ${profile.getEmail()}`);

  landingPage.classList.add('hide');
  flashCardPage.classList.remove('hide');
  fetchAlbumList();
};

//* LOADING ENVIRONMENT VARIABLES
const fetchConfig = async () => {
  const response = await fetch('/config');
  config = await response.json();
};

window.addEventListener('load', () => {
  fetchConfig().then(() => {
    console.log('Config loaded');
    if (typeof gapi !== 'undefined') {
      console.log('gapi already defined');
      loadGooglePhotosApiWithAuthInstance();
    } else {
      console.log('loading gapi');
      loadGooglePhotosApiWithInit();
    }
  });
});

const loadGooglePhotosApiWithInit = () => {
  console.log('Loading Google Photos API with gapi.auth2.init()...');
  gapi.load('client', async () => {
    console.log('gapi loaded');
    try {
      // Initialize the Google Photos API client library
      await gapi.client.init({
        apiKey: config.GOOGLE_API_KEY,
        clientId: config.GOOGLE_CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
      });
      console.log('gapi client initialized');
      // Sign in the user
      const GoogleAuth = gapi.auth2.getAuthInstance();
      if (!GoogleAuth.isSignedIn.get()) {
        await GoogleAuth.signIn();
        showFlashCardPage();
      }
      console.log('user signed in');
      // Load the Google Photos API
      await gapi.client.load('https://photoslibrary.googleapis.com/$discovery/rest?version=v1');
      console.log('Google Photos API loaded');
      resolve();
    } catch (e) {
      console.error('Error initializing Google Photos API:', e);
      resolve();
    }
  });
};

const loadGooglePhotosApiWithAuthInstance = async () => {
  console.log('Loading Google Photos API with gapi.auth2.getAuthInstance()...');
  try {
    // Initialize the Google Photos API client library
    const GoogleAuth = gapi.auth2.getAuthInstance();
    if (!GoogleAuth.isSignedIn.get()) {
      await GoogleAuth.signIn();
    }
    await gapi.client.load('https://photoslibrary.googleapis.com/$discovery/rest?version=v1');

    console.log('Google Photos API loaded');
  } catch (e) {
    console.error('Error initializing Google Photos API:', e);
  }
};


const showFlashCardPage = () => {
  console.log('Switching to flash card page...');
  document.querySelector('#sign-in-page').style.display = 'none';
  document.querySelector('#flash-card-page').style.display = 'block';
};
console.log(`${config.NODE_ENV} AND ALL other env variables logging out`);

//* CREATING OBJECT LIST FROM ALBUM NAMES
const fetchAlbumList = async () => {
  try {
    const response = await gapi.client.photoslibrary.albums.list({});

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
