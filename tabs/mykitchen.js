// Shared kitchen inventory — used by home tab and mykitchen tab
window.kitchenItems = [
    { name: "Milk", quantity: "1 carton", added: "April 1, 2026", expires: "April 8, 2026", category: "Dairy" },
    { name: "Cheese", quantity: "2 blocks", added: "March 20, 2026", expires: "April 10, 2026", category: "Dairy" },
    { name: "Yogurt", quantity: "6 cups", added: "April 2, 2026", expires: "April 12, 2026", category: "Dairy" },
    { name: "Eggs", quantity: "12 eggs", added: "March 16, 2026", expires: "April 6, 2026", category: "Dairy" },
    { name: "Chicken", quantity: "2 pounds", added: "April 3, 2026", expires: "April 7, 2026", category: "Meat" },
    { name: "Rice", quantity: "1 bag", added: "March 5, 2026", expires: "June 1, 2026", category: "Pantry" },
    { name: "Pasta", quantity: "3 boxes", added: "March 8, 2026", expires: "July 15, 2026", category: "Pantry" },
    { name: "Bread", quantity: "1 loaf", added: "April 3, 2026", expires: "April 9, 2026", category: "Pantry" },
    { name: "Apples", quantity: "8 apples", added: "April 1, 2026", expires: "April 14, 2026", category: "Produce" },
    { name: "Spinach", quantity: "1 bag", added: "April 4, 2026", expires: "April 10, 2026", category: "Produce" },
    { name: "Tomatoes", quantity: "5 tomatoes", added: "April 2, 2026", expires: "April 11, 2026", category: "Produce" },
    { name: "Carrots", quantity: "1 bunch", added: "March 19, 2026", expires: "April 8, 2026", category: "Produce" },
];

window.renderMyKitchenTab = function (content) {
    const items = window.kitchenItems;

    content.innerHTML = `
        <section class="kitchen-screen">
            <h1 class="kitchen-title">My Kitchen</h1>

            <div class="kitchen-controls">
                <input class="kitchen-field" id="kitchen-search" type="text" placeholder="Search items...">
                <select class="kitchen-field" id="kitchen-filter">
                    <option value="all">Filter By: All</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Produce">Produce</option>
                    <option value="Pantry">Pantry</option>
                    <option value="expiring">Expiring This Week</option>
                </select>
            </div>

            <div class="kitchen-grid">
                ${items.map((item, index) => `
                    <button class="kitchen-card" type="button" data-item-index="${index}" data-category="${item.category}" data-expires="${item.expires}">
                        ${item.name}
                    </button>
                `).join("")}
            </div>

            <div class="kitchen-add-btn">
                <span class="kitchen-add-icon" aria-hidden="true">+</span>
                <span>Add Item</span>
            </div>

            <div class="kitchen-modal" hidden>
                <div class="kitchen-modal-panel">
                    <h2 class="kitchen-modal-title">Item Details</h2>
                    <div class="kitchen-detail-list">
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Name</div>
                            <div class="kitchen-detail-value" data-detail="name"></div>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Quantity</div>
                            <div class="kitchen-detail-value" data-detail="quantity"></div>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Date Added</div>
                            <div class="kitchen-detail-value" data-detail="added"></div>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Expiration Date</div>
                            <div class="kitchen-detail-value" data-detail="expires"></div>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Category</div>
                            <div class="kitchen-detail-value" data-detail="category"></div>
                        </div>
                    </div>
                    <button class="kitchen-modal-close" type="button">Close</button>
                </div>
            </div>
        </section>
    `;

    // Sets up the grid
    const grid = content.querySelector(".kitchen-grid");
    const modal = content.querySelector(".kitchen-modal");
    const closeButton = content.querySelector(".kitchen-modal-close");
    const detailFields = {
        name: content.querySelector('[data-detail="name"]'),
        quantity: content.querySelector('[data-detail="quantity"]'),
        added: content.querySelector('[data-detail="added"]'),
        expires: content.querySelector('[data-detail="expires"]'),
        category: content.querySelector('[data-detail="category"]'),
    };

    // sets the modal (pop-out) to be the values for the selected item.
    function openModal(item) {
        detailFields.name.textContent = item.name;
        detailFields.quantity.textContent = item.quantity;
        detailFields.added.textContent = item.added;
        detailFields.expires.textContent = item.expires;
        detailFields.category.textContent = item.category;
        modal.hidden = false;
    }

    function closeModal() {
        modal.hidden = true;
    }

    // Let's you open the modal for an item when you click it
    grid.addEventListener("click", (event) => {
        const button = event.target.closest(".kitchen-card");
        if (!button) return;

        openModal(items[Number(button.dataset.itemIndex)]);
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    const filterSelect = content.querySelector("#kitchen-filter");
    const searchInput = content.querySelector("#kitchen-search");

    function applyFilters() {
        const filterValue = filterSelect.value;
        const query = searchInput.value.trim().toLowerCase();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        grid.querySelectorAll(".kitchen-card").forEach(card => {
            const matchesSearch = !query || card.textContent.trim().toLowerCase().includes(query);
            let matchesFilter = true;
            if (filterValue === "expiring") {
                const daysLeft = Math.ceil((new Date(card.dataset.expires) - today) / (1000 * 60 * 60 * 24));
                matchesFilter = daysLeft <= 7;
            } else if (filterValue !== "all") {
                matchesFilter = card.dataset.category === filterValue;
            }
            card.style.display = matchesSearch && matchesFilter ? "" : "none";
        });
    }

    filterSelect.addEventListener("change", applyFilters);
    searchInput.addEventListener("input", applyFilters);
};
