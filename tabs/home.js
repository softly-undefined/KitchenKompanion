window.renderHomeTab = function() {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = `
      <div class="home-container">
          <h1 class="app-header">Kitchen<br>Kompanion</h1>
          <div class="welcome-sub">Welcome Back ________</div>

          <div class="section-wrapper">
              <span class="section-header">Expiring Soon:</span>
              <div id="expiring-list"></div>
              <button class="primary-button">View All</button>
          </div>

          <div class="section-wrapper">
              <span class="section-header">Running Low:</span>
              <div id="low-list"></div>
              <button class="primary-button">Add to Grocery List</button>
          </div>

          <div class="section-wrapper">
              <span class="section-header">Suggested Recipe:</span>
              <ul class="recipe-meta">
                  <li>Recipe Name</li>
                  <li>Uses Ingredients Expiring Soon</li>
              </ul>
              <button class="primary-button">Start Cooking</button>
          </div>
      </div>
  `;

  const expiringData = [
      { text: "Temp (Time Till Expiration)", color: "#d32f2f" }, 
      { text: "Temp (Time Till Expiration)", color: "#d32f2f" },
      { text: "Temp (Time Till Expiration)", color: "#F4B400" }  
  ];

  const lowData = [
      { text: "Temp (Amount Left)", color: "#d32f2f" },
      { text: "Temp (Amount Left)", color: "#d32f2f" },
      { text: "Temp (Amount Left)", color: "#F4B400" }
  ];

  const fillList = (data, containerId) => {
      const container = document.getElementById(containerId);
      data.forEach(item => {
          const row = document.createElement("div");
          row.className = "item-row";
          row.innerHTML = `
              <span>• ${item.text}</span>
              <div class="status-dot" style="background-color: ${item.color}"></div>
          `;
          container.appendChild(row);
      });
  };

  fillList(expiringData, "expiring-list");
  fillList(lowData, "low-list");
};

document.addEventListener("DOMContentLoaded", window.renderHomeTab);