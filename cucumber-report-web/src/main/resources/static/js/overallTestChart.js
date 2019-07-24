function drawChartOverallTests(reportData) {

    var result = [];

    result.push(['Result', 'Sum', {role: 'style'}, {role: 'annotation'}]);

    var failed = 0;
    var unknown = 0;
    var passed = 0;
    var skipped = 0;

    $.each(reportData, function(index, report) {
        $.each(report.features, function(index, feature) {
            failed += getFailedScenarioCount(feature);
            unknown += getUnknownScenarioCount(feature);
            skipped += getSkippedScenarioCount(feature);
            passed += getPassedScenarioCount(feature);
        });
    });

    var sum = passed + failed + unknown;

    if(unknown !== 0) {
        result.push(['Unknown', unknown, '#003ec4', unknown]);
    }
    result.push(['Failed', failed, '#940000', failed]);
    if(skipped !== 0)
        result.push(['Skipped', skipped, '#ffff50', skipped]);
    result.push(['Passed', passed, '#007502', passed]);

    result = google.visualization.arrayToDataTable(result);

    var options = {
        title: 'Overall Results (' + sum + ' Tests/Scenarios)',
        legend: 'none',
        height: 350,
        width: 750
    };

    var chart = new google.visualization.BarChart(document.getElementById('overallTests'));
    chart.draw(result, options);
}
