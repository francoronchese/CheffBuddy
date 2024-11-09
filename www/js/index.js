//Búsqueda de Recetas

const searchButton = document.getElementById('search-btn'); // Icono de búsqueda
const mainTitle = document.querySelector('.main-title');    // H2 del título
const productWrapper = document.querySelector('.product-wrapper');  // Contenedor de recetas
const searchSection = document.querySelector('.search-section');    // Sección de búsqueda

searchButton.addEventListener('click', () => {
    // Cambia el título a "Search"
    mainTitle.textContent = 'Buscar Recetas';

    // Oculta las recetas y muestra la barra de búsqueda
    productWrapper.classList.add('hidden');
    searchSection.style.display = 'block';
});


/*Todas las recetas*/

const homeButton = document.getElementById('home-btn');

homeButton.addEventListener('click', () => {
    mainTitle.textContent = 'Todas las Recetas'; // Cambia el título de nuevo a 'Todas las Recetas'
    
    // Muestra las recetas y oculta la sección de búsqueda
    productWrapper.classList.remove('hidden');
    searchSection.style.display = 'none';
});






// Modal para mostrar los ingredientes
const modalIngredients = document.getElementById('modal-ingredients');
const closeIngredientsModal = document.getElementById('close-ingredients-modal');
const ingredientsList = document.getElementById('ingredients-list'); 

// Evento para cerrar el modal de ingredientes
closeIngredientsModal.addEventListener('click', () => {
    modalIngredients.close();
});

// Función para mostrar los ingredientes y sus medidas en el modal
function showIngredients(meal) {
    ingredientsList.innerHTML = ''; // Limpia la lista antes de agregar nuevos elementos

    // Itera sobre los ingredientes y sus medidas
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        // Solo muestra ingredientes que tengan nombre
        if (ingredient && ingredient.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = `${measure} - ${ingredient}`;
            ingredientsList.appendChild(listItem);
        }
    }

    modalIngredients.showModal(); // Muestra el modal después de llenar la lista
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
                const meal = JSON.parse(link.getAttribute('data-meal')); // Obtiene la información de la comida
                showIngredients(meal); // Muestra los ingredientes
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