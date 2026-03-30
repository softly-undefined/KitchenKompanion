window.renderRecipesTab = function (content) {
    content.innerHTML = `
        <div class = "recipes-screen">
            <h1 class = "recipes-title">Recipes</h1>

            <div class = "recipes-searchBar">
                <input 
                    type = "text" 
                    id = "recipe-search" 
                    class = "recipe-search-bar" 
                    placeholder = "Search Bar"
                />

                <select id = "recipe-filter" class = "recipe-filter-dropdown">
                    <option value = "">Filter By</option>
                </select>
            </div>

            <div class = "recipes-grid" id = "recipes-grid">
                <div class = "recipe-card">Recipe</div>
                <div class = "recipe-card">Recipe</div>
                <div class = "recipe-card">Recipe</div>
                <div class = "recipe-card">Recipe</div>
                <div class = "recipe-card">Recipe</div>
                <div class = "recipe-card">Recipe</div>
            </div>
        </div>
    `;

};