
/*document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}*/

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
