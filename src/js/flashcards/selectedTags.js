// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

const selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');
const removeBtns = document.querySelectorAll('.remove-btn');
const lockedPhotoBtn = document.querySelector('#locked-photo-btn');
let selectedTags = [];

import {
  createSlider, // createSlider(selectedTag)
  createTagName, // createTagName(selectedTag)
  createLockToggle, // createLockToggle(selectedDiv)
  createRemoveBtn, // createRemoveBtn(selectedDiv, callback)
  appendToNewDiv, // appendToNewDiv(classList, elements)
} from './createSelectedTags.js';
import { 
  toggleLockedTags, // toggleLockedTags(save = true, tag = null)
  toggleLockedPhoto, // toggleLockedPhoto(photoId, save = true)
} from './saveData.js';
import { lockedPhoto } from './photos.js'; // global variable

// Load saved tags
const loadSavedTags = async (filterInput) => {
  console.log('loadSavedTags called...');
  const response = await fetch(`/appointment/${appointmentId}/load-tags`);
  const data = await response.json();
  const savedTags = data.savedTags;
  
  selectedTagsWrapper.innerHTML = '';
  selectedTags = [];
  
  savedTags.forEach(tagInfo => {
    const { name, qty } = tagInfo;
    
    const proceed = handleTagSelection(name, filterInput, null);
    if (!proceed) {
      return;
    }
    
    // Modify the slider value to reflect stored quantity
    const selectedDiv = createSelectedDiv(name);
    const slider = selectedDiv.querySelector('.slider');
    const sliderValue = selectedDiv.querySelector('.slider-value');
    slider.value = qty;
    sliderValue.textContent = qty;
    
    // Set tag to locked
    const lockIcon = selectedDiv.querySelector('.fa-solid');
    selectedDiv.dataset.locked = 'true';
    lockIcon.classList.add('fa-lock');
    lockIcon.classList.remove('fa-unlock');
  });
  
  // If there is a locked photo, create a div for it
  if (lockedPhoto) {
    createLockedPhotoDiv(lockedPhoto);
  }
  resetTagSelect(filterInput);
};

const handleTagSelection = (selectedTag, filterInput, sourceElement = null) => {
  if (selectedTags.includes(selectedTag)) {
    removeTag(selectedTag);
    resetTagSelect(filterInput);
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
  const [slider, sliderValue] = createSlider(selectedTag);
  const tagName = createTagName(selectedTag);
  const lockToggle = createLockToggle(selectedDiv);
  const removeBtn = createRemoveBtn(selectedDiv, removeTag); // using removeTag() in place of callback here
  
  // Append elements
  const sliderTagDiv = appendToNewDiv('slider-tag-div center', [slider, sliderValue, tagName]);
  const iconDiv = appendToNewDiv('icon-div center', [lockToggle, removeBtn]);
  
  selectedDiv.appendChild(sliderTagDiv);
  selectedDiv.appendChild(iconDiv);
  selectedTagsWrapper.appendChild(selectedDiv);
  
  return selectedDiv;
};

const removeTag = (selectedTag) => {
  console.log('removeTag called...');

  // Removes all references of a locked photo from the DOM and database
  removeLockedPhoto(selectedTag);
  
  // Remove the tag from the selectedTags array
  selectedTags = selectedTags.filter(tag => tag !== selectedTag);
  
  // Remove the tag from the selected-tags-wrapper
  const selectedDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
  if (selectedDiv) {
    console.log('Tag removed from database...');
    toggleLockedTags(false, selectedTag); // Removes tag from database
    selectedDiv.remove(); // Removes tag from DOM after it's removed from the database
    console.log('Tag removed from DOM...')
  } else {
    console.log('Tag not found in database or DOM...');
  }
  
  // Deselect the tag in the tags-list
  const tagSpan = Array.from(document.querySelectorAll('.tag .name')).find(span => span.textContent === selectedTag);
  if (tagSpan) {
    tagSpan.classList.remove('selected');
  }
  toggleBorders();
}

const clearSelectedTags = (removeLockedTags = false) => {
  console.log('clearSelectedTags called...');
  let selectedDivs = Array.from(document.querySelectorAll('.selected-div'));
  
  selectedDivs.forEach((div) => {
    if (removeLockedTags || div.dataset.locked !== 'true') {
      removeTag(div.dataset.tag); // Removes tag from DOM and database
    }
  });
  
  // Filter selectedTags array to only include locked tags
  selectedTags = selectedTags.filter(tag => !removeLockedTags || tag.locked);
  
  // Check if there are any locked tags
  const lockedTags = selectedTags.filter(tag => tag.locked);
  
  // Clear locked tags from database if removeLockedTags is true
  if (removeLockedTags && lockedTags.length > 0) {
    console.log('Clearing locked tags from database...')
    toggleLockedTags(false); 
  } else if (lockedTags.length > 0) {
    console.log('Keeping locked tags on database...')
    toggleLockedTags(true);
  };
  
  toggleBorders();
};

// Reset dropdown, filterInput and tags in tagsList
const resetTagSelect = (filterInput) => {
  // dropdown.selectedIndex = 0;
  const tags = document.querySelectorAll(".tag");
  tags.forEach(tag => tag.classList.remove("hide")); 
  filterInput.value = "";
}

// Toggle borders on selected tags wrapper
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

removeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('Remove button clicked..');
    const selectedTag = btn.parentElement.dataset.tag;
    removeTag(selectedTag);
  });
});

const removeLockedPhoto = async (selectedTag, lockedPhoto) => {
  console.log('removeLockedPhoto called...');
  if (!selectedTag || !lockedPhoto) {
    console.log('Selected tag or locked photo is undefined or null');
    return;
  }
  console.log('Selected tag:', selectedTag); // not logging out
  console.log('Locked photo:', lockedPhoto); // not logging out
  
  if (lockedPhoto && selectedTag === lockedPhoto.photoData._id) {
    // Remove the photo from the database
    await toggleLockedPhoto(lockedPhoto.photoData._id, selectedTag, false);
    
    // Remove the photo from the DOM
    const photoElement = Array.from(document.getElementsByClassName('image')).find(img => img.photoData._id === selectedTag);
    if (photoElement) {
      console.log('Removing photo from DOM...');
      photoElement.classList.remove('locked-photo');
    }
    
    // Remove the locked photo div from the selectedTagsWrapper
    const lockedPhotoDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
    if (lockedPhotoDiv) {
      console.log('Removing locked photo div...');
      lockedPhotoDiv.remove();
    }
  }
  console.log('Hiding locked photo container and toggling borders...');
  lockedPhotoBtn.classList.add('hide');
  toggleBorders();
  
  return null; // Return null to reset lockedPhoto
};

const createLockedPhotoDiv = (lockedPhoto) => {
  console.log('createLockedPhotoDiv called...');
  console.log('SelectedTagsWrapper:', selectedTagsWrapper);
  
  const selectedDiv = document.createElement('div');
  selectedDiv.classList.add('selected-div', 'center');
  selectedDiv.dataset.tag = lockedPhoto.photoData._id; 
  
  const tagText = document.createElement('span');
  tagText.classList.add('tag-text', 'center');
  tagText.innerHTML = "Image tag locked:";
  
  const tagName = document.createElement('span');
  tagName.classList.add('name', 'center');
  tagName.textContent = lockedPhoto.tag; 
  
  const removeBtn = createRemoveBtn(selectedDiv, removeLockedPhoto);
  
  const tagNameDiv = appendToNewDiv('locked-photo-name center', [tagText, tagName]);
  
  selectedDiv.appendChild(tagNameDiv);
  selectedDiv.appendChild(removeBtn);  
  selectedTagsWrapper.prepend(selectedDiv);
  console.log('Locked photo div added to selected tags wrapper, Locked photo btn shown, borders toggled...');
  toggleBorders();
};

lockedPhotoBtn.addEventListener('click', () => {
  if (lockedPhoto) {
    removeLockedPhoto(lockedPhoto.photoData._id, lockedPhoto);
  }
});

// Export to flashcards.js
export {
  loadSavedTags, // loadSavedTags(filterInput)
  handleTagSelection, // handleTagSelection(selectedTag, filterInput, sourceElement = null)
  createSelectedDiv, // createSelectedDiv(selectedTag)
  clearSelectedTags, // clearSelectedTags(removeLockedTags = false)
  resetTagSelect, // resetTagSelect(filterInput)
  toggleBorders, // toggleBorders()
  removeLockedPhoto, // Export to photos.js // removeLockedPhoto(selectedTag)
};
