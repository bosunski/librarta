<?PHP
	error_reporting(E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR);
	ob_start();
	header("Cache-Control: no-cache, must-revalidate");
	header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
	session_start();

	define('ABSPATH', dirname(__FILE__ ).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	load_config();
	//Runtime check
	if(!file_exists(ABSPATH.'lib_config.php')) {
		header('location: lib_admin/setup_lib.php');
		exit();
	}

	load_lib_db();load_auth();load_lib_template();
	$libdb = new libdb();
	$data = array();
	$title = '';
	$sql = 'SELECT * FROM '.PREFIX.'lib_config LIMIT 1';
	if($libdb->db_connect()) {
		$libdb->query($sql, 'select');
		$data = $libdb->data;
		$title = 'Welcome to '.$data['lib_name'];
	} else {
		exit('<H3 style="color:red;">ERROR: Cannot connect to Database, please check your configuration file.</h3>');
	}
	$year = date("Y", time());
?>



<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title><?=$title; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="lib_admin/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="lib_admin/bootstrap/css/style.css" rel="stylesheet" type="text/css" />
<link rel="icon" href="lib_content/logo/<?=$data['logo']; ?>" type="image/png"/>
<script src="lib_admin/plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
</head>
<body>
	<!--content-starts-->
	<div class="content">
		<div class="container">
			<div class="content-head">
				<h1>Welcome to <?=$data['lib_name']; ?>.</h1>
			</div>
			<div class="content-top">
				<div class="col-md-8 content-center" style="left:17%;">
					<div class="content-main">
						<div class="col-md-4 cnt-left">
							<div style="padding:0px;" class="btn btn-default btn-flat weather">
								<div class="weather-top">
									<p>Visit <br/>OPAC &raquo;</p>
									<div class="clearfix"></div>
								</div>
								<div class="weather-bottom">
									<p><a class="btn btn-flat btn-primary btn-md" href="<?=INSTALL_DIR; ?>/lib_admin/opac.php">Click here!</a></p>
								</div>
							</div>
						</div>
						<div class="col-md-4 cnt-right">
							<div style="padding:0px;" class="btn btn-default btn-flat weather">
								<div class="weather-top">
									<p>Admin <br/>Login &raquo;</p>
									<div class="clearfix"></div>
								</div>
								<div class="weather-bottom">
									<p><a class="btn btn-flat btn-primary" href="<?=INSTALL_DIR; ?>/lib_admin/">Click here!</a></p>
								</div>
							</div>
						</div>
						<div class="col-md-4 cnt-right">
							<div style="padding:0px;" class="btn btn-default btn-flat weather">
								<div class="weather-top">
									<p>Register <br/> Here &raquo;</p>
									<div class="clearfix"></div>
								</div>
								<div class="weather-bottom">
									<p><a class="btn btn-flat btn-primary" href="<?=INSTALL_DIR; ?>/signme.php">Click here!</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer">
			<strong>Copyright &copy; <?=$year; ?> <a href="<?=INSTALL_DIR; ?>"><?=$data['lib_name']; ?></a>.</strong> All rights reserved.
		</div>
	</div>
</body>
</html>
