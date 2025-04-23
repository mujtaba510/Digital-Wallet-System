window.onload = function()
{
    const email = sessionStorage.getItem('loggedInUserEmail');
    const selectedItemIndex = sessionStorage.getItem('selectedItemIndex');
    
    if (!email) {
        alert('No item selected or user not logged in.');
        window.location.href = 'SignUp-Login.html';  // Redirect if not logged in or item not found
        return;
    }
}


// List of products for each category
const productCategories = {
    clothing: [
        { name: 'T-shirt', price: 500 },
        { name: 'Jeans', price: 1200 },
        { name: 'Jacket', price: 1800 },
        { name: 'Shoes', price: 1500 }
    ],
    food: [
        { name: 'Pizza', price: 800 },
        { name: 'Burger', price: 300 },
        { name: 'Pasta', price: 600 },
        { name: 'Sushi', price: 1200 }
    ],
    movies: [
        { name: 'Avengers', price: 350 },
        { name: 'Inception', price: 400 },
        { name: 'Joker', price: 450 },
        { name: 'Deadpool', price: 400 }
    ]
};

// Function to load products based on selected category
function loadProducts() {
    const category = document.getElementById('categorySelect').value;
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Clear previous products

    if (!category) {
        productList.innerHTML = '<p>Please select a category.</p>';
        return;
    }

    const products = productCategories[category];

    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-sm-6 col-lg-3 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title purchase-item">${product.name}</h6>
                        <p class="card-text">Price: ${product.price} PKR</p>
                        <button class="btn btn-primary btn-size" onclick="buyProduct('${product.name}', ${product.price})">Buy</button>
                    </div>
                </div>
            </div>`;
        productList.innerHTML += productCard;
    });
}

// Function to handle product purchase
function buyProduct(productName, productPrice) {
    const email = sessionStorage.getItem('loggedInUserEmail');
    if (!email) {
        alert('You must be logged in to make a purchase.');
        return;
    }

    const user = JSON.parse(localStorage.getItem('user_' + email));

    // Check if user has enough balance
    if (user.balance >= productPrice) {
        user.balance -= productPrice;
        user.transactions.push({
            type: 'Purchase - ' + productName,
            amount: productPrice,
            date: new Date().toLocaleString()
        });

        // Save updated user data
        localStorage.setItem('user_' + email, JSON.stringify(user));
        alert('Purchase successful!');

        // Update wallet balance in the alert
        document.getElementById('walletBalance').innerText = user.balance;

        // Reload wallet balance
        loadWalletBalance();
    } else {
        alert('Insufficient balance. Please add funds to your wallet.');
    }
}

// Function to load wallet balance
function loadWalletBalance() {
    const email = sessionStorage.getItem('loggedInUserEmail');
    const user = JSON.parse(localStorage.getItem('user_' + email));
    document.getElementById('walletBalance').innerText = user.balance;
}

// Load initial wallet balance
loadWalletBalance();




