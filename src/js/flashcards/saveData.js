// Get the appointment data from the URL
const urlParams = new URLSearchParams(window.location.search);
const appointmentData = JSON.parse(decodeURIComponent(urlParams.get('appointment')));
// Use appointmentData to initialize the page

// Save or remove locked tags from local storage
const lockedTags = (save = true) => {
  console.log('lockedTags called...');
  if (save) {
    // Save locked tags to local storage
    const lockedTags = Array.from(document.querySelectorAll('.selected-div'))
      .filter(selectedDiv => selectedDiv.dataset.locked === 'true')
      .map(selectedDiv => {
        return { tag: selectedDiv.dataset.tag, quantity: selectedDiv.querySelector('.slider').value };
      });
    //! update to use appointmentModel, not localStorage
    localStorage.setItem('lockedTags', JSON.stringify(lockedTags));
  } else {
    // Remove locked tags from local storage
    //! update to use appointmentModel, not localStorage
    localStorage.removeItem('lockedTags');
  }
};

export { lockedTags };