import 'https://unpkg.com/scrollreveal';
import 'https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js';




/*
------------------------------------------------------------
Typing effect
------------------------------------------------------------
*/
var typingEffect = new Typed(".typedText", {
    strings: ["Data Analyst", "Physics Lover"],
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
    distance: '70px',
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

/*
------------------------------------------------------------
Testimonials Section
------------------------------------------------------------
*/
var slide = document.getElementById('slide');
var upArrow = document.getElementById('upArrow');
var downArrow = document.getElementById('downArrow');

const testimonials = Array.from(slide.children);
const totalSlides = testimonials.length;
let currentIndex = 0;
let isAnimating = false;
const transitionDuration = 500;

// Initialize slide height
const slideHeight = testimonials[0].offsetHeight;

function handleTransitionEnd() {
    slide.removeEventListener('transitionend', handleTransitionEnd);
    isAnimating = false;
}

function handleNavigation(direction) {
    if (isAnimating || totalSlides <= 1) return;
    isAnimating = true;

    if (direction === 'down') {
        if (currentIndex === totalSlides - 1) {
            // Clone first element and append
            const clone = testimonials[0].cloneNode(true);
            slide.appendChild(clone);

            // First transition to clone
            slide.style.transition = `transform ${transitionDuration}ms ease`;
            slide.style.transform = `translateY(-${(currentIndex + 1) * slideHeight}px)`;

            // After transition completes
            slide.addEventListener('transitionend', function resetDown() {
                slide.style.transition = 'none';
                slide.style.transform = `translateY(0)`;
                slide.removeChild(clone);
                currentIndex = 0;

                // Force reflow before restoring transition
                void slide.offsetHeight;
                slide.style.transition = '';
                slide.removeEventListener('transitionend', resetDown);
                isAnimating = false;
            });
        } else {
            currentIndex++;
            slide.style.transition = `transform ${transitionDuration}ms ease`;
            slide.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
            slide.addEventListener('transitionend', handleTransitionEnd);
        }
    } else {
        if (currentIndex === 0) {
            // Clone last element and prepend
            const clone = testimonials[totalSlides - 1].cloneNode(true);
            slide.insertBefore(clone, slide.firstChild);

            // Set initial position
            slide.style.transition = 'none';
            slide.style.transform = `translateY(-${slideHeight}px)`;
            void slide.offsetHeight; // Force reflow

            // Animate to new position
            slide.style.transition = `transform ${transitionDuration}ms ease`;
            slide.style.transform = `translateY(0)`;

            // After transition completes
            slide.addEventListener('transitionend', function resetUp() {
                slide.style.transition = 'none';
                slide.removeChild(clone);
                currentIndex = totalSlides - 1;
                slide.style.transform = `translateY(-${currentIndex * slideHeight}px)`;

                // Force reflow before restoring transition
                void slide.offsetHeight;
                slide.style.transition = '';
                slide.removeEventListener('transitionend', resetUp);
                isAnimating = false;
            });
        } else {
            currentIndex--;
            slide.style.transition = `transform ${transitionDuration}ms ease`;
            slide.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
            slide.addEventListener('transitionend', handleTransitionEnd);
        }
    }
}

upArrow.onclick = () => handleNavigation('up');
downArrow.onclick = () => handleNavigation('down');