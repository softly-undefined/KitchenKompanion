//Created by Spencer 2/27/2026
window.renderChoicesTab = function(content){
    content.innerHTML = `
    <div class="choices-screen">
        <h1 id="c-title">-Choices Screen-</h1>
 
 
        <h2>Camera Type #1:</h2>
 
 
        <label>
            <input type="radio" name="camera1" value="dSLR" checked>
            dSLR
        </label>
 
 
        <label>
            <input type="radio" name="camera1" value="Mirrorless">
            Mirrorless
        </label>
 
 
        <h2>Camera Type #2:</h2>
 
 
        <select id="camera2-select">
            <option value="dSLR" selected>dSLR</option>
            <option value="Mirrorless">Mirrorless</option>
        </select>
 
 
        <button id="print-btn">
            Print something based on above choices...
        </button>
 
 
        <div id="output"></div>
    </div>
    `;
 
 
    const printBtn = content.querySelector('#print-btn');
    const outputDiv = content.querySelector('#output');
 
 
    printBtn.addEventListener('click', () => {
        const camera1 = content.querySelector('input[name="camera1"]:checked').value;
        const camera2 = content.querySelector('#camera2-select').value;
 
 
        outputDiv.textContent =
            `You selected ${camera1} for Camera Type #1 and ${camera2} for Camera Type #2.`;
    });
 };
 