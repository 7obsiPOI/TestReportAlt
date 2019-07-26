function drawChartLastTestErrors(reportData) {
    //get data from DB

    var data = [];
    var sum = 0;
    var last = [];

    data.push(['Date', 'Failed']);

    $.each(reportData, function(index, report) {
        var failed = 0;
        var date = new Date(report.date.$date);

        date = date.toString('dd.MM.yyyy');

        $.each(report.features, function(index, feature) {
            if(name === '') {
                name = feature.name;
            }
            failed += getFailedScenarioCount(feature);
        });

        var row = [];
        row.push(date);
        row.push(failed);

        last = row;
        sum = failed;
    });
    data.push(last);

    data = google.visualization.arrayToDataTable(data);

    var options = {
        title: sum + ' Error(s)',
        height: 450,
        col: { groupWidth: '50%' },
        colors: ['#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("lastTestErrors"));
    chart.draw(data, options);
}
