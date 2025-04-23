window.onload = function() {
    const email = sessionStorage.getItem('loggedInUserEmail');
    if (!email) {
        alert('No user is logged in. Please log in first.');
        window.location.href = 'SignUp-Login.html';
        return;
    }

    const user = JSON.parse(localStorage.getItem('user_' + email));
    document.getElementById('walletBalance').innerText = user.balance;
    if (user.balance < 5000) {
        document.getElementById('lowBalanceAlert').classList.remove('d-none');
    }
    loadItems(user.items || []);
};

function loadItems(items) {
    const itemsList = document.getElementById('itemsList');
    itemsList.innerHTML = '';

    if (items.length === 0) {
        itemsList.innerHTML = '<p>No items found in your wallet.</p>';
        return;
    }

    items.forEach((item, index) => {
        const itemCard = `
        <div class="col-lg-4 col-sm-6 col-xs-12">
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${item.type.toUpperCase()}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${item.name}</h6>
                    <button class="btn btn-primary btn-sm" onclick="viewItemDetail(${index})">See in Detail</button>
                </div>
            </div>
        </div>`;
        itemsList.innerHTML += itemCard;
    });
}

// Function to export items to PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Stored Items Report", 105, y, { align: "center" });
    y += 10;

    const email = sessionStorage.getItem('loggedInUserEmail');
    const user = JSON.parse(localStorage.getItem('user_' + email));

    user.items.forEach((item, index) => {
        // Ensure spacing between items
        if (y > 270) {  // Adjust page size limit to avoid overflow
            doc.addPage();
            y = 10;  // Reset y-coordinate for the new page
        }

        y += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(14);
        doc.text(`${index + 1}. ${item.type.toUpperCase()}: ${item.name}`, 10, y);
        y += 7;

        // Split description text into lines to handle long descriptions
        const descriptionLines = doc.splitTextToSize(`Description: ${item.details}`, 180);  // Adjust width if needed
        doc.setFontSize(12);
        descriptionLines.forEach((line) => {
            doc.text(line, 10, y);
            y += 7;  // Move down for each line of text
        });
        y += 3;  // Extra space between items
    });

    doc.save("Stored_Items_Report.pdf");
}


function addNewItem() {
    window.location.href = 'add-item.html';
}

function goToPurchasePage() {
    window.location.href = 'purchase.html';
}

function goToWalletManagement() {
    window.location.href = 'wallet-management.html';
}

function goToSignUpLogIn() {
    window.location.href = 'SignUp-Login.html';
}

function viewItemDetail(itemIndex) {
    sessionStorage.setItem('selectedItemIndex', itemIndex);
    window.location.href = 'item-details.html';
}
