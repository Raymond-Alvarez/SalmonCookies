'use strict';

// 1. Function to handle the actual theme change
const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
};

// 2. Wait for the page to load so the button exists
window.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Check if the html tag currently has the dark theme attribute
            const isDark = document.documentElement.hasAttribute('data-theme');
            
            // If it's currently dark, switch to light. If light, switch to dark.
            applyTheme(isDark ? 'light' : 'dark');
        });
    }
});