// Mock database object (Simulating an API call)
const userAccount = {
    username: "john_doe",
    primaryEmail: "johndoe@example.com",
    recoveryEmail: "recovery@example.com",
    birthday: "2000-05-15",
    accountType: "Instructor",
    instructorOf: "ANP 365",
    notes: "This is a test account."
};

// Function to populate the form with user data
function loadUserData() {
    document.getElementById("username").value = userAccount.username;
    document.getElementById("primary-email").value = userAccount.primaryEmail;
    document.getElementById("recovery-email").value = userAccount.recoveryEmail;
    document.getElementById("birthday").value = userAccount.birthday;
    document.getElementById("account-type").value = userAccount.accountType;
    document.getElementById("instructor-of").value = userAccount.instructorOf;
    document.getElementById("notes").value = userAccount.notes;
}

// Function to generate a complex random password
function generateRandomPassword() {
    const length = 12;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/`~";
    
    const allChars = uppercase + lowercase + numbers + specialChars;
    
    let password = "";
    
    // Ensure password contains at least one uppercase, one number, and one special character
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];

    // Fill the rest randomly
    for (let i = 3; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle password for better randomness
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    return password;
}


let resetPassStatus = false;

// Event listener for Reset Password button
document.getElementById("resetPassword").addEventListener("click", function() {
    resetPassStatus = true;
});

// Function to save changes
document.getElementById("accountForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

   

    // Create an object for updated data
    const updatedData = {};
    
    // Check for changes and update only modified fields
    if (userAccount.username !== document.getElementById("username").value)
        updatedData.username = document.getElementById("username").value;

    if (userAccount.primaryEmail !== document.getElementById("primary-email").value)
        updatedData.primaryEmail = document.getElementById("primary-email").value;

    if (userAccount.recoveryEmail !== document.getElementById("recovery-email").value)
        updatedData.recoveryEmail = document.getElementById("recovery-email").value;

    if (userAccount.birthday !== document.getElementById("birthday").value)
        updatedData.birthday = document.getElementById("birthday").value;

    if (userAccount.accountType !== document.getElementById("account-type").value)
        updatedData.accountType = document.getElementById("account-type").value;

    if (userAccount.instructorOf !== document.getElementById("instructor-of").value)
        updatedData.instructorOf = document.getElementById("instructor-of").value;

    if (userAccount.notes !== document.getElementById("notes").value)
        updatedData.notes = document.getElementById("notes").value;

    if (resetPassStatus == true)
        console.log("Password has been reset");
        //TODO: Add logic to send the randomized password to the user through email assigned to account, function to generate password already exist
        // generateRandomPassword()

    

    // Simulating saving to backend
    console.log("Updated Data:", updatedData);

    // Update the local userAccount object (Simulating a backend update)
    Object.assign(userAccount, updatedData);
    
    alert("Changes saved successfully!");
});

// Load user data on page load
document.addEventListener("DOMContentLoaded", loadUserData);
