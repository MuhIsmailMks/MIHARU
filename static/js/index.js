//  scroll animation Effect
AOS.init({
    once: true
});
 

// copy address
const copyAddress = document.querySelector('.copy-box');
    
let text = document.querySelector('.copy-box__text'); 
let btnText = text.textContent;
let timeout;

copyAddress.addEventListener('click', () => { 
    navigator.clipboard.writeText(text.textContent).then(function () {
        text.textContent = 'Copied';

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            text.textContent = textText;
        }, 2000);
    }).catch(function (err) {
        console.error('Failed to copy text: ', err);
    });
    
})