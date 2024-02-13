let googleTags;

// Fetch tags data from database
const fetchTagsData = async () => {
  console.log('Fetching google tags...');
  try {
    const response = await fetch('/photos/get-tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const responseText = await response.text();
    googleTags = JSON.parse(responseText);
    return googleTags;
  } catch (error) {
    console.error('Error fetching google tags:', error);
  }
};

const displayTags = async (tagsList) => {
  console.log('Displaying tags...');
  try {
    const filteredTags = await fetchTagsData();
    
    tagsList.innerHTML = '';
    
    for (const tag of filteredTags) {
      const tagDiv = document.createElement('div');
      tagDiv.classList.add('tag', 'center');
      const tagName = document.createElement('span');
      tagName.classList.add('name', 'center');
      tagName.innerText = tag;
      tagDiv.appendChild(tagName);  
      tagsList.appendChild(tagDiv);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Export to flashcards.js
export { displayTags }; // displayTags(tagsList)