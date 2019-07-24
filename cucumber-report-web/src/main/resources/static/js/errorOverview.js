/*
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

    //var chart = new google.visualization.AreaChart(document.getElementById('timeline'));
    //chart.draw(data, options);
}
 */

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
        height: 350,
        width: 750,
        title: 'Error Overview (' + sum +' Tests)',
        colors: ['#940000'],
        legend: 'none',
        vAxis: {
            viewWindow: { max: maxFailed+10 }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('errorOverview'));
    chart.draw(result, options);
}

