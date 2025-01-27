import 'https://unpkg.com/scrollreveal';
import 'https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js';




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
Scrolling Logos
------------------------------------------------------------
*/
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for reduced motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);

        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}


/*
------------------------------------------------------------
ScrollReveal Animation
------------------------------------------------------------
*/
const sr = ScrollReveal({
    origin: 'top',  // 'bottom', 'left', 'right', 'top'. We set the default origin to 'top'.
    distance: '90px',
    duration: 2000,
    reset: true
})


/*
------------------------------------------------------------
Hero Section
------------------------------------------------------------
*/
sr.reveal('.featured-text-card', {})
sr.reveal('.featured-name', { delay: 100 })
sr.reveal('.featured-text-info', { delay: 200 })
sr.reveal('.featured-text-btn', { delay: 200 })
sr.reveal('.social-media', { delay: 200 })
sr.reveal('.hero-image', { delay: 300 })

/*
------------------------------------------------------------
Headers
------------------------------------------------------------
*/
sr.reveal('.home-title', {})

/*
------------------------------------------------------------
About
------------------------------------------------------------
*/
sr.reveal('.about-info', { origin: 'left', delay: 100 })
sr.reveal('.education', { origin: 'right', delay: 100 })

/*
------------------------------------------------------------
Achievements
------------------------------------------------------------
*/
sr.reveal('.badge:nth-child(odd)', { origin: 'left', interval: 100 })
sr.reveal('.badge:nth-child(even)', { origin: 'right', interval: 100 })

/*
------------------------------------------------------------
Publications
------------------------------------------------------------
*/
sr.reveal('.post:nth-child(1)', { origin: 'left', interval: 200 })
sr.reveal('.post:nth-child(2)', { interval: 200 })
sr.reveal('.post:nth-child(3)', { origin: 'right', interval: 200 })


/* -- PROJECT BOX -- */
sr.reveal('.project-box', { interval: 200 })
sr.reveal('.post:nth-child(2)', { interval: 200 })