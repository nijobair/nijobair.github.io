/*
------------------------------------------------------------
Navigation Bar Functionality
------------------------------------------------------------
*/
window.myMenuFunction = function () {
    var menuBtn = document.getElementById("myNavMenu");
    var menuIcon = document.getElementsByClassName("nav-menu-btn")[0];

    if (menuBtn.className === "nav-menu") {
        menuBtn.className += " responsive";
        menuIcon.className += " open";
    } else {
        menuBtn.className = "nav-menu";
        menuIcon.className = "nav-menu-btn";
    }
};

/*
------------------------------------------------------------
Header Shadow on Scroll
------------------------------------------------------------
*/
window.onscroll = function () { headerShadow() };

function headerShadow() {
    const navHeader = document.getElementById("header");

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

        navHeader.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";

    } else {

        navHeader.style.boxShadow = "none";
        navHeader.style.height = "90px";
        navHeader.style.lineHeight = "90px";

    }
}

/*
------------------------------------------------------------
Loader
------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("load", function () {
        // Hide the loader
        var loader = document.querySelector('.loader');
        loader.style.display = 'none';

        // Show the main content
        var mainContent = document.querySelector('container');
        mainContent.style.display = 'block';
    });
});