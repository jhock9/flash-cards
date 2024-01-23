const adjustQuantities = (selectedTagsAndQuantities, intendedTotal) => {
  console.log('Adjusting quantities...');
  return selectedTagsAndQuantities.map(({ tag, quantity }) => {
    const proportion = quantity / intendedTotal;
    const adjustedQuantity = Math.round(proportion * 10);
    return { tag, quantity: adjustedQuantity };
  });
};

const processTag = (tag, quantity, photos) => {
  console.log('Processing tag and qty...');
  // Filter photos by tag
  let photosByTag = photos.filter(photo => photo.tagsFromGoogle.includes(tag));
  
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

const addPhotos = (newPhotos, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal) => {
  newPhotos.forEach(photo => {
    // Add the photo to filteredPhotos and update selectedPhotoIds
    selectedPhotoIds.add(photo.googleId);
    filteredPhotos.push(photo);
  });
  
  // If the locked photo is not in the new photos, add it
  if (lockedPhoto && !filteredPhotos.includes(lockedPhoto)) {
    const sameTagIndex = filteredPhotos.findIndex(photo => photo.tagsFromGoogle.includes(lockedPhoto.tagsFromGoogle[0]));
    if (sameTagIndex !== -1) {
      // Replace the photo with the same tag with the locked photo
      const removedPhoto = filteredPhotos.splice(sameTagIndex, 1, lockedPhoto)[0];
      selectedPhotoIds.delete(removedPhoto.googleId);
      selectedPhotoIds.add(lockedPhoto.googleId);
    } else {
      // Add the locked photo to the filteredPhotos array
      selectedPhotoIds.add(lockedPhoto.googleId);
      filteredPhotos.unshift(lockedPhoto);
    }
  }
  
  // If the total number of photos exceeds the intended total, remove a photo
  if (filteredPhotos.length > intendedTotal) {
    const removedPhoto = filteredPhotos.pop();
    selectedPhotoIds.delete(removedPhoto.googleId);
  }
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
  processTag, // processTag(tag, quantity, photos)
  addRemainingPhotos, // addRemainingPhotos(useRemainder, remainingPhotos, totalPhotos, photos, selectedPhotoIds)
  addPhotos, // addPhotos(newPhotos, selectedPhotoIds, filteredPhotos, lockedPhoto)
  shuffleArray, // shuffleArray(array)
};
