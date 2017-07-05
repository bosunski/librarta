<?PHP
	session_start();
	if(!$_SESSION['lock']) {
		$_SESSION['lock'] = true;
		echo('lock');
		exit();
	}
?>