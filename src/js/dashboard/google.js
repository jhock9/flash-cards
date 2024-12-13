const adminTab = document.querySelector('#admin-tab');
const connectedIcon = document.querySelector('#connected-icon');
const disconnectedIcon = document.querySelector('#disconnected-icon');
const googleSignIn = document.querySelector('#google-signin-wrapper');
let googleClientId; 
let redirectUrl;

import { hideModal, showFlashcardsModal, showGoogleSignInModal } from '../components/modals.js';
import { fetchAdminData } from './admin.js'; // fetchAdminData()

// Fetch Google Client ID from server
const fetchConfig = async () => {
  try {
    console.log('fetching config...');
    const response = await fetch('/config');
    const config = await response.json();
    console.log('Config fetched:', config);

    googleClientId = config.GOOGLE_CLIENT_ID;
    redirectUrl = config.REDIRECT_URL;
    
    if (googleClientId) {
      // Set the Google client ID dynamically in the HTML
      document.querySelector('#g_id_onload').setAttribute('data-client_id', config.GOOGLE_CLIENT_ID);
    }
    
    if (redirectUrl) {
      // Set the redirect URL for Google sign-in
      document.querySelector('#g_id_onload').setAttribute('data-login_uri', config.REDIRECT_URL);
    }
    
    console.log('googleClientId LOADED...'); 
    initGoogleSignIn();
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};

// Initialize Google Sign-In called in fetchConfig()
const initGoogleSignIn = () => {
  console.log('initGoogleSignIn CALLED...');
  if (!googleClientId) {
    console.error('Google Client ID is missing, cannot initialize sign-in');
    return;
  }
  if (!redirectUrl) {
    console.error('Redirect URL is missing, cannot initialize sign-in');
    return;
  }
  
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
      
      connectedIcon.classList.remove('hide');
      disconnectedIcon.classList.add('hide');
      googleSignIn.classList.add('hide');
      return true;
    }
  } catch (error) {
    console.error('Error checking Google authentication:', error);
  }
  console.log('Admin needs to re-authenticate with Google.');
  
  // If admin is not authenticated with Google
  if (currentUser.role === 'admin') {
    adminTab.click();
    adminTab.classList.add('clicked');
    
    // Default open on Admin tab
    document.querySelector('#account').classList.add('hide');
    document.querySelector('#admin').classList.remove('hide');
    
    connectedIcon.classList.add('hide');
    disconnectedIcon.classList.remove('hide');
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
