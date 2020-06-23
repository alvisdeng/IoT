// location information
var host = 'broker.hivemq.com';
var port = 8000;

client = new Paho.MQTT.Client(host, Number(port), "jianpindPub");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess: onConnect});


// called when the client connects
function onConnect() {
    console.log("onConnect");
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
}

function publish(msg) {
    message = new Paho.MQTT.Message(msg);
    message.destinationName = "/mqtt";
    message.qos = 1;
    message.retained = true;
    client.send(message);
}

function myFunction(e) {
    var x = e.clientX;
    var y = e.clientY;
    document.getElementById("demo").innerHTML = "Coordinates: (" + x + "," + y + ")";

    // publish message to the broker
    var coor_json = '{"X":"' + x + '","Y":"' + y + '"}'
    publish(coor_json);
}

//clear the content in demo area
function clearCoor() {
    document.getElementById("demo").innerHTML = "";
}