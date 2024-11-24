document.addEventListener("DOMContentLoaded", () => {
    // Dynamically load the navigation bar
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch navbar');
            return response.text();
        })
        .then(html => {
            const navbarElement = document.getElementById('navbar');
            navbarElement.innerHTML = html;

            // Determine the depth of the current page
            const pathDepth = window.location.pathname.split('/').filter(Boolean).length - 1;

            // Adjust the links in the navbar
            const links = navbarElement.querySelectorAll('.nav a');
            links.forEach(link => {
                const originalHref = link.getAttribute('href');
                const adjustedHref = '../'.repeat(pathDepth) + originalHref;
                link.setAttribute('href', adjustedHref);
            });

            // Highlight the current section
            const pathParts = window.location.pathname.split('/').filter(Boolean);
            const currentPage = pathParts.length > 0 ? pathParts[pathParts.length - 1] : '';
            
            // Remove ".html" extension from the current page name
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
