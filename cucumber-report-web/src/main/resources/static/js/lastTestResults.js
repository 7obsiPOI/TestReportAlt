function drawChartLastTestResults(reportData, count) {
    //get data from DB

    var data = [];
    var sum = 0;
    var last = [];
    var sumFailed = 0;

    data.push(['Date', 'Passed', 'Failed']);

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

        last = row;
        sum = failed + passed + unknown + skipped;
        sumFailed += failed;
    });
    data.push(last);

    data = google.visualization.arrayToDataTable(data);

    var options = {
        title: 'Results\n(' + sum + ' Tests)',
        isStacked: true,
        colors: ['#007502', '#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var options2 = {
        title: 'Error(s)\n(' + sum + ' Tests)',
        colors: ['#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementsByClassName("lastTestResult")[count]);
    chart.draw(data, options);

    document.getElementsByClassName("lastTestErrors")[count].innerHTML = "Failed Tests: " + sumFailed;
}
