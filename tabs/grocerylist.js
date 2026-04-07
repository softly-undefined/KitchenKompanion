window.groceryListItems = window.groceryListItems || [];

window.addToGroceryList = function(name) {
    if (!window.groceryListItems.includes(name)) window.groceryListItems.push(name);
};

window.renderGroceryListTab = function(content) {
    const container = document.createElement("div");
    container.className = "grocery-screen";

    const title = document.createElement("h1");
    title.className = "grocery-title";
    title.textContent = "Grocery List";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter a new grocery list item...";
    input.className = "grocery-input";

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.className = "grocery-add-btn";

    const list = document.createElement("ul");
    list.className = "grocery-list";

    container.appendChild(title);
    container.appendChild(input);
    container.appendChild(addBtn);
    container.appendChild(list);
    content.appendChild(container);

    // Load current itmes
    window.groceryListItems.forEach(name => addItem(name));

    function addItem(forcedText) {
        const text = typeof forcedText === "string" ? forcedText.trim() : input.value.trim();
        if (!text) return;
        if (!forcedText && !window.groceryListItems.includes(text)) window.groceryListItems.push(text);

        // List items
        const li = document.createElement("li");
        li.className = "grocery-item";

        const taskText = document.createElement("span");
        taskText.textContent = text;
        taskText.className = "grocery-item-text";

        const strikeLine = document.createElement("span");
        strikeLine.className = "grocery-strike-line";
        taskText.appendChild(strikeLine);

        taskText.addEventListener("click", () => {
            strikeLine.style.width = strikeLine.style.width === "100%" ? "0%" : "100%";
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "grocery-delete-btn";
        delBtn.addEventListener("click", () => {
            window.groceryListItems = window.groceryListItems.filter(n => n !== text);
            li.remove();
        });

        li.appendChild(taskText);
        li.appendChild(delBtn);
        list.appendChild(li);

        input.value = "";
        input.focus();
    }

    // Event listeners to add items.
    addBtn.addEventListener("click", addItem);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });
};
