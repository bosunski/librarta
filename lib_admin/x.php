<?php
	if (!empty($_SERVER['HTTPS']) && ('on' == $_SERVER['HTTPS'])) {
		echo'https://';
	} else {
		echo 'http://';
	}
?>