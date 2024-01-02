const flashPanel = document.querySelector('#flash-panel');
const mobileOpenBtn = document.querySelector('#mobile-open-btn');
const tabletOpenBtn = document.querySelector('#tablet-open-btn');
const refreshBtn = document.querySelector('#refresh-btn');
const resetBtn = document.querySelector('#reset-btn');
const randomBtn = document.querySelector('#random-btn');
const submitBtn = document.querySelector('#submit-btn');
const dashboardBtn = document.querySelector('#dashboard-btn');
const totalSlider = document.querySelector('#total-slider');
const totalSliderValue = document.querySelector('#total-slider-value');
const remainder = document.querySelector('#remainder-checkbox');
const filterInput = document.querySelector('#filter-tags');
const tagsList = document.querySelector('#tags-list');

let lastSelectedTagsAndQuantities;
let photos;
let totalPhotos = 0;
let useRemainder = false;
let lastTotalPhotos; 
let lastUseRemainder;

import { logout } from '../components/logout.js';
import { displayTags } from './displayTags.js';
import { 
  loadRenderLockedTags,
  handleTagSelection, // handleTagSelection(selectedTag, sourceElement = null)
  createSelectedDiv, // createSelectedDiv(selectedTag)
  clearSelectedTags, // clearSelectedTags(removeLockedTags = false)
  resetTagSelect,
} from './selectedTags.js';
import { 
  fetchPhotosData, // fetchPhotosData(tags)
  filterPhotosByTags, // filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder)
  displayPhotos, // displayPhotos(photos)
} from './displayPhotos.js';

document.addEventListener('DOMContentLoaded', () => {
  // Logout after 12 hours
  setTimeout(logout, 12 * 60 * 60 * 1000);
});

//**   USER INPUTS TO SELECT PHOTOS TO DISPLAY   **//
// Slider for total number of photos to display
totalSlider.addEventListener('input', () => {
  totalPhotos = parseInt(totalSlider.value, 10);
  lastTotalPhotos = totalPhotos;
  
  // Display 'N/A' when slider value is 0
  totalSliderValue.textContent = totalPhotos === 0 ? 'N/A' : totalPhotos;
  
  // Disable and uncheck remainder tags checkbox if total slider value is 'N/A'
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

  // Reset totalSlider value and remainder checkbox
  totalSlider.value = 0;
  totalSliderValue.textContent = totalSlider.value === 0 ? 'N/A' : totalSlider.value;
  remainder.disabled = true;
  remainder.checked = false;
  useRemainder = false;
  totalSliderValue.classList.add('gray-out');
  remainder.classList.add('gray-out');
  
// Checkbox for app to automatically fill in remaining photos
remainder.addEventListener('change', () => {
  useRemainder = remainder.checked;
  lastUseRemainder = useRemainder;
});

// Search and filter tags
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

// Prevents the form from submitting when the user presses enter
filterInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// Selecting tags from the tags-list
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

const toggleNav = () => {
  console.log('Toggling nav...');
  tabletOpenBtn.classList.toggle('open');
  flashPanel.classList.toggle('open');
  
  if (flashPanel.classList.contains('open')) {
    loadRenderLockedTags();
  } else {
    clearSelectedTags();  
  }
};


//**   BUTTONS   **//

mobileOpenBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  try {
    displayTags();
    toggleNav();
  } catch (error) {
    console.error('Error on open button click:', error);
  }
});

tabletOpenBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  try {
    displayTags();
    toggleNav();
  } catch (error) {
    console.error('Error on open button click:', error);
  }
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
    
    // Directly call the process that would happen on clicking the tag
    const proceed = handleTagSelection(selectedTag);
    if (!proceed) continue;  // If the tag shouldn't be added, skip to the next iteration
    
    const selectedDiv = createSelectedDiv(selectedTag);
    const slider = selectedDiv.querySelector('.slider');
    
    // Set value for slider, considering totalImages
    const sliderValue = Math.min(Math.floor(Math.random() * maxImagesPerTag) + 1, 12 - totalImages);
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
  
  // Fetch photos based on the selected tags
  photos = await fetchPhotosData(selectedTagsAndQuantities.map(({ tag }) => tag));
  
  if (photos) {
    const filteredPhotos = filterPhotosByTags(photos, lastSelectedTagsAndQuantities, totalPhotos, useRemainder);
    displayPhotos(filteredPhotos);
  } else {
    console.error('Photos data is not available. Fetch it first.');
  }
  
  toggleNav();
});



dashboardBtn.addEventListener('click', async (e) => {
  console.log('Dashboard button clicked...');
  e.preventDefault();
  
  //!! save current selections and state to database?
  
  window.location.href = '/dashboard';
});
