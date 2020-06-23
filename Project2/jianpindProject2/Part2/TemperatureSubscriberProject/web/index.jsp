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
    <title>Temperature Subscriber</title>
    <script type="text/javascript" language="javascript" src="mqttws31.js"></script>
    <script type="text/javascript" language="javascript" src="getInfo.js"></script>
</head>
<body>
<h2>Temperature Subscriber</h2>
<form>
    <label for="temps">Please select the topic you want to subscribe</label>
    <%-- A selction list for uses to choose--%>
    <select id="temps" name="temps">
        <option value="cold">pittsburgh/temperature/coldTemps</option>
        <option value="nice">pittsburgh/temperature/niceTemps</option>
        <option value="hot">pittsburgh/temperature/hotTemps</option>
        <option value="all" selected>pittsburgh/temperature/allTemps</option>
    </select>
    <div id="niches">
        <%-- This place is to present cold temps--%>
        <span id="coldInfo">
            <h4>Cold Temps:</h4>
        </span>
        <%-- This place is to present nice temps--%>
        <span id="niceInfo">
            <h4>Nice Temps:</h4>
        </span>
        <%-- This place is to present hot temps--%>
        <span id="hotInfo">
            <h4>Hot Temps:</h4>
        </span>
    </div>

    <br>
    <br>

    <%-- This place is to present all temps--%>
    <div id="allInfo">
        <h4>All Temps:</h4>
    </div>
</form>
</body>
</html>
