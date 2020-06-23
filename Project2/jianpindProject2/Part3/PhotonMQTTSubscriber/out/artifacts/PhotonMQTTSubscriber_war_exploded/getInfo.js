var host = "broker.hivemq.com";
var port = 8000;

var map = new Map();

client = new Paho.MQTT.Client(host, Number(port), "jianpindSub");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({onSuccess: onConnect});

function onConnect() {
    console.log("connection established");
    client.subscribe("student/id", {qos: 1});
}

function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var msg_json = JSON.parse(message.payloadString);
    var name = msg_json.name;
    var andrewURL = msg_json.URL;
    if (!map.has(name)) {
        map.set(name, andrewURL);
        updateWeb();
    }

    // var msgBox = document.getElementById("photonBox");
    // var newMsg = document.createElement("p");
    // newMsg.innerHTML = "Name: " + name + ", " + "URL: " + andrewURL;
    // msgBox.append(newMsg);
}

function updateWeb() {
    var msgBox = document.getElementById("photonBox");
    var newMsg = document.createElement("p");

    for ([name, andrewURL] of map.entries()) {
        newMsg.innerHTML = "Name: " + name + ", " + "URL: " + andrewURL;
        msgBox.append(newMsg);
    }
}