<%--
  Created by IntelliJ IDEA.
  User: jianpingdeng
  Date: 15/6/20
  Time: 4:22 Morning
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<html>
<head>
    <title>Roll Monitor</title>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
    <script type="text/javascript" language="javascript" src="getInfo.js"></script>
    <script type="text/javascript" language="javascript" src="googleGauge.js"></script>
    <script type="text/javascript" language="javascript" src="googleLine.js"></script>
</head>
<body>
<h2>Roll Monitor</h2>
<%-- first two gauges --%>
<div id="partOne"></div>
<%-- next two gauges --%>
<div id="partTwo"></div>
<%-- line chart --%>
<div id="partThree"></div>
</body>
</html>
