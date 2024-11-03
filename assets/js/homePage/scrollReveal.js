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
sr.reveal('.badge:nth-child(odd)', { origin: 'left', interval: 200 })
sr.reveal('.badge:nth-child(even)', { origin: 'right', interval: 200 })

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