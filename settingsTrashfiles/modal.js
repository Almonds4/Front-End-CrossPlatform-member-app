// This JavaScript is already included in the HTML inside the <script> tag
// Handles the pop-up modal functionality
document.getElementById("change-password-btn").addEventListener("click", function() {
  var changePasswordModal = new bootstrap.Modal(document.getElementById("changePasswordModal"));
  changePasswordModal.show();
});


document.getElementById("submitButton").addEventListener("click", function(event) {
  event.preventDefault();

  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  // Handle form submission (e.g., save the new password)
  console.log("Password changed successfully!");
});
