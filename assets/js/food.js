google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Day');
    data.addColumn('timeofday', 'Breakfast');
    data.addColumn('timeofday', 'Lunch');
    data.addColumn('timeofday', 'Dinner');

    data.addRows([
        [new Date(2022, 1, 1),  [8, 30], [12, 15], [16, 59]],
        [new Date(2022, 1, 2),  [9, 21], [13, 29], [17, 45]],
        [new Date(2022, 1, 3),  [8, 39], [12, 16], [18, 32]],
        [new Date(2022, 1, 4),  [8, 24], [11, 18], [15, 45]],
        [new Date(2022, 1, 5),  [9, 26], [14, 35], [16, 45]],
        [new Date(2022, 1, 6),  [7, 21], [12, 46], [16, 38]],
        [new Date(2022, 1, 7),  [6, 10], [12, 58], [17, 25]],
        [new Date(2022, 1, 8),  [7, 58], [11, 16], [17, 18]],
        [new Date(2022, 1, 9),  [8, 16], [15, 25], [19, 11]],
    ]);

    var options = {
        chart: {
            title: 'Food Box Data',
            subtitle: 'Day/Time'
        },
        hAxis: {
            title: 'Day',
        },
        vAxis: {
            title: 'Time'
        }
    };

    var chart = new google.charts.Line(document.getElementById('chart'));

    chart.draw(data, google.charts.Line.convertOptions(options));
}