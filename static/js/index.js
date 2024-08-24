//  scroll animation Effect
AOS.init({
    once: true
});

// nav handler
const menu_btn = document.querySelector('nav .menu-button');
const menu_container = document.querySelector('nav .menu_container');

menu_btn.addEventListener('click', () => {
    menu_btn.classList.toggle('active')
    menu_container.classList.toggle('active')
})
 

// copy address
// const copyAddress = document.querySelector('.copy-box');
    
// let text = document.querySelector('.copy-box__text');
// let btn = document.querySelector('.copy-box__btn');
// let btnText = btn.textContent;
// let timeout;

// copyAddress.addEventListener('click', () => { 
//     navigator.clipboard.writeText(text.textContent).then(function () {
//         btn.textContent = 'Copied';

//         clearTimeout(timeout);
//         timeout = setTimeout(function () {
//             btn.textContent = btnText;
//         }, 2000);
//     }).catch(function (err) {
//         console.error('Failed to copy text: ', err);
//     });
    
// })