const formContainer = document.querySelector('#form-container');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const newUserBtn = document.querySelector('#new-user-btn');
const backBtn = document.querySelector('#back-btn');
const modals = document.querySelectorAll('.modal');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const incorrectModal = document.querySelector('#incorrect-modal');
const successModal = document.querySelector('#success-modal');
const unavailableModal = document.querySelector('#unavailable-modal');
const passwordMismatchModal = document.querySelector('#password-mismatch-modal');
const passwordReqModal = document.querySelector('#password-req-modal');


//**   ON LOAD / UNLOAD  **//

window.addEventListener('load', () => {
  console.log('Login window loaded, checking authentication...');
  checkAuthentication();
});

// Check if user is authenticated; redirect to dashboard page
const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    const response = await fetch('/auth/local-check', { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
        
    if (data.isAuthenticated) {
      console.log('User is authenticated. Redirecting to dashboard...');
      window.location.href = './dashboard';
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
};


//**   FORMS   **/

loginForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting normally
  const username = document.querySelector('#login-username').value;
  const password = document.querySelector('#login-password').value;
  
  const userData = {
    username,
    password,
  };
  
  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => {
    if (response.status === 401) {
      throw new Error('Invalid username or password');
    } else if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('After login, response data:', data);
    if (data.success) {
      window.location.href = '/dashboard';
    }
  })
  .catch(error => {
    if (error.message === 'Invalid username or password') {
      showIncorrectModal();
      
      setTimeout(() => {
        hideModal();
      }, 2000);
    } else {
      console.log(error.message);
    };
  });
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const fullname = document.querySelector('#register-fullname').value;
  const username = document.querySelector('#register-username').value;
  const password = document.querySelector('#register-password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  
    if (!/^\d{4}$/.test(password)) {
    event.preventDefault();
    showPasswordReqModal();
    
    setTimeout(() => {
      hidePasswordReqModal();
    }, 2000);
    
    return;
  };
  
  if (password !== confirmPassword) {
    event.preventDefault();
    showPasswordMismatchModal();
    
    setTimeout(() => {
      hideModal();
    }, 2000);
    
    return;
  };
  
  const userData = {
    fullname,
    username,
    password,
    confirmPassword,
  };
  
  fetch('/auth/register', {
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
      showSuccessModal();
      
      setTimeout(() => {
        hideModal();
        shiftFormsToLogin();
      }, 2000);
    } else if (data.error) {
      if (data.error === 'User already exists') {
        showUnavailableModal();
        
        setTimeout(() => {
          hideModal();
        }, 2000);
      } else {
        console.log(data.error);
      };
    };
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
});


//**   BUTTONS   **//

newUserBtn.addEventListener('click', () => {
  console.log('Add new user form button clicked...');
  shiftFormsToRegister();
});

backBtn.addEventListener('click', () => {
  console.log('Back button to go to login form clicked...');
  shiftFormsToLogin();
});

togglePasswordButtons.forEach(button => {
  button.addEventListener('click', () => {
    const wrapper = button.parentElement;
    const passwordInput = wrapper.querySelector('input[type=password], input[type=text]');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    const slashIcon = wrapper.querySelector('.fa-regular.fa-eye-slash');
    const eyeIcon = wrapper.querySelector('.fa-solid.fa-eye');
    
    if (type === 'text') {
      slashIcon.classList.add('hide');
      eyeIcon.classList.remove('hide');
    } else {
      slashIcon.classList.remove('hide');
      eyeIcon.classList.add('hide');
    }
  });
});


//**   MODAL FUNCTIONS   **//

modals.forEach(modal => {
  modal.addEventListener('click', event => {
    event.stopPropagation();
    hideModal();
  });
});

const hideModal = () => {
  modals.forEach(modal => {
    modal.classList.add('hide');
  });
}

const showIncorrectModal = () => {
  incorrectModal.classList.remove('hide');
};

const showSuccessModal = () => {
  successModal.classList.remove('hide');
};

const showUnavailableModal = () => {
  unavailableModal.classList.remove('hide');
};

const showPasswordMismatchModal = () => {
  passwordMismatchModal.classList.remove('hide');
};

const showPasswordReqModal = () => {
  passwordReqModal.classList.remove('hide');
};

//**   HELPER FUNCTIONS   **//

const shiftFormsToRegister = () => {
  formContainer.classList.add('shift-left');
  formContainer.classList.remove('shift-right');
  
  loginForm.classList.remove('fade-in');
  loginForm.classList.add('fade-out');
  loginForm.style.pointerEvents = 'none';
  
  registerForm.classList.remove('fade-out'); 
  registerForm.classList.add('fade-in');
  registerForm.style.pointerEvents = 'auto';
};

const shiftFormsToLogin = () => {
  formContainer.classList.add('shift-right');
  formContainer.classList.remove('shift-left');
  
  loginForm.classList.remove('fade-out');
  loginForm.classList.add('fade-in');
  loginForm.style.pointerEvents = 'auto'; 
  
  registerForm.classList.remove('fade-in');
  registerForm.classList.add('fade-out');
  registerForm.style.pointerEvents = 'none';
};
