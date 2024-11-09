const searchForm = document.getElementById('search-form'); // Formulario de búsqueda
const searchInput = document.getElementById('search-box'); // Input de búsqueda
const searchResultsWrapper = document.querySelector('.search-results'); // Contenedor de resultados

// Evento para manejar la búsqueda
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario (recargar la página)

    const searchQuery = searchInput.value.trim(); // Obtiene el valor de búsqueda
    if (!searchQuery) {
        alert('Por favor ingresa un término de búsqueda.');
        return;
    }

    // Llama a la API con el término de búsqueda
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        const data = await response.json();

        // Si no se encuentran recetas
        if (!data.meals) {
            searchResultsWrapper.innerHTML = `<p>No se encontraron recetas con el término "${searchQuery}".</p>`;
            return;
        }

        // Renderiza las recetas encontradas
        let searchResultsHTML = '';
        data.meals.forEach(meal => {
            searchResultsHTML += `
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

        searchResultsWrapper.innerHTML = searchResultsHTML;

        // Añade eventos a los enlaces de "Ver Receta"
        const ingredientLinks = document.querySelectorAll('.product-ingredients');
        ingredientLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Evita que el enlace recargue la página
                const meal = JSON.parse(link.getAttribute('data-meal')); // Obtiene la información de la comida
                showIngredients(meal); // Muestra los ingredientes en el modal
            });
        });
    } catch (error) {
        console.error('Error al buscar las recetas:', error);
        searchResultsWrapper.innerHTML = '<p>Error al buscar recetas. Inténtalo de nuevo más tarde.</p>';
    }
});
