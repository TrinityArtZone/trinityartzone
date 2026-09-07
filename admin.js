// ===============================
// TRINITY ART ZONE ADMIN LOGIN
// ===============================

// Admin username and password
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "12345";


// Get login form
const loginForm = document.getElementById("adminLoginForm");


// Login process
loginForm.addEventListener("submit", function (event) {

    // Stop the form from refreshing the page
    event.preventDefault();

    // Get entered username and password
    const username = document.getElementById("adminUser").value.trim();
    const password = document.getElementById("adminPass").value;

    // Check login details
    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        // Login successful
        sessionStorage.setItem("adminLoggedIn", "true");

        // Open Student Section
        window.location.href = "student.html";

    } else {

        // Login failed
        document.getElementById("loginMessage").textContent =
            "Invalid username or password.";

    }

});
// ===============================
// ADMIN LOGOUT
// ===============================

const logoutButton = document.getElementById("logoutAdmin");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        // Remove admin login
        sessionStorage.removeItem("adminLoggedIn");

        // Go back to Admin login page
        window.location.href = "Admin.html";
    });
}
