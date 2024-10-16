const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const imageContainer = document.getElementById('imageContainer');
const uploadImageContainer = document.getElementById('uploadImageContainer');
const memeMakerContainer = document.getElementById('memeMakerContainer');

const addImageContainer = document.querySelectorAll('.addImage');

imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];

  memeMakerContainer.classList.remove('hidden');
  memeMakerContainer.classList.add('flex');
  uploadImageContainer.classList.add('hidden');
  uploadImageContainer.classList.remove('flex');

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      // Mengubah src dari img menjadi data URL (base64)
      previewImage.src = e.target.result;

      // Tunggu sampai gambar di-load untuk mendapatkan ukurannya
      previewImage.onload = function() {
        const aspectRatio = previewImage.naturalWidth / previewImage.naturalHeight;
        
        // Atur tinggi dari container agar sesuai dengan aspek rasio gambar
        imageContainer.style.height = `${imageContainer.offsetWidth / aspectRatio}px`;
      };
    };
 
    reader.readAsDataURL(file);
  }
});

// download button
document.getElementById('downloadBtn').addEventListener('click', function() { 
  const draggableOverlays = document.querySelectorAll('.draggableOverlay');
  const settingImages = document.querySelectorAll('.settingImage');
  const oldBorders = [];
  const oldOpacities = [];
  const oldDisplays = [];
 
  draggableOverlays.forEach((draggableOverlay, index) => {
      oldBorders[index] = draggableOverlay.style.border; 
      oldDisplays[index] = settingImages[index].style.display;
 
      draggableOverlay.style.border = 'none'; 
      settingImages[index].style.display = 'none';
  });
 
  html2canvas(document.getElementById('canvasContainer')).then(function(canvas) {
      var link = document.createElement('a');
      link.download = 'container.png';
      link.href = canvas.toDataURL();
      link.click();
  
      draggableOverlays.forEach((draggableOverlay, index) => {
          draggableOverlay.style.border = oldBorders[index]; 
          settingImages[index].style.display = oldDisplays[index];
      });
  });
});

 

// canvas container
const container = document.getElementById('canvasContainer');

// Function to add draggable functionality to an element
function makeDraggable(draggableOverlay) {
  let offsetX = 0, offsetY = 0, isDragging = false, isRotating = false, isResizing = false;
  let initialRotation = 0, centerX, centerY, initialWidth, initialHeight, initialMouseX, initialMouseY;
 
     
 
  draggableOverlay.addEventListener('click', () => { 
    isDragging = !isDragging; // Toggle dragging state
  
    // Ubah cursor tergantung state drag
    if (isDragging) {
      draggableOverlay.style.cursor = 'grabbing';
    } else {
      draggableOverlay.style.cursor = 'grab';
    }
  });
  
  // Event untuk menggerakkan elemen saat mouse bergerak
  document.addEventListener('mousemove', (e) => {
    if (!isDragging || isRotating || isResizing) return;  
    const containerRect = container.getBoundingClientRect();
    const rect = draggableOverlay.getBoundingClientRect();
    
    // Hitung posisi baru berdasarkan posisi mouse
    let newLeft = e.clientX - containerRect.left - (rect.width / 2);
    let newTop = e.clientY - containerRect.top - (rect.height / 2);
  
    // Update posisi elemen
    draggableOverlay.style.left = `${newLeft}px`;
    draggableOverlay.style.top = `${newTop}px`;
  });
  
  // Support for touch devices
  document.addEventListener('touchmove', (e) => {
    if (!isDragging || isRotating || isResizing) return;  
   
    const containerRect = container.getBoundingClientRect();
    const rect = draggableOverlay.getBoundingClientRect();
    
    // Hitung posisi baru berdasarkan posisi touch
    let newLeft = e.touches[0].clientX - containerRect.left - (rect.width / 2);
    let newTop = e.touches[0].clientY - containerRect.top - (rect.height / 2);
  
    // Update posisi elemen
    draggableOverlay.style.left = `${newLeft}px`;
    draggableOverlay.style.top = `${newTop}px`;
  });
  

  function onDrag(e) {
    if (!isDragging || isRotating || isResizing) return;

    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    draggableOverlay.style.left = `${newLeft}px`;
    draggableOverlay.style.top = `${newTop}px`;
  }

  function onDragTouch(e) {
    if (!isDragging || isRotating || isResizing) return;

    const containerRect = container.getBoundingClientRect();
    let newLeft = e.touches[0].clientX - containerRect.left - offsetX;
    let newTop = e.touches[0].clientY - containerRect.top - offsetY;

    draggableOverlay.style.left = `${newLeft}px`;
    draggableOverlay.style.top = `${newTop}px`;
  }

  function stopDrag() {
    isDragging = false;
    draggableOverlay.style.cursor = 'grab';
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }

  function stopDragTouch() {
    isDragging = false;
    draggableOverlay.style.cursor = 'grab';
    document.removeEventListener('touchmove', onDragTouch);
    document.removeEventListener('touchend', stopDragTouch);
  }




  // rotate function
  const rotateHandle = draggableOverlay.querySelector('.rotate');

  // For desktop
  rotateHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isRotating = true;
  
    const rect = draggableOverlay.getBoundingClientRect();
    
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  
    const currentTransform = window.getComputedStyle(draggableOverlay).transform;
  
    // Check for valid transform matrix
    if (currentTransform !== 'none') {
      const matrix = currentTransform.match(/matrix\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(', ');
        initialRotation = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
      }
    } else {
      initialRotation = 0;
    }
  
    document.addEventListener('mousemove', onRotate);
    document.addEventListener('mouseup', stopRotate);
  });
  
  // For touch devices
  rotateHandle.addEventListener('touchstart', (e) => {
  if (isRotating || isResizing) return; // Tambahkan cek isResizing

    e.preventDefault();
    isRotating = true;
  
    const rect = draggableOverlay.getBoundingClientRect();
    
    centerX = rect.left + rect.width / 2;
    centerY = rect.top + rect.height / 2;
  
    const currentTransform = window.getComputedStyle(draggableOverlay).transform;
  
    if (currentTransform !== 'none') {
      const matrix = currentTransform.match(/matrix\((.+)\)/);
      if (matrix) {
        const values = matrix[1].split(', ');
        initialRotation = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
      }
    } else {
      initialRotation = 0;
    }
  
    document.addEventListener('touchmove', onRotateTouch);
    document.addEventListener('touchend', stopRotateTouch);
    
  });
  
  function onRotate(e) {
    if (!isRotating) return;
  
    const currentMouseX = e.clientX;
    const currentMouseY = e.clientY;
  
    const angle = Math.atan2(currentMouseY - centerY, currentMouseX - centerX) * (180 / Math.PI);
    draggableOverlay.style.transform = `rotate(${angle - initialRotation}deg)`;
  }
  
  function onRotateTouch(e) {
    if (!isRotating) return;
  
    const currentMouseX = e.touches[0].clientX;
    const currentMouseY = e.touches[0].clientY;
  
    const angle = Math.atan2(currentMouseY - centerY, currentMouseX - centerX) * (180 / Math.PI);
    draggableOverlay.style.transform = `rotate(${angle - initialRotation}deg)`;
  }
  
  function stopRotate() {
    isRotating = false;
    document.removeEventListener('mousemove', onRotate);
    document.removeEventListener('mouseup', stopRotate);
  }
  
  function stopRotateTouch() {
    isRotating = false;
    document.removeEventListener('touchmove', onRotateTouch);
    document.removeEventListener('touchend', stopRotateTouch);
  }
  


// resize function
const resizeHandle = draggableOverlay.querySelector('.resize');
resizeHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isResizing = true;

  initialWidth = draggableOverlay.offsetWidth;
  initialHeight = draggableOverlay.offsetHeight;
  initialMouseX = e.clientX;
  initialMouseY = e.clientY;
 

  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
});

// Support for touch devices
resizeHandle.addEventListener('touchstart', (e) => {
  e.preventDefault();
  isResizing = true;

  initialWidth = draggableOverlay.offsetWidth;
  initialHeight = draggableOverlay.offsetHeight;
  initialMouseX = e.touches[0].clientX;
  initialMouseY = e.touches[0].clientY;
 

  document.addEventListener('touchmove', onResizeTouch);
  document.addEventListener('touchend', stopResizeTouch);
});

function onResize(e) {
  if (!isResizing) return;

  const dx = e.clientX - initialMouseX;
  const dy = e.clientY - initialMouseY;

  let newWidth = initialWidth + dx;
  let newHeight = initialHeight + dy;

  let newSize = Math.max(newWidth, newHeight);

  if (newSize > 50) {
    draggableOverlay.style.width = `${newSize}px`;
    draggableOverlay.style.height = `${newSize}px`;
  }
}

function onResizeTouch(e) {
  if (!isResizing) return;

  const dx = e.touches[0].clientX - initialMouseX;
  const dy = e.touches[0].clientY - initialMouseY;

  let newWidth = initialWidth + dx;
  let newHeight = initialHeight + dy;

  let newSize = Math.max(newWidth, newHeight);

  if (newSize > 50) {
    draggableOverlay.style.width = `${newSize}px`;
    draggableOverlay.style.height = `${newSize}px`;
  }
}

function stopResize() {
  isResizing = false;
   

  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

function stopResizeTouch() {
  isResizing = false;
 

  document.removeEventListener('touchmove', onResizeTouch);
  document.removeEventListener('touchend', stopResizeTouch);
}



    
  // mirror mode (horizontal)
  const mirrorMode = draggableOverlay.querySelector('.mirrorMode');
  let isMirroredX = false;

  // mirror mode (vertical)
  const mirrorTopMode = draggableOverlay.querySelector('.mirrorTopMode');
  let isMirroredY = false;

  mirrorMode.addEventListener('click', () => {
    isMirroredX = !isMirroredX;
    updateTransform(); 
  });

  mirrorTopMode.addEventListener('click', () => {
    isMirroredY = !isMirroredY;
    updateTransform();  
  });

  // Fungsi untuk mengupdate transformasi gambar
  function updateTransform() {
    const mainImg = draggableOverlay.querySelector('.main_image');
    const scaleX = isMirroredX ? -1 : 1; 
    const scaleY = isMirroredY ? -1 : 1; 
 
    mainImg.style.transform = `scale(${scaleX}, ${scaleY})`;
  }




  // Event listener untuk menurunkan z-index
  const indexBottom = draggableOverlay.querySelector('.indexBottom');
  indexBottom.addEventListener('click', () => {
    let currentZIndex = parseInt(window.getComputedStyle(draggableOverlay).zIndex);
    
    // Cek apakah z-index lebih besar dari 1, jika iya kurangi, jika tidak tetap 1
    if (currentZIndex > 1) {
        draggableOverlay.style.zIndex = currentZIndex - 1;
    }
  });

  // Event listener untuk menaikkan z-index
  const indexTop = draggableOverlay.querySelector('.indexTop');
  indexTop.addEventListener('click', () => {
    let currentZIndex = parseInt(window.getComputedStyle(draggableOverlay).zIndex);
    
    // Cek apakah z-index lebih besar dari 1, jika iya kurangi, jika tidak tetap 1
    if (currentZIndex > 1) {
        draggableOverlay.style.zIndex = currentZIndex + 1;
    }
  });

  // delete function
  const deleteBtn = draggableOverlay.querySelector('.deleteBtn');
  deleteBtn.addEventListener('click', () => {
    
    // Menghapus elemen draggableOverlay dari canvas
    draggableOverlay.remove();
  
    const dataImage = draggableOverlay.getAttribute('data-image');
    const dataclass = draggableOverlay.getAttribute('data-class');
  
    // Mengecek apakah masih ada elemen lain dengan data-image yang sama di dalam canvasContainer
    const remainingElements = document.querySelectorAll(`#canvasContainer [data-image="${dataImage}"]`);
  
    // Jika tidak ada elemen lain dengan data-image yang sama, hapus kelas active
    if (remainingElements.length === 0) {
      const addImageElement = document.querySelector(`.addImage[data-image="${dataImage}"]`);
      if (addImageElement) {
        addImageElement.classList.remove('active');
      }
    }
  });
  

}


// background change
const bgChoiseBtns = document.querySelectorAll('.bgChoiseBtn');
const backgroundCanvas = document.getElementById('backgroundCanvas')

bgChoiseBtns.forEach(bgChoiseBtn => {
  bgChoiseBtn.addEventListener('click', (e) => {
    
      bgChoiseBtns.forEach(btn => btn.classList.remove('active'));
      bgChoiseBtn.classList.add('active');

      const imageSrc = bgChoiseBtn.querySelector('img').getAttribute('src'); 

      backgroundCanvas.setAttribute('src', imageSrc);
      backgroundCanvas.style.display = "block";

  });

})

// restart button
document.querySelectorAll('.draggableOverlay').forEach(makeDraggable);

const items = document.querySelectorAll('.addImage')
const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', () => {
  document.querySelectorAll('.draggableOverlay').forEach(drag => {

    items.forEach(item => {
      item.classList.remove('active')
    });
    
    drag.remove();
    
  });
  
  backgroundCanvas.setAttribute('src', '');
   backgroundCanvas.style.display = "none";
   bgChoiseBtns.forEach(btn => btn.classList.remove('active'));
})

