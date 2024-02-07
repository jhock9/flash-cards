import { toggleLockedTags } from './saveData.js'; // toggleLockedTags(save = true) 

const createSlider = (selectedTag) => {
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 1;
  slider.max = 6;
  slider.value = 1;
  slider.classList.add('slider');
  
  const sliderValue = document.createElement('span');
  sliderValue.classList.add('slider-value');
  sliderValue.innerHTML = slider.value;
  slider.oninput = () => {
    sliderValue.innerHTML = slider.value;
    const selectedDiv = document.querySelector(`.selected-div[data-tag="${selectedTag}"]`);
    if (selectedDiv && selectedDiv.dataset.locked === 'true') {
      toggleLockedTags(true, selectedTag);
    } 
  };
  
  return [slider, sliderValue];
};

const createTagName = (selectedTag) => {
  const tagName = document.createElement('span');
  tagName.classList.add('name', 'center');
  tagName.textContent = selectedTag;
  return tagName;
};

const createLockToggle = (selectedDiv) => {
  const lockToggle = document.createElement('button');
  lockToggle.type = 'button';
  lockToggle.classList.add('lock-toggle', 'center');
  
  const lockIcon = document.createElement('i');
  lockIcon.classList.add('fa-solid', 'fa-unlock');
  lockToggle.appendChild(lockIcon);
  
  lockToggle.addEventListener('click', () => {
    toggleLock(selectedDiv, lockIcon);
  });
  
  return lockToggle;
};

const toggleLock = (selectedDiv, lockIcon) => {
  const isLocked = selectedDiv.dataset.locked === 'true';
  selectedDiv.dataset.locked = isLocked ? 'false' : 'true';
  const selectedTag = selectedDiv.dataset.tag;
  toggleLockedTags(!isLocked, selectedTag);
  lockIcon.classList.toggle('fa-lock');
  lockIcon.classList.toggle('fa-unlock');
};

const createRemoveBtn = (selectedDiv, callback, lockedPhoto) => {
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('remove-btn', 'center');
  
  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fa-solid', 'fa-trash-can');
  removeBtn.appendChild(removeIcon);
  
  removeBtn.addEventListener('click', () => {
    const selectedTag = selectedDiv.dataset.tag;
    callback(selectedTag, lockedPhoto);
  });
  
  return removeBtn;
};

const appendToNewDiv = (classList, elements) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add(...classList.split(' '));
  elements.forEach(el => newDiv.appendChild(el));
  return newDiv;
};

// Export to selectedTags.js
export {
  createSlider, // createSlider(selectedTag) 
  createTagName, // createTagName(selectedTag)
  createLockToggle, // createLockToggle(selectedDiv)
  createRemoveBtn, // createRemoveBtn(selectedDiv, callback)
  appendToNewDiv, // appendToNewDiv(classList, elements)
};
