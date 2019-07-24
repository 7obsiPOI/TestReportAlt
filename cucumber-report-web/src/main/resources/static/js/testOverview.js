function drawChartTestOverview(reportData) {

    var result = [];
    var sum = 0;

    result.push(['Date', 'Passed', 'Skipped', 'Unknown', 'Failed']);

    $.each(reportData, function(index, report) {
        var failed = 0;
        var unknown = 0;
        var skipped = 0;
        var passed = 0;
        var date = new Date(report.date.$date);

        $.each(report.features, function(index, feature) {
            if(name === '') {
                name = feature.name;
            }
            failed += getFailedScenarioCount(feature);
            unknown += getUnknownScenarioCount(feature);
            passed += getPassedScenarioCount(feature);
            if(feature.result.skippedStepCount !== undefined) {
                skipped += feature.result.skippedStepCount; //-> doesn't work result is NAN
            }
            else {
                skipped = 0;
            }
        });
        var row = [];

        row.push(date.toString('dd.MM.yyyy (HH:mm:ss)'));
        row.push(passed);
        row.push(skipped);
        row.push(unknown);
        row.push(failed);

        result.push(row);

        sum += passed + failed + unknown + skipped;
    });

    console.log(result);

    result = google.visualization.arrayToDataTable(result);

    var options = {
        height: 350,
        width: 1000,
        legend: { position: 'top', maxLines: 4 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        colors: ['#007502', '#d18f00', '#003ec4', '#940000']
    };

    var chart = new google.visualization.BarChart(document.getElementById('testOverview'));
    chart.draw(result, options);
}
