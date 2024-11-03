function loadScript(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'module';
    document.body.appendChild(script);
}

loadScript('/assets/js/header.js');
loadScript('/assets/js/homePage/typing.js');
loadScript('/assets/js/copyButton.js');
loadScript('https://unpkg.com/scrollreveal');
loadScript('/assets/js/homePage/scrollReveal.js');
loadScript('/assets/js/lightbox.js');