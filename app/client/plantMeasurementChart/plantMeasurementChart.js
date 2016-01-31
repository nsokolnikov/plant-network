var x = [];
var data =[];
var counter = 5;
function fetchData() {
    Meteor.call('getLastNMeasurements',0,50,function(err,value){
        console.log(value);
        insertPoints(value);
    });
}

function updateData(){
    Session.set('x',x);
    Session.set('data1',data);
}

function insertNewPoint() {
    Meteor.call('getLastNMeasurements', 0, 1, function (err, value) {
        if (value != undefined) {
            var point = value[0];
            console.log(point);
            x.push(counter++);
            //x.push(point.time);
            data.push(point.data);
            if (data.length > 15) {
                x.splice(1,1);
                data.splice(1,1);
            }
            updateData();
        }
    });
}

function insertPoints(points) {
    x.push('x');
    data.push('data1');
    for (var point in points) {
        x.push(points[point].time);
        data.push(points[point].data);
    }
    updateData();
}

function removeLastPoint() {
    var toRemove = Points.findOne({sort:{time:1}});
    Points.remove(toRemove._id);
}

function startRefreshing() {
    setInterval(insertNewPoint, 1000);
}

Template.plantMeasurementChart.rendered = function () {
    Meteor.call('getLastNMeasurements',0,5,function(err,value){
        console.log(value);
        insertPoints(value);
        startRefreshing();
    });
    var chart = c3.generate({
        bindto: this.find('.chart'),
        data: {
            xs: {
                'data1': 'x'
            },
            columns: [['x'],['data1']]
        }
    });

    this.autorun(function (tracker) {
        chart.load({columns: [
            Session.get('x'),
            Session.get('data1'),
            []
        ]});
    });
}