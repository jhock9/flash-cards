import { 
  hideModal,
  showClientCreatedModal,
  showUnavailableModal,
  showNoUsernameModal,
} from '../components/modals.js';
// Todo: Filter for who can see what info
            //   1. Admin
            //     - show all clients
            //   2. User
            //     - show only clients assigned to user

const refreshClientsTable = async () => {
  console.log('refreshClientsTable called...');
  try {
    const response = await fetch('/clients/refresh-clients', {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching clients');
    };
    
    const clients = await response.json();
    clients.sort((a, b) => a.fullname.localeCompare(b.fullname));
    
    const tableBody = document.querySelector('#clients-table-body');
    // tableBody.innerHTML = '';
    
    //! Alternative to innerHTML
    // Get all rows as an array
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    // Remove all rows except the first 10
    for (let i = 10; i < rows.length; i++) {
      tableBody.removeChild(rows[i]);
    }
    
    // Populate the clients table with the clients' data
    clients.forEach(client => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = client.fullname;
      row.appendChild(nameCell);
      
      const techNameCell = document.createElement('td');
      techNameCell.textContent = client.user.username; // Assuming user object is populated
      row.appendChild(techNameCell);
      
      const clientIDCell = document.createElement('td');
      clientIDCell.textContent = client.clientID;
      row.appendChild(clientIDCell);
      
      // Action icons
      const actionCell = document.createElement('td');
      const editClientBtn = createEditClientBtn();
      const viewSessionsBtn = createViewSessionsBtn();
      
      const iconDiv = appendToNewDiv('icon-div center', [editClientBtn, viewSessionsBtn]);
      
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

const createViewSessionsBtn = () => {
  const viewSessionsBtn = document.createElement('button');
  viewSessionsBtn.type = 'button';
  viewSessionsBtn.classList.add('table-icon');
  
  const viewSessionsIcon = document.createElement('i');
  viewSessionsIcon.classList.add('fa-solid', 'fa-user-clock');
  viewSessionsBtn.appendChild(viewSessionsIcon);

  viewSessionsBtn.addEventListener('click', () => {
    // TODO: add filter/logic to see only this client's last saved session 
    // guessing I'll need to pass a parameter here? username? 
    // is this a callback function written below? or include in this function? 
  });
  
  return viewSessionsBtn;
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