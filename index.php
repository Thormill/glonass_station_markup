<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="styles/index.css" />
    <script type="text/javascript" src="scripts/jquery.js"></script>
    <script type="text/javascript" src="scripts/index.js"></script>
    <script type="text/javascript" src="scripts/math.js"></script>
    <script type="text/javascript" src="scripts/map.js"></script>
</head>
<body>
    <div id="main">
        <ul class="menu">
            <li><a id="pmap" href="/nojs.php" onclick="menuClick(this);return false">Показать карту</a></li>
            <li><a id="pedit" href="/nojs.php" onclick="menuClick(this);return false">Список БС</a></li>
            <li><a id="plot" href="/nojs.php" onclick="menuClick(this);return false">График</a></li>
        </ul>
        <div id="content"></div>
    </div>
    <!--<TABLE id='export'>
		<tr>
			<td>номер вышки</td>
			<td>Rmax</td>
			<td>Rmin</td>
			<td>Высота</td>
			<td>Мощность</td>
		</tr>
    </TABLE>-->
</body>
</html>
