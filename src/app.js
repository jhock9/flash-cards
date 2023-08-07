const landingPage = document.querySelector('#landing-page');
const flashCardPage = document.querySelector('#flashcards-page');
const contentWrapper = document.querySelector('#flash-content-wrapper');
const openBtn = document.querySelector('#open-btn');
const refreshBtn = document.querySelector('#refresh-btn');
const sidePanel = document.querySelector('#side-panel');
const resetBtn = document.querySelector('#reset-btn');
const randomBtn = document.querySelector('#random-btn');
const submitBtn = document.querySelector('#submit-btn');
const signoutBtn = document.querySelector('#signout-btn');
const tagsWrapper = document.querySelector('#tags-wrapper');
const selectedTagsContainer = document.querySelector('#selected-tags-container');
const removeBtns = document.querySelectorAll(".remove-btn");
const dropdown = document.getElementById('dropdown');
const tagsList = document.querySelector('#tags-list');
const tagsSelected = tagsList.querySelectorAll('.name');
const allImages = document.querySelector('#images-container');

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
  openBtn.classList.add("open");
  selectedTagsContainer.classList.add("hide-borders");
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
let accessToken;

const initTokenClient = () => {
  console.log('initTokenClient CALLED.');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: googleClientID,
    scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
    callback: (tokenResponse) => {
      console.log('Callback executed', tokenResponse);
      accessToken = tokenResponse.access_token;
      console.log('Access token in initTokenClient callback: ', accessToken);
      
      displayTags(accessToken);
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

//* FETCH PHOTO DATA
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
  console.log('Fetched descriptions:', descriptions);
  return descriptions;
};

//* DISPLAY TAGS
const displayTags = async (accessToken) => {
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

  // Display tags in dropdown and as selectable tags
  for (const tag of filteredTags) {
    const option = document.createElement('option');
    option.value = tag;
    option.text = tag;
    dropdown.add(option);

    const tagDiv = document.createElement('div');
    tagDiv.classList.add('tag', 'center');
    const tagName = document.createElement('span');
    tagName.classList.add('name', 'center');
    tagName.innerText = tag;
    tagDiv.appendChild(tagName);  
    tagsList.appendChild(tagDiv);
  }
}

//* SELECT TAGS AND QUANTITIES
let selectedTags = [];

// Select by dropdown
dropdown.addEventListener('change', () => {
  const selectedTag = dropdown.value;

  // Check if the tag is already selected
  if (selectedTags.includes(selectedTag)) {
    // Remove the tag from the selectedTags array
    selectedTags = selectedTags.filter(tag => tag !== selectedTag);

    // Remove the tag from the selected-tags-container
    const tagDiv = document.querySelector(`.selected-tag[data-tag="${selectedTag}"]`);
    if (tagDiv) {
      tagDiv.remove();
    }

    const tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(span => span.textContent === selectedTag);
    if (tagSpan) {
      tagSpan.classList.remove('selected');
    }

    return;
  }

  // Check if 4 tags have already been selected
  if (selectedTags.length >= 4) {
    return;
  }

  selectedTags.push(selectedTag);

  // Create a new div for the selected tag
  const tagDiv = document.createElement('div');
  tagDiv.classList.add('selected-tag', 'center');
  tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag

  // Add a quantity slider, tag name, and remove btn
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 2;
  slider.max = 6; 
  slider.value = 2;
  slider.classList.add('slider');
  const sliderValue = document.createElement('span');

  sliderValue.classList.add('sliderValue');
  sliderValue.innerHTML = slider.value;
  slider.oninput = () => {
    sliderValue.innerHTML = slider.value;
  };

  const tagName = document.createElement('span');
  tagName.classList.add('name', 'center');
  tagName.textContent = selectedTag;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('remove-btn', 'center'); 
  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-trash-can');
  removeBtn.appendChild(icon);

  removeBtn.addEventListener('click', () => {
    const selectedTag = removeBtn.parentElement.dataset.tag;
  
    // Remove the tag from the selectedTags array
    selectedTags = selectedTags.filter(tag => tag !== selectedTag);
  
    // Remove the tag from the selected-tags-container
    removeBtn.parentElement.remove();
  
    // Deselect the tag in the tags-list
    const tagSpan = document.querySelector(`.tag[data-tag="${selectedTag}"] span`);
    tagSpan.classList.remove('selected');
  });
  
  tagDiv.appendChild(slider);
  tagDiv.appendChild(sliderValue);
  tagDiv.appendChild(tagName);
  tagDiv.appendChild(removeBtn);

  selectedTagsContainer.appendChild(tagDiv);

  // Highlight the tag in the tags-list
  const tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(span => span.textContent === selectedTag);
  if (tagSpan) {
    tagSpan.classList.add('selected');
  }
  
  toggleBorders();
});

// Select by tag
tagsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('name')) {
    const selectedTag = e.target.textContent;

    // Check if the tag is already selected
    if (selectedTags.includes(selectedTag)) {
      // Remove the tag from the selectedTags array
      selectedTags = selectedTags.filter(tag => tag !== selectedTag);

      // Remove the tag from the selected-tags-container
      const tagDiv = document.querySelector(`.selected-tag[data-tag="${selectedTag}"]`);
      if (tagDiv) {
        tagDiv.remove();
      }
      
      // Deselect the tag in the tags-list
      e.target.classList.remove('selected');
      return;
    }

    // Check if 4 tags have already been selected
    if (selectedTags.length >= 4) {
      return;
    }

    selectedTags.push(selectedTag);

    // Add 'selected' class to the tag
    e.target.classList.add('selected');

    // Create a new div for the selected tag
    const tagDiv = document.createElement('div');
    tagDiv.classList.add('selected-tag', 'center');
    tagDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag

    // Add a quantity slider, tag name, and remove btn
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 2;
    slider.max = 6; 
    slider.value = 2;
    slider.classList.add('slider');
    const sliderValue = document.createElement('span');

    sliderValue.classList.add('sliderValue');
    sliderValue.innerHTML = slider.value;
    slider.oninput = () => {
      sliderValue.innerHTML = slider.value;
    };

    const tagName = document.createElement('span');
    tagName.classList.add('name', 'center');
    tagName.textContent = selectedTag;

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-btn', 'center'); 
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-trash-can');
    removeBtn.appendChild(icon);
  
    removeBtn.addEventListener('click', () => {
      const selectedTag = removeBtn.parentElement.dataset.tag;
    
      // Remove the tag from the selectedTags array
      selectedTags = selectedTags.filter(tag => tag !== selectedTag);
    
      // Remove the tag from the selected-tags-container
      removeBtn.parentElement.remove();
    
      // Deselect the tag in the tags-list
      e.target.classList.remove('selected');

    });
  
    tagDiv.appendChild(slider);
    tagDiv.appendChild(sliderValue);
    tagDiv.appendChild(tagName);
    tagDiv.appendChild(removeBtn);

    selectedTagsContainer.appendChild(tagDiv);

  } else if (e.target.classList === 'remove-btn') {
    const selectedTag = e.target.parentElement.dataset.tag;

    // Remove the tag from the selectedTags array
    selectedTags = selectedTags.filter(tag => tag !== selectedTag);

    // Remove the tag from the selected-tags-container
    e.target.parentElement.remove();

    // Deselect the tag in the tags-list
    const tagSpan = document.querySelector(`.tag[data-tag="${selectedTag}"] span`);
    if (tagSpan) {
      tagSpan.classList.remove('selected');
    }
    toggleBorders();
  }
});

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
  const tagQty = Array.from(document.getElementsByClassName('qty'));
  tagQty.forEach((input) => {
    input.value = '';
  });
});

randomBtn.addEventListener('click', () => {
  const tagQty = Array.from(document.getElementsByClassName('qty'));
  const numItems = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4

  // Reset all inputs
  tagQty.forEach((input) => {
    input.value = '';
  });

  // Randomly select items and set quantities
  for (let i = 0; i < numItems; i++) {
    const index = Math.floor(Math.random() * tagQty.length);
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
    tagQty[index].value = qty;
  }

  // Delay submitBtn click event trigger so it can finish executing 
  setTimeout(() => {
    submitBtn.click();
  }, 0);
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('Submit button clicked');

  // Get the selected quantities from the input fields in the #selected-tags-container
  const selectedQtys = Array.from(document.querySelectorAll('.selected-tag input')).map(input => input.value);

  // Fetch and display the photos
  const photos = await fetchPhotos();
  const displayedPhotos = [];
  for (let i = 0; i < selectedTags.length; i++) {
    const selectedPhotos = photos.filter(photo => photo.description && photo.description.includes(selectedTags[i]));
    shuffleArray(selectedPhotos);
    const photosToDisplay = selectedPhotos.slice(0, selectedQtys[i]);
    displayedPhotos.push(...photosToDisplay);
  }
  displayPhotos(displayedPhotos);
});

const toggleBorders = () => {
  if (selectedTags.length >= 1) {
    selectedTagsContainer.classList.remove('hide-borders');
  } else {
    selectedTagsContainer.classList.add('hide-borders');
  }
}