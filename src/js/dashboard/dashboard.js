const adminViews = document.querySelectorAll('.admin-view');
const navLinks = document.querySelectorAll('#dash-nav-list a');
const logoutBtn = document.querySelector('#logout-btn');
const tableHeaders = document.querySelectorAll('#users-table th');

import { fetchConfig } from './googleAuth.js';

// Check if the login date is different from the current date
const checkLoginDate = () => {
  const loginDate = localStorage.getItem('loginDate');
  const currentDate = new Date().toDateString();
  
  if (loginDate !== currentDate) {
    logout();
  }
};

// Initialize the dashboard
const init = async () => {
  updateDashNav();
  await fetchConfig(); //? needed for user role?
}

// Show or hide elements based on the user's role
const updateDashNav = () => {
  const userRole = localStorage.getItem('userRole');
  
  for (let view of adminViews) {
    if (userRole === 'admin') {
      view.classList.remove('hide');
    } else {
      view.classList.add('hide');
    }
  }
}

//**   WhHEN THE PAGE LOADS   **/
window.addEventListener('load', () => {
  console.log('Window loaded...');
  checkLoginDate();
  init();
});
window.addEventListener('beforeunload', logout);

// Check if admin is authenticated with Google
const checkGoogleAuthentication = async () => {
  try {
    console.log('Checking Google authentication...');
    const response = await fetch('/google-auth/google-authenticate', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.isGoogleAuthenticated) {
      console.log('Admin is authenticated with Google.');
      displayGoogleSignInStatus(true);
    } else {
      console.log('Admin is not authenticated with Google.');
      displayGoogleSignInStatus(false);
    } 
  } catch (error) {
    console.error('Error checking Google authentication:', error);
  }
};

//!! Finish coding html -- update call in check google auth function
const displayGoogleSignInStatus = (isAuthenticated) => {
  if (isAuthenticated) {
    // Display a div that says the user is signed in with Google
    // Replace 'googleSignInStatusDiv' with the actual id of your div
    document.getElementById('googleSignInStatusDiv').innerHTML = 'You are signed in with your Google account and have authorized access to your Google Photos library.';
  } else {
    // Display the Google sign-in button
    // Replace 'googleSignInButton' with the actual id of your Google sign-in button
    document.getElementById('googleSignInButton').style.display = 'block';
  }
};

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
      
      // Call checkGoogleAuthentication function
      if (sectionId === 'google') {
        checkGoogleAuthentication();
      }
    }
  });
});


//*   MAIN SECTION   *//

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

// Logout
const logout = async () => {
  try {
    const response = await fetch('/auth/logout', { method: 'GET' });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    console.log('User signed out.');
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

logoutBtn.addEventListener('click', async (e) => {
  console.log('Sign out button clicked...');
  e.preventDefault();
  await logout();
});
