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
    googleApiKey = config.GOOGLE_API_KEY;
    googleClientSecret = config.GOOGLE_CLIENT_SECRET;
    redirectUrl = config.REDIRECT_URL;
    console.log('Config LOADED.'); 
    
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

  // document.getElementById('google-signin').addEventListener('click', () => {
  //   getToken();
  // });
  // google.accounts.id.prompt();
};

const handleCredentialResponse = (response) => {
  console.log('handleCredentialResponse CALLED.');
  let decodedUserInfo;
  try {
    console.log('Encoded JWT ID token: ', response.credential)
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
  // fetchAlbumList();
};

//* GOOGLE AUTHORIZATION
let tokenClient;
const initTokenClient = () => {  // or fetchAlbumList function -- html onload
  console.log('initTokenClient CALLED.');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    callback: (tokenResponse) => {
      console.log('Callback executed', tokenResponse);
      let access_token = tokenResponse.access_token;
      console.log(access_token);

      // Load Albums List
      (() => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://photoslibrary.googleapis.com/v1/albums');
        xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Photo album data:', xhr.responseText);
            const jsonResponse = JSON.parse(xhr.responseText);
            const albums = jsonResponse.albums;
            console.log('Photo albums JSON.parsed:', albums);
          } else if (xhr.readyState === 4) {
            console.error('Error in XMLHttpRequest:', xhr.statusText);
          }
        };     

        xhr.send();
        // add params for list requirements (must have 10 photos, etc.)
      })();
    }
  })
  console.log('tokenClient: ', tokenClient);
};

// // Send auth code to your backend platform
// const sendCodeToServer = async (code) => {
//   let code_receiver_uri = '/oauth2callback';

//   try {
//     const response = await fetch(code_receiver_uri, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ code }),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Response from server:', data);
//       if (data.success) {
//         console.log('Signed in as: ' + data.user_email);
//         return data.access_token;
//       } else {
//         throw new Error(data.error);
//       }
//     } else {
//       throw new Error(response.statusText);
//     }
//   } catch (error) {
//     console.error('Error sending code:', error);
//     throw error;
//   }
// };

const getToken = () => {
  console.log('getToken CALLED.');
  tokenClient.requestAccessToken();
}

// Sign in failure callback
const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

//* CREATING OBJECT LIST FROM ALBUM NAMES
const listAlbums = async (access_token) => {
  console.log('Access Token: ', access_token);
  try {
    console.log('listAlbums CALLED.');
    const url = 'https://photoslibrary.googleapis.com/v1/albums';
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('Fetch COMPLETED.');
    console.log('Response from Google API:', response);

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