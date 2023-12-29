import { fetchAccountData } from './account.js';
import { 
  hideModal,
  showClientCreatedModal,
  showUnavailableModal,
  showNoUsernameModal,
} from '../components/modals.js';

const refreshClientsTable = async (userId) => {
  console.log('refreshClientsTable called...');
  try {
    const user = userId ? { _id: userId, role: 'user' } : await fetchAccountData();
    console.log('Fetched user data...'); 
    const route = user.role === 'admin' && !userId ? '/clients/refresh-clients' : `/clients/${user._id}`;
    const response = await fetch(route, {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching clients');
    };
    
    const clients = await response.json();
    clients.sort((a, b) => a.fullname.localeCompare(b.fullname));
    
    const tableBody = document.querySelector('#clients-table-body');
    tableBody.innerHTML = '';
    
    // Populate the clients table with the clients' data
    clients.forEach(client => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = client.fullname;
      row.appendChild(nameCell);
      
      const techNameCell = document.createElement('td');
      techNameCell.textContent = client.user.username;
      row.appendChild(techNameCell);
      
      // Not to be confused with the client's database _id, which is different
      const clientIDCell = document.createElement('td');
      clientIDCell.textContent = client.clientID;
      row.appendChild(clientIDCell);
      
      // Action icons
      const actionCell = document.createElement('td');
      const editClientBtn = createEditClientBtn();
      const viewAppointmentsBtn = createViewAppointmentsBtn(client._id);
      
      const iconDiv = appendToNewDiv('icon-div center', [editClientBtn, viewAppointmentsBtn]);
      
      actionCell.appendChild(iconDiv);
      row.appendChild(actionCell);
      
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error:', error);
  };
};

// Helper function for create buttons (user/client)
const appendToNewDiv = (classList, elements) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add(...classList.split(' '));
  elements.forEach(el => newDiv.appendChild(el));
  return newDiv;
};

const createEditClientBtn = () => {
  const editClientBtn = document.createElement('button');
  editClientBtn.type = 'button';
  editClientBtn.classList.add('table-icon');
  
  const editIcon = document.createElement('i');
  editIcon.classList.add ('fa-solid', 'fa-pen-to-square');
  editClientBtn.appendChild(editIcon);
  
  editClientBtn.addEventListener('click', () => {
  //!! NOT MVP 
    // TODO: edit client modal/popup appears
    //  - Change name (input field with placeholder "Enter new name")
    //  - Change therapist/tech (input field with placeholder "Enter new name)
    //  - Delete user checkbox
    //  - Confirm button
    //    - if delete user checked:
    //      - Ask "Are you sure you want to delete this user? This action cannot be undone. This action WILL NOT delete any of this user's client data."
    //      - Require user to type username to confirm
    //      - Once confirmed, user is deleted and cannot be recovered
    //      - Remove user from database
    //      - Remove user from user's clients' username connection (DO NOT delete client data)
    //      - Modal "User has been deleted."
    //      - Close modal/popup
    //    - if delete client checked:
    //      - Ask "Are you sure you want to delete this client? This action cannot be undone. This action WILL delete all of this client's data."
    //      - Require user to type client name to confirm (match case)
    //      - Once confirmed, client is deleted and cannot be recovered
    //      - Remove client from database
    //      - Modal "Client has been deleted."
    //      - Close modal/popup
    //    - if neither checked (meaning just name or therapist/tech changed):
    //      - if name is changed, update name
    //      - if therapist/tech is changed, match to existing user
    //        - if user exists, update user connection
    //        - if user does not exist, display unavailableModal
    //      - show successModal
    //      - Close modal/popup
    //  - Cancel/Back button
    //    - No changes made, close modal/popup
    //  - If client is edited or deleted, refresh table
  });
  
  return editClientBtn;
};

const createViewAppointmentsBtn = (clientId) => {
  const viewAppointmentsBtn = document.createElement('button');
  viewAppointmentsBtn.type = 'button';
  viewAppointmentsBtn.classList.add('table-icon');
  
  const viewAppointmentsIcon = document.createElement('i');
  viewAppointmentsIcon.classList.add('fa-solid', 'fa-user-clock');
  viewAppointmentsBtn.appendChild(viewAppointmentsIcon);
  
  viewAppointmentsBtn.addEventListener('click', async () => {
    console.log('viewAppointmentsBtn clicked...');
    const response = await fetch(`/appointment/${clientId}`);
    const data = await response.json();
    
    //!! just for debugging
    if (response.status >= 400) {
      // The server responded with an error
      console.error(`Server responded with status code ${response.status}`);
    }
    
    if (response.status === 404) {
      console.log('No appointment found, creating new appointment...');
      // If no appointment is found, create a new appointment
      const newAppointmentResponse = await fetch(`/appointment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId }),
      });
      const newAppointmentData = await newAppointmentResponse.json();
      console.log('New appointment created...');
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(newAppointmentData.appointment))}`;
    } else {
      console.log('Appointment found...');
      window.location.href = `/flashcards?appointment=${encodeURIComponent(JSON.stringify(data.appointment))}`;
    }
  });
  
  return viewAppointmentsBtn;
};

const createClient = async (event) => {
  console.log('createClient called...');
  event.preventDefault();
  
  const fullnameInput = document.querySelector('#new-client-name');
  const techNameInput = document.querySelector('#new-client-tech-name');
  
  // Fetch the user's _id from the server
  const response = await fetch(`/users/user-id/${techNameInput.value}`);
  if (!response.ok) {
    showNoUsernameModal();
    setTimeout(hideModal, 2000);
    console.error('Failed to fetch user ID.');
    return;
  }
    
  const clientData = {
    fullname: fullnameInput.value,
    techName: techNameInput.value,
  };
  
  fetch('/clients/create-client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
        showClientCreatedModal();
        setTimeout(hideModal, 2000);
        
        fullnameInput.value = '';
        techNameInput.value = '';
        refreshClientsTable(); 
        
    } else if (data.error) {
      if (data.error === 'Tech name does not exist.') {
        showUnavailableModal();
        setTimeout(hideModal, 2000);
      } else {
        console.error('Error:', data.error);
      }
    }
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
};

// Export to dashboard.js
export {
  refreshClientsTable,
  createClient,
};