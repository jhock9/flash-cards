const selectedTagsWrapper = document.querySelector('#selected-tags-wrapper');
const removeBtns = document.querySelectorAll('.remove-btn');
let selectedTags = [];

import {
  createSlider, 
  createTagName, 
  createLockToggle, 
  createRemoveBtn, 
  appendToNewDiv,
} from './createSelectedTags.js';
import { lockedTags } from './saveData.js';

// Load and render locked tags from local storage
const loadRenderLockedTags = () => {
  console.log('loadRenderLockedTags called...');
  //! update to use appointmentModel, not localStorage
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


const removeTag = (selectedTag) => {
  console.log('removeTag called...');
  // Remove the tag from the selectedTags array
  selectedTags = selectedTags.filter(tag => tag !== selectedTag);
  
  // Remove the tag from the selected-tags-wrapper
  const selectedDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
  if (selectedDiv) {
    selectedDiv.remove();
    lockedTags(false);
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
    lockedTags(false);
  } else {
    console.log('Saving locked tags to local storage...')
    lockedTags(true);
  };
  
  toggleBorders();
};

// Reset dropdown, filterInput and tags in tagsList
const resetTagSelect = () => {
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
  clearSelectedTags, createSelectedDiv, handleTagSelection, loadRenderLockedTags, resetTagSelect
};
