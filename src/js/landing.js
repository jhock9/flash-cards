const formContainer = document.querySelector('#form-container');
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const loginBtn = document.querySelector('#login-submit-btn');
const newUserBtn = document.querySelector('#new-user-btn');
const registerBtn = document.querySelector('#register-btn');
const backBtn = document.querySelector('#back-btn');

// loginBtn.addEventListener('click', () => {
//   const username = document.querySelector('#login-username').value;
//   const password = document.querySelector('#login-password').value;

//   fetch('/auth/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         window.location.href = '/flashcards.html';
//       } else {
//         console.log('Error logging in user...');
//       }
//     });
// });

loginBtn.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the form from submitting normally
  const username = document.querySelector('#login-username').value;
  const password = document.querySelector('#login-password').value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/flashcards.html';
      } else {
        console.log('Error logging in user...');
      }
    });
});

newUserBtn.addEventListener('click', () => {
  console.log('Add new user form button clicked...');
  formContainer.classList.add('shift-left');
  formContainer.classList.remove('shift-right');
  
  loginForm.classList.remove('fade-in');
  loginForm.classList.add('fade-out');
  
  registerForm.classList.remove('fade-out'); 
  registerForm.classList.add('fade-in');
});

// registerBtn.addEventListener('click', () => {
//   const username = document.querySelector('#register-username').value;
//   const password = document.querySelector('#register-password').value;

//   fetch('/auth/register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       if (data.success) {
//         window.location.href = '/landing.html';
//       } else {
//         console.log('Error registering new user...');
//       }
//     });
// });

registerBtn.addEventListener('click', (event) => {
  event.preventDefault(); 
  const username = document.querySelector('#register-username').value;
  const password = document.querySelector('#register-password').value;

  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = '/landing.html';
      } else {
        console.log('Error registering new user...');
      }
    });
});

backBtn.addEventListener('click', () => {
  console.log('Back button to go to login form clicked...');
  formContainer.classList.add('shift-right');
  formContainer.classList.remove('shift-left');
  
  loginForm.classList.remove('fade-out');
  loginForm.classList.add('fade-in');
  
  registerForm.classList.remove('fade-in');
  registerForm.classList.add('fade-out');
});

// let googleClientID; 

// const fetchConfig = async () => {
//   try {
//     const response = await fetch('/config');
//     const config = await response.json();
    
//     googleClientID = config.GOOGLE_CLIENT_ID;
//     console.log('googleClientID LOADED...'); 
    
//     initGoogleSignIn();
//   } catch (error) {
//     console.error('Error fetching configuration:', error);
//   }
// };
// fetchConfig();

//*   GOOGLE AUTHENTICATION & AUTHORIZATION   *//

// // Redirect user to Google's authentication page
// const googleAuth = () => {
//   window.location.href = '/authorize';
// };

// // Initialize Google Sign-In
// const initGoogleSignIn = () => {
//   google.accounts.id.initialize({
//     client_id: googleClientID,
//     callback: handleCredentialResponse,
//     on_failure: onSignInFailure
//   });
  
//   google.accounts.id.renderButton(
//     document.getElementById('google-signin'),
//     { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
//   );
// };

// // Sign in success callback
// const handleCredentialResponse = async (response) => {
//   console.log('handleCredentialResponse CALLED...');
//   let decodedUserInfo;
//   try {
//     console.log('Encoded JWT ID token RETRIEVED...')
//     decodedUserInfo = jwt_decode(response.credential);
//     console.log('Decoded User Info LOADED...');
//   } catch (error) {
//     console.error('Error decoding user credential:', error);
//   }
  
//     await googleAuth();
// };

// const onSignInFailure = (error) => {
//   console.error('Sign-in error:', error);
// };

// const checkAuthentication = async () => {
//   try {
//     console.log('Checking authentication...');
//     const response = await fetch('/is-authenticated', { credentials: 'include' });
//     if (!response.ok) {
//       console.error(`Server responded with status: ${response.status}`);
//       throw new Error(`Server responded with status: ${response.status}`);
//     }
//     const data = await response.json();
    
//     if (data.isAuthenticated) {
//       console.log('User is authenticated.');
//       sessionStorage.setItem('authenticationChecked', 'true');
      
//       try {
//         const photosData = await fetchPhotosData();
//         savePhotosData(photosData);
//         localStorage.setItem('photos', JSON.stringify(photosData));
//       } catch (error) {
//         console.error('Error fetching new photos:', error);
//       }
      
//       if (window.location.pathname === '/landing.html') {
//         window.location.href = '/flashcards.html';
//       }
      
//     } else {
//       console.log('User is not authenticated.');
//       if (window.location.pathname === '/flashcards.html') {
//         window.location.href = '/landing.html';
//       }
//     } 
//   } catch (error) {
//     console.error('Error checking authentication:', error);
//   }
// };

// // Call checkAuthentication when the page initially loads
// window.addEventListener('load', checkAuthentication);
// // Call checkAuthentication when the page refreshes
// window.addEventListener('beforeunload', () => {
//   sessionStorage.removeItem('authenticationChecked');
// });
