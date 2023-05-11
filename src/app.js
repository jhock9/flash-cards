const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const submit = document.querySelector('#submit-btn');
const objectList = document.querySelector('.object-list');
// const objectInputs = Array.from(document.getElementsByClassName('qty'));
const allImages = document.querySelector('.images-container');

let googleClientID;

const fetchConfig = async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
  
    googleClientID = config.GOOGLE_CLIENT_ID;
    console.log('googleClientID LOADED.'); 
    
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
  let decodedUserInfo;
  try {
    console.log('Encoded JWT ID token RETRIEVED')
    decodedUserInfo = jwt_decode(response.credential);
    console.log('Decoded User Info LOADED: ', decodedUserInfo);
    if (decodedUserInfo) {
      console.log('Decoded user info is available.');
    } else {
      console.error("Cannot call listAlbums because decodedUserInfo is not available");
    }
  } catch (error) {
    console.error('Error decoding user credential:', error);
  }

  initTokenClient();
  getToken();

  landingPage.classList.add('hide');
  flashCardPage.classList.remove('hide');
};

//* GOOGLE AUTHORIZATION
let tokenClient;
const initTokenClient = () => {
  console.log('initTokenClient CALLED.');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    callback: (tokenResponse) => {
      console.log('Callback executed', tokenResponse);
      let access_token = tokenResponse.access_token;
      console.log('Access token in initTokenClient callback: ', access_token);
      
      fetchAlbumList(access_token);
    }
  })
  console.log('tokenClient: ', tokenClient);
};

const getToken = () => {
  console.log('getToken CALLED.');
  tokenClient.requestAccessToken();
}

// Sign in failure callback
const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

// //* CREATING OBJECT LIST FROM ALBUM NAMES
const fetchAlbumList = (access_token) => {
  console.log('fetchAlbumList CALLED.');
  console.log('Access token in fetchAlbumList: ', access_token);

  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://photoslibrary.googleapis.com/v1/albums');
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('Photo album data RETRIEVED');
      const jsonResponse = JSON.parse(xhr.responseText);
      const albums = jsonResponse.albums;
      console.log('Photo albums JSON.parsed:', albums);
      
      const validAlbums = [];
      const allowedAlbumNames = ['airplane', 'boat', 'flower', 'tree', 'doctor', 'construction worker'];
      for (const album of albums) {
        const albumName = album.title;
        const albumId = album.id;
        const photoCount = album.mediaItemsCount;
        if (photoCount >= 10 && allowedAlbumNames.includes(albumName.toLowerCase())) {
          validAlbums.push({name: albumName, id: albumId});
        }
      }

      validAlbums.sort((a, b) => a.name.localeCompare(b.name));      
      console.log('Valid Albums:', validAlbums);
      createList(validAlbums);
    } else if (xhr.readyState === 4) {
      console.error('Error in XMLHttpRequest:', xhr.statusText);
    }
  };     

  xhr.send();
};

// Adds album names to list
const createList = (validAlbums) => {
  for (const album of validAlbums) {
    const div = document.createElement('div');
    div.classList.add('object-item', 'center');
    const label = document.createElement('label');
    label.classList.add('name', 'center');
    label.htmlFor = album.name;
    label.innerText = album.name;
    const input = document.createElement('input');
    input.classList.add('qty', 'center');
    input.type = 'text';
    input.id = album.id;
    input.placeholder = 0;
    div.appendChild(label);
    div.appendChild(input);
    objectList.appendChild(div);
  }
};

//* DISPLAY PHOTOS
submit.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevent form submission
  console.log('Submit button clicked');
  const objectInputs = Array.from(document.getElementsByClassName('qty'));
  const selectedAlbums = [];
  const selectedQtys = [];

  objectInputs.forEach((input) => {
    if (input.value > 0) {
      selectedAlbums.push(input.id);
      selectedQtys.push(input.value);
      input.value = ''; // Reset the quantity value
    }
  });

  console.log('Selected albums:', selectedAlbums);
  console.log('Selected quantities:', selectedQtys);

  if (selectedAlbums.length === 0) { // Check if any album was selected
    alert('Please enter a quantity for at least one category before submitting.');
    return;
  }
  
  await fetchPhotos(selectedAlbums, selectedQtys);
});

const fetchPhotos = (albumNames, qtys) => {
  console.log('fetchPhotos CALLED.');
  let access_token = tokenClient.getToken().access_token;
  const promises = [];

  for (let i = 0; i < albumNames.length; i++) {
    console.log(`Fetching photos for album: ${albumNames[i]}, quantity: ${qtys[i]}`);
    const promise = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://photoslibrary.googleapis.com/v1/mediaItems:search');
      xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        console.log(`XHR state: ${xhr.readyState}, status: ${xhr.status}`);
        if (xhr.readyState === 4 && xhr.status === 200) {
          const jsonResponse = JSON.parse(xhr.responseText);
          console.log('Received response for album', albumNames[i], ':', jsonResponse);
          const mediaItems = jsonResponse.mediaItems;
          resolve(mediaItems);
        } else if (xhr.readyState === 4) {
          reject('Error in XMLHttpRequest:', xhr.statusText);
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network Error'));
      };
      
      const body = JSON.stringify({
        albumId: albumNames[i],
        pageSize: qtys[i],
      });

      xhr.send(body);
    });

    promises.push(promise);
  }

  console.log('All promises prepared, waiting for all to resolve...');

  Promise.all(promises)
    .then((responses) => {
      console.log('All promises resolved. Processing responses...');
      let allPhotos = [];
      for (let i = 0; i < responses.length; i++) {
        const mediaItems = responses[i];
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
      console.log('Photos shuffled and ready for display.');
      displayPhotos(allPhotos);
    })
    .catch((error) => {
      console.error('Error fetching photos:', error);
    });
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
  console.log('displayPhotos called with', photos);
  allImages.innerHTML = '';
  for (let i = 0; i < photos.length; i++) {
    const img = document.createElement('img');
    img.src = photos[i].image;
    console.log('Image URL:', img.src); 
    allImages.appendChild(img);
  }
};