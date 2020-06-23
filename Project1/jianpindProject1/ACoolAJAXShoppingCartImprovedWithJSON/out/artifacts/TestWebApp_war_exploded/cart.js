// This js is used to update the page to reflect the cart XML document
// Timestamp of cart that page was last updated with
var lastCartUpdate = 0;

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function addToCart(itemCode) {

    // Obtain an XMLHttpRequest instance
    var req = newXMLHttpRequest();

    /* Set the handler function to receive callback notifications from the request object.
       This function is called whenever the readyState property is changed.
    */
    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    // Open an HTTP POST connection to the shopping cart servlet. Third parameter specifies request is asynchronous.
    req.open("POST", "cart.do", true);
    // Specify that the body of the request contains form data
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Send form encoded data stating that I want to add the specified item to the cart.
    req.send("action=add&item=" + itemCode);
}

/*
 * Removes the specified item from the shopping cart, via AJAX call
 * itemCode - product code of the item to be removed
 */
function removeFromCart(itemCode) {
    // Obtain an XMLHttpRequest instance
    var req = newXMLHttpRequest();

    /* Set the handler function to receive callback notifications from the request object.
       This function is called whenever the readyState property is changed.
    */
    req.onreadystatechange = getReadyStateHandler(req, updateCart);

    // Open an HTTP POST connection to the shopping cart servlet. Third parameter specifies request is asynchronous.
    req.open("POST","cart.do",true);
    // Specify that the body of the request contains form data
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // Send form encoded data stating that I want to add the specified item to the cart.
    req.send("action=remove&item=" + itemCode);

}

/*
 * Update shopping-cart area of page to reflect contents of cart described in JSON document.
 *
 */
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