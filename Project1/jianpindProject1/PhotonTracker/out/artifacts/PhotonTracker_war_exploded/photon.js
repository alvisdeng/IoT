// This js is used to update the page to reflect the cart XML document
// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Update the state of connection
 */
function updateState() {

    // Obtain an XMLHttpRequest instance
    var req = newXMLHttpRequest();

    /* Set the handler function to receive callback notifications from the request object.
       This function is called whenever the readyState property is changed.
    */
    req.onreadystatechange = getReadyStateHandler(req, updatePhoton);

    // Open an HTTP POST connection to the shopping cart servlet. Third parameter specifies request is asynchronous.
    req.open("POST", "PhotonServlet", true);
    // Specify that the body of the request contains form data
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Send form encoded data stating that I want to get the latest state of photon.
    req.send("action=update");
}


/*
 * Update photon state area of page to reflect contents described in JSON document.
 *
 */
function updatePhoton(photonJson) {
    var photon = JSON.parse(photonJson);

    var generated = photon.generated;
    if (generated > lastCartUpdate) {
        lastCartUpdate = generated;

        var photonID = photon.photonId;
        var photonState = photon.stateInfo;
        var lastBeatTime = photon.lastBeat;

        document.getElementById("photonID").innerHTML = photonID;
        document.getElementById("lastBeat").innerHTML = lastBeatTime;
        document.getElementById("messages").innerHTML = photonState;
    }
}