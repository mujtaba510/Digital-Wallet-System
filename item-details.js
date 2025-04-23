window.onload = function() {
    const email = sessionStorage.getItem('loggedInUserEmail');
    const selectedItemIndex = sessionStorage.getItem('selectedItemIndex');
    
    if (!email || selectedItemIndex === null) {
        alert('No item selected or user not logged in.');
        window.location.href = 'SignUp-Login.html';  // Redirect if not logged in or item not found
        return;
    }

    const user = JSON.parse(localStorage.getItem('user_' + email));
    const item = user.items[selectedItemIndex];

    // Display the item details
    const itemDetailsDiv = document.getElementById('itemDetails');
    itemDetailsDiv.innerHTML = `
        <h5 class="card-title">${item.name.toUpperCase()}</h5>
        <p class="card-text">${item.details}</p>
        ${item.type === 'funds' ? `<p><strong>Amount:</strong> ${item.fundsAmount} PKR</p>` : ''}
    `;

    // Handle Delete button
    document.getElementById('deleteButton').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete this item?')) {
            // Remove the item from the user's list
            user.items.splice(selectedItemIndex, 1);
            // Update the user object in localStorage
            localStorage.setItem('user_' + email, JSON.stringify(user));
            // Redirect back to dashboard
            alert('Item deleted successfully.');
            window.location.href = 'dashboard.html';
        }
    });

    // Handle Edit button
    document.getElementById('editButton').addEventListener('click', function() {
        // Prompt for new item name with current item name as default
        const newName = prompt('Enter new name for the item:', item.name);
        if (newName !== null && newName.trim() !== '') {
            item.name = newName;  // Update item name

            // Prompt for new item details with current item description as default
            const newDetails = prompt('Enter new details for the item:', item.details);
            if (newDetails !== null && newDetails.trim() !== '') {
                item.details = newDetails;  // Update item details

                // If the item type is "funds", prompt for a new amount with current amount as default
                if (item.type === 'funds') {
                    const newAmount = parseFloat(prompt('Enter new amount:', item.fundsAmount));
                    if (!isNaN(newAmount)) {
                        item.fundsAmount = newAmount;  // Update amount if it's a fund item
                    } else {
                        alert('Invalid amount. Please enter a number.'); // Alert if the amount is invalid
                    }
                }

                // Save the updated item back to localStorage
                localStorage.setItem('user_' + email, JSON.stringify(user));
                // Redirect back to dashboard
                alert('Item updated successfully.');
                window.location.href = 'dashboard.html';
            } else {
                alert('Item description cannot be empty.'); // Alert if description is empty
            }
        } else {
            alert('Item name cannot be empty.'); // Alert if name is empty
        }
    });
};




