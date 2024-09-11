 // aos 
 AOS.init({ 
  once: true
});   

const burger = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.mobile-nav');

burger.addEventListener('click', () => toggleMobileNav());

function openMobileNav() {
  burger.classList.add('header__burger_active');
  mobileNav.classList.add('mobile-nav_active');
  document.body.classList.add('overflow-hidden');
}

function closeMobileNav() {
  burger.classList.remove('header__burger_active');
  mobileNav.classList.remove('mobile-nav_active');
  document.body.classList.remove('overflow-hidden');
}

function toggleMobileNav() {
  if (mobileNav.classList.contains('mobile-nav_active')) closeMobileNav();
  else openMobileNav();
}

// const audio = document.querySelector('audio');
// window.onload = () => audio.play();
// window.onclick = () => audio.play();
// window.onscroll = () => audio.play();

   // typed animation
   let elements = document.querySelectorAll('.writingAnimated');

   elements.forEach(element => {
       let typed = new Typed(element, {
           strings: [element.dataset.typedStrings],
           typeSpeed: 50,
           smartBackspace: false,
           loop: true
       });
   });

   const news_images = document.querySelectorAll('.news_image');
   const popUp_container = document.querySelector('.popUp_container');
   const image_popUp_container = document.querySelector('.popUp_container .image_popUp');

   news_images.forEach(news_image => {
news_image.addEventListener('click', () => {
const img = news_image.querySelector('img').src;
console.log(img);

image_popUp_container.src = img

popUp_container.classList.add('flex')
popUp_container.classList.remove('hidden')
})
})

popUp_container.addEventListener('click', () =>{
popUp_container.classList.remove('flex')
popUp_container.classList.add('hidden')
})




// contract copy
const copybtns = document.querySelectorAll(".contractCopy");
    
copybtns.forEach(copybtn => {
  copybtn.addEventListener("click", function() { 
    let textSpan = copybtn.querySelector('.value');
    let intervalId;
        let addressText = document.querySelector(".value").getAttribute('data-set');
        textSpan.innerHTML = 'COPIED';
 
        if (intervalId) {  
            clearInterval(intervalId);
        }
 
        intervalId = setInterval(() => {
            textSpan.innerHTML = '00000000000000000000000000000000000000000DEAD'; 
            clearInterval(intervalId);  
        }, 1000);
 
        navigator.clipboard.writeText(addressText);
    }); 
})
