<?php
	if (!isset($_GET["offset"])) {die();}
	if (file_exists("/var/log/apache2/error.log")) {
		echo(htmlentities(file_get_contents("/var/log/apache2/error.log",false,null,intval($_GET["offset"]))));
	} else {
		file_put_contents("/var/log/apache2/error.log","==== Error Log Generated By PHP logs.venner.io ====\r\n");
	}
?>