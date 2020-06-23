// host and port info
// here we use remove broker
var host = "broker.hivemq.com";
var port = 8000;

// create a map to store the data received
var map = new Map();

// create a new client
client = new Paho.MQTT.Client(host, Number(port), "jianpindSub");

// create callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// creat the connection
client.connect({onSuccess: onConnect});

// called when connected
function onConnect() {
    console.log("connection established");
    client.subscribe("student/id", {qos: 1});
}

// called when conneciton lost
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when message arrived
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var msg_json = JSON.parse(message.payloadString);
    var name = msg_json.name;
    var andrewURL = msg_json.URL;
    if (!map.has(name)) {
        map.set(name, andrewURL);
        updateWeb();
    }
}

// update web when received different names
function updateWeb() {
    var msgBox = document.getElementById("photonBox");
    var newMsg = document.createElement("p");

    for ([name, andrewURL] of map.entries()) {
        newMsg.innerHTML = "Name: " + name + ", " + "URL: " + andrewURL;
        msgBox.append(newMsg);
    }
}