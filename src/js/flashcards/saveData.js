// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

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
      console.log(`sliderValue: ${sliderValue}`); // Log sliderValue
      savedTag.push({ 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: selectedDiv.dataset.locked === 'true' 
      });
      console.log(`savedTag: ${JSON.stringify(savedTag)}`); // Log savedTag
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
      console.log(`sliderValue: ${sliderValue}`); // Log sliderValue
      return { 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: true 
      };
    }) || []; 
    console.log(`savedTag: ${JSON.stringify(savedTag)}`); // Log savedTag

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

const toggleLockedPhoto = async (photoId, selectedTag, save = true) => {
  // console.log('toggleLockedPhoto called...');
  const action = save ? 'save-photo' : 'remove-photo';
  console.log('toggleLockedPhoto called with photoId:', photoId, 'and save:', save);
  
  // Limit to only one photo saved per appointment or now, but could be increased in later versions.
  try {
    const response = await fetch(`/appointment/${appointmentId}/${action}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoId: photoId, selectedTag: selectedTag }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    };
    await response.json();
    
    console.log(`Photo ${action} successfully`);
  } catch (error) {
    console.error(`Error in ${action} photo:`, error);
  }
};

export {
  toggleLockedTags, // Export to createSelectedTags.js, selectedTags.js // toggleLockedTags(save = true, tag = null)
  toggleLockedPhoto, // Export to photoHelpers.js // toggleLockedPhoto(photoId, save = true)
};
