const formContainer = document.querySelector('#form-container');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const loginBtn = document.querySelector('#login-submit-btn');
const newUserBtn = document.querySelector('#new-user-btn');
const registerBtn = document.querySelector('#register-btn');
const backBtn = document.querySelector('#back-btn');
const modals = document.querySelectorAll('.modal');
const togglePasswordButtons = document.querySelectorAll('.toggle-password');
const incorrectModal = document.querySelector('#incorrect-modal');
const successModal = document.querySelector('#success-modal');
const unavailableModal = document.querySelector('#unavailable-modal');
const passwordMismatchModal = document.querySelector('#password-mismatch-modal');
const passwordReqModal = document.querySelector('#password-req-modal');

loginBtn.addEventListener('click', (event) => {
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
    if (data.success) {
    // Redirect users based on their role
      if (data.role === 'admin') {
        window.location.href = '/admin.html';
      } else {
        window.location.href = '/flashcards.html';
      }
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

registerBtn.addEventListener('click', (event) => {
  event.preventDefault(); 
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
      window.location.href = '/login.html';
      
      showSuccessModal();
      
      setTimeout(() => {
        hideSuccessModal();
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

newUserBtn.addEventListener('click', () => {
  console.log('Add new user form button clicked...');
  shiftFormsToRegister();
});

backBtn.addEventListener('click', () => {
  console.log('Back button to go to login form clicked...');
  shiftFormsToLogin();
});

togglePasswordButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    const wrapper = this.parentElement;
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

//* MODAL FUNCTIONS
modals.forEach(modal => { 
  modal.addEventListener('click', (event) => {
    event.stopPropagation();
  });
});

const hideModal = () => {
  modals.forEach(modal => {
    modal.classList.add('hide');
  }); 
};

modals.forEach(modal => {
  modal.addEventListener('click', hideModal);
});

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

//* HELPER FUNCTIONS
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
