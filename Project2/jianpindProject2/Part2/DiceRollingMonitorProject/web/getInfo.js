// port and host information
// here we use local mosquitto
var host = "localhost";
var port = 9002;

// create a new client
client = new Paho.MQTT.Client(host, Number(port), "jianpindSub");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess: onConnect});

// called when the client connects
function onConnect() {
    console.log("connection established");
    client.subscribe("DiceRolling", {qos: 1});
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    // console.log("onMessageArrived:" + message.payloadString);
    var msg_json = JSON.parse(message.payloadString);
    var firstRoll = msg_json.Die1;
    var secondRoll = msg_json.Die2;

    changeChart(firstRoll, secondRoll);
    drawLine(firstRoll, secondRoll);
}