//to load all charts when you go to a page the functions have to be named differently!!!

function drawColChart() {
    var data = google.visualization.arrayToDataTable([
        ['Test', 'Passed', 'Unknown', 'Skipped', 'Failed' ],
        ['19.4', 407, 54, 14, 294],
        ['19.3', 509, 30, 37, 137]
    ]);

    var options = {
        height: 450,
        legend: 'none',
        bar: { groupWidth: '75%' },
        isStacked: true,
        colors: ['#007502', '#d18f00', '#003ec4', '#940000']
    };

    //var chart = new google.visualization.ColumnChart(document.getElementById("colChart"));
    //chart.draw(data, options);
}
