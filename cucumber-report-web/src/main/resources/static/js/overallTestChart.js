function drawChartOverallTests(reportData) {

    var result = [];

    result.push(['Result', 'Sum', {role: 'style'}, {role: 'annotation'}]);

    var failed = 0;
    var unknown = 0;
    var passed = 0;

    $.each(reportData, function(index, report) {
        $.each(report.features, function(index, feature) {
            failed += getFailedScenarioCount(feature);
            unknown += getUnknownScenarioCount(feature);
            passed += getPassedScenarioCount(feature);
        });
    });

    var sum = passed + failed + unknown;

    if(unknown !== 0) {
        result.push(['Unknown', unknown, '#003ec4', unknown]);
    }
    result.push(['Failed', failed, '#940000', failed]);
    result.push(['Passed', passed, '#007502', passed]);

    result = google.visualization.arrayToDataTable(result);

    var options = {
        title: 'Overall Results (' + sum + ' Tests/Scenarios)',
        legend: 'none'
    };

    var chart = new google.visualization.BarChart(document.getElementById('overallTests'));
    chart.draw(result, options);

    //return result;



    /*
    var results = [];
    results.push(['Date', 'Passed', 'Unknown', 'Failed']);
    $.each( reportData, function( index, report ) {
        var row=[];
        var date = new Date(report.date.$date);

        var failedScenariosSum = 0;
        var unknownScenariosSum = 0;
        var passedScenariosSum = 0;

        $.each( report.features, function( index, feature) {
            failedScenariosSum += getFailedScenarioCount(feature);
            unknownScenariosSum += getUnknownScenarioCount(feature);
            passedScenariosSum += getPassedScenarioCount(feature);
        });

        row.push(date.toString('dd.MM.yyyy HH:mm:ss'));
        row.push();
        row.push(passedScenariosSum);
        row.push(unknownScenariosSum);
        row.push(failedScenariosSum);
        results.push(row);
    });

    return results;
     */
}
