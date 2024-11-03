import 'https://unpkg.com/typed.js@2.0.16/dist/typed.umd.js';

/*
------------------------------------------------------------
Typing effect
------------------------------------------------------------
*/
var typingEffect = new Typed(".typedText", {
    strings: ["Data Analyst", "Physicst", "Statistical Analyst"],
    loop: true,
    typeSpeed: 100,
    backSpeed: 80,
    backDelay: 2000
})