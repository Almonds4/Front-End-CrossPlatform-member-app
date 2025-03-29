document.addEventListener("DOMContentLoaded", function () {
  // Simulating logged-in student info
  const student = {
    name: "John Doe",
    email: "john.doe@example.com"
  };

  // Ensure elements exist before trying to use them
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  if (nameInput && emailInput) {
    // Pre-fill name and email but allow editing
    nameInput.value = student.name;
    emailInput.value = student.email;
  }

  // Form submission event
  document.getElementById("requestForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values safely
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const requestType = document.getElementById("requestType").value;
    const comments = document.getElementById("comments").value.trim();

    // Validate fields
    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    // Simulating email submission
    console.log("Submitting request...");
    console.log(`Name: ${name}\nEmail: ${email}\nRequest Type: ${requestType}\nComments: ${comments || "None"}`);

    // Show confirmation message
    const messageBox = document.getElementById("message");
    messageBox.style.display = "block";
    messageBox.textContent = "Your request has been submitted successfully!";

    // Optionally redirect after 1 second
    setTimeout(() => {
      window.location.href = "Settings.html"; 
    }, 1000);
  });
});