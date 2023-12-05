const adminViews = document.querySelectorAll('.admin-view');
const navLinks = document.querySelectorAll('#dash-nav-list a');
const logoutBtn = document.querySelector('#logout-btn');
const tableHeaders = document.querySelectorAll('#users-table th');
const signedIn = document.querySelector('#signed-in-wrapper');
const googleSignIn = document.querySelector('#google-signin-wrapper');
const flashcardsModal = document.querySelector('#flashcards-modal');

// 
import { fetchConfig } from './googleAuth.js';

// Show or hide elements based on the user's role
const updateDashNav = async (userRole) => {
  console.log('In updateDashNav, userRole:', userRole);
  for (let view of adminViews) {
    if (userRole === 'admin') {
      view.classList.remove('hide');
      await fetchConfig();
      checkGoogleAuthentication();
    } else {
      view.classList.add('hide');
    }
  }
};

const logout = async () => {
  try {
    console.log('Sending logout request...');
    const response = await fetch('/auth/logout', { method: 'GET' });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


//**   ON LOAD / UNLOAD  **//

window.addEventListener('load', () => {
  console.log('Window loaded...');
  fetch('/session/authenticate')
  .then(response => response.json())
  .then(data => {
    console.log('After /authenticate, response data:', data);
    updateDashNav(data.role);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
  // Logout after 12 hours
  setTimeout(logout, 12 * 60 * 60 * 1000);
});

window.addEventListener('beforeunload', logout);


//**   NAV BAR  **//

// Add event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    
    // Only handle links that navigate to a section on the current page
    if (href.startsWith('#')) {
      event.preventDefault();
      
      // Hide all sections
      const sections = document.querySelectorAll('main section');
      sections.forEach((section) => {
        section.classList.add('hide');
      });
      
      // Show the clicked section
      const sectionId = href.slice(1);
      const section = document.querySelector(`#${sectionId}`);
      section.classList.remove('hide');
      
      // Show the flashcards modal if not authenticated with Google
      if (sectionId === 'flashcards') {
        checkGoogleAuthentication().then(isAuthenticated => {
          if (!isAuthenticated) {
            flashcardsModal.classList.remove('hide');
          }
        });
      }
    }
  });
});

// Check if admin is authenticated with Google
const checkGoogleAuthentication = async () => {
  try {
    console.log('Checking Google authentication...');
    const response = await fetch('/session/google-authenticate', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.isGoogleAuthenticated) {
      console.log('Admin is authenticated with Google.');
      signedIn.classList.remove('hide');
    } else {
      console.log('Admin is not authenticated with Google.');
      signedIn.classList.add('hide');
      googleSignIn.classList.remove('hide');
    } 
  } catch (error) {
    console.error('Error checking Google authentication:', error);
  }
};

flashcardsModal.addEventListener('click', event => {
  event.stopPropagation();
  flashcardsModal.classList.add('hide');
  window.location.href = '/flashcards.html';
});

window.onclick = (event) => {
  if (event.target === flashcardsModal) {
    flashcardsModal.classList.add('hide');
    window.location.href = '/flashcards.html';
  }
};

logoutBtn.addEventListener('click', async (e) => {
  console.log('Sign out button clicked...');
  e.preventDefault();
  await logout();
});


//**   MAIN SECTION   **//

// Hide the password column
document.querySelectorAll('#users-table tbody td:nth-child(2)').forEach(td => {
  td.innerText = '****';
});

// Sort the table by username
document.querySelector('#users-table th').addEventListener('click', () => {
  let rows = Array.from(document.querySelector('#users-table tbody').rows);
  rows.sort((a, b) => a.cells[0].innerText.localeCompare(b.cells[0].innerText));
  document.querySelector('#users-table tbody').append(...rows);
});

// Create sortable table headers
tableHeaders.forEach(header => {
  header.addEventListener('click', () => {
    // Sort the table based on this column
    sortTable(header.cellIndex);
  });
});


//!! AI generated code
// Function to sort the table
let direction = 'asc';
const sortTable = (columnIndex) => {
  const table = document.querySelector('#users-table');
  const rows = table.rows;
  const switching = true;
  let shouldSwitch;
  let i;
  
  // Make a loop that will continue until no switching has been done
  while (switching) {
    // Start by saying: no switching is done
    switching = false;
    
    // Loop through all table rows (except the first, which contains table headers)
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching
      shouldSwitch = false;
      
      // Get the two elements you want to compare, one from current row and one from the next
      const x = rows[i].getElementsByTagName('TD')[columnIndex];
      const y = rows[i + 1].getElementsByTagName('TD')[columnIndex];
      
      // Check if the two rows should switch place, based on the direction, asc or desc
      if (direction === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop
          shouldSwitch = true;
          break;
        }
      } else if (direction === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop
          shouldSwitch = true;
          break;
        }
      }
    }
    
    if (shouldSwitch) {
      // If a switch has been marked, make the switch and mark that a switch has been done
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      
      // Each time a switch is done, flip the direction
      direction = direction === 'asc' ? 'desc' : 'asc';
    }
  }
}
