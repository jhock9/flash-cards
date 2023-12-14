import { 
  hideModal,
  showPasswordReqModal, 
  showPasswordMismatchModal,
  showPasswordUpdatedModal,
  showCurrentPasswordIncorrectModal,
} from '../components/modals.js';

const fetchAccountData = async () => { 
  try {
    const response = await fetch('/account/account-data', { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const updatePassword = (updatePasswordForm) => {
  updatePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const currentPassword = document.querySelector('#current-password').value;
    const newPassword = document.querySelector('#new-password').value;
    const confirmNewPassword = document.querySelector('#confirm-new-password').value;
    
    if (!/^\d{4}$/.test(newPassword)) {
      showPasswordReqModal();
      setTimeout(hideModal, 2000);
      return;
    };
    
    if (newPassword !== confirmNewPassword) {
      showPasswordMismatchModal();
      setTimeout(hideModal, 2000);
      return;
    };
    
    const passwordData = {
      currentPassword,
      newPassword,
    };
    
    fetch('/auth/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showPasswordUpdatedModal();
        setTimeout(hideModal, 2000);
      } else if (data.error) {
        if (data.error === 'Current password is incorrect') {
          showCurrentPasswordIncorrectModal();
          setTimeout(hideModal, 2000);
        } else {
          console.log(data.error);
        }
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  });
};

// Export to dashboard.js
export { 
  fetchAccountData,
  updatePassword,
};