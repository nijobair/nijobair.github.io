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
    copyButton.innerHTML = '<i class="fa-solid fa-copy"></i>';

    codeBlock.append(copyButton);

    copyButton.addEventListener('click', function () {
        let code = codeBlock.querySelector('code').innerText.trim();
        window.navigator.clipboard.writeText(code);

        copyButton.innerHTML = '<i class="fa-solid fa-clipboard-check"></i>';
        let fourSeconds = 4000;

        setTimeout(function () {
            copyButton.innerHTML = '<i class="fa-solid fa-copy"></i>';
        }, fourSeconds);
    });
});