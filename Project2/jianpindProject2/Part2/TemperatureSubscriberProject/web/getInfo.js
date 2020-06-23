// host and port information
// here we use local mosquitto
var host = "localhost";
var port = 9002;

// create a client instance
client = new Paho.MQTT.Client(host, Number(port), "jianpindSub");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess: onConnect});

// called when the client connects
// defualt settinhg: subscribe all temps
function onConnect() {
    console.log("connection established");
    client.subscribe("pittsburgh/temperature/#", {qos: 1});
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
    var msg_json = JSON.parse(message.payloadString);
    var temp = msg_json.temperature;
    var time = msg_json.time;
    var topic = message.destinationName;

    var idx = document.getElementById("temps").selectedIndex;
    var choice = document.getElementById("temps").options[idx].text;

    if (choice === topic && choice === "pittsburgh/temperature/coldTemps") {
        var coldBox = document.getElementById("coldInfo");
        var coldMsg = document.createElement("p");
        coldMsg.innerHTML = "Temperature: " + temp + " Farenhite, " + "Time: " + time;
        coldBox.append(coldMsg);
    } else if (choice === topic && choice === "pittsburgh/temperature/niceTemps") {
        var niceBox = document.getElementById("niceInfo");
        var niceMsg = document.createElement("p");
        niceMsg.innerHTML = "Temperature: " + temp + " Farenhite, " + "Time: " + time;
        niceBox.append(niceMsg);
    } else if (choice === topic && choice === "pittsburgh/temperature/hotTemps") {
        var hotBox = document.getElementById("hotInfo");
        var hotMsg = document.createElement("p");
        hotMsg.innerHTML = "Temperature: " + temp + " Farenhite, " + "Time: " + time;
        hotBox.append(hotMsg);
    } else if (choice === "pittsburgh/temperature/allTemps") {
        var allBox = document.getElementById("allInfo");
        var allmsg = document.createElement("p");
        allmsg.innerHTML = "Temperature: " + temp + " Farenhite, " + "Time: " + time;
        allBox.append(allmsg);
    }
}