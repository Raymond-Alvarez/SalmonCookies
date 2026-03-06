(function() {
    // 1. Apply theme immediately on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 2. Attach the click listener to the button on EVERY page
    window.addEventListener('DOMContentLoaded', () => {
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const html = document.documentElement;
                const currentTheme = html.getAttribute('data-theme');
                
                if (currentTheme === 'dark') {
                    html.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    html.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
            });
        }
    });
})();