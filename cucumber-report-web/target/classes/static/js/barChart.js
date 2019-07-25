google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawBarChart);


//to load all charts when you go to a page the functions have to be named differently!!!

function drawBarChart() {
    var data = google.visualization.arrayToDataTable([
        ['Feature', 'Passed', 'Skipped', 'Unknown', 'Failed' ],
        ['Feature 1', 407, 54, 14, 294],
        ['Feature 2', 509, 30, 37, 137],
        ['Feature 3', 834, 9, 22, 157]
    ]);

    var options = {
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        colors: ['#64ff64', '#ffff64', '#6464ff', '#ff6464']
    };

    var chart = new google.visualization.BarChart(document.getElementById("barChart"));
    chart.draw(data, options);
}
