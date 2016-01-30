
function MyWebSocketHandler(url, ws) {
    ws.on('open', Meteor.bindEnvironment(function (msg) {
        console.log("Connection!");
    }));
    ws.on('message', Meteor.bindEnvironment(function (msg) {
        console.log(msg.data);
        console.log(JSON.parse(msg.data));
    }));
    ws.on('close', Meteor.bindEnvironment(function () {

    }));
    ws.on('error', Meteor.bindEnvironment(function (msg) {

    }));
}
server = new WebSocketServer('/sensorData', Meteor.bindEnvironment(MyWebSocketHandler));


