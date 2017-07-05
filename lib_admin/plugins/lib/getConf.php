<?PHP
	define('ABSPATH', dirname(dirname(dirname(dirname( __FILE__ )))).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_lib_config();
	$arr = array();
	$arr['general'] = _crypt('superDUPER');
	$arr['cat'] = _crypt('catalogue');
	$arr['circ'] = _crypt('circulation');
	$arr['abspath'] = ABSPATH;
	$arr['dir'] = INSTALL_DIR;
	$tips = explode('||', file_get_contents(ABSPATH.'lib_admin/dist/librata_tips.txt'));
	shuffle($tips);
	$arr['tips'] = implode('||', $tips);
	_e(json_encode($arr));
?>