/*
 * Returns an new XMLHttpRequest object, or false if the browser
 * doesn't support it
 *
 * The XMLHttpRequest object is used to exchange data with the server in the backend.
 * With XMLHttpRequest, we can:
 * 1. Updating pages without reloading them
 * 2. Request data from the server after the page has been loaded
 * 3. Receive data from the server after the page has been loaded
 * 4. Sending data to the server in the backend
 */
function newXMLHttpRequest() {

    var xmlreq = false;

    // Create XMLHttpRequest object in non-Microsoft browsers
    /*
    The if (window.XMLHttpRequest) part checks if an XMLHttpRequest object can be created without throwing an error.
    If this throws an error, it means that the user has an older browser (IE 5 or IE6), so instead it tries to create
    an ActiveXObject which is essentially the same but works only for these older browsers.
     */
    if (window.XMLHttpRequest) {
        xmlreq = new XMLHttpRequest();

    } else if (window.ActiveXObject) {

        try {
            // Try to create XMLHttpRequest in later versions
            // of Internet Explorer

            xmlreq = new ActiveXObject("Msxml2.XMLHTTP");

        } catch (e1) {

            // Failed to create required ActiveXObject

            try {
                // Try version supported by older versions
                // of Internet Explorer

                xmlreq = new ActiveXObject("Microsoft.XMLHTTP");

            } catch (e2) {

                // Unable to create an XMLHttpRequest by any means
                xmlreq = false;
            }
        }
    }

    return xmlreq;
}

/*
 * Returns a function that waits for the specified XMLHttpRequest
 * to complete, then passes it XML response to the given handler function.
    * req - The XMLHttpRequest whose state is changing
    * responseXmlHandler - Function to pass the XML response to

 * When an XMLHttpRequest object sends an HTTP request to a server it goes through several states: it waits until the
 * request is completed; then, it receives a response. In this way, the script responds correctly to the various states.
 *
 * XMLHttpRequest.readyState
 * readyState = 0 --> Describe an "uninitialized" state; at this point, an XMLHttpRequest object has been created,
 *                    but not yet initialized.
 * readyState = 1 --> Describe a "ready to send" state; at this point, the code has called the XMLHttpRequest.open()
 *                    method and XMLHttpRequest is ready to send a request to the server.
 * readyState = 2 --> Describes a "has been sent" state; at this point, a request has been sent to the server via the
 *                    send() method, but a response has not been received.
 * readyState = 3 --> Describes an "incoming" state; at this point, the HTTP response header message has been received,
 *                    but the body portion has not been fully received.
 * readyState = 4 --> Describe a "loaded" state; at this point, the response has been fully received.
 *
 * XMLHttpRequest.status
 * The status attribute describes the HTTP status code and is of type short. And, this status attribute is only
 * available if the value of ready is 3 (incoming) or 4 (loaded). Attempting to access the value of STATUS when the
 * value of the ready is less than 3 will throw an exception.
 * Status = 0 --> Not completed
 * Status = 200 --> Completed
 */
function getReadyStateHandler(req, responseXmlHandler) {

    // Return an anonymous function that listens to the XMLHttpRequest instance
    return function () {

        // If the request's status is "complete"
        if (req.readyState == 4) {

            // Check that we received a successful response from the server
            if (req.status == 200) {

                // Pass the JSON payload of the response to the handler function.
                responseXmlHandler(req.responseText);

            } else {

                // An HTTP problem has occurred
                alert("HTTP error " + req.status + ": " + req.statusText);
            }
        }
    }
}
