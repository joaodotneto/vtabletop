<?php
$dir    = 'maps';
$files1 = scandir($dir);
?>
<html>
<head>
	<link rel="stylesheet" href="bootstrap.min.css" />
	<script type="text/javascript" src="jquery.min.js"></script>
	<script type="text/javascript" src="bootstrap.min.js"></script>
</head>
<body>
	<label>Mapas TableTop</label>
	<table class="table table-bordered table-condensed table-hover" border="1">
	<?php
	foreach ($files1 as $key => $value) {
		if (!in_array($value,array(".",".."))) {
			print("<tr><td><a download='$value' href='http://deploy-games.com/tabletop/maps/$value'>");
			print($value);
			print("</a></td></tr>");
		}
	}
	?>
	</table>
<body>
</html>