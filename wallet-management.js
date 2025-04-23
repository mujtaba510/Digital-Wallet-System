window.onload = function() {
    // Retrieve logged-in user data
    const email = sessionStorage.getItem('loggedInUserEmail');
    if (!email) {
        alert('No user is logged in. Please log in first.');
        window.location.href = 'SignUp-Login.html';  // Redirect to login if not logged in
        return;
    }

    const user = JSON.parse(localStorage.getItem('user_' + email));
    if (!user) {
        alert('User data not found. Please log in again.');
        window.location.href = 'SignUp-Login.html';
        return;
    }

    // Display the current wallet balance
    document.getElementById('walletBalance').innerText = user.balance;

    // Load and display transaction history
    loadTransactionHistory(user.transactions || []);

    // Bind the addFunds function to the button click event
    document.getElementById('addFundsBtn').onclick = addFunds;  // Ensure this is correctly assigned
};

// Function to add funds
function addFunds() {
    const email = sessionStorage.getItem('loggedInUserEmail');
    const user = JSON.parse(localStorage.getItem('user_' + email));

    const amount = parseFloat(document.getElementById('addAmount').value);

    // Check for valid input
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than zero.');
        return;
    }

    // Update wallet balance
    user.balance += amount;

    // Ensure transactions array exists
    if (!user.transactions) {
        user.transactions = [];
    }

    // Add transaction to history
    user.transactions.push({
        type: 'Add Funds',
        amount: amount,
        date: new Date().toLocaleString()
    });

    // Save updated user data back to localStorage
    localStorage.setItem('user_' + email, JSON.stringify(user));

    // Update displayed balance
    document.getElementById('walletBalance').innerText = user.balance;
    alert('Funds added successfully!');
    document.getElementById('addAmount').value = '';  // Reset input field

    // Reload transaction history
    loadTransactionHistory(user.transactions);
}

// Function to load transaction history
function loadTransactionHistory(transactions) {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';  // Clear previous transactions

    if (transactions.length === 0) {
        transactionList.innerHTML = '<li class="list-group-item">No transactions found.</li>';
        return;
    }

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerText = `${transaction.date}: ${transaction.type} - ${transaction.amount} PKR`;
        transactionList.prepend(listItem);
    });
}
