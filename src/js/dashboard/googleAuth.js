let googleClientID; 

// Fetch Google Client ID from server
const fetchConfig = async () => {
  try {
    const response = await fetch('/config');
    const config = await response.json();
    
    googleClientID = config.GOOGLE_CLIENT_ID;
    console.log('googleClientID LOADED...'); 
    
    initGoogleSignIn();
  } catch (error) {
    console.error('Error fetching configuration:', error);
  }
};

// Initialize Google Sign-In
const initGoogleSignIn = () => {
  google.accounts.id.initialize({
    client_id: googleClientID,
    callback: handleCredentialResponse,
    on_failure: onSignInFailure
  });
  
  google.accounts.id.renderButton(
    document.getElementById('google-signin'),
    { theme: 'outline', size: 'large', text: 'sign_in_with', logo_alignment: 'left' }
  );
};

// Sign in success callback
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

const onSignInFailure = (error) => {
  console.error('Sign-in error:', error);
};

// Redirect user to Google's authentication page
const googleAuth = () => {
  window.location.href = '/google-auth/authorize';
};

// Check if user is authenticated and redirect to login page if not
const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    const response = await fetch('/google-auth/is-authenticated', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.isAuthenticated) {
      console.log('User is authenticated.');
      sessionStorage.setItem('authenticationChecked', 'true');
      
      try {
        const photosData = await fetchPhotosData();
        savePhotosData(photosData);
        localStorage.setItem('photos', JSON.stringify(photosData));
      } catch (error) {
        console.error('Error fetching new photos:', error);
      }
      
      if (window.location.pathname === './login.html') {
        window.location.href = './flashcards.html';
      }
      
    } else {
      console.log('User is not authenticated.');
      if (window.location.pathname === './flashcards.html') {
        window.location.href = './login.html';
      }
    } 
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
};

// Export to dashboard.js
export { 
  fetchConfig, 
  checkAuthentication 
};