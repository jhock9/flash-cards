const displayedImages = document.querySelector('#images-container');
const lockedPhotoBtn = document.querySelector('#locked-photo-btn');
let lockedPhoto;
let unlockedPhotoId;

import {
  addPhotos, // addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal)
  addRemainingPhotos, // addRemainingPhotos(photos, selectedPhotoIds, filteredPhotos, remainingPhotos)
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTags, // processTags(photos, selectedTagsAndQuantities, selectedPhotoIds)
  shuffleArray, // shuffleArray(array)
} from './photoHelpers.js';
import { toggleLockedPhoto } from './saveData.js'; // toggleLockedPhoto(selectedTag, tag, save = true)
import { removeLockedPhoto } from './selectedTagsAndPhotos.js'; // removeLockedPhoto(photoId, lockedPhoto, tag)

// Fetch photos data from database
const fetchPhotosData = async (tags) => {
  console.log('Fetching photos data...');
  try {
    const response = await fetch('/photos/get-photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags: tags || [] }),
    });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const photos = await response.json();
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

const filterPhotosByTags = async (photos, selectedTagsAndQuantities, totalPhotos, useRemainder) => {
  console.log('filterPhotosByTags called...');
  
  console.log('photos length:', photos.length);
  console.log('selectedTagsAndQuantities:', selectedTagsAndQuantities);
  console.log('totalPhotos:', totalPhotos);
  console.log('useRemainder:', useRemainder);
  
  let filteredPhotos = [];
  let selectedPhotoIds = new Set(); // Keep track of the selected photo IDs
  
  // If there is a locked photo, add it to the selectedPhotoIds, otherwise remove it from the photos array
  if (lockedPhoto) {
    selectedPhotoIds.add(lockedPhoto.photoData._id);
    filteredPhotos.push(lockedPhoto);
  } else if (unlockedPhotoId) {
    photos = photos.filter(photo => photo.photoData._id !== unlockedPhotoId);
    unlockedPhotoId = null; // Reset unlockedPhotoId
  }
  
  // Sum of all photos that are intended to be selected (based on slider values)
  let intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
  console.log('Intended total:', intendedTotal);
  
  // If the intended total exceeds the maximum total of 10, adjust the quantities
  if (intendedTotal > 10) {
    selectedTagsAndQuantities = adjustQuantities(selectedTagsAndQuantities, intendedTotal);
    intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
    console.log('Adjusted quantities:', selectedTagsAndQuantities);
    console.log('Adjusted intended total:', intendedTotal);
  }
  
  // If the intended total is less than the maximum total, add photos based on the tags and quantities
  const photosToAdd = processTags(photos, selectedTagsAndQuantities, selectedPhotoIds);
  console.log('number of Photos to add:', photosToAdd.length);
  addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
  
  // If there are still photos remaining, add them to the filtered photos
  let remainingPhotos = Math.max(0, totalPhotos - intendedTotal);
  console.log('remainingPhotos:', remainingPhotos);
  
  // If 'userRemainder' is true, add any remaining photos to the filtered photos
  if (useRemainder && remainingPhotos > 0) {
    const allPhotos = await fetchPhotosData();
    const photosToAdd = addRemainingPhotos(allPhotos, selectedPhotoIds, filteredPhotos, remainingPhotos);
    console.log('number of additional Photos to add:', photosToAdd.length);
    console.log('number of filteredPhotos to add:', filteredPhotos.length);
    addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal);
  }
  
  // Slice the array based on 'totalPhotos'
  if (totalPhotos > 0) {
    console.log('Slicing filtered photos to total photos...');
    filteredPhotos = filteredPhotos.slice(0, totalPhotos);
  }
  
  shuffleArray(filteredPhotos);
  console.log('Final filtered photos count:', filteredPhotos.length);
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
    img.onerror = () => {
      console.log(`Failed to load image with ID: ${filteredPhotos[i].photoData._id} and URL: ${filteredPhotos[i].photoData.baseUrl}`);
      // Optionally, replace with a placeholder image or display an error message
    };
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
    
    // If another photo is already locked and it's not the one being clicked, unlock it
    if (lockedPhoto && lockedPhoto.photoData._id !== img.photoData._id) {
      console.log('Another photo is already locked, unlocking it...');
      if (lockedPhoto.classList) {
        lockedPhoto.classList.toggle('locked-photo');
      }
      // Remove the locked photo div from the selectedTagsWrapper, set lockedPhoto to null
      await removeLockedPhoto(lockedPhoto.photoData._id, lockedPhoto, lockedPhoto.tag);
    }
    // Toggle the lock status of the clicked photo
    const save = !img.classList.contains('locked-photo');
    if (save) {
      console.log('Toggling lock status of clicked photo...');
      await toggleLockedPhoto(img.photoData._id, img.tag, save);
      img.classList.toggle('locked-photo');
      lockedPhoto = {photoData: img.photoData, tag: img.tag};
      lockedPhotoBtn.classList.remove('hide');
    } else {
      await removeLockedPhoto(img.photoData._id, lockedPhoto, img.tag);
      unlockedPhotoId = img.photoData._id;
    }
  });
};

// Set the locked photo (savedPhoto parameter used for loadSelectedDivs() in selectedTagsAndPhotos.js)
const setLockedPhoto = (savedPhoto) => {
  if (savedPhoto && savedPhoto.length > 0) {
    lockedPhoto = {
      photoData: savedPhoto[0].photo, // photo schema data
      tag: savedPhoto[0].selectedTag // tag name
    };
  } else {
    lockedPhoto = null;
  }
};

// Export to flashcards.js and selectedTagsAndPhotos.js
export {
  displayPhotos, // displayPhotos(filteredPhotos)
  fetchPhotosData, // fetchPhotosData(tags)
  filterPhotosByTags, // filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder)
  lockedPhoto, // Export to selectedTagsAndPhotos.js // global variable
  setLockedPhoto, // setLockedPhoto(savedPhoto)
};

