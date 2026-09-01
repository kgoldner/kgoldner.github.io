/* Shared navigation bar.
 *
 * Every page carries an empty <div id="navbar"></div>; this fills it from
 * navbar.html so the nav only has to be edited in one place. The links in
 * navbar.html are site-absolute ("/research.html"), so they work at any depth
 * and need no rewriting here.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const mount = document.getElementById('navbar');
    if (!mount) return;

    try {
        const response = await fetch('/navbar.html');
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        mount.innerHTML = await response.text();
    } catch (err) {
        console.error('Could not load the navbar:', err);
        return;
    }

    // "/blog/job-market.html" and "/blog/" are both the "blog" section;
    // "/research.html" is "research"; "/" is "index".
    function sectionOf(pathname) {
        const parts = pathname.replace(/\/$/, '/index.html').split('/').filter(Boolean);
        const name = parts.length > 1 ? parts[0] : (parts[0] || 'index.html');
        return name.replace(/\.html$/, '');
    }

    // A page that is not itself a nav section can say where it belongs with
    // <body data-nav="service">.
    const current = document.body.dataset.nav || sectionOf(window.location.pathname);

    for (const link of mount.querySelectorAll('.nav a[href^="/"]')) {
        const active = sectionOf(new URL(link.href).pathname) === current;
        link.parentElement.classList.toggle('on', active);
        link.parentElement.classList.toggle('off', !active);
    }
});
