function drawChartErrorOverview(reportData) {

    var result = [];
    var sum = 0;
    var maxFailed = 0;

    result.push(['Date', 'Failed']);

    $.each(reportData, function(index, report) {
        var row=[];
        var date = new Date(report.date.$date);

        var failedScenariosSum = 0;
        var passedScenariosSum = 0;

        $.each( report.features, function( index, feature) {
            failedScenariosSum += getFailedScenarioCount(feature);
            passedScenariosSum += getPassedScenarioCount(feature);
        });

        row.push(date.toString('dd.MM.yyyy'));
        row.push();
        row.push(failedScenariosSum);
        result.push(row);

        sum += passedScenariosSum + failedScenariosSum;

        if(failedScenariosSum > maxFailed) {
            maxFailed = failedScenariosSum;
        }
    });

    result = google.visualization.arrayToDataTable(result);

    var options = {
        title: sum + ' Tests',
        colors: ['#940000'],
        legend: 'none',
        vAxis: {
            viewWindow: { max: maxFailed+10 }
        },
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('errorOverview'));
    chart.draw(result, options);
}

