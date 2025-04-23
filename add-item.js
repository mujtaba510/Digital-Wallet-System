document.getElementById('itemType').addEventListener('change', function() {
    const itemType = this.value;
    const balanceSection = document.getElementById('balanceSection');

    // Show the funds input only if 'Funds' is selected as the item type
    if (itemType === 'funds') {
        balanceSection.style.display = 'block';
    } else {
        balanceSection.style.display = 'none';
    }
});

// Function to handle adding an item
document.getElementById('addItemForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const itemType = document.getElementById('itemType').value;
    const itemName = document.getElementById('itemName').value;
    const itemDetails = document.getElementById('itemDetails').value;
    let fundsAmount = null;

    // If funds were selected, get the funds amount
    if (itemType === 'funds') {
        fundsAmount = parseFloat(document.getElementById('fundsAmount').value);
    }

    // Retrieve logged-in user data
    const email = sessionStorage.getItem('loggedInUserEmail');
    if (!email) {
        alert('No user is logged in. Please log in first.');
        window.location.href = 'SignUp-Login.html';  // Redirect to login if not logged in
        return;
    }

    const user = JSON.parse(localStorage.getItem('user_' + email));

    // Create a new item object
    const newItem = {
        type: itemType,
        name: itemName,
        details: itemDetails,
        fundsAmount: fundsAmount || 0  // Set to 0 if funds are not applicable
    };

    // Update user's item list
    user.items = user.items || [];  // Ensure items array exists
    user.items.push(newItem);

    // Update the user object in localStorage
    localStorage.setItem('user_' + email, JSON.stringify(user));

    // Notify user and redirect to dashboard
    alert('Item added successfully! Redirecting to your dashboard.');
    window.location.href = 'dashboard.html';  // Redirect to the dashboard
});



