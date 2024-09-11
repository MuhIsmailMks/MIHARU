document.addEventListener("DOMContentLoaded", () => {
 

    // how to buy
    gsap.fromTo('.item1', 
        { x: '50vw' },  
        { 
            x: "0vw",   
            ease: "none", 
            scrollTrigger: {
                trigger: ".tokenomics__items",
                start: "-30% 100%", 
                end: "100% 100%",  
                scrub: 2,  
            }
        }
    );

    gsap.fromTo('.item2', 
        { x: '50vw' },  
        { 
            x: "0vw",   
            ease: "none", 
            scrollTrigger: {
                trigger: ".tokenomics__items",
                start: "-30% 100%", 
                end: "100% 100%",  
                scrub: 3,  
            }
        }
    );

    gsap.fromTo('.item3', 
        { x: '50vw' },  
        { 
            x: "0vw",   
            ease: "none", 
            scrollTrigger: {
                trigger: ".tokenomics__items",
                start: "-30% 100%", 
                end: "100% 100%",  
                scrub: 4,  
            }
        }
    );
  
     
});