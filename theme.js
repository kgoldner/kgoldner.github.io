/* Light/dark theme.
 *
 * Loaded synchronously from <head> so the theme is set before the first paint --
 * otherwise every light-mode visitor sees a flash of the dark palette. Keep it
 * small and keep it free of DOM lookups beyond documentElement.
 */
(() => {
    const KEY = 'theme';
    const LEGACY_KEY = 'sheet';   // older versions stored "dark.css" / "update.css"
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // The visitor's explicit choice, or null if they have never used the toggle.
    function chosen() {
        try {
            const theme = localStorage.getItem(KEY);
            if (theme === 'dark' || theme === 'light') return theme;

            const legacy = localStorage.getItem(LEGACY_KEY);
            if (legacy) return legacy === 'dark.css' ? 'dark' : 'light';
        } catch (err) {
            // Storage can throw in private browsing; fall back to the system theme.
        }
        return null;
    }

    function apply(theme) {
        document.documentElement.dataset.theme = theme;
    }

    apply(chosen() || (darkQuery.matches ? 'dark' : 'light'));

    // The toggle button arrives with the injected navbar, so listen on the document
    // rather than binding to a button that does not exist yet.
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.darktoggle')) return;

        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        apply(theme);
        try {
            localStorage.setItem(KEY, theme);
        } catch (err) {
            // Preference just will not persist.
        }
    });

    // Follow the system setting until the visitor picks a side.
    darkQuery.addEventListener('change', (event) => {
        if (!chosen()) apply(event.matches ? 'dark' : 'light');
    });
})();
