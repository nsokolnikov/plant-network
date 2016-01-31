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
    var points = Measurements.find().fetch();
    x=[];
    data=[];
    updateData();
}

function insertPoints(points) {
    x.push('x');
    data.push('data1');
    for (var index in points) {
        var point = points[index];
        if (point.data === undefined || point.time === undefined) {
            continue;
        }
        x.push(point.time);
        data.push(point.data);

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

Template.plantMeasurementChart.onCreated(function() {
    this.subscribe('recentMeasurementByPlant', 10451577);
    console.log(this);

})


Template.plantMeasurementChart.onRendered(function () {
    //Meteor.call('getLastNMeasurements',0,5,function(err,value){
    var points = Measurements.find().fetch();
        insertPoints(points);
        startRefreshing();
    //});
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
});