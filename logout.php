<?PHP
	session_start();
	define('ABSPATH', dirname( __FILE__ ).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	load_config();
	load_auth();
	$auth = new Auth();
	if($auth->logout()) {
		header('location: login.php');
	} else {
		$_SESSION = array();
		session_destroy();
		unset($_SESSION);
		header('location: login.php');
	}
?>