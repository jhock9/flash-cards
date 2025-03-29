const dashPanel = document.querySelector('#dash-panel');
const navOpenBtn = document.querySelector('#nav-open-btn');
const navLinks = document.querySelectorAll('#dash-nav-list a');
const logoutBtn = document.querySelector('#logout-btn');
const createUserForm = document.querySelector('#user-form');
const createClientForm = document.querySelector('#client-form');
const refreshBtn = document.querySelector("#refresh-btn");
const adminTab = document.querySelector('#admin-tab');
const adminSection = document.querySelector('#admin');
const acctName = document.querySelector('#acct-name');
const acctUsername = document.querySelector('#acct-username');
const adminViews = document.querySelectorAll('.admin-view');
const clientsTab = document.querySelector('#clients-tab');

import { addModalEventListeners } from '../components/modals.js';
import { logout } from '../components/logout.js';
import { fetchAccountData, updatePassword } from './account.js'; // updatePassword(updatePasswordForm)
import { fetchAppointment } from './appointment.js'; // fetchAppointment(id)
import { refreshUsersTable, createUser } from './users.js';
import { refreshClientsTable, createClient } from './clients.js'; // refreshClientsTable(userId), createClient(event)
import { fetchAdminData } from './admin.js'; // fetchAdminData()
import { togglePasswordVisibility } from '../components/password.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Dashboard window loaded...');
  try {
    // Fetch account data
    const currentUser = await fetchAccountData();
    console.log('Fetched account data.');
    
    // Update UI based on current user role
    if (currentUser.role === 'admin') {
      console.log ('User is admin. Showing admin views...');
      adminSection.classList.remove('hide');
      adminViews.forEach(el => el.classList.remove('hide'));
      adminTab.click();
      
      // Trigger stats fetch but don't wait
      fetchAdminData().then(() => {
        console.log('Admin data loaded.');
      });
    } else {
      console.log('User is not admin. Showing user views...');
      clientsTab.click();   
    }
    
    // Update user display info
    acctName.textContent = currentUser.fullname;
    acctUsername.textContent = currentUser.username;
    
    // Additional setup
    togglePasswordVisibility();
    addModalEventListeners();
    updatePassword(document.querySelector('#update-password-form'));
    
    // Auto logout after 12 hours
    setTimeout(logout, 12 * 60 * 60 * 1000);
    
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  }
});

//**   NAV  **//

// Add event listeners to the navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', async (event) => {
    console.log('nav link clicked...'); 
    event.preventDefault()
    
    const href = link.getAttribute('href');
    
    // Only handle links that navigate to a section on the current page
    if (href.startsWith('#')) {
      event.preventDefault();
      toggleNav();
      
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
      
      if (sectionId === 'users') {
        console.log('users-tab clicked...');
        refreshUsersTable();
      };
      
      if (sectionId === 'clients') {
        console.log('clients-tab clicked...');
        refreshClientsTable(window.selectedUserId);
        window.selectedUserId = null;
      }
      
      // Fetch the user's default appointment
      if (sectionId === 'flashcards') {
        console.log('flashcards-tab clicked...');
        // Fetch the user's default appointment
        const userData = await fetchAccountData();
        await fetchAppointment(userData.defaultAppointment);
      }
      
      // Fetch admin dashboard data
      if (sectionId === 'admin') {
        console.log('admin-tab clicked...');
        fetchAdminData();
      }
    }
  });
});


//**   TOGGLES   **// 

//!! Toggle the navigation menu when in mobile view only
const toggleNav = () => {
  console.log('Toggling nav...');
  navOpenBtn.classList.toggle('open');
  dashPanel.classList.toggle('open');
};


//**   BUTTONS   **//

navOpenBtn.addEventListener('click', async () => {
  console.log('Open button clicked...');
  try {
    toggleNav();
  } catch (error) {
    console.error('Error on open button click:', error);
  }
});

logoutBtn.addEventListener('click', async (e) => {
  console.log('Sign out button clicked...');
  e.preventDefault();
  await logout();
});

// Create and update users
createUserForm.addEventListener('submit', (e) => {
  console.log('Create user button clicked...');
  e.preventDefault();
  createUser(e);
  refreshUsersTable();
});

// Create and update clients
createClientForm.addEventListener('submit', (e) => {
  console.log('Create client button clicked...');
  e.preventDefault();
  createClient(e);
  refreshClientsTable();
});

// Fetch admin dashboard data
refreshBtn.addEventListener('click', async (e) => {
  console.log('Refresh button clicked...');
  e.preventDefault();
  fetchAdminData();
});

refreshBtn.addEventListener('click', async (e) => {
  console.log('Refresh button clicked...');
  e.preventDefault();
  
  try {
    // Fetch and populate new data
    await fetchAdminData();
    
    // Reset scroll positions
    document.querySelector('#active-tags-table-body').scrollTop = 0;
    document.querySelector('#inactive-tags-table-body').scrollTop = 0;
    
    console.log('Scroll reset and data refreshed.');
  } catch (error) {
    console.error('Error refreshing admin data:', error);
  }
});
