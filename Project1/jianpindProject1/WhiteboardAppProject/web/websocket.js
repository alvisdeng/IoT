// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;


// With websocket, The server can actively push information to the client, and the client can also actively send
// information to the server, is a true two-way equal conversation, belongs to the server push technology.
// document.location.host --> Return the host name and port number of the current URL
// document.location.pathname --> Returns the path section of the current URL
// Initiate the handshake
// The protocol identifier is WS (or WSS if encrypted)
var wsUri = "ws://" + document.location.host + document.location.pathname + "websocket";
var websocket = new WebSocket(wsUri);

/*
 * Sending data to the server
 *
 * @msg the message from the user
 */
function sendText(msg) {
    console.log("sending text: " + msg);
    //Client-initiated message to the server
    websocket.send(msg);
}

// Optional callback, invoked when a WebSocket connection is established
// JSON.stringify() --> Convert a JavaScript value (object or array) to a JSON string
function onOpen() {
    console.log("Connected to: " + wsUri);
    sendText(JSON.stringify({action:"reload", item:"reload"}));
}
websocket.onopen = function (evt) {
    onOpen(evt)
};


//Optional callback, invoked if a connection error has occurred
function onError(evt) {
    console.log("Error occurs");
}
websocket.onerror = function (evt) {
    onError(evt)
};

// A callback function invoked for receiving each new message from the server
function onMessage(evt) {
    updateCart(evt.data);
}
websocket.onmessage = function (evt) {
    onMessage(evt)
};

// Optional callback, invoked when the connection is terminated
function onClose() {
    alert("Connection closed")
}
websocket.onclose = function () {
    onClose();
}

// Add the specific item to the cart
function addToCart(itemCode) {
    sendText(JSON.stringify({action:"add", item:itemCode}));
}

// Remove the specific item from the cart
function removeFromCart(itemCode) {
    sendText(JSON.stringify({action:"remove", item:itemCode}));
}

// Reflect the updated cart on the web page
function updateCart(cartJson) {
    // Get the root "cart" element from the document
    // The getElementsByTagName() method returns a list of nodes for all elements with the specified name
    var cart = JSON.parse(cartJson);

    // Check that a more recent cart document hasn't been processed already
    var generated = cart.generated;
    if (generated > lastCartUpdate) {
        lastCartUpdate = generated;

        // Clear the HTML list used to display the cart contents
        var contents = document.getElementById("contents");
        contents.innerHTML = "";

        // Loop over the items in the cart
        var items = cart.cartList;
        for (var i = 0; i < getJsonLength(items); i++) {

            var item = items[i];

            // Extract the data from the name and quantity elements of the json file
            var name = item.itemName;
            var quantity = item.quantity;

            // Create and add a list item HTML element for this cart item
            var listItem = document.createElement("li");
            listItem.appendChild(document.createTextNode(name + " x " + quantity));
            contents.appendChild(listItem);
        }
    }
    // Update the cart's total using the value from the cart document
    document.getElementById("total").innerHTML = cart.totalCost;
}

/*
 * Get the number of elements in the list of a json file
 */
function getJsonLength(json) {
    var jsonLength = 0;
    for (var i in json) {
        jsonLength++;
    }
    return jsonLength;
}