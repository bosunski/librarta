<?php
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require(ABSPATH . '/lib_includes/lib_functions.php');
	load_auth();
	$auth = new Auth();

	$section = (isset($_SESSION['section'])) ? $_SESSION['section'] : null;

	if(getUserSpecificStatus() == 'ZmU3NDYzMDUwNWM2ZDM0MjU5OGNjZGYyMmNlZDI4N2ExMjBiZDQ1NTcxOTMwOTUxOGVzdXBlckRVUEVS') {
		$length = (isset($_GET['len'])) ? (int)$_GET['len'] : 8;
		$pass = strtoupper($auth->_getRand($length));
		_e($pass);
	} else {
		exit('UNAUTHORISED ACCESS!');
	}
?>