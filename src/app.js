const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const contentWrapper = document.querySelector('#flash-content-wrapper');
const sidePanel = document.querySelector('#side-panel');
const objectList = document.querySelector('#object-list');
const resetBtn = document.querySelector('#reset-btn');
const randomBtn = document.querySelector('#random-btn');
const submitBtn = document.querySelector('#submit-btn');
const signoutBtn = document.querySelector('#signout-btn');
const openBtn = document.querySelector('#open-btn');
const refreshBtn = document.querySelector('#refresh-btn');
const allImages = document.querySelector('.images-container');

let googleClientID;
let accessToken;
let lastSelectedAlbums = null;
let lastSelectedQtys = null;

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
  openBtn.classList.add("open");
  sidePanel.classList.add('open');
  contentWrapper.classList.add('open');
  flashCardPage.classList.remove('hide');
};

signoutBtn.addEventListener('click', (e) => {
  e.preventDefault();
  google.accounts.id.disableAutoSelect();
  
  console.log('User signed out.');
  localStorage.clear();
  
  landingPage.classList.remove('hide');
  flashCardPage.classList.add('hide');
  window.location.reload();
});

//* GOOGLE AUTHORIZATION
let tokenClient;
const initTokenClient = () => {
  console.log('initTokenClient CALLED.');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    callback: (tokenResponse) => {
      console.log('Callback executed', tokenResponse);
      accessToken = tokenResponse.access_token;
      console.log('Access token in initTokenClient callback: ', accessToken);
      
      initTags(accessToken);
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

//* FETCH PHOTOS
const fetchPhotos = (accessToken) => {
  console.log('fetchPhotos CALLED.');
  const promise = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://photoslibrary.googleapis.com/v1/mediaItems:search');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = () => {
      console.log(`XHR state: ${xhr.readyState}, status: ${xhr.status}`);
      if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonResponse = JSON.parse(xhr.responseText);
        console.log('Received response for all photos:', jsonResponse);
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
      pageSize: 100, // Fetch as many photos as possible
    });

    xhr.send(body);
  });

  return promise;
};

const fetchDescriptions = async (accessToken) => {
  const photos = await fetchPhotos(accessToken);
  const descriptions = photos.map(photo => photo.description).filter(description => description);
  return descriptions;
};

const initTags = async (accessToken) => {
  const descriptions = await fetchDescriptions(accessToken);

  // Count tags
  const tagCounts = {};
  for (const description of descriptions) {
    const tags = description.split(' ');
    for (const tag of tags) {
      if (tag in tagCounts) {
        tagCounts[tag]++;
      } else {
        tagCounts[tag] = 1;
      }
    }
  }

  // Filter tags
  const filteredTags = [];
  for (const tag in tagCounts) {
    if (tagCounts[tag] >= 5) {
      filteredTags.push(tag);
    }
  }

  // Sort tags
  filteredTags.sort();

  // Display tags
  const dropdown = document.createElement('select');
  for (const tag of filteredTags) {
    const option = document.createElement('option');
    option.value = tag;
    option.text = tag;
    dropdown.add(option);
  }
  objectList.appendChild(dropdown);

  // Handle user selection
  dropdown.addEventListener('change', async () => {
    const selectedTag = dropdown.value;
    const photos = await fetchPhotos();
    const selectedPhotos = photos.filter(photo => photo.description && photo.description.includes(selectedTag));
    displayPhotos(selectedPhotos);
  });
};

// Helper function to randomize array length based on user input
const shuffleArray = (array) => {
  console.log('Original Array:', array);
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    console.log(`Swapping elements at index ${i} and ${j}`);
    [array[i], array[j]] = [array[j], array[i]];
  }

  console.log('Shuffled Array:', array);
  return array;
};

// Helper function for displaying photos
const displayPhotos = (photos) => {
  console.log('displayPhotos called with', photos);
  allImages.innerHTML = '';
  const numPhotos = photos.length;
  let flexBasis;

  if (numPhotos > 6) {
    flexBasis = `calc((100% / 5) - 2rem)`;
  } else if (numPhotos > 4) {
    flexBasis = `calc((100% / 4) - 2rem)`;
  } else if (numPhotos > 1) {
    flexBasis = `calc((100% / 3) - 2rem)`;
  } else {
    flexBasis = `calc(80% - 2rem)`;
  }

  for (let i = 0; i < numPhotos; i++) {
    const img = document.createElement('img');
    img.src = photos[i].image;
    img.classList.add('image');
    img.style.flexBasis = flexBasis;
    console.log('Image URL:', img.src); 
    allImages.appendChild(img);
  }
};

//* BUTTONS
const toggleNav = () => {
  openBtn.classList.toggle('open');
  sidePanel.classList.toggle('open');
  contentWrapper.classList.toggle('open');
}

openBtn.addEventListener('click', toggleNav);

refreshBtn.addEventListener('click', () => {
  if (lastSelectedAlbums !== null && lastSelectedQtys !== null) {
    fetchPhotos(lastSelectedAlbums, lastSelectedQtys);
  }
});

resetBtn.addEventListener('click', () => {
  const objectInputs = Array.from(document.getElementsByClassName('qty'));
  objectInputs.forEach((input) => {
    input.value = '';
  });
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
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
    alert('Please enter a number between 1-9 in two categories before submitting.');
    return;
  } else {
    toggleNav();
    lastSelectedAlbums = selectedAlbums;
    lastSelectedQtys = selectedQtys;
  }

  await fetchPhotos(selectedAlbums, selectedQtys);
});

randomBtn.addEventListener('click', () => {
  const objectInputs = Array.from(document.getElementsByClassName('qty'));
  const numItems = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4

  // Reset all inputs
  objectInputs.forEach((input) => {
    input.value = '';
  });

  // Randomly select items and set quantities
  for (let i = 0; i < numItems; i++) {
    const index = Math.floor(Math.random() * objectInputs.length);
    let maxQty;
    switch(numItems) {
      case 2:
        maxQty = 6;
        break;
      case 3:
        maxQty = 4;
        break;
      case 4:
        maxQty = 3;
        break;
    }
    const qty = Math.floor(Math.random() * maxQty) + 2; // Random number between 2 and maxQty
    objectInputs[index].value = qty;
  }

  // Delay submitBtn click event trigger so it can finish executing 
  setTimeout(() => {
    submitBtn.click();
  }, 0);
});