document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
}, false);

document.onkeydown = function(e) {
    if (e.keyCode == 123 || // F12 key
        (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // CTRL+SHIFT+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 74)) { // CTRL+SHIFT+J
        return false;
    }
};


// choise button
 // Seleksi semua tombol di dalam container
 const buttons = document.querySelectorAll('.choiseBtnContainer button');
 // Seleksi semua elemen dengan id yang sama dengan data-btn
 const contentElements = document.querySelectorAll('.choiseMemes');

 buttons.forEach(button => {
     button.addEventListener('click', () => {
         // Hapus class 'active' dari semua tombol
         buttons.forEach(btn => btn.classList.remove('active'));
         // Tambahkan class 'active' ke tombol yang diklik
         button.classList.add('active');

         // Dapatkan nilai data-btn dari tombol yang diklik
         const btnData = button.getAttribute('data-btn');

         // Loop untuk menghilangkan class 'active' dari semua content
         contentElements.forEach(content => {
             // Cek apakah id content sama dengan data-btn
             if (content.id === btnData) {
                 content.classList.add('active');
             } else {
                 content.classList.remove('active');
             }
         });
     });
 });

 