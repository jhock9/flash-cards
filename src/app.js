const contentWrapper = document.querySelector('#flash-content-wrapper');
const mobileOpenBtn = document.querySelector('#mobile-open-btn');
const tabletOpenBtn = document.querySelector('#tablet-open-btn');
const refreshBtn = document.querySelector('#refresh-btn');
const sidePanel = document.querySelector('#side-panel');
const resetBtn = document.querySelector('#reset-btn');
const randomBtn = document.querySelector('#random-btn');
const submitBtn = document.querySelector('#submit-btn');
const signoutBtn = document.querySelector('#signout-btn');
const totalSlider = document.querySelector('#total-slider');
const totalSliderValue = document.querySelector('#total-slider-value');
const remainder = document.querySelector('#remainder-checkbox');
const tagsWrapper = document.querySelector('#tags-wrapper');
const selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');
const removeBtns = document.querySelectorAll('.remove-btn');
// const dropdown = document.querySelector('#dropdown');
const filterInput = document.querySelector('#filter-tags');
const tagsList = document.querySelector('#tags-list');
const displayedImages = document.querySelector('#images-container');

let googleClientID; 
let lastSelectedTagsAndQuantities;
let selectedTags = [];
let photos;
let totalPhotos = 0;
let useRemainder = false;
let lastTotalPhotos; 
let lastUseRemainder;

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


//*   GOOGLE AUTHENTICATION & AUTHORIZATION   *//

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

const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

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


//*   FETCH PHOTOS DATA AND DISPLAY TAGS   *//

const fetchPhotosData = async () => {
  console.log('Fetching photos data...');
  try {
    const response = await fetch('/getPhotos');
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const responseText = await response.text();
    photos = JSON.parse(responseText);
    displayTags(photos);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

const displayTags = async (photoData) => {
  // const defaultOption = dropdown.querySelector('option[value=""]');
  // dropdown.innerHTML = '';
  // if (defaultOption) {
  //   dropdown.appendChild(defaultOption);
  // }
  tagsList.innerHTML = '';
  
  console.log('Displaying tags...');
  const descriptions = await fetchDescriptions(photoData);
  
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
  
  // Determines which tags to display based on the number of photos they appear in
  const filteredTags = [];
  for (const tag in tagCounts) {
    if (tagCounts[tag] >= 6) {
      filteredTags.push(tag);
    }
  }
  
  // Sort tags
  filteredTags.sort();
  
  // Display tags in dropdown and as selectable tags
  for (const tag of filteredTags) {
    // const option = document.createElement('option');
    // option.value = tag;
    // option.text = tag;
    // dropdown.add(option);
    
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


//**   SELECT TAGS TO DISPLAY   **//

totalSlider.addEventListener('input', () => {
  totalPhotos = parseInt(totalSlider.value, 10);
  lastTotalPhotos = totalPhotos;
  
  // Display 'N/A' when slider value is 0
  totalSliderValue.textContent = totalPhotos === 0 ? 'N/A' : totalPhotos;
  
  // Disable and uncheck filler tags checkbox if total slider value is 'N/A'
  if (totalPhotos === 0) {
    remainder.disabled = true;
    remainder.checked = false;
    useRemainder = false;
    totalSliderValue.classList.add('gray-out');
    remainder.classList.add('gray-out');
      } else {
    remainder.disabled = false;
    totalSliderValue.classList.remove('gray-out');
    remainder.classList.remove('gray-out');
  }
});

remainder.addEventListener('change', () => {
  useRemainder = remainder.checked;
  lastUseRemainder = useRemainder;
});

//Search and filter tags
filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value.toLowerCase();
  const tags = document.querySelectorAll(".tag");
  
  for (tag of tags) {
    const tagLowerText = tag.innerText.toLowerCase();
    if (tagLowerText.includes(searchText)) {
      tag.classList.remove("hide");
    } else {
      tag.classList.add("hide");
    };
  };
});

filterInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// dropdown.addEventListener('change', () => {
//   console.log('Dropdown changed...');
//   const selectedTag = dropdown.value;
  
//   const proceed = handleTagSelection(selectedTag);
//   if (!proceed) {
//     return;
//   }  
  
//   dropdown.selectedIndex = 0;
  
//   // Select the tag in the tags-list
//   const tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(span => span.textContent === selectedTag);
//   if (tagSpan) {
//     tagSpan.classList.add('selected');
//   }
  
//   createSelectedDiv(selectedTag);
//   resetTagSelect();
// });

tagsList.addEventListener('click', (e) => {  
  console.log('Tags-list clicked...');
  if (e.target.classList.contains('name')) {
    const selectedTag = e.target.textContent;
    
    const proceed = handleTagSelection(selectedTag, e.target);
    if (!proceed) {
      return;
    }  
    
    e.target.classList.add('selected');
    createSelectedDiv(selectedTag);
  }
  
  resetTagSelect();
});

const loadRenderLockedTags = () => {
  console.log('loadRenderLockedTags called...');
  const loadedLockedTags = JSON.parse(localStorage.getItem('lockedTags') || '[]');
  
  selectedTagsWrapper.innerHTML = '';
  selectedTags = [];
  
  loadedLockedTags.forEach(tagInfo => {
    const { tag, quantity } = tagInfo;
    
    const proceed = handleTagSelection(tag);
    if (!proceed) {
      return;
    }
    
    // Modify the slider value to reflect stored quantity
    const selectedDiv = createSelectedDiv(tag);
    const slider = selectedDiv.querySelector('.slider');
    const sliderValue = selectedDiv.querySelector('.slider-value');
    slider.value = quantity;
    sliderValue.textContent = quantity;
    
    // Set tag to locked
    const lockIcon = selectedDiv.querySelector('.fa-solid');
    selectedDiv.dataset.locked = 'true';
    lockIcon.classList.add('fa-lock');
    lockIcon.classList.remove('fa-unlock');
  });
  
  resetTagSelect();
};


//**   CHOOSING AND DISPLAYING SELECTED TAGS   **/

const handleTagSelection = (selectedTag, sourceElement = null) => {
  if (selectedTags.includes(selectedTag)) {
    removeTag(selectedTag);
    resetTagSelect();
    return false;
  }
  
  // Check if 4 tags have already been selected
  if (selectedTags.length >= 4) {
    return false;
  }
  
  selectedTags.push(selectedTag);
  toggleBorders();
  
  if (sourceElement) sourceElement.classList.add('selected');
  
  return true;
};

// Creating selected tag divs
const createSelectedDiv = (selectedTag) => {
  // Create a new div for the selected tag
  const selectedDiv = document.createElement('div');
  selectedDiv.classList.add('selected-div', 'center');
  selectedDiv.dataset.tag = selectedTag; // Add a data attribute to identify the tag
  
  // Create elements
  const [slider, sliderValue] = createSlider();
  const tagName = createTagName(selectedTag);
  const lockToggle = createLockToggle(selectedDiv);
  const removeBtn = createRemoveBtn(selectedDiv);
  
  // Append elements
  const sliderTagDiv = appendToNewDiv('slider-tag-div center', [slider, sliderValue, tagName]);
  const iconDiv = appendToNewDiv('icon-div center', [lockToggle, removeBtn]);
  
  selectedDiv.appendChild(sliderTagDiv);
  selectedDiv.appendChild(iconDiv);
  
  selectedTagsWrapper.appendChild(selectedDiv);
  
  return selectedDiv;
};

const appendToNewDiv = (classList, elements) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add(...classList.split(' '));
  elements.forEach(el => newDiv.appendChild(el));
  return newDiv;
};


//**   SELECTED TAG HELPERS   **//

const createSlider = () => {
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 1;
  slider.max = 6;
  slider.value = 1;
  slider.classList.add('slider');
  
  const sliderValue = document.createElement('span');
  sliderValue.classList.add('slider-value');
  sliderValue.innerHTML = slider.value;
  slider.oninput = () => {
    sliderValue.innerHTML = slider.value;
  };
  
  return [slider, sliderValue];
};

const createTagName = (selectedTag) => {
  const tagName = document.createElement('span');
  tagName.classList.add('name', 'center');
  tagName.textContent = selectedTag;
  return tagName;
};


//** SAVING SELECTED TAGS **//

const createLockToggle = (selectedDiv) => {
  const lockToggle = document.createElement('button');
  lockToggle.type = 'button';
  lockToggle.classList.add('lock-toggle', 'center');
  
  const lockIcon = document.createElement('i');
  lockIcon.classList.add('fa-solid', 'fa-unlock');
  lockToggle.appendChild(lockIcon);
  
  lockToggle.addEventListener('click', () => {
    toggleLock(selectedDiv, lockIcon);
  });
  
  return lockToggle;
};

const toggleLock = (selectedDiv, lockIcon) => {
  const isLocked = selectedDiv.dataset.locked === 'true';
  selectedDiv.dataset.locked = isLocked ? 'false' : 'true';
  lockIcon.classList.toggle('fa-lock');
  lockIcon.classList.toggle('fa-unlock');
  saveLockedTags(!isLocked);
};

// Save or remove locked tags from local storage
const saveLockedTags = (save = true) => {
  console.log('saveLockedTags called...');
  if (save) {
    // Save locked tags to local storage
    const lockedTags = Array.from(document.querySelectorAll('.selected-div'))
      .filter(selectedDiv => selectedDiv.dataset.locked === 'true')
      .map(selectedDiv => {
        return { tag: selectedDiv.dataset.tag, quantity: selectedDiv.querySelector('.slider').value };
      });
    localStorage.setItem('lockedTags', JSON.stringify(lockedTags));
  } else {
    // Remove locked tags from local storage
    localStorage.removeItem('lockedTags');
  }
};


//**   REMOVING SELECTED TAGS   **//

const createRemoveBtn = (selectedDiv) => {
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('remove-btn', 'center');
  
  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fa-solid', 'fa-trash-can');
  removeBtn.appendChild(removeIcon);
  
  removeBtn.addEventListener('click', () => {
    const tag = selectedDiv.dataset.tag;
    removeTag(tag);
  });
  
  return removeBtn;
};

const removeTag = (selectedTag) => {
  console.log('removeTag called...');
  // Remove the tag from the selectedTags array
  selectedTags = selectedTags.filter(tag => tag !== selectedTag);
  
  // Remove the tag from the selected-tags-wrapper
  const selectedDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
  if (selectedDiv) {
    selectedDiv.remove();
    saveLockedTags(false);
  }
  
  // Deselect the tag in the tags-list
  const tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(span => span.textContent === selectedTag);
  if (tagSpan) {
    tagSpan.classList.remove('selected');
  }
  toggleBorders();
}

// Clears selected tags based on removeLockedTags
const clearSelectedTags = (removeLockedTags = false) => {
  console.log('clearSelectedTags called...');
  let selectedDivs = document.querySelectorAll('.selected-div');
  
  // Remove selected tags from selected-tags-wrapper that are not locked, or when removeLockedTags is true
  selectedDivs.forEach((div) => {
    if (removeLockedTags || div.dataset.locked !== 'true') {
      removeTag(div.dataset.tag); 
    }
  });
  
  //!! Is this still necessary?
  // Update selectedTags array to only contain locked tags if removeLockedTags is true
  selectedTags = removeLockedTags ? selectedTags.filter(tag => tag.locked) : selectedTags;
  
  // Clear locked tags from local storage if removeLockedTags is true
  if (removeLockedTags) {
    console.log('Clearing locked tags from local storage...')
    saveLockedTags(false);
  } else {
    console.log('Saving locked tags to local storage...')
    saveLockedTags(true);
  };
  
  toggleBorders();
};

// Reset dropdown, filterInput and tagsList
const resetTagSelect = () => {
  // dropdown.selectedIndex = 0;
  const tags = document.querySelectorAll(".tag");
  tags.forEach(tag => tag.classList.remove("hide")); 
  filterInput.value = "";
}


//**   DISPLAY SELECTED PHOTOS   **//

const filterPhotosByTags = (photos, selectedTagsAndQuantities, totalPhotos, useRemainder) => {
  console.log('filterPhotosByTags called...');
  
  let filteredPhotos = [];
  let selectedPhotoIds = new Set(); // Keep track of the selected photo IDs
  
  // Sum of all photos that are intended to be selected (based on slider values)
  let intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
  
  // Calculate how many more photos are needed to meet the total
  let remainingPhotos = Math.max(0, totalPhotos - intendedTotal);
  
  // Loop through each tag and quantity
  for (const { tag, quantity } of selectedTagsAndQuantities) {
    
    const selectedPhotos = photos.filter(photo => 
      photo.description && photo.description.includes(tag) && !selectedPhotoIds.has(photo.id));
    
    shuffleArray(selectedPhotos);
    const photosToDisplay = selectedPhotos.slice(0, quantity);
    
    photosToDisplay.forEach(photo => selectedPhotoIds.add(photo.id)); // Add selected photo IDs to the Set
    filteredPhotos.push(...photosToDisplay);
  }
  
  // If 'useRemainder' is checked and there are remaining photos to be filled
  if (useRemainder && remainingPhotos > 0) {
    const additionalPhotos = photos.filter(photo => !selectedPhotoIds.has(photo.id));
    shuffleArray(additionalPhotos);
    filteredPhotos.push(...additionalPhotos.slice(0, remainingPhotos));
  }
  
  // Finally, slice the array based on 'totalPhotos'
  if (totalPhotos > 0) {
    filteredPhotos = filteredPhotos.slice(0, totalPhotos);
  }
  
  shuffleArray(filteredPhotos);
  return filteredPhotos;
};

const shuffleArray = (array) => {
  console.log('Shuffling array...');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
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

//**   TOGGLES   **//
const toggleNav = () => {
  console.log('Toggling nav...');
  tabletOpenBtn.classList.toggle('open');
  sidePanel.classList.toggle('open');

  if (sidePanel.classList.contains('open')) {
    loadRenderLockedTags();
  } else {
    clearSelectedTags();  
  }
};

const toggleBorders = () => {
  const visibleTags = selectedTags.filter (tag => !tag.locked);
  if (visibleTags.length >= 1) {
    selectedTagsWrapper.classList.add('show-borders');
    selectedTagsWrapper.classList.remove('hide');
  } else {
    selectedTagsWrapper.classList.remove('show-borders');
    selectedTagsWrapper.classList.add('hide');
  }
}


//**   BUTTONS   **//

mobileOpenBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  await fetchPhotosData();
  toggleNav();
});

tabletOpenBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  await fetchPhotosData();
  toggleNav();
});

refreshBtn.addEventListener('click', async () => {
  console.log('Refresh button clicked...');
  if (lastSelectedTagsAndQuantities !== null && lastTotalPhotos !== null && lastUseRemainder !== null) {
    if (photos) {
      const filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities, lastTotalPhotos, lastUseRemainder);
      displayPhotos(filteredPhotos);
    } else {
      console.error('Photos data is not available. Fetch it first.');
    }
  }
});

resetBtn.addEventListener('click', () => {
  console.log('Reset button clicked...');
  clearSelectedTags(true);  
  
  // Reset totalSlider value and remainder checkbox
  totalSlider.value = 0;
  totalSliderValue.textContent = totalSlider.value === 0 ? 'N/A' : totalSlider.value;
  remainder.disabled = true;
  remainder.checked = false;
  useRemainder = false;
  totalSliderValue.classList.add('gray-out');
  remainder.classList.add('gray-out');
  
  resetTagSelect();
  toggleBorders();
});

randomBtn.addEventListener('click', () => {
  console.log('Random button clicked...');
  clearSelectedTags(true);
  
  // Get all available tags
  const allTags = Array.from(document.querySelectorAll('.tag .name')).map(span => span.textContent);
  const numTagsToSelect = Math.floor(Math.random() * 3) + 1;
  let totalImages = 0;
  
  // Set max number of images per tag
  let maxImagesPerTag;
  switch (numTagsToSelect) {
    case 1:
      maxImagesPerTag = 6;
      break;
    case 2:
      maxImagesPerTag = 4;
      break;
    case 3:
      maxImagesPerTag = 3;
      break;
    case 4:
      maxImagesPerTag = 2;
      break;
    default:
      maxImagesPerTag = 2;
  }
    
  // Randomly select tags and set random slider values
  for (let i = 0; i < numTagsToSelect; i++) {
    const randomTagIndex = Math.floor(Math.random() * allTags.length);
    const selectedTag = allTags[randomTagIndex];
    
    allTags.splice(randomTagIndex, 1); // Removes duplicates
    
    // // Simulate selecting tag by setting dropdown value, triggering change event
    // dropdown.value = selectedTag;
    // dropdown.dispatchEvent(new Event('change'));
    
    // Set value for slider, considering totalImages
    const sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 2, 12 - totalImages);
        
    // Set value for slider
    const slider = document.querySelector(`.selected-div[data-tag="${selectedTag}"] .slider`);
    slider.value = sliderValue;
    
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
  
  // Get selected tags and quantities from selected-tags-wrapper
  const selectedTagsAndQuantities = Array.from(document.querySelectorAll('.selected-div')).map(selectedDiv => {
    const tag = selectedDiv.dataset.tag;
    const quantity = selectedDiv.querySelector('.slider').value;
    return { tag, quantity };
  });
  
  lastSelectedTagsAndQuantities = selectedTagsAndQuantities;
  
  if (photos) {
    const filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities, totalPhotos, useRemainder);
    displayPhotos(filteredPhotos);
  } else {
    console.error('Photos data is not available. Fetch it first.');
  }
  
  toggleNav();
});

removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('Remove button clicked..');
    const selectedTag = btn.parentElement.dataset.tag;
    removeTag(selectedTag);
  });
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
    loadRenderLockedTags();
  } catch (error) {
    console.error('Error during logout:', error);
  }
});
