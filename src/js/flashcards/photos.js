const displayedImages = document.querySelector('#images-container');
const lockedPhotoBtn = document.querySelector('#locked-photo-btn');
let lockedPhoto = null;

import { toggleLockedPhoto } from './saveData.js'; // toggleLockedPhoto(photoId, save = true)
import { 
  createRemoveBtn, // createRemoveBtn(selectedDiv, removeTag)
  appendToNewDiv, // appendToNewDiv(classList, elements)
} from './createSelectedTags.js';
import { 
  toggleBorders, // toggleBorders()
  selectedTagsWrapper, // global variable
} from './selectedTags.js';
import {
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTags, // processTags(photos, selectedTagsAndQuantities, selectedPhotoIds)
  addRemainingPhotos, // addRemainingPhotos(photos, filteredPhotos, remainingPhotos, selectedPhotoIds)
  addPhotos, // addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal)
  shuffleArray, // shuffleArray(array)
} from './photoHelpers.js';

// Fetch photos data from database
const fetchPhotosData = async (tags) => {
  console.log('Fetching photos data...');
  try {
    const response = await fetch('/photos/get-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags }),
    });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const photos = await response.json();
    console.log('Photos data fetched...');
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

const filterPhotosByTags = (photos, selectedTagsAndQuantities, totalPhotos, useRemainder) => {
  console.log('filterPhotosByTags called...');
  
  let filteredPhotos = [];
  let selectedPhotoIds = new Set(); // Keep track of the selected photo IDs
  
  // Sum of all photos that are intended to be selected (based on slider values)
  let intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
  console.log('Intended total:', intendedTotal);
  console.log('Total photos:', totalPhotos);
  
  // If the intended total exceeds the maximum total of 10, adjust the quantities
  if (intendedTotal > 10) {
    selectedTagsAndQuantities = adjustQuantities(selectedTagsAndQuantities, intendedTotal);
    intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
  }
  
  // If the intended total is less than the maximum total, add photos based on the tags and quantities
  const photosToAdd = processTags(photos, selectedTagsAndQuantities, selectedPhotoIds);
  addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
  
  // If there are still photos remaining, add them to the filtered photos
  let remainingPhotos = Math.max(0, totalPhotos - filteredPhotos.length);
  console.log('Remaining photos:', remainingPhotos);
  
  // If 'userRemainder' is true, add any remaining photos to the filtered photos
  if (useRemainder && remainingPhotos > 0) {
    const photosToAdd = addRemainingPhotos(photos, filteredPhotos, remainingPhotos, selectedPhotoIds);
    addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
  }
  
  // Slice the array based on 'totalPhotos'
  if (totalPhotos > 0) {
    console.log('Slicing filtered photos to total photos...');
    filteredPhotos = filteredPhotos.slice(0, totalPhotos);
  }
  
  shuffleArray(filteredPhotos);
  return filteredPhotos;
};

const displayPhotos = (filteredPhotos) => {
  console.log('displayPhotos called...');
  displayedImages.innerHTML = '';
  const numPhotos = filteredPhotos.length;
  let flexBasis;
  
  if (numPhotos > 6) {
    flexBasis = `calc((100% / 5) - 2rem)`;
  } else if (numPhotos > 4) {
    flexBasis = `calc((100% / 4) - 2rem)`;
  } else if (numPhotos > 1) {
    flexBasis = `calc((100% / 3) - 2rem)`;
  } else {
    flexBasis = `calc(60% - 2rem)`;
  }
  
  for (let i = 0; i < numPhotos; i++) {
    const img = document.createElement('img');
    img.src = filteredPhotos[i].photoData.baseUrl;
    img.classList.add('image');
    img.style.flexBasis = flexBasis;
    img.photoData = filteredPhotos[i].photoData;
    img.tag = filteredPhotos[i].tag;
    lockPhoto(img);
    displayedImages.appendChild(img);
    img.classList.remove('locked-photo');
  }
};

const lockPhoto = (img) => {
  // Lock or unlock the photo when clicked
  img.addEventListener('click', async () => {
    console.log('Image clicked...');
    // If another photo is already locked, unlock it
    if (lockedPhoto && lockedPhoto.photoData._id !== img.photoData._id) {
      console.log('Another photo is already locked, unlocking it...');
      // Remove the photo from the database
      await toggleLockedPhoto(img.photoData._id, img.tag, false);
      img.classList.toggle('locked-photo');
    }
    // Toggle the lock status of the clicked photo
    const save = !img.classList.contains('locked-photo');
    console.log('Toggling lock status of clicked photo...');
    await toggleLockedPhoto(img.photoData._id, img.tag, save);
    img.classList.toggle('locked-photo');
    
    // Update the currently locked photo 
    lockedPhoto = save ? {photoData: img.photoData, tag: img.tag} : null;
    
    if (save) {
      console.log('Creating saved photo div...');
      // lockedPhotoBtn.classList.add('hide');
      createSavedPhotoDiv(lockedPhoto);
    } else {
      console.log('Removing locked photo...');
      // lockedPhotoBtn.classList.remove('hide');
      removeLockedPhoto(img.photoData._id);
    }
  });
};

lockedPhotoBtn.addEventListener('click', () => {
  if (lockedPhoto) {
    removeLockedPhoto(lockedPhoto.photoData._id);
  }
});

const removeLockedPhoto = async (selectedTag) => {
  console.log('removeLockedPhoto called...');
  
  if (lockedPhoto && selectedTag === lockedPhoto.photoData._id) {
    // Remove the photo from the database
    await toggleLockedPhoto(lockedPhoto.photoData._id, selectedTag, false);
    
    // Remove the photo from the DOM
    const photoElement = Array.from(document.getElementsByClassName('image')).find(img => img.photoData._id === selectedTag);
    if (photoElement) {
      console.log('Removing photo from DOM...');
      photoElement.classList.remove('locked-photo');
    }
    
    // Remove the saved photo div from the selectedTagsWrapper
    const savedPhotoDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
    if (savedPhotoDiv) {
      console.log('Removing saved photo div...');
      savedPhotoDiv.remove();
    }
    lockedPhoto = null;
  }
  console.log('Hiding locked photo container and toggling borders...');
  lockedPhotoBtn.classList.add('hide');
  toggleBorders();
};

const createSavedPhotoDiv = (lockedPhoto) => {
  const selectedDiv = document.createElement('div');
  selectedDiv.classList.add('selected-div', 'center');
  selectedDiv.dataset.tag = lockedPhoto.photoData._id; 
  
  const tagName = document.createElement('span');
  tagName.classList.add('name', 'center');
  tagName.textContent = lockedPhoto.tag; 
  
  const tagText = document.createElement('span');
  tagText.classList.add('tag-text', 'center');
  tagText.innerHTML = "Image saved:";
  
  const thumbnail = document.createElement('img');
  thumbnail.src = lockedPhoto.photoData.baseUrl;
  thumbnail.classList.add('thumbnail', 'center');
  
  const removeBtn = createRemoveBtn(selectedDiv, removeLockedPhoto);
  
  const tagNameDiv = appendToNewDiv('saved-photo-name center', [tagName, tagText]);
  const thumbnailDiv = appendToNewDiv('thumbnail-div center', [thumbnail, removeBtn]);
  
  selectedDiv.appendChild(tagNameDiv);
  selectedDiv.appendChild(thumbnailDiv);  
  selectedTagsWrapper.prepend(selectedDiv);
  console.log('Saved photo div created and added to selected tags wrapper...');
  console.log('Locked photo container shown and borders toggled...');
  lockedPhotoBtn.classList.remove('hide');
  toggleBorders();
};

// Export to flashcards.js
export {
  fetchPhotosData, // fetchPhotosData(tags)
  filterPhotosByTags, // filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder)
  displayPhotos, // displayPhotos(filteredPhotos)
  removeLockedPhoto, // Export to selectedTags.js // removeLockedPhoto(selectedTag)
};
