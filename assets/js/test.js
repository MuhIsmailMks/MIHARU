

// draggable 
const draggableOverlay = document.getElementById('draggableOverlay');
const container = document.getElementById('canvasContainer');

// draggable function 
// Function to start dragging
let offsetX = 0, offsetY = 0, isDragging = false;
draggableOverlay.addEventListener('mousedown', (e) => {
  if (isRotating) return; // Jika sedang melakukan rotasi, tidak bisa drag

  isDragging = true;

  // Mengambil posisi klik relatif terhadap elemen draggableOverlay
  const rect = draggableOverlay.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  draggableOverlay.style.cursor = 'grabbing';

  // Menambahkan listener untuk mousemove dan mouseup
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
});

// Function to handle dragging
function onDrag(e) {
  if (!isDragging || isRotating || isResizing) return; // Tidak melakukan drag saat sedang rotasi

  // Mengambil posisi container
  const containerRect = container.getBoundingClientRect();

  // Menghitung posisi baru dari elemen draggableOverlay, relatif terhadap container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Mengatur posisi elemen draggableOverlay
  draggableOverlay.style.left = ${newLeft}px;
  draggableOverlay.style.top = ${newTop}px;
}

// Function to stop dragging
function stopDrag() {
  isDragging = false;
  draggableOverlay.style.cursor = 'grab';

  // Menghapus event listener ketika mouse dilepas
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
}
 


// draggble settings
const resizeHandle = document.querySelector('.resize');
const rotateHandle = document.querySelector('.rotate'); 


// Function to start rotating
let isResizing = false;
let isRotating = false;
let initialWidth, initialHeight, initialMouseX, initialMouseY;
let initialRotation = 0;  
let centerX, centerY;

rotateHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isRotating = true;

  // Mengambil pusat elemen untuk rotasi
  const rect = draggableOverlay.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;

  // Simpan rotasi awal (transformasi CSS)
  const currentTransform = window.getComputedStyle(draggableOverlay).transform;
  if (currentTransform !== 'none') {
    const matrix = currentTransform.match(/matrix\((.+)\)/)[1].split(', ');
    initialRotation = Math.round(Math.atan2(matrix[1], matrix[0]) * (180 / Math.PI));
  }

  document.addEventListener('mousemove', onRotate);
  document.addEventListener('mouseup', stopRotate);
});

// Function to handle rotation
function onRotate(e) {
  if (!isRotating) return;

  // Menghitung sudut baru berdasarkan posisi mouse relatif terhadap pusat elemen
  const currentMouseX = e.clientX;
  const currentMouseY = e.clientY;

  const angle = Math.atan2(currentMouseY - centerY, currentMouseX - centerX) * (180 / Math.PI);

  // Update rotasi dengan sudut baru
  draggableOverlay.style.transform = rotate(${angle - initialRotation}deg);
}

// Function to stop rotating
function stopRotate() {
  isRotating = false;
  document.removeEventListener('mousemove', onRotate);
  document.removeEventListener('mouseup', stopRotate);
}




// Function to start resizing
resizeHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isResizing = true;

  // Menyimpan ukuran awal elemen dan posisi mouse saat mulai resize
  initialWidth = draggableOverlay.offsetWidth;
  initialHeight = draggableOverlay.offsetHeight;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;

  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
});

// Function to handle resizing
function onResize(e) {
  if (!isResizing) return;

  // Menghitung perubahan posisi mouse
  const dx = e.clientX - initialMouseX;
  const dy = e.clientY - initialMouseY;

  // Menghitung ukuran baru elemen berdasarkan pergerakan mouse
  let newWidth = initialWidth + dx;
  let newHeight = initialHeight + dy;

  // Menentukan ukuran maksimum agar elemen tetap berbentuk kotak
  let newSize = Math.max(newWidth, newHeight);

  // Memastikan ukuran minimum elemen agar tidak mengecil terlalu kecil
  if (newSize > 50) {
    draggableOverlay.style.width = ${newSize}px;
    draggableOverlay.style.height = ${newSize}px;
  }
}

// Function to stop resizing
function stopResize() {
  isResizing = false;
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}





// index draggableOverlay
const indexTop = document.querySelector('.indexTop');
const indexBottom = document.querySelector('.indexBottom');

// Event listener untuk menaikkan z-index
indexTop.addEventListener('click', () => {
    let currentZIndex = parseInt(window.getComputedStyle(draggableOverlay).zIndex);
    draggableOverlay.style.zIndex = currentZIndex + 1;
});

// Event listener untuk menurunkan z-index
indexBottom.addEventListener('click', () => {
  let currentZIndex = parseInt(window.getComputedStyle(draggableOverlay).zIndex);
  
  // Cek apakah z-index lebih besar dari 1, jika iya kurangi, jika tidak tetap 1
  if (currentZIndex > 1) {
      draggableOverlay.style.zIndex = currentZIndex - 1;
  }
});


// mirror mode
const mirrorMode = document.querySelector('.mirrorMode');
let isMirrored = false; 

mirrorMode.addEventListener('click', () => {
  isMirrored = !isMirrored; 

  const mainImg = draggableOverlay.querySelector('.main_image');

   if(isMirrored == true){
    mainImg.style.transform = 'scaleX(-1)'
   } else{
    mainImg.style.transform = 'scaleX(1)'
   }

})


// delete button
const deleteBtn = document.querySelector('.deleteBtn');

// Add event listener to delete button
deleteBtn.addEventListener('click', () => {
  // Remove the draggableOverlay element from DOM
  draggableOverlay.remove();
});


 
    // // Kode HTML untuk draggableOverlay dengan gambar dinamis
    // const draggableOverlayHTML = `
    //   <div id="draggableOverlay" class="draggableOverlay absolute border-[#726749] border-[1px] left-[20%] top-[30%] cursor-grab opacity-95 hover:opacity-100 p-2 w-[200px] flex justify-center items-center" style="z-index: 10;">
    //     <img src="${imageSrc}" alt="" class="main_image w-full h-auto select-none object-contain block">
    //     <div class="settingImage absolute w-full h-full left-0 top-0">
    //       <!-- left -->
    //       <div class="left bg-[#726749] absolute w-[20%] min-w-[40px] max-w-[50px] h-full max-h-[300px] left-[0%] flex flex-col items-center justify-center gap-3 min-h-[200px] top-[50%] translate-y-[-50%] rounded-md">
    //         <div class="indexTop cursor-pointer w-[70%] relative">
    //           <img src="./assets/icons/indexTop.svg" alt="" class="w-full h-auto object-contain">
    //         </div>
    //         <div class="indexBottom cursor-pointer w-[70%] relative">
    //           <img src="./assets/icons/indexBottom.svg" alt="" class="w-full h-auto object-contain">
    //         </div>
    //         <div class="mirrorMode cursor-pointer w-[70%] relative">
    //           <img src="./assets/icons/mirror.svg" alt="" class="w-full h-auto object-contain">
    //         </div>
    //         <div class="deleteBtn cursor-pointer w-[70%] relative">
    //           <img src="./assets/icons/deleteIcon.svg" alt="" class="w-full h-auto object-contain">
    //         </div>
    //       </div>
    //       <!-- right -->
    //       <div class="right-[0%] absolute h-full w-[25%] ">
    //         <div class="rotate rounded-lg bg-[#726749] w-[50px] h-[50px] absolute top-0 right-0 cursor-nw-resize flex justify-center items-center">
    //           <img src="./assets/icons/rotate.svg" alt="" class="w-[70%] h-auto object-contain">
    //         </div>
    //         <div class="resize rounded-lg bg-[#726749] w-[50px] h-[50px] absolute bottom-0 right-0 cursor-nw-resize flex justify-center items-center">
    //           <img src="./assets/icons/resize.svg" alt="" class="w-[70%] h-auto object-contain mirror_image">
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // `;

    // // Kosongkan canvasContainer sebelum menambah draggableOverlay baru
    // canvasContainer.innerHTML = '';
    
    // // Masukkan HTML draggableOverlay ke dalam canvasContainer
    // canvasContainer.innerHTML += draggableOverlayHTML;