// Get the appointment data from the URL and initialize the page
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
const appointmentId = appointmentData._id;

// Save or remove locked tags from database
const toggleLockedTags = async (save = true) => {
  console.log('toggleLockedTags called...');
  
  // Get locked tags
  const savedTag = Array.from(document.querySelectorAll('.selected-div'))
    .filter(selectedDiv => selectedDiv.dataset.locked === 'true')
    .map(selectedDiv => {
      return { 
        name: selectedDiv.dataset.tag, 
        qty: parseInt(selectedDiv.querySelector('.slider').value), 
        locked: true 
      };
    }) || []; 
    // '|| []' ensures 'savedTag' is an array. It defaults to an empty array if no 
    // '.selected-div' elements with 'dataset.locked === 'true'' are found.
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

const savePhoto = (photoId, appointmentId) => {
  console.log('savePhoto called...');
  // This function should send a request to the server to save a photo. 
};

// TODO: Update the frontend code to visually indicate when a photo is locked. 
// This could be done by adding a CSS class to the photo element when it's clicked.


const saveAppointment = (appointmentId, savedTags, savedPhotos) => {
  console.log('saveAppointment called...');
  // This function should send a request to the server to save the appointment. 
};

// Export to selectedTags.js
export { 
  toggleLockedTags,  // Also to createSelectedTags.js // toggleLockedTags(save = true)
  savePhoto, // savePhoto(photoId, appointmentId) 
  saveAppointment, // saveAppointment(appointmentId, savedTags, savedPhotos)
};
