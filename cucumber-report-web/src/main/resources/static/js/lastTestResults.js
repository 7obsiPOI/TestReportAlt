function drawChartLastTestResults(reportData) {
    //get data from DB

    var data = [];
    var sum = 0;
    var last = [];

    data.push(['Date', 'Passed', 'Failed']);

    console.log(data);
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
    });
    data.push(last);

    data = google.visualization.arrayToDataTable(data);

    var options = {
        title: 'Results (' + sum + ' Tests)',
        isStacked: true,
        height: 450,
        col: { groupWidth: '50%' },
        colors: ['#007502', '#940000'],
        legend: 'none',
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("lastTestResult"));
    chart.draw(data, options);
}
