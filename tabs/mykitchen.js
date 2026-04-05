// Shared kitchen inventory — used by home tab and mykitchen tab
window.kitchenItems = [
    { name: "Milk", quantity: "1 carton", added: "April 1, 2026", expires: "April 8, 2026" },
    { name: "Cheese", quantity: "2 blocks", added: "March 20, 2026", expires: "April 10, 2026" },
    { name: "Yogurt", quantity: "6 cups", added: "April 2, 2026", expires: "April 12, 2026" },
    { name: "Eggs", quantity: "12 eggs", added: "March 16, 2026", expires: "April 6, 2026" },
    { name: "Chicken", quantity: "2 pounds", added: "April 3, 2026", expires: "April 7, 2026" },
    { name: "Rice", quantity: "1 bag", added: "March 5, 2026", expires: "June 1, 2026" },
    { name: "Pasta", quantity: "3 boxes", added: "March 8, 2026", expires: "July 15, 2026" },
    { name: "Bread", quantity: "1 loaf", added: "April 3, 2026", expires: "April 9, 2026" },
    { name: "Apples", quantity: "8 apples", added: "April 1, 2026", expires: "April 14, 2026" },
    { name: "Spinach", quantity: "1 bag", added: "April 4, 2026", expires: "April 10, 2026" },
    { name: "Tomatoes", quantity: "5 tomatoes", added: "April 2, 2026", expires: "April 11, 2026" },
    { name: "Carrots", quantity: "1 bunch", added: "March 19, 2026", expires: "April 8, 2026" },
];

window.renderMyKitchenTab = function (content) {
    const items = window.kitchenItems;

    content.innerHTML = `
        <section class="kitchen-screen">
            <h1 class="kitchen-title">My Kitchen</h1>

            <div class="kitchen-controls">
                <div class="kitchen-field kitchen-muted">Search Bar</div>
                <div class="kitchen-field kitchen-muted">Filter By</div>
            </div>

            <div class="kitchen-grid">
                ${items.map((item, index) => `
                    <button class="kitchen-card" type="button" data-item-index="${index}">
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
    };

    // sets the modal (pop-out) to be the values for the selected item.
    function openModal(item) {
        detailFields.name.textContent = item.name;
        detailFields.quantity.textContent = item.quantity;
        detailFields.added.textContent = item.added;
        detailFields.expires.textContent = item.expires;
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
};
