document.addEventListener('DOMContentLoaded', () => {
    // Handle personal information form submission
    const personalInfoForm = document.getElementById('personal-info-form');
    const firstNameInput = document.getElementById('first-name');
    const lastNameInput = document.getElementById('last-name');
    const usernameInput = document.getElementById('username');
  
    personalInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Personal information updated successfully!');
      console.log('Updated Username:', usernameInput.value);
      console.log('Updated First Name:', firstNameInput.value);
      console.log('Updated Last Name:', lastNameInput.value);
    });
  
    // Handle email form submission
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email');
  
    emailForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Email updated successfully!');
      console.log('Updated Email:', emailInput.value);
    });
  
    // Handle availability form submission
    const availabilityForm = document.getElementById('availability-form');
    const timeStartInput = availabilityForm.querySelectorAll('input')[0];
    const timeEndInput = availabilityForm.querySelectorAll('input')[1];
  
    availabilityForm.addEventListener('submit', (event) => {
      event.preventDefault();
      alert('Availability updated successfully!');
      console.log('Available from:', timeStartInput.value);
      console.log('Available until:', timeEndInput.value);
    });
  });
  