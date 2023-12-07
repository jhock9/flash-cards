// Check if user is authenticated; redirect to dashboard page
const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    const response = await fetch('/auth/local-check', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    console.log('Response:', response);
    const data = await response.json();
    
    console.log('Authentication data:', data);
    console.log('User data:', data.user);
    console.log('Type of data.isAuthenticated:', typeof data.isAuthenticated);

    console.log('Data before checking authentication:', data);
    console.log('Current pathname:', window.location.pathname);
    console.log('Window location:', window.location);

    if (data.isAuthenticated && window.location.pathname !== '/dashboard.html') {
      console.log('User is authenticated. Redirecting to dashboard...');
      window.location.href = './dashboard.html';
    } else if (window.location.pathname !== '/login.html') {
      console.log('User is not authenticated. Redirecting to login page...');
      // window.location.href = './login.html';
    }
    console.log('Data after checking authentication:', data);
    return data;
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
};

// Export to login.js and dashboard.js
export { checkAuthentication };
