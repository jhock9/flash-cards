const displayedImages = document.querySelector('#images-container');

import { lock } from '../../../server/routes/appointmentRoutes.js';
import savePhoto from './saveData.js';

// TODO: Add an event listener to each photo that calls savePhoto() when the photo is clicked
// integrate this with the displayPhotos function?
// Add a green border to the photo around the selected photo. need to add a new css class?? '.selected-photo'??
// If a user selects a different photo, then the saved photo is immediately updated to the new selection.
// If a user clicks on the same photo, then the saved photo is removed.

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
  
  // If the intended total exceeds the maximum total of 10, adjust the quantities
  if (intendedTotal > 10) {
    selectedTagsAndQuantities = selectedTagsAndQuantities.map(({ tag, quantity }) => {
      const proportion = quantity / intendedTotal;
      const adjustedQuantity = Math.round(proportion * 10);
      return { tag, quantity: adjustedQuantity };
    });
    
    // Recalculate the intended total
    intendedTotal = selectedTagsAndQuantities.reduce((acc, { quantity }) => acc + parseInt(quantity, 10), 0);
  }
  
  // Calculate how many more photos are needed to meet the total
  let remainingPhotos = Math.max(0, totalPhotos - intendedTotal);
  
  // Loop through each tag and quantity
  for (const { tag, quantity } of selectedTagsAndQuantities) {
    
    const selectedPhotos = photos.filter(photo => 
      photo.tagsFromGoogle && photo.tagsFromGoogle.includes(tag) && !selectedPhotoIds.has(photo.googleId));
    
    shuffleArray(selectedPhotos);
    const photosToDisplay = selectedPhotos.slice(0, quantity);
    
    photosToDisplay.forEach(photo => selectedPhotoIds.add(photo.googleId)); // Add selected photo IDs to the Set
    filteredPhotos.push(...photosToDisplay);
  }
  
  // If 'useRemainder' is checked and there are remaining photos to be filled
  if (useRemainder && remainingPhotos > 0) {
    const additionalPhotos = photos.filter(photo => !selectedPhotoIds.has(photo.googleId));
    shuffleArray(additionalPhotos);
    filteredPhotos.push(...additionalPhotos.slice(0, remainingPhotos));
  }
  
  // Finally, slice the array based on 'totalPhotos'
  if (totalPhotos > 0) {
    filteredPhotos = filteredPhotos.slice(0, totalPhotos);
  }
  
  shuffleArray(filteredPhotos);
  // console.log('Filtered photos:', filteredPhotos);
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
    flexBasis = `calc(60% - 2rem)`;
  }
  
  for (let i = 0; i < numPhotos; i++) {
    const img = document.createElement('img');
    img.src = photos[i].baseUrl;
    img.classList.add('image');
    img.style.flexBasis = flexBasis;
    lockPhoto(img);
    displayedImages.appendChild(img);
  }
};

const lockPhoto = (photo) => {
  photo.addEventListener('click', async () => {
    await savePhoto(photo._id); // Assuming photo.src is the unique identifier for the photo
    photo.classList.add('locked-photo'); // Add a class to visually indicate the photo is locked
  });
};

// Export to flashcards.js
export { 
  fetchPhotosData, // fetchPhotosData(tags)
  filterPhotosByTags, // filterPhotosByTags(photos, selectedTagsAndQuantities, totalPhotos, useRemainder)
  displayPhotos, // displayPhotos(photos)
};