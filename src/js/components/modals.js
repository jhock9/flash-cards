//**  GENERAL   **//
const modals = document.querySelectorAll('.modal');
const passwordReqModal = document.querySelector('#password-req-modal');
const passwordMismatchModal = document.querySelector('#password-mismatch-modal');

const addModalEventListeners = () => {
  modals.forEach(modal => {
    modal.addEventListener('click', event => {
      event.stopPropagation();
      hideModal();
    });
  });
};

const hideModal = () => {
  modals.forEach(modal => {
    modal.classList.add('hide');
  });
}

const showPasswordReqModal = () => {
  passwordReqModal.classList.remove('hide');
};

const showPasswordMismatchModal = () => {
  passwordMismatchModal.classList.remove('hide');
};


//**   LOGIN PAGE   **//
const incorrectUsernameModal = document.querySelector('#incorrect-username-modal');
const incorrectPasswordModal = document.querySelector('#incorrect-password-modal');
const successModal = document.querySelector('#success-modal');
const unavailableModal = document.querySelector('#unavailable-modal');

const showIncorrectUsernameModal = () => {
  incorrectUsernameModal.classList.remove('hide');
};

const showIncorrectPasswordModal = () => {
  incorrectPasswordModal.classList.remove('hide');
};

const showSuccessModal = () => {
  successModal.classList.remove('hide');
};

const showUnavailableModal = () => {
  unavailableModal.classList.remove('hide');
};


//**   DASHBOARD PAGE   **//
const flashcardsModal = document.querySelector('#flashcards-modal');
const currentPasswordIncorrectModal = document.querySelector('#current-password-incorrect-modal');
const passwordUpdatedModal = document.querySelector('#password-updated-modal');
const googleSignInModal = document.querySelector('#google-signin-modal');
const userCreatedModal = document.querySelector('#user-created-modal');
const clientCreatedModal = document.querySelector('#client-created-modal');
const noUsernameModal = document.querySelector('#no-username-modal');

const showPasswordUpdatedModal = () => {
  passwordUpdatedModal.classList.remove('hide');
};

const showCurrentPasswordIncorrectModal = () => {
  currentPasswordIncorrectModal.classList.remove('hide');
};

const showUserCreatedModal = () => {
  userCreatedModal.classList.remove('hide');
};

const showClientCreatedModal = () => {
  clientCreatedModal.classList.remove('hide');
};

const showNoUsernameModal = () => {
  noUsernameModal.classList.remove('hide');
};

const showGoogleSignInModal = () => {
  googleSignInModal.classList.remove('hide');
};

const showFlashcardsModal = () => {
  flashcardsModal.classList.remove('hide');
};


// Export to various files
export { 
  addModalEventListeners, // login.js, dashboard.js
  hideModal, // login.js, dashboard.js, account.js, google.js
  showIncorrectUsernameModal, // login.js
  showIncorrectPasswordModal, // login.js
  showSuccessModal, // login.js
  showUnavailableModal, // login.js, users.js
  showPasswordReqModal, // login.js, account.js
  showPasswordMismatchModal, // login.js, account.js
  showPasswordUpdatedModal, // account.js
  showCurrentPasswordIncorrectModal, // account.js
  showUserCreatedModal, // users.js
  showClientCreatedModal, // clients.js
  showNoUsernameModal, // clients.js
  showGoogleSignInModal, // google.js
  showFlashcardsModal // dashboard.js
};
