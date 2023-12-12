const togglePasswordVisibility = () => {
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');

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
};

// export to login.js and account.js
export { togglePasswordVisibility };