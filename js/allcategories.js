/* Extracted from allcategories.html */

// Simple toggle logic for the mega menu if needed, reusing landingpage.js logic
    function toggleCat() {
        const menu = document.getElementById('catMenu');
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    }