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
    <style>
        <%-- create a rectangle that can capture mouse movement --%>
        div {
        <%-- The style sheet setting for the rectangle --%>
            width: 200px;
            height: 100px;
            border: 1px solid black;
        }
    </style>
</head>
<body>

<%-- When mouse movements are detectd, muFunction() is called --%>
<%-- When mouse is moved out of the rectangle, clearCoor() is called --%>
<div onmousemove="myFunction(event)" onmouseout="clearCoor()"></div>

<p>Mouse over the rectangle above, and get the coordinates of your mouse pointer.</p>

<p>When the mouse is moved over the div, the p element will display the horizontal and vertical coordinates of your
    mouse pointer, whose values are returned from the clientX and clientY properties on the
    MouseEvent object.</p>

<p id="demo"></p>

<script>
    <%-- This function capture the x and y position info of mouse movement and then represent it --%>
    function myFunction(e) {
        var x = e.clientX;
        var y = e.clientY;
        var coor = "Coordinates: (" + x + "," + y + ")";
        document.getElementById("demo").innerHTML = coor;
    }

    <%-- clear out the displayed information --%>
    function clearCoor() {
        document.getElementById("demo").innerHTML = "";
    }
</script>

</body>
</html>
