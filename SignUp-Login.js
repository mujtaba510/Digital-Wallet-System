// Function to handle sign-up
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const initialBalance = parseFloat(document.getElementById('initialBalance').value);

    // Validate if balance is >= 5000
    if (initialBalance < 5000) {
        alert('The initial balance must be at least ₹5000.');
        return;
    }

    // Validate password length
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    // Store user data in localStorage
    const user = {
        name,
        email,
        password,
        balance: initialBalance,
        transactions: [] // Initialize transaction history
    };

    localStorage.setItem('user_' + email, JSON.stringify(user));
    alert('Sign-up successful! You can now log in.');

    document.getElementById('signupForm').reset();
});

// Function to handle login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Check if user exists
    const user = localStorage.getItem('user_' + email);
    if (!user) {
        alert('No account found with this email. Please sign up first.');
        document.getElementById('loginForm').reset();
        return;
    }

    const userData = JSON.parse(user);

    // Validate password length
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        document.getElementById('loginForm').reset();
        return;
    }

    // Validate password
    if (userData.password === password) {
        // Store the user's email in session storage for session persistence
        sessionStorage.setItem('loggedInUserEmail', email);

        alert('Login successful! Welcome ' + userData.name);
        document.getElementById('loginForm').reset();

        window.location.href = 'Dashboard.html';
        // Redirect to dashboard or other functionality after login
    } else {
        alert('Incorrect password.');
    }
});






