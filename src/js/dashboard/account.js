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

// Export to dashboard.js
export { fetchAccountData };