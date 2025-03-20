document.addEventListener("DOMContentLoaded", function () {
    // Handle form submissions
    function handleFormSubmission(formId, inputId, successMessage) {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent actual form submission
            const inputField = document.getElementById(inputId);
            if (inputField && inputField.value.trim() !== "") {
                alert(successMessage + ": " + inputField.value);
                inputField.value = ""; // Clear input field after submission
            } else {
                alert("Please enter a valid value.");
            }
        });
    }

    // Attach event listeners to forms
    handleFormSubmission("personal-info-form", "username", "Username updated");
    handleFormSubmission("personal-info-form", "first-name", "First name updated");
    handleFormSubmission("personal-info-form", "last-name", "Last name updated");
    handleFormSubmission("email-form", "email", "Email updated");
    handleFormSubmission("availability-form", "start-time", "Availability updated");

    // Availability Form Submission
    const availabilityForm = document.getElementById("availability-form");
    if (availabilityForm) {
        availabilityForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const startTime = document.getElementById("start-time").value;
            const endTime = document.getElementById("end-time").value;

            if (startTime && endTime && startTime < endTime) {
                alert(`Availability set from ${startTime} to ${endTime}`);
            } else {
                alert("Please enter a valid time range.");
            }
        });
    }

    // Sidebar Links Highlighting (Optional)
    const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function () {
            sidebarLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });
});
