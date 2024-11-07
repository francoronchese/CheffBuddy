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