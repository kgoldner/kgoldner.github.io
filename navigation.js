document.addEventListener("DOMContentLoaded", () => {
    // Determine the depth of the current page
    const pathDepth = window.location.pathname.split('/').filter(Boolean).length - 1;

    // Dynamically load the navigation bar
    fetch(`.${'../'.repeat(pathDepth)}navbar.html`)  // Adjust path based on the current depth level
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch navbar');
            return response.text();
        })
        .then(html => {
            const navbarElement = document.getElementById('navbar');
            navbarElement.innerHTML = html;

            // Adjust the links in the navbar
            const links = navbarElement.querySelectorAll('.nav a');
            links.forEach(link => {
                const originalHref = link.getAttribute('href');
                const parentDiv = link.parentElement.parentElement;

                if (parentDiv.classList.contains('links')) {
                    // Skip updating the href for links in the "links" class
                    return;
                }

                // Adjust the href for links in "on" or "off" classes based on the current depth
                const adjustedHref = '../'.repeat(pathDepth) + originalHref;
                link.setAttribute('href', adjustedHref);
            });

            // Adjust the src of img tags inside the "links" class
            const socialImages = navbarElement.querySelectorAll('.links img');
            socialImages.forEach(img => {
                const originalSrc = img.getAttribute('src');
                const adjustedSrc = '../'.repeat(pathDepth) + originalSrc;
                img.setAttribute('src', adjustedSrc);
            });

            // Highlight the current section
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const currentPage = pathParts[0] || 'index'; // Default to 'index' if root directory

            // Remove ".html" extension from the current page name
            const currentSection = currentPage.replace('.html', '');

            links.forEach(link => {
                const linkHref = link.getAttribute('href');
                const linkSection = linkHref.split('/').shift().replace('.html', '');

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