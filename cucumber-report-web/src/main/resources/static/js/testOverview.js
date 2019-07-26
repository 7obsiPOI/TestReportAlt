function drawChartTestOverview(reportData, test) {

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
            skipped += getSkippedScenarioCount(feature);
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

    result = google.visualization.arrayToDataTable(result);

    var options = {
        height: 350,
        width: 1000,
        legend: { position: 'top', maxLines: 4 },
        bar: { groupWidth: '80%' },
        isStacked: true,
        colors: ['#007502', '#d18f00', '#003ec4', '#940000'],
        backgroundColor: { fill: 'transparent' }
    };

    var chart = new google.visualization.BarChart(document.getElementById('testOverview'));

    function selectHandler() {
        var row = chart.getSelection()[0].row;

        var selectedDate = result.getValue(row, 0);

        $.each(reportData, function(index, report) {
            var compareDate = new Date(report.date.$date);

            if(selectedDate === compareDate.toString('dd.MM.yyyy (HH:mm:ss)')) {
                selectedDate = report.date.$date;
                location.href = '/#/' + test + '/features/' + selectedDate + '/';
            }
        });
    }

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    google.visualization.events.addListener(chart, 'select', selectHandler);

    chart.draw(result, options);
}
