// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

const lockedPhotoContainer = document.querySelector('#locked-photo-container'); 

// Save or remove locked tags from database
const toggleLockedTags = async (save = true, tag = null) => {
  console.log('toggleLockedTags called...');
  
  let savedTag = [];
  
  if (tag) {
    // If a specific tag is provided, only save or remove that tag
    console.log('Specific tag provided...');
    const selectedDiv = document.querySelector(`.selected-div[data-tag="${tag}"]`);
    if (selectedDiv) {
      console.log('Found selectedDiv...');
      const sliderValue = parseInt(selectedDiv.querySelector('.slider').value);
      savedTag.push({ 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: selectedDiv.dataset.locked === 'true' 
      });
    } else {
      console.log('No selectedDiv found...');
    }
  } else {
    // If no specific tag is provided, save or remove all locked tags
    console.log('No specific tag provided...');
    savedTag = Array.from(document.querySelectorAll('.selected-div'))
    .filter(selectedDiv => selectedDiv.dataset.locked === 'true')
    .map(selectedDiv => {
      const sliderValue = parseInt(selectedDiv.querySelector('.slider').value);
      return { 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: true 
      };
    }) || []; 
    // '|| []' ensures 'savedTag' is an array. It defaults to an empty array if no 
    // '.selected-div' elements with 'dataset.locked === 'true'' are found.
  }
    
  if (save) {
    // Save tags to the database
    console.log('Saving tags to the database...');
    await fetch(`/appointment/${appointmentId}/save-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedTag: savedTag }),
    });
  } else {
    // Remove saved tags from the database
    console.log('Removing tags from the database...');
    await fetch(`/appointment/${appointmentId}/remove-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedTag: savedTag }),
    });
  }
};

const toggleLockedPhoto = async (photoId, save = true) => {
  // console.log('toggleLockedPhoto called...');
  console.log('toggleLockedPhoto called with photoId:', photoId, 'and save:', save);

  // Limit to only one photo saved per appointment or now, but could be increased in later versions.
  try {
    const response = await fetch(`/appointment/${appointmentId}/${save ? 'save-photo' : 'remove-photo'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId: photoId }),
    });
    
    if (save) {
      lockedPhotoContainer.classList.remove('hide');
    } else {
      lockedPhotoContainer.classList.add('hide');
    };
    const data = await response.json();
    console.log('Response from server:', data);
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    };

    console.log(save ? 'Photo saved successfully' : 'Photo removed successfully');
  } catch (error) {
    console.error('Error saving photo:', error);
  }
};

// Export to saveData.js
export {
  toggleLockedPhoto, // toggleLockedPhoto(photoId, save = true)
  toggleLockedTags, // also to createSelectedTags.js, selectedTags.js // toggleLockedTags(save = true, tag = null)
};

