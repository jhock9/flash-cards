// Adjust quantities based on the intended total and a maximum allowed value
const adjustQuantities = (selectedTagsAndQuantities, intendedTotal) => {
  console.log('Adjusting quantities...');
  return selectedTagsAndQuantities.map(({ tag, quantity }) => {
    const proportion = quantity / intendedTotal;
    return { tag, quantity: Math.round(proportion * 10) };
  });
};

// Process the tags and quantities, and add photos to the filteredPhotos array
const processTags = (photos, selectedTagsAndQuantities, selectedPhotoIds) => {
  console.log('Processing tags...');
  const processedPhotos = selectedTagsAndQuantities.flatMap(({ tag, quantity }) => {
    const taggedPhotos = photos.filter(photo =>
      photo.tag?.includes(tag) && !selectedPhotoIds.has(photo.photoData._id)
    );
    shuffleArray(taggedPhotos);
    return taggedPhotos.slice(0, quantity);
  });
  return processedPhotos;
};

// Add photos to the filteredPhotos array and update selectedPhotoIds
const addPhotos = (photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal) => {
  console.log('addPhotos called...');
  
  // If the photo is not already in the filteredPhotos array, add it
  photosToAdd.forEach(photo => {
    // Add the photo to filteredPhotos and update selectedPhotoIds
    if (!selectedPhotoIds.has(photo.photoData._id)) {
      selectedPhotoIds.add(photo.photoData._id);
      filteredPhotos.push(photo);
    }
  });
  
  // If the locked photo is not in the new photos, add it
  if (lockedPhoto && !filteredPhotos.includes(lockedPhoto)) {
    const sameTagIndex = filteredPhotos.findIndex(photo => photo.photoData.tagsFromGoogle.includes(lockedPhoto.photoData.tagsFromGoogle[0]));
    if (sameTagIndex !== -1) {
      // Replace the photo with the same tag with the locked photo
      const removedPhoto = filteredPhotos.splice(sameTagIndex, 1, lockedPhoto)[0];
      selectedPhotoIds.delete(removedPhoto._id);
      selectedPhotoIds.add(lockedPhoto._id);
    } else {
      // Add the locked photo to the filteredPhotos array
      selectedPhotoIds.add(lockedPhoto._id);
      filteredPhotos.unshift(lockedPhoto);
    }
  }
};

// Add remaining photos if 'useRemainder' is checked
const addRemainingPhotos = (allPhotos, selectedPhotoIds, filteredPhotos, remainingPhotos) => {
  console.log('Adding remaining photos...');
  const additionalPhotos = allPhotos.filter(photo => !selectedPhotoIds.has(photo.photoData._id));
  shuffleArray(additionalPhotos);
  const photosToAdd = additionalPhotos.slice(0, remainingPhotos);
  photosToAdd.forEach(photo => {
    if (!selectedPhotoIds.has(photo.photoData._id)) {
      filteredPhotos.push(photo);
      selectedPhotoIds.add(photo.photoData._id);
    }
  });
  return photosToAdd;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Exported to photos.js
export {
  adjustQuantities, // adjustQuantities(selectedTagsAndQuantities, intendedTotal)
  processTags, // processTags(photos, selectedTagsAndQuantities, selectedPhotoIds)
  addRemainingPhotos, // addRemainingPhotos(photos, filteredPhotos, remainingPhotos, selectedPhotoIds)
  addPhotos, // addPhotos(photosToAdd, selectedPhotoIds, filteredPhotos, lockedPhoto, intendedTotal)
  shuffleArray, // shuffleArray(array)
};
