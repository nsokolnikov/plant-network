
function MyWebSocketHandler(url, ws) {
    ws.on('message', Meteor.bindEnvironment(function (msg) {
        console.log(msg.text);
    }));
    ws.on('close', Meteor.bindEnvironment(function () {

    }));
    ws.on('error', Meteor.bindEnvironment(function (msg) {

    }));
}
server = new WebSocketServer('/sensorData', Meteor.bindEnvironment(MyWebSocketHandler));

