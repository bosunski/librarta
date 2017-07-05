<?PHP
	ob_start();
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
	session_start();
	 /*if(isset($_SESSION['email']) && isset($_SESSION['password'])) {
	    if($_SESSION['lock'] == 'true') {
	      header("location: /login.php");
	      exit();
	    }
 	 } else {
   		 header("location: /login.php");
   		 exit();
 	 }*/

	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	load_config();load_lib_db();load_auth();load_lib_template();
	$auth = new Auth();
	$libdb = new libdb();
	$main = new Template(ABSPATH.'/lib_tpl/opac.tpl');
	$nav = new Template(ABSPATH.'/lib_tpl/opac_nav.tpl');
	//$sidebar = new Template(ABSPATH.'/lib_tpl/sidebar.tpl');
	$footer = new Template(ABSPATH.'/lib_tpl/footer.tpl');
	$content = new Template(ABSPATH.'/lib_tpl/opac_table.tpl');
	//$control_sidebar = new Template(ABSPATH.'/lib_tpl/control_sidebar.tpl');
	$lock = new Template(ABSPATH.'/lib_tpl/opac_lock.tpl');
	$modal = new Template(ABSPATH.'/lib_tpl/modal.tpl');



	$title = '';
	$sql = 'SELECT * FROM '.PREFIX.'lib_config LIMIT 1';
	if($libdb->db_connect()) {
		$libdb->query($sql, 'select');
		$data = $libdb->data;
		$title = $data['lib_name']. ' DashBoard';
	}
	$adminName = 'Library User';
	$nameAbbr = abbrev($data['lib_name']);
	$logo = INSTALL_DIR.'/lib_content/logo/'.$data['logo'];
	$year = date("Y", time());
	$adminPic = INSTALL_DIR.'/lib_admin/img/settings.png';

	/* Building of the nav bar */
	$nav->set('abbrevName', $nameAbbr);
	$nav->set('lib_name', $data['lib_name']);
	$nav->set('AdminName', $adminName);
	$nav->set('adminPic160', $adminPic);
	$nav->set('home', INSTALL_DIR);

	/*Building the sidebar *
	$sidebar->set('AdminName', $adminName);
	$sidebar->set('status', $_SESSION['status']);
	$sidebar->set('adminPic160', $adminPic);*/

	/*Building the footer */
	$footer->set('year', $year);
	$footer->set('lib_name', $data['lib_name']);
	$footer->set('courtesy', 'Powered by Dream Builders, FUNAAB.');
	$footer->set('home', INSTALL_DIR);

	/*building the lockscreen */
	$lock->set('adminPic160', $adminPic);
	$lock->set('AdminName', $adminName);
	$lock->set('lib_name', $data['lib_name']);
	$lock->set('logo', $logo);

	$content->set('libName', $data['lib_name']);
	$content->set('home', INSTALL_DIR);
	/* finally building the main page */
	$main->set('title', $title);
	$main->set('modal', $modal->output());
	$main->set('layout', $data['layout']);
	$main->set('skin', $data['skin']);
	$main->set('nav', $nav->output());
	$main->set('home', INSTALL_DIR);
	//$main->set('sidebar', $sidebar->output());
	$main->set('icon', $data['logo']);
	$main->set('footer', $footer->output());
	$main->set('page_content', $content->output());
	//$main->set('control_sidebar', $control_sidebar->output());
	$main->set('lock', $lock->output());
	if($data['status'] == 'on') {
		_e($main->output());
	} else {
		$auth->logout();
		_e('<h2 style="color:green;position:relative; top:50%;left:30%;">Library Under Maintenance, please Check back.<br/>Or contact the Administrator.</h2>');
	}

	ob_end_flush();
?>
