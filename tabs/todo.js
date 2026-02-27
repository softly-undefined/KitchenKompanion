window.renderTodoTab = function(content) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.marginTop = "20px";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter a new task...";
    input.style.padding = "12px";              
    input.style.fontSize = "18px";             
    input.style.width = "90%";                 
    input.style.maxWidth = "500px";            
    input.style.border = "2px solid #333";     
    input.style.borderRadius = "8px";          
    input.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.2)"; 
    input.style.marginBottom = "12px";
    input.style.outline = "none";             
    input.style.transition = "all 0.2s ease";  

    input.addEventListener("focus", () => {
        input.style.borderColor = "#007BFF";      
        input.style.boxShadow = "2px 2px 8px rgba(0,123,255,0.3)";
    });
    input.addEventListener("blur", () => {
        input.style.borderColor = "#333";       
        input.style.boxShadow = "2px 2px 6px rgba(0,0,0,0.2)";
    });


    const addBtn = document.createElement("button");
    addBtn.textContent = "Add";
    addBtn.style.padding = "12px 20px";
    addBtn.style.fontSize = "16px";
    addBtn.style.borderRadius = "8px";
    addBtn.style.border = "2px solid #333";
    addBtn.style.backgroundColor = "#f0f0f0";
    addBtn.style.cursor = "pointer";
    addBtn.style.transition = "all 0.2s ease";
    addBtn.style.marginBottom = "20px";

    addBtn.addEventListener("mouseover", () => {
        addBtn.style.backgroundColor = "#007BFF";
        addBtn.style.color = "#fff";
    });
    addBtn.addEventListener("mouseout", () => {
        addBtn.style.backgroundColor = "#f0f0f0";
        addBtn.style.color = "#000";
    });

    // ----- List Container -----
    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = 0;
    list.style.width = "90%";
    list.style.maxWidth = "500px";

    container.appendChild(input);
    container.appendChild(addBtn);
    container.appendChild(list);
    content.appendChild(container);

    function addItem() {
        const text = input.value.trim();
        if (!text) return;

        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "5px 0";

        const taskText = document.createElement("span");
        taskText.textContent = text;
        taskText.style.cursor = "pointer";
        taskText.style.position = "relative";

        const strikeLine = document.createElement("span");
        strikeLine.style.position = "absolute";
        strikeLine.style.left = "0";
        strikeLine.style.top = "50%";
        strikeLine.style.height = "2px";
        strikeLine.style.backgroundColor = "red";
        strikeLine.style.width = "0%";
        strikeLine.style.transition = "width 0.3s ease";
        taskText.appendChild(strikeLine);

        taskText.addEventListener("click", () => {
            if (strikeLine.style.width === "100%") {
                strikeLine.style.width = "0%";
            } else {
                strikeLine.style.width = "100%";
            }
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "10px";
        delBtn.style.padding = "6px 10px";
        delBtn.style.borderRadius = "6px";
        delBtn.style.border = "1px solid #333";
        delBtn.style.cursor = "pointer";
        delBtn.addEventListener("mouseover", () => {
            delBtn.style.backgroundColor = "#ff4d4d";
            delBtn.style.color = "#fff";
        });
        delBtn.addEventListener("mouseout", () => {
            delBtn.style.backgroundColor = "";
            delBtn.style.color = "#000";
        });
        delBtn.addEventListener("click", () => {
            list.removeChild(li);
        });

        li.appendChild(taskText);
        li.appendChild(delBtn);
        list.appendChild(li);

        input.value = "";
        input.focus();
    }

    addBtn.addEventListener("click", addItem);
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addItem();
    });
};