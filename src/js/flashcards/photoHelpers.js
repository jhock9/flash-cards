const shuffleArray = (array) => {
  console.log('Shuffling array...');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
};

const adjustQuantities = (selectedTagsAndQuantities, intendedTotal) => {
  return selectedTagsAndQuantities.map(({ tag, quantity }) => {
    const proportion = quantity / intendedTotal;
    const adjustedQuantity = Math.round(proportion * 10);
    return { tag, quantity: adjustedQuantity };
  });
};

const processTag = (tag, quantity, photos, selectedPhotoIds, lockedPhoto) => {
  let adjustedQuantity = quantity;
  
  // If there's a saved photo and it's not already in the filtered photos, include it
  if (lockedPhoto && lockedPhoto.tagsFromGoogle.includes(tag) && !selectedPhotoIds.has(lockedPhoto.googleId)) {
    console.log('Adding locked photo to filtered photos...');
    adjustedQuantity = Math.max(0, quantity - 1);
  }
  
  const selectedPhotos = photos.filter(photo => 
    photo.tagsFromGoogle && photo.tagsFromGoogle.includes(tag) && !selectedPhotoIds.has(photo.googleId));
  
  shuffleArray(selectedPhotos);
  
  return selectedPhotos.slice(0, adjustedQuantity);
};

const addRemainingPhotos = (useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds) => {
  const additionalPhotos = photos.filter(photo => !selectedPhotoIds.has(photo.googleId));
  shuffleArray(additionalPhotos);
  
  return additionalPhotos.slice(0, Math.min(remainingPhotos, totalPhotos - selectedPhotoIds.size));
};

// Exported to photos.js
export {
  shuffleArray, // shuffleArray(array)
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTag, // processTag(tag, quantity, photos, selectedPhotoIds, lockedPhoto)
  addRemainingPhotos, // addRemainingPhotos(useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds)
};
