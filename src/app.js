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
// const tagsSelected = tagsList.querySelectorAll('.name');
const displayedImages = document.querySelector('#images-container');

let googleClientID; 
let lastSelectedTagsAndQuantities;
let photos = null;

const fetchConfig = async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    
    googleClientID = config.GOOGLE_CLIENT_ID;
    console.log('googleClientID LOADED...'); 
    
    initGoogleSignIn();
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};
fetchConfig();

//* GOOGLE AUTHENTICATION & AUTHORIZATION
// Redirect user to Google's authentication page
const googleAuth = () => {
  window.location.href = '/authorize';
};

// Initialize Google Sign-In
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
};

// Sign in success callback
const handleCredentialResponse = async (response) => {
  console.log('handleCredentialResponse CALLED...');
  let decodedUserInfo;
  try {
    console.log('Encoded JWT ID token RETRIEVED...')
    decodedUserInfo = jwt_decode(response.credential);
    console.log('Decoded User Info LOADED...');
  } catch (error) {
    console.error('Error decoding user credential:', error);
  }
  
    await googleAuth();
};

// Sign in failure callback
const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

//* CHECK AUTHENTICATION
const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    const response = await fetch('/is-authenticated', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.isAuthenticated) {
      console.log('User is authenticated.');
      sessionStorage.setItem('authenticationChecked', 'true');
      
      if (window.location.pathname === '/landing.html') {
        window.location.href = '/flashcards.html';
      }
    } else {
      console.log('User is not authenticated.');
      
      if (window.location.pathname === '/flashcards.html') {
        window.location.href = '/landing.html';
      }
    } 
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
};

// Call checkAuthentication when the page initially loads
window.addEventListener('load', checkAuthentication);
// Call checkAuthentication when the page refreshes
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('authenticationChecked');
});

//* FETCH PHOTOS DATA AND DISPLAY TAGS
const fetchPhotosData = async () => {
  console.log('Fetching photos data...');
  try {
    const response = await fetch('/getPhotos');
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const responseText = await response.text();
    
    photos = null;
    photos = JSON.parse(responseText);
    console.log('Photos data received from server.', photos);
    
    displayTags(photos);
    
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

// Display tags
const displayTags = async (photoData) => {
  console.log('Displaying tags...');
  const descriptions = await fetchDescriptions(photoData);
  
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

// Fetch descriptions
const fetchDescriptions = async (photoData) => {
  const descriptions = await photoData.map(photo => photo.description).filter(description => description);
  console.log('Photo descriptions parsed...');
  return descriptions;
};
  
//* SELECT TAGS TO DISPLAY
let selectedTags = [];

// Select tags from dropdown
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
    toggleBorders
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

// Select tags from tags-list
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
  }
});

//* HELPER FUNCTIONS
const filterPhotosByTags = (photos, selectedTagsAndQuantities) => {
  console.log('filterPhotosByTags called...');
  console.log('Received photos:', photos);
  
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

const shuffleArray = (array) => {
  console.log('Shuffling array...');
  console.log('Original Array:', array);
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  console.log('Shuffled Array:', array);
  return array;
};

const displayPhotos = (photos) => {
  console.log('displayPhotos called...');
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
    displayedImages.appendChild(img);
  }
};

const toggleNav = () => {
  openBtn.classList.toggle('open');
  sidePanel.classList.toggle('open');
  contentWrapper.classList.toggle('open');
  resetBtn.click();
}

//* BUTTONS
openBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  toggleNav();
  await fetchPhotosData();
});

refreshBtn.addEventListener('click', async () => {
  console.log('Refresh button clicked...');
  if (lastSelectedTagsAndQuantities !== null) {
    photos = await fetchPhotosData();
    const filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities);
    displayPhotos(filteredPhotos);
  }
});

resetBtn.addEventListener('click', () => {
  console.log('Reset button clicked...');
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
  
  toggleBorders();
});

randomBtn.addEventListener('click', () => {
  console.log('Random button clicked...');
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
  console.log('Submit button clicked...');
  
  // Get selected tags and quantities from selected-tags-container
  const selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-tag')).map(tagDiv => {
    const tag = tagDiv.dataset.tag;
    const quantity = tagDiv.querySelector('.slider').value;
    return { tag, quantity };
  });
  
  lastSelectedTagsAndQuantities = selectedTagsAndQuantities;

  if (photos) {
    const filteredPhotos = filterPhotosByTags(photos, selectedTagsAndQuantities);
    displayPhotos(filteredPhotos);
  } else {
    console.error('Photos data is not available. Fetch it first.');
  }
  
  toggleNav();
});

signoutBtn.addEventListener('click', async (e) => {
  console.log('Sign out button clicked...');
  e.preventDefault();
  try {
    // Call the server-side logout endpoint
    const response = await fetch('/logout', { method: 'POST' });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    google.accounts.id.disableAutoSelect();
    console.log('User signed out.');
    
    window.location.href = '/landing.html';
  } catch (error) {
    console.error('Error during logout:', error);
  }
});

const toggleBorders = () => {
  if (selectedTags.length >= 1) {
    selectedTagsContainer.classList.add('show-borders');
  } else {
    selectedTagsContainer.classList.remove('show-borders');
  }
}