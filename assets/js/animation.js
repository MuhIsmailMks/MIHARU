const images = [
    "../images/drop1.png",
    "../images/drop2.png",
    "../images/drop3.png",
    "../images/drop4.png",
    "../images/drop5.png"
  ];
  
  // Pilih gambar acak
  const randomImage = images[Math.floor(Math.random() * images.length)];
  
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "shape": {
        "type": "image",
        "image": {
          "src": randomImage, // Gambar acak
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": false
      },
      "size": {
        "value": 30,
        "random": true
      },
      "move": {
        "enable": true,
        "speed": 5,
        "direction": "bottom",
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        }
      }
    },
    "retina_detect": true
  });
  