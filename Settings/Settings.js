document.addEventListener('DOMContentLoaded', () => {
  // Fetching user information dynamically from the backend (username, first name, last name, and email)
  fetch('/api/getUserInfo')  // Replace with actual API endpoint for user info
    .then(response => response.json())
    .then(data => {
      // Assuming the backend sends a JSON object with `username`, `firstName`, `lastName`, `email` fields
      const usernameInput = document.getElementById('username');
      const firstNameInput = document.getElementById('first-name');
      const lastNameInput = document.getElementById('last-name');
      const emailInput = document.getElementById('email');
      
      if (usernameInput && firstNameInput && lastNameInput && emailInput) {
        usernameInput.value = data.username;
        firstNameInput.value = data.firstName;
        lastNameInput.value = data.lastName;
        emailInput.value = data.email;
      }
    })
    .catch(error => {
      console.error('Error fetching user information:', error);
      alert('Error loading user information.');
    });

  // Handle personal information, email, and availability form submission
  const personalInfoForm = document.getElementById('personal-info-form');

  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', function (e) {
      e.preventDefault();  // Prevent the default form submission

      // Get updated values from the form
      const updatedUsername = document.getElementById('username').value;
      const updatedFirstName = document.getElementById('first-name').value;
      const updatedLastName = document.getElementById('last-name').value;
      const updatedEmail = document.getElementById('email').value;
      const updatedAvailabilityStart = document.getElementById('availability-start').value;
      const updatedAvailabilityEnd = document.getElementById('availability-end').value;



      // Send updated user data to the backend to save changes
      fetch('/api/updateUserInfo', {  // Replace with actual API endpoint for updating user info
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: updatedUsername,
          firstName: updatedFirstName,
          lastName: updatedLastName,
          email: updatedEmail,
          availabilityStart: updatedAvailabilityStart,
          availabilityEnd: updatedAvailabilityEnd
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Updated successfully!');
        } else {
          alert('Failed to update personal information. Please try again. ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error updating user information:', error);
        alert('Error updating user information.');
      });
    });
  }
});

    // Handle change password modal submission
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
      changePasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        // Get password values
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
  
        // Check if new password is at least 12 characters long
        if (newPassword.length < 12) {
          alert('Password must be at least 12 characters long.');
          return; // Prevent form submission
        }
  
        // Check if new passwords match
        if (newPassword !== confirmPassword) {
          alert('Passwords do not match.');
          return; // Prevent form submission
        }

        // Check password strength (e.g., include uppercase, lowercase, number, special character)
      const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
      if (!passwordStrengthRegex.test(newPassword)) {
        alert('Password is not strong enough. Please include:\n- At least one uppercase letter\n- At least one lowercase letter\n- At least one number\n- At least one special character');
        return; // Prevent form submission
      }
  
        // If validation passes, simulate password change success
        alert('Password changed successfully'); 
        
      });
    }
  });  
  