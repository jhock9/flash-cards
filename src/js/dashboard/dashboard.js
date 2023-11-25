const adminViews = document.querySelectorAll('admin-view');
const tableHeaders = document.querySelectorAll('#users-table th');
const navLinks = document.querySelectorAll('#dash-nav-list a');

import { fetchConfig, checkAuthentication } from './googleAuth.js';

// Initialize the dashboard
const init = async () => {
  updateDashNav();
  await fetchConfig();
  checkAuthentication(); 
  //!! do we still need checkAuthentication()?
  //!! after all set up, remove and test without it
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

//**   DO THIS WHEN THE PAGE LOADS   **//
window.addEventListener('load', init);
window.addEventListener('beforeunload', () => {
  sessionStorage.removeItem('authenticationChecked');
});


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
    }
  });
});

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

