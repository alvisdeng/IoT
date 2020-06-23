// google gauge packages
google.charts.load('current', {'packages': ['gauge']});

// draw guages when page is loaded
google.charts.setOnLoadCallback(drawChart);

// gauge charts options
var partOneOptions = {min: 1, max: 6, minorTicks: 5, yellowFrom: 2, yellowTo: 4, redFrom: 4, redTo: 6,};
var partTwoOptions = {min: 2, max: 12, minorTicks: 5, yellowFrom: 4, yellowTo: 8, redFrom: 8, redTo: 12};

// Gauge chart objects
var partOneGauge, partTwoGauge;
// Gauge chart data
var partOneData, partTwoData;
// times of rolling
var count = 0;
// the sum of all rolling
var total = 0;

// called when page is loaded
function drawChart() {
    partOneData = new google.visualization.DataTable();
    partTwoData = new google.visualization.DataTable();

    partOneData.addColumn('number', 'Gauge 1');
    partOneData.addColumn('number', 'Gauge 2');
    partOneData.addRows(1);
    partOneData.setCell(0, 0, 1);
    partOneData.setCell(0, 1, 1);

    partTwoData.addColumn('number', 'Gauge 3');
    partTwoData.addColumn('number', 'Gauge 4');
    partTwoData.addRows(1);
    partTwoData.setCell(0, 0, 2);
    partTwoData.setCell(0, 1, 2);

    partOneGauge = new google.visualization.Gauge(document.getElementById("partOne"));
    partTwoGauge = new google.visualization.Gauge(document.getElementById("partTwo"));

    partOneGauge.draw(partOneData, partOneOptions);
    partTwoGauge.draw(partTwoData, partTwoOptions);
}

// called when messages arrived from broker
function changeChart(firstRoll, secondRoll) {
    count += 2;
    var sum = Number(firstRoll) + Number(secondRoll);
    total += sum;

    partOneData.setValue(0, 0, Number(firstRoll));
    partOneData.setValue(0, 1, Number(secondRoll));
    partOneGauge.draw(partOneData, partOneOptions);

    partTwoData.setValue(0, 0, sum);
    partTwoData.setValue(0, 1, total / count);
    partTwoGauge.draw(partTwoData, partTwoOptions);
}