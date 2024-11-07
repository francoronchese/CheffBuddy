document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");

    searchForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchTerm = searchBox.value.trim();
        
        if (searchTerm) {
            fetchMealsByFirstLetter(searchTerm.charAt(0).toLowerCase());
        }
    });

    function fetchMealsByFirstLetter(letter) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    displayMeals(data.meals);
                } else {
                    displayNoResults();
                }
            })
            .catch(error => console.error("Error fetching meals:", error));
    }

    function displayMeals(meals) {
        const resultsContainer = document.createElement("div");
        resultsContainer.className = "results-container flex";
        
        meals.forEach(meal => {
            const mealContainer = document.createElement("div");
            mealContainer.className = "meal-container";

            mealContainer.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="meal-img">
                <h3>${meal.strMeal}</h3>
                <p>Origen: ${meal.strArea}</p>
                <button class="view-recipe-btn">VER RECETA</button>
            `;
            
            resultsContainer.appendChild(mealContainer);
        });

        clearPreviousResults();
        document.body.appendChild(resultsContainer);  // Cambia "document.body" por el contenedor específico en tu HTML
    }

    function displayNoResults() {
        clearPreviousResults();
        const message = document.createElement("p");
        message.textContent = "No se encontraron recetas.";
        document.body.appendChild(message);  // Cambia "document.body" por el contenedor específico en tu HTML
    }

    function clearPreviousResults() {
        const previousResults = document.querySelector(".results-container");
        if (previousResults) {
            previousResults.remove();
        }
    }
});

