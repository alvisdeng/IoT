// host and port information
// here I use a remote broker
var host = 'broker.hivemq.com';
var port = 8000;

// create a client instance
client = new Paho.MQTT.Client(host, Number(port), "jianpindSub");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess: onConnect});


// called when the client connects
function onConnect() {
    console.log("connection established");
    client.subscribe("/mqtt", {qos: 1});
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var coor_json = JSON.parse(message.payloadString);
    var msgBox = document.getElementById("demo");
    var newMsg = document.createElement("p");
    newMsg.innerHTML = "X: " + coor_json.X + ", " + "Y: " + coor_json.Y;
    msgBox.append(newMsg);
}
