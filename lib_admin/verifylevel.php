<?PHP
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require(ABSPATH . '/lib_includes/lib_functions.php' );
	load_lib_config();
	if(!isset($_GET['source'])) {
		_e(_crypt($_SESSION['section']));
	} else {
		_e($_SESSION['section']);
	}
?>