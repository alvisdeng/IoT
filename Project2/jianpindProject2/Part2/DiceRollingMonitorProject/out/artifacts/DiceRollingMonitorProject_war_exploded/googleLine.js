// data structure used to store the occurrence times of each sum value
var map = new Map();
for (var i = 2; i <= 12; i++) {
    map.set(i, 0);
}
var mapFre = new Map();

// line chart packages
google.charts.load('current', {'packages': ['corechart']});

// line chart options
var lineOptions = {
    title: 'DiceRolling Possibility',
    legend: {position: 'bottom'},
    vAxis: {
        minValue: 0,
        maxValue: 1,
        title: 'Frequency'
    },
    hAxis: {
        minValue: 2,
        maxValue: 12,
        title: 'Sum',
        format: '#'
    }
};

// this a another count, but the value is sames as count in googleGauge.js
var anotherCount = 0;

// called when messages arrived from broker
function drawLine(firstRoll, secondRoll) {
    anotherCount += 1;

    var sum = Number(firstRoll) + Number(secondRoll);
    map.set(sum, map.get(sum) + 1);

    var partThreeLine = new google.visualization.LineChart(document.getElementById("partThree"));
    var partThreeData = new google.visualization.DataTable();
    partThreeData.addColumn('number', 'sum');
    partThreeData.addColumn('number', 'frequency');

    for (var i = 2; i <= 12; i++) {
        mapFre.set(i, map.get(i)/anotherCount);
    }

    partThreeData.addRows([[2, mapFre.get(2)],
        [3, mapFre.get(3)],
        [4, mapFre.get(4)],
        [5, mapFre.get(5)],
        [6, mapFre.get(6)],
        [7, mapFre.get(7)],
        [8, mapFre.get(8)],
        [9, mapFre.get(9)],
        [10, mapFre.get(10)],
        [11, mapFre.get(11)],
        [12, mapFre.get(12)]]);

    partThreeLine.draw(partThreeData, lineOptions);
}