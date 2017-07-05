<?PHP
	ob_start();
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	load_config();load_lib_db();load_auth();load_lib_template();
	 if(isset($_SESSION['email']) && isset($_SESSION['password'])) {
	    if($_SESSION['lock'] == 'true') {
	      header("location: ".INSTALL_DIR."/login.php");
	      exit();
	    }
 	 } else {
   		 header("location: ".INSTALL_DIR."/login.php");
   		 exit();
 	 }


	chkInstall();
	$auth = new Auth();
	$libdb = new libdb();
	$main = new Template(ABSPATH.'/lib_tpl/main.tpl');
	$nav = new Template(ABSPATH.'/lib_tpl/nav.tpl');
	$sidebar = new Template(ABSPATH.'/lib_tpl/sidebar.tpl');
	$footer = new Template(ABSPATH.'/lib_tpl/footer.tpl');
	$content = new Template(ABSPATH.'/lib_tpl/page__content.tpl');
	$lock = new Template(ABSPATH.'/lib_tpl/lock.tpl');
	$modal = new Template(ABSPATH.'/lib_tpl/modal.tpl');

	$title = '';
	$data = getLibrAtaOption($libdb);
	$title = $data['lib_name']. ' DashBoard';
	$icon = $data['logo'];

	$adminName = $_SESSION['name'];
	$nameAbbr = abbrev($data['lib_name']);
	$logo = '../lib_content/logo/'.$data['logo'];
	$year = date("Y", time());
	$adminPic = '../lib_content/default.png';
	$extentions = array('jpg', 'jpeg', 'png', 'gif');
	$pics = array();
	$slides = '';
	foreach ($extentions as $key => $value) {
		$p = glob(ABSPATH.'lib_content/slides/*.'.$value);
		foreach($p as $k => $v) {
			$pics[] = $v;
		}
	}

	$count = 0;
	foreach ($pics as $key => $value) {
		$pos = strrchr('.', basename($value));
		$name = substr(basename($value), 0, $pos);
		$active = ($count == 0) ? 'active' : '';
		$slides .= '<div class="item '.$active.'">
                     	<img width="100%" style="height:300px;" src="../lib_content/slides/'.basename($value).'" alt="'.$name.'">
                    </div>';
        $count++;
	}
	/* Building of the nav bar */
	$nav->set('abbrevName', $nameAbbr);
	$nav->set('lib_name', $data['lib_name']);
	$nav->set('AdminName', $adminName);
	$nav->set('adminPic160', $adminPic);

	/*Building the sidebar */
	$sidebar->set('AdminName', $adminName);
	$sidebar->set('status', $_SESSION['status']);
	$sidebar->set('adminPic160', $adminPic);

	/*Building the footer */
	$footer->set('year', $year);
	$footer->set('lib_name', $data['lib_name']);
	$footer->set('courtesy', 'LibrAta by Dream Builders.');
	$footer->set('home', INSTALL_DIR);

	/*building the lockscreen */
	$lock->set('adminPic160', $adminPic);
	$lock->set('AdminName', $adminName);
	$lock->set('lib_name', $data['lib_name']);
	$lock->set('home', INSTALL_DIR);
	$lock->set('logo', $logo);

	$content->set('libName', $data['lib_name']);
	$content->set('slides', $slides);
	/* finally building the main page */
	$main->set('icon', $icon);
	$main->set('title', $title);
	$main->set('modal', $modal->output());
	$main->set('layout', $data['layout']);
	$main->set('skin', $data['skin']);
	$main->set('nav', $nav->output());
	$main->set('sidebar', $sidebar->output());
	$main->set('footer', $footer->output());
	$main->set('page_content', $content->output());
	$main->set('lock', $lock->output());
	$main->set('home', INSTALL_DIR);
	$userStat = getUserSpecificStatus();
	if(($data['status'] == 'off' && $userStat == _crypt('superDUPER')) || $data['status'] == 'on') {
		_e($main->output());
	} else {
		$auth->logout();
		_e('<h2 style="color:green;position:relative; top:50%;left:30%;">Library Under Maintenance, please Check back.<br/>Or contact the Administrator.</h2>');
	}


	ob_end_flush();
?>
