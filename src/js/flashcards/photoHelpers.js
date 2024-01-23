const adjustQuantities = (selectedTagsAndQuantities, intendedTotal) => {
  console.log('Adjusting quantities...');
  return selectedTagsAndQuantities.map(({ tag, quantity }) => {
    const proportion = quantity / intendedTotal;
    const adjustedQuantity = Math.round(proportion * 10);
    return { tag, quantity: adjustedQuantity };
  });
};

const processTag = (tag, quantity, photos, selectedPhotoIds, lockedPhoto) => {
  console.log('Processing tag and qty...');
  // Filter photos by tag and exclude already selected photos
  let photosByTag = photos.filter(photo => photo.tagsFromGoogle.includes(tag) && !selectedPhotoIds.has(photo.googleId));
  
  // If a photo is locked and it has the same tag, add it to the photos
  if (lockedPhoto && lockedPhoto.tagsFromGoogle.includes(tag)) {
    photosByTag.push(lockedPhoto);
  }
  
  shuffleArray(photosByTag);
  const newPhotos = photosByTag.slice(0, quantity);
  
  return newPhotos;
};

const addRemainingPhotos = (useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds) => {
  if (!useRemainder) {
    return [];
  }

  const additionalPhotos = photos.filter(photo => !selectedPhotoIds.has(photo.googleId));
  shuffleArray(additionalPhotos);
  
  return additionalPhotos.slice(0, Math.min(remainingPhotos, totalPhotos - selectedPhotoIds.size));
};

const shuffleArray = (array) => {
  console.log('Shuffling array...');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  return array;
};

// Exported to photos.js
export {
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTag, // processTag(tag, quantity, photos, selectedPhotoIds, lockedPhoto)
  addRemainingPhotos, // addRemainingPhotos(useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds)
  shuffleArray, // shuffleArray(array)
};
