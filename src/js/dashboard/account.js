const fetchAccountData = async () => {
  try {
    const response = await fetch('/account/account-data', { credentials: 'include' });
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const data = await response.json();
    
    const acctName = document.getElementById('acct-name');
    const acctUsername = document.getElementById('acct-username');
    const acctPassword = document.getElementById('acct-password');
    if (data.user) {
      if (acctName) acctName.textContent = data.user.name;
      if (acctUsername) acctUsername.textContent = data.user.username;
      if (acctPassword) acctPassword.textContent = data.user.password;
    }
    
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Export to dashboard.js
export { fetchAccountData };