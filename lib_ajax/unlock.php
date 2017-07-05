<?PHP
	session_start();
	if($_SESSION['lock']) {
		$_SESSION['lock'] = false;
		echo('unlock');
		exit();
	} else {
		echo('unlock');
	}
?>