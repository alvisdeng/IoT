<%--
  Created by IntelliJ IDEA.
  User: jianpingdeng
  Date: 1/6/20
  Time: 4:34 Afternoon
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Photon Tracker</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script type="text/javascript" language="javascript" src="ajax1.js"></script>
    <script type="text/javascript" language="javascript" src="photon.js"></script>
    <script>
        function init(){
            var req = newXMLHttpRequest();
            req.onreadystatechange = getReadyStateHandler(req, initTime());
            req.open("POST", "PhotonServlet", true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send("action=initial");
        }
        function initTime(photonJson){
            var photon = JSON.parse(photonJson);

            var photonID = photon.photonId;
            var lastBeatTime = photon.lastBeat;

            document.getElementById("photonID").innerHTML = photonID;
            document.getElementById("lastBeat").innerHTML = lastBeatTime;
        }
        window.onload=init;
    </script>
</head>
<body>
<div style="float: left; width: 500px">
    <h2>Photon Tracker</h2>
    <table border="1">
        <thead>
        <th>Name</th>
        <th>ID</th>
        <th>Time of Last Heartbeat</th>
        <th></th>
        </thead> <!--table head end-->
        <tbody>
        <tr>
            <td>Photon</td>
            <td id="photonID"></td>
            <td id="lastBeat"></td>
            <td>
                <button onclick="updateState()">Update Time</button>
            </td>
        </tr>
        </tbody> <!--table body end-->
    </table> <!--table end-->
    <div style="position: absolute; top: 0px; right: 0px; width: 250px">
        <h2>Photon State</h2>
        <p id="messages">
        </p>
    </div>
</div>
</body>
</html>
