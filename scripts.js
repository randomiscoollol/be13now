// Sign up function
function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    if (username && password) {
        const timestamp = new Date().getTime();
        localStorage.setItem(username, JSON.stringify({ password, timestamp }));
        document.getElementById('signup-message').textContent = "Account created! Please log in.";
        toggleAuthContainers();
    } else {
        document.getElementById('signup-message').textContent = "Please fill in both fields.";
    }
}

// Login function
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        document.getElementById('username-display').textContent = username;
        startCountdown(userData.timestamp);
        toggleLoginCountdown();
    } else {
        document.getElementById('login-message').textContent = "Invalid credentials.";
    }
}

// Toggle between sign up and login
function toggleAuthContainers() {
    document.getElementById('signup-container').classList.toggle('hidden');
    document.getElementById('login-container').classList.toggle('hidden');
}

// Show countdown container
function toggleLoginCountdown() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('countdown-container').classList.remove('hidden');
}

// Countdown function
function startCountdown(signupTime) {
    const thirteenYears = 13 * 365 * 24 * 60 * 60 * 1000;
    const targetTime = signupTime + thirteenYears;

    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetTime - now;

        if (timeRemaining <= 0) {
            document.getElementById('countdown').textContent = "Congratulations! You've waited 13 years!";
            document.getElementById('game-container').classList.remove('hidden');
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();
}
