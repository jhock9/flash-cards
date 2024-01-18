// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

// Save or remove locked tags from database
const toggleLockedTags = async (save = true, tag = null) => {
  console.log('toggleLockedTags called...');
  console.log(`toggleLockedTags called with save=${save} and tag=${tag}...`);
  
  let savedTag = [];
  
  // If a specific tag is provided, only save or remove that tag
  if (tag) {
    const selectedDiv = document.querySelector(`.selected-div[data-tag="${tag}"]`);
    if (selectedDiv) {
      console.log(`Found selectedDiv for ${tag}...`);
      const sliderValue = parseInt(selectedDiv.querySelector('.slider').value);
      console.log(`Slider value for ${selectedDiv.dataset.tag}:`, sliderValue);
      savedTag.push({ 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: selectedDiv.dataset.locked === 'true' 
      });
    } else {
      console.log(`Did not find selectedDiv for ${tag}...`);
    }
  } else {
    // If no specific tag is provided, save or remove all locked tags
    savedTag = Array.from(document.querySelectorAll('.selected-div'))
    .filter(selectedDiv => selectedDiv.dataset.locked === 'true')
    .map(selectedDiv => {
      const sliderValue = parseInt(selectedDiv.querySelector('.slider').value);
      console.log(`Slider value for ${selectedDiv.dataset.tag}:`, sliderValue);
      return { 
        name: selectedDiv.dataset.tag, 
        qty: sliderValue, 
        locked: true 
      };
    }) || []; 
    // '|| []' ensures 'savedTag' is an array. It defaults to an empty array if no 
    // '.selected-div' elements with 'dataset.locked === 'true'' are found.
  }
    
  console.log('savedTag:', savedTag);
    
  if (save) {
    // Save tags to the database
    console.log('Saving tags to the database...');
    const response = await fetch(`/appointment/${appointmentId}/save-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedTag: savedTag }),
    });
    const result = await response.json();
    console.log('Save tags response:', result);
  } else {
    // Remove saved tags from the database
    console.log('Removing tags from the database...');
    console.log('Removing tags:', savedTag);
    const response = await fetch(`/appointment/${appointmentId}/remove-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedTag: savedTag }),
    });
    const result = await response.json();
    console.log('Remove tags response:', result);
  }
};

//!! Update this to save AND remove photos, much like toggleLockedTags()
const toggleLockedPhoto = async (photoId, save = true) => {
  console.log('toggleLockedPhoto called...');
  // Limit to only one photo saved per appointment or now, but could be increased in later versions.
  try {
    const response = await fetch(`/appointment/${appointmentId}/${save ? 'save-photo' : 'remove-photo'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photo: photoId }),
    });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    console.log(save ? 'Photo saved successfully' : 'Photo removed successfully');
  } catch (error) {
    console.error('Error saving photo:', error);
  }
};


export {
  toggleLockedPhoto, toggleLockedTags
};

