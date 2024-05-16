// navbar handler
const menu_btn = document.querySelector('.menu-btn');
const ul = document.querySelector('nav ul');
menu_btn.addEventListener('click', () => {
    ul.classList.toggle('active')
})

// check loading video in browser
const videoElement = document.getElementById('transparent-video');
const webmSource = document.querySelector('source[type="video/webm"]');
 
function supportsWebMTransparency() {
    const elem = document.createElement('video');
    return elem.canPlayType('video/webm; codecs="vp9"') === 'probably' ||
           elem.canPlayType('video/webm; codecs="vp8, vorbis"') === 'probably';
}

if (!supportsWebMTransparency()) { 
    webmSource.remove();
    videoElement.load();
}
// loader
document.addEventListener('DOMContentLoaded', function () { 
    setTimeout(() => {
     document.querySelector('.loading').classList.add('show');
    }, 9000);
 });

 
  window.addEventListener('load', function() {
    let loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none'; 
    }
  }); 

  
 
function updateAttributesBasedOnWidth() {
    let widthWin = window.innerWidth;
    if (widthWin >= 1024) {
        ul.setAttribute('data-aos', 'fade-down');
        ul.setAttribute('data-aos-duration', '400');
        ul.setAttribute('data-aos-delay', '4000');
    } else {
        ul.removeAttribute('data-aos');
        ul.removeAttribute('data-aos-duration');
        ul.removeAttribute('data-aos-delay');
    }
}
 
updateAttributesBasedOnWidth(); 
window.addEventListener('resize', updateAttributesBasedOnWidth);


// address  
const copied = document.querySelector('.copied')
let addressContainer = document.querySelector('.address_form'); 

addressContainer.addEventListener('click', function() { 
    let addressText = addressContainer.querySelector('.address_form span').textContent;

    copied.classList.add('flex')
    copied.classList.remove('hidden')
    setInterval(() => {
        copied.classList.add('hidden')
        copied.classList.remove('flex')
    },1000);

    navigator.clipboard.writeText(addressText)
        .then(function() { 
            
        })
        .catch(function(error) { 
            alert('Cannot copy address:' + error);
        });
});

// safari autoplay video
document.addEventListener("DOMContentLoaded", function() {
    let videoServices = document.querySelectorAll('.video_service');

    function playVideo(video) {
        if (video.paused) {
            video.play().catch(function(error) {
                console.error("Video play was prevented:", error);
            });
        }
    }
 
    for (let video of videoServices) { 
        video.addEventListener('play', function() {
            video.muted = true;
        });
 
        video.addEventListener('loadeddata', function() {
            playVideo(video);
        });
 
        video.muted = true;
        video.controls = false;
    }
});




// chart
let ctx = document.getElementById('myPieChart').getContext('2d');

let myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Tokens 30% LP", "Token Sale", "Casino Treasury","Staking", "Rewards", "Team"],
        datasets: [{
            data: [30,30,20,10,5,5],
            backgroundColor: [
                '#16c1ec',
                '#8B93FF', 
                '#FF9800',
                '#EBF400',
                '#7469B6',
                '#8DECB4',
            ],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false 
        },
        tooltips: {
            enabled: false, 
            callbacks: {
                label: function(tooltipItem, data) {
                    let dataset = data.datasets[tooltipItem.datasetIndex];
                    let total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                        return previousValue + currentValue ;
                    });
                    let currentValue = dataset.data[tooltipItem.index];
                    let percentage = ((currentValue / total) * 100).toFixed(2);
                    return data.labels[tooltipItem.index] + ": " + currentValue + " (" + percentage + "%)";
                }
            }
        }
    }
});


document.addEventListener("DOMContentLoaded", function() {
 
 
}); 


// scroll reveal animation
AOS.init({
    once: true
});


// faq
const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    const arrow_img = faq.querySelector('.faq_btn img')
    const answer = faq.querySelector('.answer')
    const faq_btn = faq.querySelector('.faq_btn')

    faq_btn.addEventListener('click', () =>{
        faq_btn.classList.toggle('active')
        answer.classList.toggle('active')
       
        if(faq_btn.classList.contains("active")){
            arrow_img.setAttribute('src', "./assets/images/faq_arrow_active.svg")
        } else {
            arrow_img.setAttribute('src', "./assets/images/faq_arrow.svg")
        }
    })

  
})

  