<?php
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
	if(!empty($_SESSION)) {
		/*Check the session if it is valid and if not
			logs out
		*/
		if($auth->checkSession()) {
			header('location: bigChill.php');
		} else {
			$auth->logout();
			header('location: bigChill.php');
			exit();
		}
	} else {
?>
<!Doctype html>
<html>
<head>
	<title><?=$title; ?></title>
	<link href="lib_admin/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
	<link href="lib_admin/dist/css/AdminLTE.css" rel="stylesheet" type="text/css" />
	<link href="lib_admin/bootstrap/css/style.css" rel="stylesheet" type="text/css" />
	<script src="lib_admin/plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
	<script src="lib_admin/plugins/script.js" type="text/javascript"></script>
	<link rel="icon" href="lib_fav.png" type="image/png"/>
	<script type="text/javascript">
		$(document).ready(function() {
			$("#email").val('');
			$("#pass").val('');
		});
	</script>
	
</head>
<body>
	<div class="content">
	<div class="login-box">

      <div class="login-logo">
      	<img style="max-height:200px; max-width:200px;" src="lib_content/logo/<?=$data['logo']; ?>"> <br/>
        <a href="<?=INSTALL_DIR; ?>/"><b><?=$data['lib_name']; ?></b></a>
      </div><!-- /.login-logo -->
      <div class="login-box-body">
        <p class="login-box-msg">
        	<span class="loader"></span> Sign in to start your session
        	<i class="info"></i>	
        </p>
        <form id="lForm" action="" method="post">
          <div class="form-group has-feedback">
            <input id="email" name="email" class="form-control" placeholder="Email" type="email">
            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input id="pass" name="pass" class="form-control" placeholder="Password" type="password">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-8">
              <div class="checkbox icheck">
              </div>
            </div><!-- /.col -->
            <div class="col-xs-8">
            	<a href="<?=INSTALL_DIR; ?>">&laquo; Back to main page</a>
            </div>
            <div class="col-xs-4">
              <button type="submit" id="subL" class="btn btn-primary btn-block btn-flat">Sign In</button>
            </div><!-- /.col -->
            
          </div>
        </form>

      </div><!-- /.login-box-body -->
    
	</div>
</body>
</html>

<?PHP
	}
	ob_flush();
?>