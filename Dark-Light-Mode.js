// Dark Mode Toggle
document.querySelector('.dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Change icon between sun and moon
    const icon = document.querySelector('.dark-mode-toggle');
    if (icon.classList.contains('bi-moon-fill')) {
        icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
        localStorage.setItem('darkMode', 'enabled'); // Save dark mode preference
    } else {
        icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
        localStorage.setItem('darkMode', 'disabled'); // Save light mode preference
    }

    // Change CSS variables for dark mode
    updateTheme();
});

// Function to update the theme based on mode
function updateTheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.documentElement.style.setProperty('--primary-color', '#007bff');
        document.documentElement.style.setProperty('--light-background', '#121212');
        document.documentElement.style.setProperty('--secondary-color', '#f8f9fa');
        document.documentElement.style.setProperty('--card-shadow-color', 'rgba(255, 255, 255, 0)');
        document.documentElement.style.setProperty('--navbar-bg-color', '#000000');
        document.documentElement.style.setProperty('--icon-color', 'white');
        document.documentElement.style.setProperty('--label-color', '#ffc107');
        document.documentElement.style.setProperty('--hover-color', '#ff0062');
        document.documentElement.style.setProperty('--card-bg-color', '#242424');
        document.documentElement.style.setProperty('--card-subtitle-color', 'rgba(255,255,255,0.8)');
    } else {
        document.documentElement.style.setProperty('--primary-color', '#007bff');
        document.documentElement.style.setProperty('--light-background', '#f8f9fa');
        document.documentElement.style.setProperty('--secondary-color', '#343a40');
        document.documentElement.style.setProperty('--card-shadow-color', 'rgba(0, 0, 0, 0.4)');
        document.documentElement.style.setProperty('--navbar-bg-color', '#f8f9fa');
        document.documentElement.style.setProperty('--icon-color', 'black');
        document.documentElement.style.setProperty('--label-color', 'black');
        document.documentElement.style.setProperty('--hover-color', 'black');
        document.documentElement.style.setProperty('--card-bg-color', '#fff');
        document.documentElement.style.setProperty('--card-subtitle-color', 'rgba(0,0,0,0.6)');
    }
}

// On page load, check dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.dark-mode-toggle').classList.replace('bi-moon-fill', 'bi-sun-fill');
        updateTheme(); // Update theme on load
    }
});