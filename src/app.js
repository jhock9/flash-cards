const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');
// const nodeEnv = process.env.NODE_ENV;
// const googleClientID = process.env.GOOGLE_CLIENT_ID;
// const googleApiKey = process.env.GOOGLE_API_KEY;
let nodeEnv, googleClientID, googleApiKey;

(async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    nodeEnv = config.NODE_ENV;
    googleClientID = config.GOOGLE_CLIENT_ID;
    googleApiKey = config.GOOGLE_API_KEY;

    console.log(`
    NODE_ENV: ${nodeEnv}, 
    GOOGLE_API_KEY: ${googleApiKey}, 
    GOOGLE_CLIENT_ID: ${googleClientID},
    AND ALL other env variables logging out
    `);
    
    initGoogleSignIn(); // Initialize Google Sign-In after fetching config
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
})();

//* GOOGLE SIGN IN

// Initialize Google Identity Services
const initGoogleSignIn = () => {
// window.addEventListener('load', () => {

  google.accounts.id.initialize({
    client_id: googleClientID,
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById('google-signin'),
    { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
  );
};

// Handle the authentication response
const handleCredentialResponse = (response) => {
  // Process the credential response, e.g., by sending it to your server for validation and authorization
  onSignIn(response);
}

// Sign in success callback
const onSignIn = async (response) => {
  const id_token = response.credential;
  
  // Send the ID token to your server for authentication and authorization
  try {
    const serverResponse = await fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_token }),
    });

    if (!serverResponse.ok) {
      throw new Error('Server authentication failed');
    }
  } catch (error) {
    console.error('Error sending ID token to server:', error);
    return;
  }
  // Optional: Retrieve user profile information
  const profile = response.getBasicProfile();
  console.log(`ID: ${profile.getId()}`); // Do not send to the backend! Use an ID token instead.
  console.log(`Name: ${profile.getName()}`);
  console.log(`Image URL: ${profile.getImageUrl()}`);
  console.log(`Email: ${profile.getEmail()}`);

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
