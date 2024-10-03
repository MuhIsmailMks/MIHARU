

// add image
// Ambil semua elemen dengan class 'addImage'
const addImageElements = document.querySelectorAll('.addImage');

// Ambil container untuk memasukkan draggableOverlay
const canvasContainer = document.getElementById('canvasContainer');


// new draggable 
// Tambahkan event listener untuk setiap elemen
addImageElements.forEach(item => {
  item.addEventListener('click', function(e) {
    item.classList.add('active');
     
    const dataImg = this.getAttribute('data-image');
    const dataClass = this.getAttribute('data-class');
    const imageSrc = this.querySelector('img').getAttribute('src'); 

     
    const addImageElement = document.querySelector(`.addImage[data-image="${dataImg}"]`);
 
    

    let newElement = document.createElement("div");
    newElement.setAttribute('data-image', dataImg)
    newElement.classList.add("draggableOverlay")
    newElement.innerHTML = `
          <img src=${imageSrc} alt="" class="main_image ${dataClass}">

            <div class="settingImage absolute w-full h-full left-0 top-0">

                <!-- left -->
                <div class="left bg-[#726749] absolute w-[20%] min-w-[40px] max-w-[50px] h-full max-h-[300px] left-[0%] flex flex-col items-center justify-center gap-3 min-h-[200px] top-[50%] translate-y-[-50%] rounded-md">

                    <div class="indexTop cursor-pointer w-[70%] relative">
                        <img src="./assets/icons/indexTop.svg" alt="" class="w-full h-auto object-contain">
                    </div>

                    <div class="indexBottom cursor-pointer w-[70%] relative">
                        <img src="./assets/icons/indexBottom.svg" alt="" class="w-full h-auto object-contain">
                    </div>

                    <div class="mirrorMode cursor-pointer w-[70%] relative">
                        <img src="./assets/icons/mirror.svg" alt="" class="w-full h-auto object-contain">
                    </div>

                     <div class="mirrorTopMode cursor-pointer w-[70%] relative">
                        <img src="./assets/icons/mirror.svg" alt="" class="w-full h-auto object-contain rotate-[90deg]">
                    </div>
    

                    <div class="deleteBtn cursor-pointer w-[70%] relative">
                        <img src="./assets/icons/deleteIcon.svg" alt="" class="w-full h-auto object-contain">
                    </div>

                </div>

                <!-- right -->
                <div class="right-[0%] absolute h-full w-[25%] ">
                    
                    <div class="rotate rounded-lg bg-[#726749] w-[50px] h-[50px] absolute top-0 right-0 cursor-nw-resize flex justify-center items-center">
                        <img src="./assets/icons/rotate.svg" alt="" class="w-[70%] h-auto object-contain">
                    </div>

                    <div class="resize rounded-lg bg-[#726749] w-[50px] h-[50px] absolute bottom-0 right-0 cursor-nw-resize flex justify-center items-center">
                        <img src="./assets/icons/resize.svg" alt="" class="w-[70%] h-auto object-contain mirror_image">
                    </div>

                </div>

            </div>`


    initialWidth = newElement.offsetWidth;
    initialHeight = newElement.offsetHeight;  
    initialMouseX = e.clientX;
    initialMouseY = e.clientY;

    
    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;

    
    let newWidth = initialWidth + dx;
    let newHeight = initialHeight + dy; 

    let newSize = Math.max(newWidth, newHeight);

    if (newSize > 100) {
      newElement.style.width = `${newSize}px`;
      newElement.style.height = `${newSize}px`;
    }

     // Hitung ukuran container dengan pembatasan 70%
     const containerWidth = canvasContainer.offsetWidth * 0.7;
     const containerHeight = canvasContainer.offsetHeight * 0.7;
 
     // Hitung posisi acak, dikurangi offset untuk menghindari posisi di pinggir
     const marginX = (canvasContainer.offsetWidth - containerWidth) / 2;
     const marginY = (canvasContainer.offsetHeight - containerHeight) / 2;
 
     const randomX = Math.floor(Math.random() * containerWidth) + marginX;
     const randomY = Math.floor(Math.random() * containerHeight) + marginY;
 
     // Set posisi acak dengan batas 70% dari ukuran container
     newElement.style.position = 'absolute'; 
     newElement.style.left = `${randomX}px`;
     newElement.style.top = `${randomY}px`;

    // add element to container
    canvasContainer.appendChild(newElement);
    makeDraggable(newElement);
  });
});


