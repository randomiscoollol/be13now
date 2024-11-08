// Utility functions to show/hide sections
function showSignup() {
    console.log("Switching to Sign Up form.");
    // Show the signup form and hide the login form
    document.getElementById("signup-container").classList.remove("hidden");
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("countdown-container").classList.add("hidden");
}

function showLogin() {
    console.log("Switching to Login form.");
    // Show the login form and hide the signup form
    document.getElementById("signup-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("countdown-container").classList.add("hidden");
}

function showCountdown(username) {
    console.log("User logged in: " + username);
    // Show countdown container after login
    document.getElementById("signup-container").classList.add("hidden");
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("countdown-container").classList.remove("hidden");
    document.getElementById("username-display").textContent = username;
}

// Sign Up Function
function signUp() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const signupMessage = document.getElementById("signup-message");

    if (username && password) {
        if (!localStorage.getItem(username)) {
            const userData = {
                password: password,
                signupDate: new Date().getTime() // store the current time for countdown
            };
            localStorage.setItem(username, JSON.stringify(userData));
            signupMessage.textContent = "Account created! You can now log in.";
        } else {
            signupMessage.textContent = "Username already taken.";
        }
    } else {
        signupMessage.textContent = "Please enter a username and password.";
    }
}

// Login Function
function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loginMessage = document.getElementById("login-message");

    const userData = JSON.parse(localStorage.getItem(username));

    if (userData && userData.password === password) {
        showCountdown(username);
        startCountdown(userData.signupDate);
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}

// Countdown Function
function startCountdown(signupDate) {
    // Ensure signupDate is a valid timestamp
    if (isNaN(signupDate)) {
        console.error("Invalid signup date.");
        return;
    }

    const targetDate = new Date(signupDate);
    targetDate.setFullYear(targetDate.getFullYear() + 13); // 13 years from signup

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "Congratulations! You've waited 13 years!";
            document.getElementById("game-container").style.display = "block";
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Display countdown properly
            document.getElementById("countdown").textContent = `Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}
