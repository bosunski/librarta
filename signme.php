<?php
	
	/* Copy This into lib_includes/class/Auth.php
		public function getRandForNewUser($length = 8) {
		$rand = $this->randomString($length);
		$dbh = new libdb;
		$sql = "SELECT * FROM " . PREFIX . "users WHERE lib_no=\"$rand\"";
		if($libdb->db_connect()) {
			$libdb->query($sql, 'select');
			if($libdb->done) {
				if($libdb->rowsReturned > 0) {
					$this->getRandForNewUser();
				} else {
					return $rand;
				}
			}
		}
	}
	*/

	ob_start();
	session_start();
	define('ABSPATH', dirname( __FILE__ ).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	chkInstall();
	$title = "LIBRAta LOGIN &raquo;";

	load_config();
	load_lib_db();
	load_auth();
	$auth = new Auth();

	/* To get new Lib number 
		$newLibNo = $auth->getRandForNewUser();
	*/

	$libdb = new libdb();
	$title = '';
	$sql = 'SELECT * FROM '.PREFIX.'lib_config LIMIT 1';
	if($libdb->db_connect()) {
		$libdb->query($sql, 'select');
		$data = $libdb->data;
		$title = $data['lib_name']. ' Login &raquo;';
	} else {
		exit('<H3 style="color:red;">ERROR: Cannot connect to Database, please check your configuration file.</h3>');
	}
	unset($_SESSION);
	if($_SERVER['REQUEST_METHOD'] == 'POST') {
		/* Do All the Form Processing Here */

	} else {
?>

<!DOCTYPE html>
			<html>
				<head>
					<title><?=_e('LibrAta Setup'); ?></title>
					<meta name="viewport" content="width=device-width, initial-scale=1">
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="keywords" content="<?=_e('LIBRARta installation'); ?>"/>
					<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
					<link href="../css/bootstrap.css" rel='stylesheet' type='text/css' />
					<link href="../css/style.css" rel='stylesheet' type='text/css' />
					<script src="../js/jquery.min.js"></script>
				</head>
				<body>
					<!--content-starts-->
					<div class="content">
						<div class="container">
							<center>
								<img style="max-height:200px; max-width:200px;" src="lib_content/logo/<?=$data['logo']; ?>" alt="LIBRAta Logo"/><br/><br/>
							</center>
							<div class="white_place">
								<p><?=_e('A Library software that gets the job done.'); ?></p>
								<p><?=_e('Enter your Library details below. And as well as your Administrator details.<br/><br/>You can always change these settings later.'); ?></p>
								<form role="form" action="<?=_e('signme.php'); ?>" method="post">
									<div class="form-group">
										<label for="database">Firstname</label>
										<input placeholder="<?=_e('Library name'); ?>" type="text" class="form-control" id="database" name="lib_name" required>
									</div>
									
									<div class="form-group">
										<label for="database">Lastname</label>
										<input placeholder="<?=_e('Institution/Organisation name'); ?>" type="text" class="form-control" id="database" name="school" required>
									</div>
									
									<div class="form-group">
										<label for="username">School Number</label>
										<input placeholder="<?=_e('Administrator username'); ?>" type="text" class="form-control" id="username" name="username" required>
									</div>
									
									<div class="form-group">
										<label for="password">Admin password</label>
										<input placeholder="<?=_e('Administrator password'); ?>" type="text" class="form-control" id="password" name="password" required>
									</div>
									
									<div class="form-group">
										<label for="email">Admin E-mail</label>
										<input placeholder="<?=_e('Administrator E-mail'); ?>" type="text" class="form-control" id="email" name="email" required>
									</div>
									
									<div class="form-group">
										<label for="prefix">Firstname</label>
										<input placeholder="<?=_e('Firstname'); ?>" type="text" class="form-control" id="prefix" name="firstname" required>
									</div>
									
									<div class="form-group">
										<label for="prefix">Lastname</label>
										<input placeholder="<?=_e('Lastname'); ?>" type="text" class="form-control" id="prefix" name="lastname" required>
									</div>
									<button class="btn btn-default" type="submit" name="sub"><?=_e('Install LibrAta &raquo;');?></button>
								<form>
							</div>
						</div>
					</div>
				</body>
			</html>
<?php } ?>