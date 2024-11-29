import 'https://unpkg.com/scrollreveal';
import 'https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js';

import './homePage/scrollReveal.js';

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
Typing effect
------------------------------------------------------------
*/
var typingEffect = new Typed(".typedText", {
    strings: ["Data Analyst", "Physicist"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
})

/*
------------------------------------------------------------
Copy Button in Code Blocks
------------------------------------------------------------
*/
let codeBlocks = document.querySelectorAll('pre');

codeBlocks.forEach(function (codeBlock) {
    let copyButton = document.createElement('button');
    copyButton.className = 'copy';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';

    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
        let code = codeBlock.querySelector('code').innerText.trim();
        window.navigator.clipboard.writeText(code);

        copyButton.innerText = 'Copied';
        let fourSeconds = 4000;

        setTimeout(function () {
            copyButton.innerText = 'Copy';
        }, fourSeconds);
    });
});

/*
------------------------------------------------------------
Image Lightbox
------------------------------------------------------------
*/
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('.lightbox-image')
images.forEach(image => {
    image.addEventListener('click', e => {
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while (lightbox.firstChild) {
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click', e => {
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})