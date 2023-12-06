// Check if user is authenticated; redirect to dashboard page
const checkAuthentication = async () => {
  try {
    console.log('Checking authentication...');
    const response = await fetch('/auth/local-check', { credentials: 'include' });
    if (!response.ok) {
      console.error(`Server responded with status: ${response.status}`);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    console.log('Authentication data:', data);
    if (data.role && window.location.pathname !== '/dashboard.html') {
      console.log('User is authenticated.');
      window.location.href = './dashboard.html';
    } else if (window.location.pathname !== '/login.html') {
      console.log('User is not authenticated.');
      window.location.href = './login.html';
    } 
  } catch (error) {
    console.error('Error checking authentication:', error);
  }
};

// Export to login.js and dashboard.js
export { checkAuthentication };
