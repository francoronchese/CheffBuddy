//Ventana Modal de Cámara
const openModal = document.getElementById('open-button');
const closeModal = document.getElementById('close-button');
const modal = document.getElementById('modal');

openModal.addEventListener('click', () =>{
    modal.showModal();
})

closeModal.addEventListener('click', () =>{
    modal.close();
})

// camara

// Botón para tomar foto
document.getElementById("btnCamera").addEventListener("click", function () {
    // Usa la API de la cámara para tomar una foto
    navigator.camera.getPicture(onSuccess, onFail, {
      quality: 50, // Calidad de la imagen
      destinationType: Camera.DestinationType.DATA_URL, // Tipo de destino: base64
    });
  
    // Función que se ejecuta si la foto se toma correctamente
    function onSuccess(imageData) {
      let image = document.getElementById("myImage"); // Obtiene la referencia del elemento img
      image.src = "data:image/jpeg;base64," + imageData; // Asigna la imagen tomada en formato base64
      image.style.display = "block"; // Muestra la imagen en el HTML
    }
  
    // Función que se ejecuta si ocurre un error al tomar la foto
    function onFail(message) {
      alert("Error al tomar la foto: " + message); // Muestra un mensaje de error en un alert
    }
  });
  

//Búsqueda de Recetas

const searchButton = document.getElementById('search-btn'); // Icono de búsqueda
const mainTitle = document.querySelector('.main-title');    // H2 del título
const productWrapper = document.querySelector('.product-wrapper');  // Contenedor de recetas
const searchSection = document.querySelector('.search-section');    // Sección de búsqueda

searchButton.addEventListener('click', () => {
    // Cambiar el título a "Search"
    mainTitle.textContent = 'Buscar Recetas';

    // Ocultar las recetas y mostrar la barra de búsqueda
    productWrapper.classList.add('hidden');
    searchSection.style.display = 'block';
});


/*Todas las recetas*/

const homeButton = document.getElementById('home-btn');

homeButton.addEventListener('click', () => {
    mainTitle.textContent = 'Todas las Recetas'; // Cambiar el título de nuevo a 'Todas las Recetas'
    
    // Mostrar las recetas y ocultar la sección de búsqueda
    productWrapper.classList.remove('hidden');
    searchSection.style.display = 'none';
});
