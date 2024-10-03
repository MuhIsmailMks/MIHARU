const imageInput = document.getElementById('imageInput');
const previewImage = document.getElementById('previewImage');
const imageContainer = document.getElementById('imageContainer');

const addImageContainer = document.querySelectorAll('.addImage');

imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0];
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

    // Membaca file sebagai Data URL (base64)
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

  // Simpan border, opacity, dan display lama setiap elemen draggableOverlay
  draggableOverlays.forEach((draggableOverlay, index) => {
      oldBorders[index] = draggableOverlay.style.border;
      // oldOpacities[index] = draggableOverlay.style.opacity;
      oldDisplays[index] = settingImages[index].style.display;

      // Hilangkan border sebelum mengambil screenshot
      draggableOverlay.style.border = 'none';
      // draggableOverlay.style.opacity = 1;
      settingImages[index].style.display = 'none';
  });

  // Gunakan html2canvas untuk screenshot
  html2canvas(document.getElementById('canvasContainer')).then(function(canvas) {
      var link = document.createElement('a');
      link.download = 'container.png';
      link.href = canvas.toDataURL();
      link.click();

      // Kembalikan border, opacity, dan display seperti semula
      draggableOverlays.forEach((draggableOverlay, index) => {
          draggableOverlay.style.border = oldBorders[index];
          // draggableOverlay.style.opacity = oldOpacities[index];
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

  let lastRotation = 0;
    
  // draggable function
  draggableOverlay.addEventListener('mousedown', (e) => {
    if (isRotating || isResizing) return; // Jika sedang melakukan rotasi atau resize, tidak bisa drag

    isDragging = true;

    const rect = draggableOverlay.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    draggableOverlay.style.cursor = 'grabbing';

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  });

  function onDrag(e) {
    if (!isDragging || isRotating || isResizing) return;

    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    draggableOverlay.style.left = `${newLeft}px`;
    draggableOverlay.style.top = `${newTop}px`;
  }

  function stopDrag() {
    isDragging = false;
    draggableOverlay.style.cursor = 'grab';
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
  }



  // rotate function
  const rotateHandle = draggableOverlay.querySelector('.rotate');

  rotateHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isRotating = true;

      const rect = draggableOverlay.getBoundingClientRect();
      
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;

      const currentTransform = window.getComputedStyle(draggableOverlay).transform;
      

      // Cek jika ada transformasi matriks yang valid
      if (currentTransform !== 'none') {
          const matrix = currentTransform.match(/matrix\((.+)\)/);
          
          if (matrix) { // Pastikan hasil match tidak null
              const values = matrix[1].split(', ');
              initialRotation = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
          }
      } else {
          initialRotation = 0; // Jika tidak ada transformasi, mulai dari rotasi 0
      }

      document.addEventListener('mousemove', onRotate);
      document.addEventListener('mouseup', stopRotate);
      
  });

  function onRotate(e) {
    if (!isRotating) return;

    const currentMouseX = e.clientX;
    const currentMouseY = e.clientY;

    const angle = Math.atan2(currentMouseY - centerY, currentMouseX - centerX) * (180 / Math.PI);
    draggableOverlay.style.transform = `rotate(${angle - initialRotation}deg)`;
  }

  function stopRotate() {
    isRotating = false;
    document.removeEventListener('mousemove', onRotate);
    document.removeEventListener('mouseup', stopRotate);
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

  function onResize(e) {
    if (!isResizing) return;

    const dx = e.clientX - initialMouseX;
    const dy = e.clientY - initialMouseY;

    let newWidth = initialWidth + dx;
    let newHeight = initialHeight + dy;

    let newSize = Math.max(newWidth, newHeight);

    if (newSize > 100) {
      draggableOverlay.style.width = `${newSize}px`;
      draggableOverlay.style.height = `${newSize}px`;
    }

  }

  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', stopResize);
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

// Apply draggable functionality to all elements with class draggableOverlay
document.querySelectorAll('.draggableOverlay').forEach(makeDraggable);

const items = document.querySelectorAll('.addImage')
const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', () => {
  document.querySelectorAll('.draggableOverlay').forEach(drag => {

    items.forEach(item => {
      item.classList.remove('active')
    });
    
    drag.remove();
    
  })
})


