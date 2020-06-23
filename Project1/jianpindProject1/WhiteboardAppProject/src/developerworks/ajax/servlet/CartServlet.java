// package information
package developerworks.ajax.servlet;


import developerworks.ajax.store.Cart;

import java.io.IOException;
import java.util.*;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/websocket", encoders = {CartEncoder.class}, decoders = {CartDecoder.class})
public class CartServlet {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    /**
     * Adds the user to the session when the page is loaded
     *
     *
     * @param peer new browser page
     */
    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
    }

    /**
     * Remove the user from the session when the page is closed
     *
     *
     * @param peer new browser page
     */
    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
    }


    /**
     * Push the updated cart to all sessions (users)
     *
     *
     * @param cart updated cart
     * @param session browser page
     * @throws IOException Throw exception
     * @throws EncodeException Throw exception
     */
    @OnMessage
    public void sendCart(Cart cart, Session session) throws IOException, EncodeException {
        System.out.println("Message received");
        for (Session peer:peers) {
            peer.getBasicRemote().sendObject(cart);
        }

    }
}