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
const displayedImages = document.querySelector('#images-container');

let googleClientID; 
let lastSelectedTagsAndQuantities;

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
  toggleNav();
};

signoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    // Call the server-side logout endpoint
    const response = await fetch('/logout', { method: 'POST' });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    google.accounts.id.disableAutoSelect();
    console.log('User signed out.');

    landingPage.classList.remove('hide');
    flashCardPage.classList.add('hide');
    window.location.reload();
  } catch (error) {
    console.error('Error during logout:', error);
  }
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
const fetchPhotoData = (accessToken) => {
  console.log('fetchPhotoData CALLED.');
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

//* FETCH PHOTO DESCRIPTIONS and DISPLAY TAGS
const fetchDescriptions = async (accessToken) => {
  const photos = await fetchPhotoData(accessToken);
  const descriptions = photos.map(photo => photo.description).filter(description => description);
  console.log('Fetched descriptions:', descriptions);
  return descriptions;
};

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

// SELECT BY DROPDOWN
dropdown.addEventListener('change', () => {
  const selectedTag = dropdown.value;

  // Check if the tag is already selected
  if (selectedTags.includes(selectedTag)) {
    // Remove the tag from the selectedTags array
    selectedTags = selectedTags.filter(tag => tag !== selectedTag);
    toggleBorders();

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
  dropdown.selectedIndex = 0;
  toggleBorders();

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
    toggleBorders();
    
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
});

// SELECT BY TAG LIST
tagsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('name')) {
    const selectedTag = e.target.textContent;

    // Check if the tag is already selected
    if (selectedTags.includes(selectedTag)) {
      // Remove the tag from the selectedTags array
      selectedTags = selectedTags.filter(tag => tag !== selectedTag);
      toggleBorders();

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
    toggleBorders();

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
      toggleBorders();
    
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
    toggleBorders();

    // Remove the tag from the selected-tags-container
    e.target.parentElement.remove();

    // Deselect the tag in the tags-list
    const tagSpan = document.querySelector(`.tag[data-tag="${selectedTag}"] span`);
    if (tagSpan) {
      tagSpan.classList.remove('selected');
    }
  }6
});

//* HELPER FUNCTIONS
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
  displayedImages.innerHTML = '';
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
    img.src = photos[i].baseUrl;
    img.classList.add('image');
    img.style.flexBasis = flexBasis;
    console.log('Image URL:', img.src); 
    displayedImages.appendChild(img);
  }
};

// Helper function for filtering photos
const filterPhotosByTags = (photos, selectedTagsAndQuantities) => {
  let filteredPhotos = [];
  let selectedPhotoIds = new Set(); // Keep track of the selected photo IDs

  for (const { tag, quantity } of selectedTagsAndQuantities) {
    const selectedPhotos = photos.filter(photo => {
      return photo.description && photo.description.includes(tag) && !selectedPhotoIds.has(photo.id);
    });

    shuffleArray(selectedPhotos);
    const photosToDisplay = selectedPhotos.slice(0, quantity);
    photosToDisplay.forEach(photo => selectedPhotoIds.add(photo.id)); // Add selected photo IDs to the Set
    filteredPhotos.push(...photosToDisplay);
  }

  shuffleArray(filteredPhotos);
  return filteredPhotos;
};


//* BUTTONS
const toggleNav = () => {
  openBtn.classList.toggle('open');
  sidePanel.classList.toggle('open');
  contentWrapper.classList.toggle('open');
  resetBtn.click();
}

openBtn.addEventListener('click', toggleNav);

refreshBtn.addEventListener('click', async () => {
  if (lastSelectedTagsAndQuantities !== null) {
    const photos = await fetchPhotoData(accessToken);
    const filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities);
    displayPhotos(filteredPhotos);
  }
});

resetBtn.addEventListener('click', () => {
  console.log('Reset button clicked');
  selectedTags = [];

  // Remove all selected tags from selected-tags-container
  const selectedTagDivs = document.querySelectorAll('.selected-tag');
  selectedTagDivs.forEach((div) => {
    div.remove();
  });

  // Deselect selected tags in tags list
  const selectedTagSpans = document.querySelectorAll('.tag .name.selected');
  selectedTagSpans.forEach((span) => {
    span.classList.remove('selected');
  });

  // Update borders
  toggleBorders();
});

randomBtn.addEventListener('click', () => {
  console.log('Random button clicked');
  resetBtn.click();

  // Get all available tags
  const allTags = Array.from(document.querySelectorAll('.tag .name')).map(span => span.textContent);

  const numTagsToSelect = Math.floor(Math.random() * 3) + 2;

  // Set max number of images per tag
  let maxImagesPerTag;
  switch (numTagsToSelect) {
    case 2:
      maxImagesPerTag = 6;
      break;
    case 3:
      maxImagesPerTag = 4;
      break;
    case 4:
      maxImagesPerTag = 3;
      break;
    default:
      maxImagesPerTag = 3;
  }

  let totalImages = 0;

  // Randomly select tags and set random slider values
  for (let i = 0; i < numTagsToSelect; i++) {
    const randomTagIndex = Math.floor(Math.random() * allTags.length);
    const selectedTag = allTags[randomTagIndex];

    allTags.splice(randomTagIndex, 1); // Removes duplicates

    // Simulate selecting tag by setting dropdown value, triggering change event
    dropdown.value = selectedTag;
    dropdown.dispatchEvent(new Event('change'));


    // Set value for slider, considering totalImages
    const sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 2, 12 - totalImages);

    // Set value for slider
    const slider = document.querySelector(`.selected-tag[data-tag="${selectedTag}"] .slider`);
    slider.value = sliderValue;

    // Update slider value display
    const sliderValueDisplay = document.querySelector(`.selected-tag[data-tag="${selectedTag}"] .sliderValue`);
    sliderValueDisplay.innerHTML = slider.value;

    // Update totalImages count
    totalImages += sliderValue;
  }

  // Delay submitBtn trigger so it can finish executing
  setTimeout(() => {
    submitBtn.click();
  }, 0);
});

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  console.log('Submit button clicked');

  if (!accessToken) {
    console.error('Access token is not available');
    return;
  }

  // Get selected tags and quantities from selected-tags-container
  const selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-tag')).map(tagDiv => {
    const tag = tagDiv.dataset.tag;
    const quantity = tagDiv.querySelector('.slider').value;
    return { tag, quantity };
  });

  lastSelectedTagsAndQuantities = selectedTagsAndQuantities;
  const photos = await fetchPhotoData(accessToken);
  const filteredPhotos = filterPhotosByTags(photos, selectedTagsAndQuantities);
  displayPhotos(filteredPhotos);

  toggleNav();
});

const toggleBorders = () => {
  if (selectedTags.length >= 1) {
    selectedTagsContainer.classList.add('show-borders');
  } else {
    selectedTagsContainer.classList.remove('show-borders');
  }
}