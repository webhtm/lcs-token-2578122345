// Password protection - verify the password before showing the content
const correctPassword = "shahan2025"; // The correct password

function verifyPassword() {
    const enteredPassword = document.getElementById("password").value;  // Get password from the input
    const errorMessage = document.getElementById("passwordError");

    if (enteredPassword === correctPassword) {
        document.getElementById("passwordPrompt").style.display = "none";  // Hide password prompt
        document.getElementById("tokenSection").style.display = "block";   // Show token section
        errorMessage.style.visibility = "hidden"; // Hide error message
    } else {
        errorMessage.style.visibility = "visible"; // Show error message
    }
}

// Add event listener to handle "Enter" key press
document.getElementById("password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        verifyPassword();
    }
});
