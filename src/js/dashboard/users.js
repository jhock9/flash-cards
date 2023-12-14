import { 
  hideModal,
  showNewUserModal,
  showUnavailableModal,
} from '../components/modals.js';

const refreshUsersTable = async () => {
  try {
    const response = await fetch('/users/refresh-users', {
      method: 'GET',
    });
    
    if (!response.ok) {
      throw new Error('Error fetching users');
    };
    
    const users = await response.json();
    
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
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'action-icons';
        
        const editIcon = document.createElement('i');
        editIcon.className = 'action-icon fa-solid fa-pen-to-square';
        iconDiv.appendChild(editIcon);
        
        const viewClientsIcon = document.createElement('i');
        viewClientsIcon.className = 'action-icon fa-solid fa-user-group';
        iconDiv.appendChild(viewClientsIcon);
        
        actionCell.appendChild(iconDiv);
      row.appendChild(actionCell);
      
      tableBody.appendChild(row);
    });
    
  } catch (error) {
    console.error('Error:', error);
  };
};

const createUser = async (event) => {
  event.preventDefault();
  
  const fullname = document.querySelector('#new-user-name').value;
  const username = document.querySelector('#new-user-username').value;
  const password = document.querySelector('#new-user-password').value;
  const role = document.querySelector('#new-user-role').value;
  
  const userData = {
    fullname,
    username,
    password,
    role,
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
        showNewUserModal();
        setTimeout(hideModal, 2000);
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


// TODO -- add sort functionality to table headers

// // Edit user icons
// document.querySelectorAll('.fa-pen-to-square').forEach(editIcon => {
//   editIcon.addEventListener('click', editUser);
// });

// document.querySelectorAll('.fa-user-group').forEach(viewClientsIcon => {
//   viewClientsIcon.addEventListener('click', viewClients);
// });

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
  // editUser,
  // resetPassword,
  // deleteUser,
  // viewClients,
};
