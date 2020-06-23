package developerworks.ajax.servlet;

import developerworks.ajax.particle.Photon;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Enumeration;


public class PhotonServlet extends HttpServlet {
    static Photon photon = new Photon();
    Timestamp webTime;
    Timestamp photonTime;
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    long diff = 0;

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        Enumeration headers = req.getHeaderNames();
        while (headers.hasMoreElements()) {
            String header = (String) headers.nextElement();
            System.out.println(header + ": " + req.getHeader(header));
        }

        String action = req.getParameter("action");
        String photonID = req.getParameter("Photon_ID");
        String msgToUser = "";

        if (action == null) {
            photonTime = new Timestamp(Calendar.getInstance().getTimeInMillis());
        } else if (action.equals("update")){
            webTime = new Timestamp(Calendar.getInstance().getTimeInMillis());
        }

        diff = (webTime.getTime() - photonTime.getTime())/1000;
        if (diff>20) {
            msgToUser = diff + " seconds ago ----> Suspected Connection Failure";
        } else {
            msgToUser = diff + " seconds ago ----> Everything Works Fine";
        }

        photon.setID(photonID);
        photon.setState(msgToUser);
        photon.setLastBeat(sdf.format(photonTime));
        String photonJson = photon.toJson();
        res.setContentType("application/json");
        res.getWriter().write(photonJson);
    }

    public void doGet(HttpServletRequest req, HttpServletResponse res) throws java.io.IOException {
        // Bounce to post, for debugging use
        // Hit this servlet directly from the browser to see XML
        doPost(req, res);
    }

}
