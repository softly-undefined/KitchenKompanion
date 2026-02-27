(function () {
  function renderLRTab(content) {
    if (!content) return;

    content.innerHTML = `
      <section class="lr-tab">
        <div class="down-here">Down Here</div>
      </section>
    `;
  }

  window.renderLRTab = renderLRTab;
})();