import { 
  hideModal,
  showUserCreatedModal,
  showUnavailableModal,
} from '../components/modals.js';

const refreshUsersTable = async () => {
  console.log('refreshUsersTable called...');
  try {
    const response = await fetch('/users/refresh-users', {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching users');
    };
    
    const users = await response.json();
    users.sort((a, b) => a.fullname.localeCompare(b.fullname));
    
    const tableBody = document.querySelector('#users-table-body');
    tableBody.innerHTML = '';
    
    // Populate the users table with the users' data
    users.forEach(user => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.setAttribute('id', 'user-name');
      
      nameCell.textContent = user.fullname;
      row.appendChild(nameCell);
      
      const usernameCell = document.createElement('td');
      usernameCell.textContent = user.username;
      row.appendChild(usernameCell);
      
      const passwordCell = document.createElement('td');
      passwordCell.textContent = '****';
      row.appendChild(passwordCell);
      
      const roleCell = document.createElement('td');
      roleCell.textContent = user.role;
      row.appendChild(roleCell);
      
      // Action icons
      const actionCell = document.createElement('td');
      const editUserBtn = createEditUserBtn();
      const viewClientsBtn = createViewClientsBtn();
      
      const iconDiv = appendToNewDiv('icon-div center', [editUserBtn, viewClientsBtn]);
      
      actionCell.appendChild(iconDiv);
      row.appendChild(actionCell);
      
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error:', error);
  };
};

const createEditUserBtn = () => {
  const editUserBtn = document.createElement('button');
  editUserBtn.type = 'button';
  editUserBtn.classList.add('table-icon');
  
  const editIcon = document.createElement('i');
  editIcon.classList.add ('fa-solid', 'fa-pen-to-square');
  editUserBtn.appendChild(editIcon);
  
  editUserBtn.addEventListener('click', () => {
  //!! NOT MVP 

//!! this todo started like this:
    // TODO: edit user modal/popup appears
    //   - Update data
    //   - Reset password
    //   - Delete user 

//!! and ended up like this:
    // TODO: edit user modal/popup appears
    //  - Change name (input field with placeholder "Enter new name")
    //  - Change username (input field with placeholder "Enter new username")
    //  - Reset password checkbox
    //  - Change role (dropdown with options "Admin" and "User")
    //  - Delete user checkbox
    //  - Confirm button
    //    - if reset password checked:
    //      - Ask "Are you sure you want to reset this user's password?"
    //      - Require user to type username to confirm
    //      - Modal "Password reset to "0000", please have user sign in to update password."
    //      - Close modal/popup
    //    - if delete user checked:
    //      - Ask "Are you sure you want to delete this user? This action cannot be undone. This action WILL NOT delete any of this user's client data."
    //      - Require user to type username to confirm
    //      - Once confirmed, user is deleted and cannot be recovered
    //      - Remove user from database
    //      - Remove user from user's clients' username connection (DO NOT delete client data)
    //      - Modal "User has been deleted."
    //      - Close modal/popup
    //    - if both checked, follow delete user logic and ignore reset password
    //    - if neither checked (meaning just name, username or role changed):
    //      - if name or role are changed, update name and/or role
    //      - if username is changed, check if new username is available
    //        - if username is not available, display notAvailableModal
    //        - if username is available, update username
    //        - if username is changed, update user's clients' username connection
    //      - show successModal
    //      - Close modal/popup
    //  - Cancel/Back button
    //    - No changes made, close modal/popup
    //  - If user is edited or deleted, refresh table
  });
  
  return editUserBtn;
};

// Helper function for create buttons (user/client)
const appendToNewDiv = (classList, elements) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add(...classList.split(' '));
  elements.forEach(el => newDiv.appendChild(el));
  return newDiv;
};

const createViewClientsBtn = () => {
  const viewClientsBtn = document.createElement('button');
  viewClientsBtn.type = 'button';
  viewClientsBtn.classList.add('table-icon');
  
  const viewClientsIcon = document.createElement('i');
  viewClientsIcon.classList.add('fa-solid', 'fa-user-group');
  viewClientsBtn.appendChild(viewClientsIcon);
  
  viewClientsBtn.addEventListener('click', () => {
    document.querySelector('#clients-tab').click();
    // TODO: add filter to see only this users' clients
    // guessing I'll need to pass a parameter here? username?
    // is this a callback function written below? or include in this function?
  });
  
  return viewClientsBtn;
};

const createUser = async (event) => {
  console.log('createUser called...');
  event.preventDefault();
  
  const fullnameInput = document.querySelector('#new-user-name');
  const usernameInput = document.querySelector('#new-user-username');
  const passwordInput = document.querySelector('#new-user-password');
  const roleInput = document.querySelector('#new-user-role');
  
  const userData = {
    fullname: fullnameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    role: roleInput.value,
  };
  
  fetch('/users/create-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
        showUserCreatedModal();
        setTimeout(hideModal, 2000);
        
        fullnameInput.value = '';
        usernameInput.value = '';
        passwordInput.value = '';
        roleInput.value = '';
        refreshUsersTable(); 
        
    } else if (data.error) {
      if (data.error === 'Username already exists.') {
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

// TODO -- add functionality to edit users
// const editUser = async (event) => {
//   event.preventDefault();
//   const userId = event.target.dataset.id;
  
//   try {
//     const response = await fetch(`/api/users/${userId}`, {
//       method: 'GET',
//     });
    
//     if (!response.ok) {
//       throw new Error('Error fetching user');
//     };
    
//     const user = await response.json();
    
//     // Populate the edit user form with the user's data
    
//     // Show the edit user modal
//   } catch (error) {
//     console.error('Error:', error);
//     // Show error message
//   };
// };

// TODO -- add functionality to reset passwords within edit users
// const resetPassword = async (event) => {
//   event.preventDefault();
//   const userId = event.target.dataset.id;
    
//   try {
//     const response = await fetch(`/users/${userId}/reset-password`, {
//       method: 'GET',
//     });
    
//     if (!response.ok) {
//       throw new Error('Error resetting password');
//     };
    
//     const data = await response.json();
    
//     if (data.success) {
//       showPasswordResetModal();
//       setTimeout(hideModal, 2000);
//     } else if (data.error) {
//       console.error('Error:', data.error);
//     }
    
//   } catch (error) {
//     console.error('Error:', error);
//   };
// };

// TODO -- add functionality to delete users
// const deleteUser = async (event) => {
//   event.preventDefault();
//   const userId = event.target.dataset.id;
  
//   try {
//     const response = await fetch(`/users/${userId}/delete-user`, {
//       method: 'DELETE',
//     });
    
//     if (!response.ok) {
//       throw new Error('Error deleting user');
//     };
    
//     const data = await response.json();
    
//     if (data.success) {
//       refreshUsersTable();
//     } else if (data.error) {
//       console.error('Error:', data.error);
//     }
    
//   } catch (error) {
//     console.error('Error:', error);
//   };
// };

// TODO -- add functionality to view clients
// const viewClients = async (event) => {
//   event.preventDefault();
//   const userId = event.target.dataset.id;
  
//   try {
//     const response = await fetch(`/api/users/${userId}/clients`, {
//       method: 'GET',
//     });
    
//     if (!response.ok) {
//       throw new Error('Error fetching clients');
//     };
    
//     const clients = await response.json();
    
//     // Populate the clients table with the clients' data
    
//     // Show the clients modal
//   } catch (error) {
//     console.error('Error:', error);
//     // Show error message
//   };
// };

// Export to dashboard.js
export {
  refreshUsersTable,
  createUser,
};
