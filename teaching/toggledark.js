// Function to detect system preference and set the initial theme
function detectAndSetTheme() {
    let savedTheme = localStorage.getItem("sheet");
    let defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark.css' : 'update.css';

    // Use saved theme if available, otherwise default to system preference
    let theme = savedTheme || defaultTheme;
    document.getElementById('theme').setAttribute('href', theme);
}

// Function to swap between light and dark mode
function swapStyleSheet() {
    var currentHref = document.getElementById('theme').getAttribute('href');
    var newHref = currentHref === 'dark.css' ? 'update.css' : 'dark.css';

    document.getElementById('theme').setAttribute('href', newHref);
    localStorage.setItem("sheet", newHref);
}

// Call the detectAndSetTheme function on page load
window.onload = detectAndSetTheme;    