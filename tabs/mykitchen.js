// Hardcoded examples for my kitchen and inventory info
window.kitchenItems = [
    { name: "Milk", quantity: "1 carton", added: "April 1, 2026", expires: "April 8, 2026", category: "Dairy" },
    { name: "Cheese", quantity: "2 blocks", added: "March 20, 2026", expires: "April 20, 2026", category: "Dairy" },
    { name: "Eggs", quantity: "12 eggs", added: "March 16, 2026", expires: "April 6, 2026", category: "Dairy" },
    { name: "Chicken", quantity: "2 pounds", added: "April 3, 2026", expires: "April 7, 2026", category: "Meat" },
    { name: "Rice", quantity: "1 bag", added: "March 5, 2026", expires: "June 1, 2026", category: "Pantry" },
    { name: "Pasta", quantity: "3 boxes", added: "March 8, 2026", expires: "July 15, 2026", category: "Pantry" },
    { name: "Bread", quantity: "1 loaf", added: "April 3, 2026", expires: "April 9, 2026", category: "Pantry" },
    { name: "Apples", quantity: "8 apples", added: "April 1, 2026", expires: "April 14, 2026", category: "Produce" },
    { name: "Spinach", quantity: "1 bag", added: "April 4, 2026", expires: "April 10, 2026", category: "Produce" },
    { name: "Tomatoes", quantity: "5 tomatoes", added: "April 2, 2026", expires: "April 11, 2026", category: "Produce" },
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

            <button class="kitchen-add-btn">
                <span class="kitchen-add-icon" aria-hidden="true">+</span>
                <span>Add Item</span>
            </button>

            <div class="kitchen-modal" hidden>
                <div class="kitchen-modal-panel">
                    <h2 class="kitchen-modal-title">Item Details</h2>
                    <div class="kitchen-detail-list">
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Name</div>
                            <div class="kitchen-detail-value" data-detail="name"></div>
                            <input type="text" data-detail="name"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Quantity</div>
                            <div class="kitchen-detail-value" data-detail="quantity"></div>
                            <input type="text" data-detail="quantity"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Date Added</div>
                            <div class="kitchen-detail-value" data-detail="added"></div>
                            <input type="text" data-detail="added"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Expiration Date</div>
                            <div class="kitchen-detail-value" data-detail="expires"></div>
                            <input type="text" data-detail="expires"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Category</div>
                            <div class="kitchen-detail-value" data-detail="category"></div>
                        </div>
                    </div>
                    <div class="kitchen-modal-buttons">
                        <button class="kitchen-modal-close" type="button">Close</button>
                        <button class="kitchen-modal-edit" type="button">Edit</button>
                        <button class="kitchen-modal-confirm" type="button">Confirm</button>
                        <button class="kitchen-modal-cancel" type="button">Cancel</button>
                        <button class="kitchen-modal-delete" type="button">Delete</button>
                    </div>
                </div>
            </div>

            <div class="kitchen-add-modal" hidden>
                <div class="kitchen-modal-panel">
                    <h2 class="kitchen-modal-title">Item Details</h2>
                    <div class="kitchen-detail-list">
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Name</div>
                            <input type="text" data-detail="addName"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Quantity</div>
                            <input type="text" data-detail="addQuantity"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Date Added</div>
                            <input type="text" data-detail="addAdded"/>
                        </div>
                        <div class="kitchen-detail-row">
                            <div class="kitchen-detail-label">Expiration Date</div>
                            <input type="text" data-detail="addExpires"/>
                        </div>
                    </div>
                    <div class="kitchen-modal-buttons">
                        <button class="kitchen-modal-add" type="button">Add</button>
                        <button class="kitchen-modal-add-cancel" type="button">Cancel</button>
                    </div>
                </div>
            </div>


        </section>
    `;

    // Sets up the grid
    const grid = content.querySelector(".kitchen-grid");
    const modal = content.querySelector(".kitchen-modal");
    const addModalElement = content.querySelector(".kitchen-add-modal");

    const closeButton = content.querySelector(".kitchen-modal-close");
    const editButton = content.querySelector(".kitchen-modal-edit");
    const confirmButton = content.querySelector(".kitchen-modal-confirm");
    const cancelButton = content.querySelector(".kitchen-modal-cancel");
    const deleteButton = content.querySelector(".kitchen-modal-delete");
    
    
    const addItemButton = content.querySelector(".kitchen-add-btn");
    const confirmAddButton = content.querySelector(".kitchen-modal-add");
    const cancelAddButton = content.querySelector(".kitchen-modal-add-cancel");
    
    
    let isEditing = false;
    let currItem = null;

    const detailFields = {
        name: content.querySelector('[data-detail="name"]'),
        quantity: content.querySelector('[data-detail="quantity"]'),
        added: content.querySelector('[data-detail="added"]'),
        expires: content.querySelector('[data-detail="expires"]'),
        category: content.querySelector('[data-detail="category"]'),
    };

    const inputFields = {
        name: content.querySelector('input[data-detail="name"]'),
        quantity: content.querySelector('input[data-detail="quantity"]'),
        added: content.querySelector('input[data-detail="added"]'),
        expires: content.querySelector('input[data-detail="expires"]'),
    };

    const addFields = {
        name: content.querySelector('input[data-detail="addName"]'),
        quantity: content.querySelector('input[data-detail="addQuantity"]'),
        added: content.querySelector('input[data-detail="addAdded"]'),
        expires: content.querySelector('input[data-detail="addExpires"]'),
    }

    // sets the modal (pop-out) to be the values for the selected item.
    function openModal(item) {
        detailFields.name.textContent = item.name;
        detailFields.quantity.textContent = item.quantity;
        detailFields.added.textContent = item.added;
        detailFields.expires.textContent = item.expires;
        detailFields.category.textContent = item.category;
        
        modal.hidden = false;
        
        isEditing = false;

        closeButton.hidden = false;
        editButton.hidden = false;

        inputFields.name.hidden = true;
        inputFields.quantity.hidden = true;
        inputFields.added.hidden = true;
        inputFields.expires.hidden = true;
        
        confirmButton.hidden = true;
        cancelButton.hidden = true;
        deleteButton.hidden = true;

        detailFields.name.hidden = false;
        detailFields.quantity.hidden = false;
        detailFields.added.hidden = false;
        detailFields.expires.hidden = false;

        currItem = item;
    }

    function closeModal() {
        currItem = null;
        modal.hidden = true;
    }

    function cancelModal() {
        openModal(currItem);
    }

    function confirmModal() {
        currItem.name = inputFields.name.value;
        currItem.quantity = inputFields.quantity.value;
        currItem.added = inputFields.added.value;
        currItem.expires = inputFields.expires.value;

        const index = items.indexOf(currItem);
        const card = content.querySelector(`[data-item-index="${index}"]`);
        card.textContent = currItem.name;

        openModal(currItem);
    }

    function editModal() {
        isEditing = true;

        confirmButton.hidden = false;
        cancelButton.hidden = false;
        deleteButton.hidden = false;

        inputFields.name.hidden = false;
        inputFields.quantity.hidden = false;
        inputFields.added.hidden = false;
        inputFields.expires.hidden = false;

        inputFields.name.value = currItem.name;
        inputFields.quantity.value = currItem.quantity;
        inputFields.added.value = currItem.added;
        inputFields.expires.value = currItem.expires;

        closeButton.hidden = true;
        editButton.hidden = true;
        
        detailFields.name.hidden = true;
        detailFields.quantity.hidden = true;
        detailFields.added.hidden = true;
        detailFields.expires.hidden = true;
    }

    function deleteModal() {
        const index = items.indexOf(currItem);
        const card = content.querySelector(`[data-item-index="${index}"]`);
        items.splice(index, 1);
        card.remove();
        closeModal()
    }

    function openAddModal() {
        addModalElement.hidden = false;
        addFields.name.value = "";
        addFields.quantity.value = "";
        addFields.added.value = "";
        addFields.expires.value = "";

    }

    function cancelAddModal() {
        addModalElement.hidden = true;

    }

    function confirmAddModal() {
        const newItem = {
            name: addFields.name.value,
            quantity: addFields.quantity.value,
            added: addFields.added.value,
            expires: addFields.expires.value,
        }
        items.push(newItem);
        const newCard = document.createElement("button");
        newCard.className = "kitchen-card";
        newCard.type = "button";
        newCard.dataset.itemIndex = items.length - 1;
        newCard.textContent = newItem.name;
        grid.appendChild(newCard);
        cancelAddModal()
    }



    
    // Let's you open the modal for an item when you click it
    grid.addEventListener("click", (event) => {
        const button = event.target.closest(".kitchen-card");
        if (!button) return;

        openModal(items[Number(button.dataset.itemIndex)]);
    });

    closeButton.addEventListener("click", closeModal);
    editButton.addEventListener("click", editModal);
    cancelButton.addEventListener("click", cancelModal);
    confirmButton.addEventListener("click", confirmModal);
    deleteButton.addEventListener("click", deleteModal);
    
    
    
    addItemButton.addEventListener("click", openAddModal);

    confirmAddButton.addEventListener("click", confirmAddModal);
    cancelAddButton.addEventListener("click", cancelAddModal);

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
