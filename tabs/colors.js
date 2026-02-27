window.renderColorsTab = function (content) {
    // Line 1
    const line1 = document.createElement("div");
    line1.textContent = "Text will go here!";
    line1.style.color = "yellow";
    line1.style.backgroundColor = "black";
    line1.style.padding = "10px";
    line1.style.marginBottom = "10px";
    line1.style.textAlign = "center"; 

    // Line 2
    const line2 = document.createElement("div");
    line2.textContent = "Text will go here!";
    line2.style.color = "purple";
    line2.style.backgroundColor = "yellow";
    line2.style.padding = "10px";
    line2.style.marginBottom = "20px";
    line2.style.textAlign = "center"; 

    // Chart
    const chartContainer = document.createElement("div");
    chartContainer.style.display = "flex";
    chartContainer.style.justifyContent = "center";
    chartContainer.style.alignItems = "center";
    chartContainer.style.marginTop = "20px";

    const canvas = document.createElement("canvas");
    canvas.style.maxWidth = "100%";  
    canvas.style.height = "auto";    

    chartContainer.appendChild(canvas);

    content.appendChild(line1);
    content.appendChild(line2);
    content.appendChild(chartContainer);

    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue', 'Green', 'Yellow'],
            datasets: [{
                data: [30, 25, 25, 20],
                backgroundColor: ['#ff3b3b','#0000ff','#00ff00','#ffff00'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,        
            maintainAspectRatio: true, 
            plugins: {
                datalabels: {
                    color: '#000',
                    font: { weight: 'bold', size: 14 },
                    formatter: (value, context) => value + '%'
                }
            }
        },
        plugins: [ChartDataLabels]
    });
};