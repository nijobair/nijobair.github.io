const stickyHeader = document.getElementById('sticky-header');
const siteLogo = document.getElementById('site-logo');

// Listen for scroll events
window.addEventListener('scroll', function () {
    // Check if the page is scrolled down from the top
    if (window.scrollY > 100) { // You can adjust this value
        siteLogo.style.filter = 'invert(1)';
        stickyHeader.style.display = 'flex';
    } else {
        siteLogo.style.filter = 'invert(0)';
        stickyHeader.style.display = 'none';
    }
});
