// package information
package developerworks.ajax.servlet;

// Import the cart to be updated
import developerworks.ajax.store.Cart;
/*
Servlet framework is composed of two Java packages : javax.servlet and javax.servlet.http. The javax.servlet package
defines all Servlet classes must be implemented or extended common interface and class . The HttpServlet class using
the HTTP communication protocol is defined in the javax.servlet.http package.
When the web server receives an HTTP request, Servlet request encapsulated into a HttpServletRequest object, and then
the object is passed to Servlet's corresponding service method.
HTTP requests include DELETE, GET, OPTIONS, POST, PUT and TRACE, in the HttpServlet class provides the corresponding
service methods, they are, doDelete(), doGet(), doOptions(), doPost(), doPut() and doTrace().
 */
import javax.servlet.http.*;
// The Enumeration interface defines the means of obtaining continuous data from a data structure.
import java.util.Enumeration;

public class CartServlet extends HttpServlet {
    /**
     * Updates Cart, and outputs XML representation of contents
     *
     *
     * @param req The HttpServletRequest object represents the client's request, when the client accesses the server
     *            through the HTTP protocol, all the information in the HTTP request header is encapsulated in this
     *            object, through the method provided by this object, all the information of the client request
     *            can be obtained.
     *            HttpServletRequest.getHeaderNames()
     *            HttpServletRequest.getParameter() --> Read data from jsp file
     *
     *
     * @param res The HttpServletResponse object represents the response of the server. This object encapsulates the
     *            method of sending data to the client, sending response headers, and sending response status codes.
     * @throws java.io.IOException Throw IOException
     */
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {

        Enumeration headers = req.getHeaderNames();
        while (headers.hasMoreElements()) {
            String header = (String) headers.nextElement();
            System.out.println(header + ": " + req.getHeader(header));
        }

        Cart cart = getCartFromSession(req);

        String action = req.getParameter("action");
        String item = req.getParameter("item");

        if ((action != null) && (item != null)) {

            if ("add".equals(action)) {
                cart.addItem(item);

            } else if ("remove".equals(action)) {
                cart.removeItems(item);

            }
        }

        // Serialize the Cart's state to JSON
        String cartJson = cart.toJSON();

        // Write JSON to response
        res.setContentType("application/json");
        res.getWriter().write(cartJson);
    }

    /**
     * There are two ways to submit data to the server using forms, one is post and one is get. For example,
     * <form action="inputForm "method="get">, if the method attribute is not specified, the attribute will be defaulted
     * to the "get" method.
     *
     *
     * @param req See above method
     * @param res See above method
     * @throws java.io.IOException Throw IOException
     */
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        // Bounce to post, for debugging use
        // Hit this servlet directly from the browser to see XML
        doPost(req, res);
    }

    /**
     * @param req Http request from the client
     *            HttpServletRequest.getSession:
     *            In WEB development, the server can create a session object for each user browser. When we need to
     *            save the user data, the server program can write the user data to the exclusive session of the user's
     *            browser, and when the user uses the browser to access other programs, other programs can take the
     *            user's data from the user's session and serve the user.
     *            getSession() and getSession(true) are the same, both get the current client session, if not create a
     *            new session to return.
     *            getSession(false), also fetches the session of the current client, the difference is that if you can't
     *            get it, it returns null.
     *
     *
     * @return an updated cart object from the client or a new cart obejct
     */
    private Cart getCartFromSession(HttpServletRequest req) {

        HttpSession session = req.getSession(true);
        Cart cart = (Cart) session.getAttribute("cart");

        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        return cart;
    }
}
