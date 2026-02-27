(function () {
  function renderTextTab(content) {
    if (!content) return;

    content.innerHTML = `
      <section class="text-tab">
        <div class="text-body">
          ${Array.from({ length: 30 }).map(() => `
            <p>
              SCROLL
              SCROLL
              SCROLL
            </p>
          `).join("")}
        </div>
      </section>
    `;
  }

  window.renderTextTab = renderTextTab;
})();