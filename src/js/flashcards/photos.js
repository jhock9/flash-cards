const displayedImages = document.querySelector('#images-container');
const lockedPhotoContainer = document.querySelector('#locked-photo-container');
let lockedPhoto = null;

import { toggleLockedPhoto } from './saveData.js';
import {
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTags, // processTags(tag, quantity, photos)
  addRemainingPhotos, // addRemainingPhotos(useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds)
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
  console.log('Initial filtered photos:', filteredPhotos);
  console.log('Intended total:', intendedTotal);
  
  // If the intended total exceeds the maximum total of 10, adjust the quantities
  if (intendedTotal > 10) {
    selectedTagsAndQuantities = adjustQuantities(selectedTagsAndQuantities, intendedTotal);
    intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
    console.log('Adjusted intended total:', intendedTotal);
  }
  
  // If the intended total is less than the maximum total, add photos based on the tags and quantities
  const photosToAdd = processTags(photos, selectedTagsAndQuantities, selectedPhotoIds);
  addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
  console.log('Filtered photos after processing tags:', filteredPhotos);
  
  // If there are still photos remaining, add them to the filtered photos
  let remainingPhotos = Math.max(0, totalPhotos - filteredPhotos.length);
  console.log('Remaining photos:', remainingPhotos);
  
  // If 'userRemainder' is true, add any remaining photos to the filtered photos
  if (useRemainder && remainingPhotos > 0) {
    console.log('Adding remainder...');
    const photosToAdd = addRemainingPhotos(photos, remainingPhotos, totalPhotos, selectedPhotoIds);
    addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
    console.log('Filtered photos after adding remainder:', filteredPhotos);
  }
  
  // Slice the array based on 'totalPhotos'
  if (totalPhotos > 0) {
    console.log('Slicing filtered photos to total photos...');
    filteredPhotos = filteredPhotos.slice(0, totalPhotos);
  }
  console.log('Final filtered photos:', filteredPhotos);
  
  shuffleArray(filteredPhotos);
  return filteredPhotos;
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
    flexBasis = `calc(60% - 2rem)`;
  }
  
  for (let i = 0; i < numPhotos; i++) {
    const img = document.createElement('img');
    img.src = photos[i].baseUrl;
    img.classList.add('image');
    img.style.flexBasis = flexBasis;
    img.photoData = photos[i];
    lockPhoto(img);
    displayedImages.appendChild(img);
    img.classList.remove('locked-photo');
  }
};

const lockPhoto = (photo) => {
  photo.addEventListener('click', async () => {
    // If another photo is already locked, unlock it
    if (lockedPhoto && lockedPhoto !== photo.photoData) {
      await toggleLockedPhoto(photo.photoData._id, false);
      photo.classList.toggle('locked-photo');
    }
    // Toggle the lock status of the clicked photo
    const save = !photo.classList.contains('locked-photo');
    await toggleLockedPhoto(photo.photoData._id, save);
    photo.classList.toggle('locked-photo');
    
    // Update the currently locked photo
    lockedPhoto = save ? photo.photoData : null;
  });
};

lockedPhotoContainer.addEventListener('click', async () => {
  if (lockedPhoto) {
    const savedPhotoId = lockedPhoto._id;
    await toggleLockedPhoto(savedPhotoId, false);
    
    // Find the photo element in the DOM that corresponds to the lockedPhoto
    const photoElement = Array.from(document.getElementsByClassName('image')).find(img => img.photoData._id === savedPhotoId);
    if (photoElement) {
      photoElement.classList.remove('locked-photo');
    }
    
    lockedPhoto = null;
  }
});

// Export to flashcards.js
export {
  fetchPhotosData, // fetchPhotosData(tags)
  filterPhotosByTags, // filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder)
  displayPhotos, // displayPhotos(photos)
};
