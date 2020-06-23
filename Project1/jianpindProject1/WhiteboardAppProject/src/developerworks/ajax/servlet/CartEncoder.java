package developerworks.ajax.servlet;

import developerworks.ajax.store.Cart;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

/**
 * Convert Java Objects into WebSocket Messages
 */
public class CartEncoder implements Encoder.Text<Cart>{

    // Encode the java objects
    @Override
    public String encode(Cart cart) throws EncodeException {
        return cart.toJSON();
    }

    // Initiate the encode
    @Override
    public void init(EndpointConfig endpointConfig) {
        System.out.println("init");
    }

    // Destroy the encode
    @Override
    public void destroy() {
        System.out.println("destroy");
    }
}
