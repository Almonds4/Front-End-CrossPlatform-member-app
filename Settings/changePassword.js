document.addEventListener('DOMContentLoaded', () => {
  const changePasswordForm = document.getElementById('changePasswordForm');

  if (changePasswordForm) {
      // Listen for form submission
      changePasswordForm.addEventListener('submit', function (e) {
          e.preventDefault();  // Prevent default form submission

          // Get form input values
          const currentPassword = document.getElementById('current-password').value;
          const newPassword = document.getElementById('new-password').value;
          const confirmPassword = document.getElementById('confirm-password').value;

          // Password validation
          if (newPassword.length < 12) {
              alert('Password must be at least 12 characters long!');
              return;  // Prevent form submission if validation fails
          }

          // Check if the new password matches the confirmation
          if (newPassword !== confirmPassword) {
              alert('New passwords do not match!');
              return;  // Prevent form submission if passwords do not match
          }

          // Send the password change request to the backend API
          fetch('/api/change-password', {  // Your actual API endpoint here
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  currentPassword,
                  newPassword
              })
          })
          .then(response => response.json())  // Assuming the backend returns a JSON response
          .then(data => {
              if (data.success) {
                  alert('Password changed successfully!');
              } else {
                  alert('Error: ' + data.message);
              }
          })
          .catch(error => {
              alert('Error: ' + error.message);  // In case of any network or server error
          });
      });
  }
});
