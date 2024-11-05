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


  // Modal para mostrar los ingredientes
const modalIngredients = document.getElementById('modal-ingredients');
const closeIngredientsModal = document.getElementById('close-ingredients-modal');
const ingredientsList = document.getElementById('ingredients-list'); // Asegúrate de tener un elemento con este ID en tu HTML

// Evento para cerrar el modal de ingredientes
closeIngredientsModal.addEventListener('click', () => {
    modalIngredients.close();
});

// Función para mostrar los ingredientes y sus medidas en el modal
function showIngredients(meal) {
    ingredientsList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos

    // Iterar sobre los ingredientes y sus medidas
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        // Solo mostrar ingredientes que tengan nombre
        if (ingredient && ingredient.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = `${measure} - ${ingredient}`;
            ingredientsList.appendChild(listItem);
        }
    }

    modalIngredients.showModal(); // Mostrar el modal después de llenar la lista
}

// Función para obtener las recetas de la API por una letra específica
async function fetchRecipesByLetter(letter) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
        const data = await response.json();
        return data.meals || []; // Retorna un array vacío si no hay recetas
    } catch (error) {
        console.error(`Error al obtener las recetas para la letra ${letter}:`, error);
        return [];
    }
}

// Función para obtener todas las recetas de la A a la Z
async function fetchAllRecipes() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    const allMealsPromises = alphabet.map(letter => fetchRecipesByLetter(letter));
    
    const allMealsArrays = await Promise.all(allMealsPromises);
    
    const allMeals = allMealsArrays.flat();

    if (allMeals.length > 0) {
        allMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));

        let productsHTML = '';

        allMeals.forEach(meal => {
            productsHTML += `
                <div class="product">
                    <img class="product-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="product-details">
                        <h3 class="product-title">${meal.strMeal}</h3>
                        <p class="product-origin">Origen: ${meal.strArea || 'No especificada'}</p>
                        <a href="#" class="product-ingredients" data-meal='${JSON.stringify(meal)}'>Ver Receta</a>
                    </div>
                </div>
            `;
        });

        productWrapper.innerHTML = productsHTML;

        const ingredientLinks = document.querySelectorAll('.product-ingredients');
        ingredientLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Evita que el enlace recargue la página
                const meal = JSON.parse(link.getAttribute('data-meal')); // Obtener la información de la comida
                showIngredients(meal); // Mostrar los ingredientes
            });
        });

    } else {
        productWrapper.innerHTML = '<p>No se encontraron recetas.</p>';
    }
}

// Llama a la función para obtener todas las recetas al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    fetchAllRecipes();
});