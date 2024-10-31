const googleTab = document.querySelector('#google-tab');
const signedIn = document.querySelector('#signed-in-wrapper');
const googleSignIn = document.querySelector('#google-signin-wrapper');
let googleClientId; 

import { hideModal, showFlashcardsModal, showGoogleSignInModal } from '../components/modals.js';

// Fetch Google Client ID from server
const fetchConfig = async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    
    googleClientId = config.GOOGLE_CLIENT_ID;
    console.log('googleClientId LOADED...'); 
    
    initGoogleSignIn();
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};

// Initialize Google Sign-In called in fetchConfig()
const initGoogleSignIn = () => {
  console.log('initGoogleSignIn CALLED...');
  google.accounts.id.initialize({
    client_id: googleClientId,
    callback: handleCredentialResponse, // Success callback function
    on_failure: onSignInFailure // Failure callback function
  });
  
  google.accounts.id.renderButton(
    document.getElementById('google-signin'),
    { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
  );
};

// Sign in success callback called in initGoogleSignIn()
const handleCredentialResponse = async (response) => {
  console.log('handleCredentialResponse CALLED...');
  let decodedUserInfo;
  try {
    console.log('Encoded JWT ID token RETRIEVED...')
    decodedUserInfo = jwt_decode(response.credential);
    console.log('Decoded User Info LOADED...');
  } catch (error) {
    console.error('Error decoding user credential:', error);
  }
  
  await googleAuth();
};

// Sign in failure callback called in initGoogleSignIn()
const onSignInFailure = (error) => {
  console.error('onSignInFailure:', error);
};

// Redirect user to Google's authentication page called in handleCredentialResponse()
const googleAuth = () => {
  console.log('googleAuth CALLED...');
  window.location.href = '/google-auth/authorize';
};

// Check if admin is authenticated with Google
const checkGoogleAuthentication = async (currentUser) => {
  try {
    console.log('Checking Google authentication...');
    const response = await fetch('/google-auth/google-check', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      if (response.status === 401) {
        console.log('Google Account access revoked.');
      }
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.isGoogleAuthenticated) {
      console.log('Admin is authenticated with Google.');
      signedIn.classList.remove('hide');
      googleSignIn.classList.add('hide');
      return true;
    }
  } catch (error) {
    console.error('Error checking Google authentication:', error);
  }
  console.log('Admin needs to re-authenticate with Google.');
  
  if (currentUser.role === 'admin') {
    googleTab.click();
    googleTab.classList.add('clicked');
    
    document.querySelector('#account').classList.add('hide');
    document.querySelector('#google').classList.remove('hide');
    
    signedIn.classList.add('hide');
    googleSignIn.classList.remove('hide');
    
    showGoogleSignInModal();
    setTimeout(hideModal, 4000);
    return false;
  } else {
    showFlashcardsModal();
    setTimeout(hideModal, 4000);
    return false;
  }
};

// Export to dashboard.js
export { checkGoogleAuthentication, fetchConfig };
