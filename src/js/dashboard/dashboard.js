const adminViews = document.querySelectorAll('.admin-view');
const navLinks = document.querySelectorAll('#dash-nav-list a');
const logoutBtn = document.querySelector('#logout-btn');
const createUserBtn = document.querySelector('#create-user-btn');
const tableHeaders = document.querySelectorAll('#users-table th');
const flashcardsModal = document.querySelector('#flashcards-modal');

import { fetchAccountData, updatePassword } from './account.js';
import { refreshUsersTable, createUser } from './users.js';
import { } from './clients.js';
import { checkGoogleAuthentication, fetchConfig } from './google.js';
import { togglePasswordVisibility } from '../components/password.js';
import { 
  addModalEventListeners,
  hideModal,
  showGoogleSignInModal,
  showFlashcardsModal
} from '../components/modals.js';

let currentUser;

// Show or hide elements based on the user's role
const updateDashNav = async (currentUser) => {
  try {
    if (currentUser.role === 'admin') {
      console.log ('User is admin. Showing admin views...');
      for (let view of adminViews) {
      view.classList.remove('hide');
      }
      await checkGoogleAuthentication();
      document.querySelector('#google-tab').click();
      document.querySelector('#account').classList.add('hide');
      document.querySelector('#google').classList.remove('hide');
      showGoogleSignInModal();
      setTimeout(hideModal, 4000);
    } else {  
      console.log('User is not admin. Showing user views...');
    }
  } catch (error) {
    console.error('Error updating dashboard navigation:', error);
  }
};

const logout = async () => {
  try {
    console.log('Sending logout request...');
    const response = await fetch('/auth/logout', { method: 'GET', credentials: 'include' });
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    console.log('Logout successful.');
    window.location.href = '/';
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

//**   NAV BAR  **//

// Add event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    console.log('nav link clicked'); 
    
    const href = link.getAttribute('href');
    
    // Only handle links that navigate to a section on the current page
    if (href.startsWith('#')) {
      event.preventDefault();
      
      // Hide all sections
      const sections = document.querySelectorAll('main section');
      sections.forEach((section) => {
        section.classList.add('hide');
      });
      
      // Remove 'clicked' class from all nav tabs
      navLinks.forEach((link) => {
        link.classList.remove('clicked');
      });
      
      // Add 'clicked' class to clicked nav tab
      link.classList.add('clicked');
      
      // Show the clicked section
      const sectionId = href.slice(1);
      console.log('sectionId:', sectionId);
      const section = document.querySelector(`#${sectionId}`);
      section.classList.remove('hide');
      
      if (sectionId === 'users-tab') {
        console.log('users-tab clicked');
        refreshUsersTable();
      };
      
      // Show the flashcards modal if not authenticated with Google
      if (sectionId === 'flashcards-tab') {
        checkGoogleAuthentication().then(response => {
          if (!response.isGoogleAuthenticated) {
            showFlashcardsModal();
            setTimeout(hideModal, 3000);
          }
        });
      }
    }
  });
});

flashcardsModal.addEventListener('click', event => {
  event.stopPropagation();
  hideModal();
  window.location.href = '/flashcards.html';
});

// Executes when the window loads
document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dashboard window loaded...');
  document.querySelector('#account-tab').click();
  
  currentUser = await fetchAccountData();
  updateDashNav(currentUser);
  
  // Update the HTML to display the user's name and username
  document.querySelector('#acct-name').textContent = currentUser.fullname;
  document.querySelector('#acct-username').textContent = currentUser.username;
  
  await fetchConfig();
  
  togglePasswordVisibility();
  addModalEventListeners();
  updatePassword(document.querySelector('#update-password-form'));
  
  // Logout after 12 hours
  setTimeout(logout, 12 * 60 * 60 * 1000);
});

logoutBtn.addEventListener('click', async (e) => {
  console.log('Sign out button clicked...');
  e.preventDefault();
  await logout();
});


/*=====================================================================================
  MAIN SECTION     
=====================================================================================*/


// Create and update users
createUserBtn.addEventListener('click', () => {  
  createUser();
  refreshUsersTable();
});

// Closes the flashcards modal if the user clicks outside of it
window.onclick = (event) => {
  if (event.target === flashcardsModal) {
    flashcardsModal.classList.add('hide');
    window.location.href = '/flashcards.html';
  }
};
