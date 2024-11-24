document.addEventListener("DOMContentLoaded", () => {
    // Determine the depth of the current page
    const pathDepth = window.location.pathname.split('/').filter(Boolean).length - 1;

    // Dynamically load the navigation bar
    fetch(getNavbarPath(pathDepth))
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch navbar');
            return response.text();
        })
        .then(html => {
            const navbarElement = document.getElementById('navbar');
            navbarElement.innerHTML = html;

            // Adjust the links in the navbar based on the current depth
            const links = navbarElement.querySelectorAll('.nav a');
            links.forEach(link => {
                const originalHref = link.getAttribute('href');
                const adjustedHref = '../'.repeat(pathDepth) + originalHref;
                link.setAttribute('href', adjustedHref);
            });

            // Highlight the current section
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const currentPage = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
            const currentSection = currentPage.replace('.html', '');

            links.forEach(link => {
                const linkHref = link.getAttribute('href');
                const linkSection = linkHref.split('/').pop().replace('.html', '');

                if (linkSection === currentSection) {
                    link.parentElement.classList.add('on');
                    link.parentElement.classList.remove('off');
                } else {
                    link.parentElement.classList.add('off');
                    link.parentElement.classList.remove('on');
                }
            });
        })
        .catch(err => console.error('Error loading navbar:', err));
});

// Function to calculate the correct path for navbar.html based on depth
function getNavbarPath(depth) {
    // Adjust the navbar path based on the current depth of the page
    const navbarPath = 'navbar.html';
    return '../'.repeat(depth) + navbarPath;
}