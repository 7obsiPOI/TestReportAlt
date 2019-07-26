function drawChartLastTestResults(reportData, count) {
    //get data from DB

    var data = [];
    var dataError = [];
    var sum = 0;
    var last = [];
    var lastError = [];

    data.push(['Date', 'Passed', 'Failed']);
    dataError.push(['Date', 'Failed']);

    $.each(reportData, function(index, report) {
        var failed = 0;
        var unknown = 0;
        var skipped = 0;
        var passed = 0;
        var date = new Date(report.date.$date);

        date = date.toString('dd.MM.yyyy');

        $.each(report.features, function(index, feature) {
            if(name === '') {
                name = feature.name;
            }
            failed += getFailedScenarioCount(feature);
            unknown += getUnknownScenarioCount(feature);
            passed += getPassedScenarioCount(feature);
            skipped += getSkippedScenarioCount(feature);
        });

        var row = [];
        row.push(date);
        row.push(passed);
        row.push(failed);

        var rowError = [];
        rowError.push(date);
        rowError.push(failed);

        last = row;
        lastError = rowError;
        sum = failed + passed + unknown + skipped;
    });
    data.push(last);
    dataError.push(lastError);

    data = google.visualization.arrayToDataTable(data);
    dataError = google.visualization.arrayToDataTable(dataError);

    var options = {
        title: 'Results\n(' + sum + ' Tests)',
        isStacked: true,
        height: 450,
        width: 150,
        colors: ['#007502', '#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var options2 = {
        title: 'Error(s)\n(' + sum + ' Tests)',
        isStacked: true,
        height: 350,
        width: 150,
        colors: ['#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementsByClassName("lastTestResult")[count]);
    chart.draw(data, options);

    var errorChart = new google.visualization.ColumnChart(document.getElementsByClassName("lastTestErrors")[count]);
    errorChart.draw(dataError, options2);
}
