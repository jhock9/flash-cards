// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

const selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');
const removeBtns = document.querySelectorAll('.remove-btn');
let selectedTags = [];

import {
  createSlider,
  createTagName, // createTagName(selectedTag)
  createLockToggle, // createLockToggle(selectedDiv)
  createRemoveBtn, // createRemoveBtn(selectedDiv, removeTag)
  appendToNewDiv, // appendToNewDiv(classList, elements)
} from './createSelectedTags.js';
import { toggleLockedTags } from './saveData.js'; // toggleLockedTags(save = true) 

// Load saved tags
const loadSavedTags = async (filterInput) => {
  console.log('loadSavedTags called...');
  const response = await fetch(`/appointment/${appointmentId}/load-tags`);
  const data = await response.json();
  const savedTags = data.savedTags;
  console.log(savedTags);
  
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
  const [slider, sliderValue] = createSlider();
  const tagName = createTagName(selectedTag);
  const lockToggle = createLockToggle(selectedDiv);
  const removeBtn = createRemoveBtn(selectedDiv, removeTag);
  
  // Append elements
  const sliderTagDiv = appendToNewDiv('slider-tag-div center', [slider, sliderValue, tagName]);
  const iconDiv = appendToNewDiv('icon-div center', [lockToggle, removeBtn]);
  
  selectedDiv.appendChild(sliderTagDiv);
  selectedDiv.appendChild(iconDiv);
  
  selectedTagsWrapper.appendChild(selectedDiv);
  
  return selectedDiv;
};

const removeTag = (selectedTag, removeFromDatabase = true) => {
  // removeFromDatabase parameter only used in clearSelectedTags()
  console.log('removeTag called...');
  // Remove the tag from the selectedTags array
  selectedTags = selectedTags.filter(tag => tag !== selectedTag);
  
  // Remove the tag from the selected-tags-wrapper
  const selectedDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
  if (selectedDiv) {
    selectedDiv.remove(); // Removes tag from DOM
    console.log('Tag removed from DOM...')
    if (removeFromDatabase && selectedDiv.dataset.locked === 'true') {
      console.log('Removing tag from database...')
      toggleLockedTags(false); // Removes tag from database
    }
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
  
  // Remove tags if 1) removeLockedTags is true or 2) if the tag is not locked 
  selectedDivs.forEach((div) => {
    if (removeLockedTags || div.dataset.locked !== 'true') {
      removeTag(div.dataset.tag, false); // Removes tag from DOM 
    }
  });
  
  // Filter selectedTags array to only include locked tags
  selectedTags = selectedTags.filter(tag => !removeLockedTags || tag.locked);
  // Check if there are any locked tags
  const lockedTags = selectedTags.filter(tag => tag.locked);
  console.log('Locked tags:', lockedTags);
  
  // Clear locked tags from database if removeLockedTags is true
  if (removeLockedTags && lockedTags.length > 0) {
    console.log('Clearing locked tags from database...')
    toggleLockedTags(false); 
  } else if (lockedTags.length > 0) {
    console.log('Saving locked tags to database...')
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

// Export to flashcards.js
export {
  loadSavedTags, // loadSavedTags(filterInput)
  handleTagSelection, // handleTagSelection(selectedTag, filterInput, sourceElement = null)
  createSelectedDiv, // createSelectedDiv(selectedTag)
  clearSelectedTags, // clearSelectedTags(removeLockedTags = false)
  resetTagSelect, // resetTagSelect(filterInput)
  toggleBorders, // toggleBorders()
};
