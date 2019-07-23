google.charts.load('current', {'packages':['line'], callback: drawChart});

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Result', 'Amount'],
        ['Passed', 587],
        ['Unknown', 80],
        ['Skipped',  97],
        ['Failed', 184]
    ]);

    var options = {
        title: 'Results',
        pieSliceText: 'none',
        pieHole: 0.4,
        colors: ['#007502', '#d18f00', '#003ec4', '#940000']
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}
