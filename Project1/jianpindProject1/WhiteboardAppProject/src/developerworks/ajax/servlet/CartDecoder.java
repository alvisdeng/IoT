package developerworks.ajax.servlet;

// In order to use Cart class
import developerworks.ajax.store.Cart;

import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import java.io.StringReader;

/**
 * Convert WebSocket Messages into Java Objects
 */
public class CartDecoder implements Decoder.Text<Cart> {

    // Store the websocket messages
    private static Cart cart;

    // Executed when CartDecoder is used
    static {
        cart = new Cart();
    }

    /**
     * Decode the websocket message
     *
     * @param s websocket message
     * @return the data after decoding
     * @throws DecodeException Throw Exceptions
     */
    @Override
    public Cart decode(String s) throws DecodeException {
        System.out.println("decoding: " + s);

        // Convert the json string from websocket.send(msg)
        JsonObject jsonObject = Json.createReader(new StringReader(s)).readObject();

        // Get the value of action and item
        String action = jsonObject.getString("action");
        String item = jsonObject.getString("item");

        // Check whether the message from the client are valid
        if ((action != null) && (item != null)) {
            if (action.equals("add")) {
                cart.addItem(jsonObject.getString("item"));
            } else if (action.equals("remove")) {
                cart.removeItems(jsonObject.getString("item"));
            } else if (action.equals("reload")) {
                return cart;
            }
        }
        return cart;
    }

    /**
     * Check whether the websocket message from client can be decoded
     *
     * @param s websocket message
     * @return Whether the message can be decoded
     */
    @Override
    public boolean willDecode(String s) {
        try {
            Json.createReader(new StringReader(s)).readObject();
            return true;
        } catch (JsonException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    /**
     * Initiate the decode
     */
    @Override
    public void init(EndpointConfig endpointConfig) {
        System.out.println("init");
    }

    /**
     * Destroy the decode
     */
    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
