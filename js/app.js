document.addEventListener('mousemove', function (event) {
  const x = event.clientX - window.innerWidth / 2;
  const y = event.clientY - window.innerHeight / 2;

  document.body.style.setProperty('--mouse-x', x + 'px');
  document.body.style.setProperty('--mouse-y', y + 'px');
});

// const enterBtn = document.querySelector('.enter__btn');
// const enterScreen = document.querySelector('.enter');
// enterBtn.addEventListener('click', () => enter(false));

// function enter(force = false) {
//   enterScreen.classList.add('hide');
//   if (!force)
//     setTimeout(() => {
//       enterScreen.remove();
//     }, 1000);
//   else enterScreen.remove();
//   document.body.classList.remove('overflow-hidden');
// }

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
