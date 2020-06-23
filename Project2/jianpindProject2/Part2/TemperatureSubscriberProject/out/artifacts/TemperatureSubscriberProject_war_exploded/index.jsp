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
    <select id="temps" name="temps">
        <option value="cold">pittsburgh/temperature/coldTemps</option>
        <option value="nice">pittsburgh/temperature/niceTemps</option>
        <option value="hot">pittsburgh/temperature/hotTemps</option>
        <option value="all" selected>pittsburgh/temperature/allTemps</option>
    </select>
    <div id="niches">
        <span id="coldInfo">
            <h4>Cold Temps:</h4>
        </span>
        <span id="niceInfo">
            <h4>Nice Temps:</h4>
        </span>
        <span id="hotInfo">
            <h4>Hot Temps:</h4>
        </span>
    </div>

    <br>
    <br>

    <div id="allInfo">
        <h4>All Temps:</h4>
    </div>
</form>
</body>
</html>
