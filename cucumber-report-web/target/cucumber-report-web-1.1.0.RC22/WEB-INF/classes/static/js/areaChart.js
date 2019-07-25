google.charts.load('current', {'packages':['line'], callback: drawAreaChart});

function drawAreaChart() {
    var data = google.visualization.arrayToDataTable([
        ['Date', 'Passed', 'Failed'],
        ['15.07.',  597,      394],
        ['16.07.',  205,      492],
        ['17.07.',  507,      318],
        ['18.07.',  847,      234]
    ]);

    var options = {
        title: 'Timeline',
        hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0},
        colors: ['#007502', '#940000']
    };

    var chart = new google.visualization.AreaChart(document.getElementById('timeline'));
    chart.draw(data, options);
}
