<?PHP

	define('ABSPATH', dirname(dirname( __FILE__ ) ).'/');
	require(ABSPATH . 'lib_includes/lib_functions.php' );
	error_reporting(0);
	$install_ready = '';
	$tryAgain = '<button onclick="javascript:history.go(-1)" class="btn btn-default">&laquo; Retry</button>';
	function checkInstallStatus() {
		if(file_exists(ABSPATH.'/lib_config.php') && !isset($_GET['tokken'])) {
			setup_header();
			_e('<p>It seems the file- <i>lib_config.php</i> already exists You must <b>delete</b> this to run the install.</p>');
			_e('<a href="setup_lib.php?step=1" class="btn btn-default">&laquo; Retry</a>');
			setup_footer();
			exit();
		}
	}
	define('__LIB__INSTALL', true);


	$step = isset($_GET['step']) ? (int)$_GET['step'] : 0;
	$intro_text ='
					<p>
						We’re going to use this information to create a <i>lib-config.php</i>
						file. If for any reason this automatic file creation doesn’t work,
						don’t worry. All this does is fill in the database information
						to a configuration file. You may also simply open wp-config-sample.php
						in a text editor, fill in your information, and save it as wp-config.php.
						Need more help? We got it.
					</p>
					<p>
						In all likelihood, these items were supplied to you by your Web Host.
						If you do not have this information, then you will need to contact
						them before you can continue. If you’re all ready.
					</p>';
		function setup_header() {
			header('Content-Type=text/html; charset=utf-8');
?>
			<!DOCTYPE html>
			<html>
				<head>
					<title><?=_e('LIBRAta SEtup'); ?></title>
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
								<img src="../images/logo.jpg" alt="LIBRAta Logo"/><br/><br/>
							</center>
							<div class="white_place">

<?PHP
		}
		function setup_footer() {
						_e('</div>
					</div>
				</body>
			</html>');
		}
	switch($step) {
		case 0:
			checkInstallStatus();
			setup_header();
?>
					<h3><?=_e('WELCOME TO LIBRAta'); ?></h3>

					<?=_e('<p>Welcome to WordPress. Before getting started, we need some information on the database. You will need to know the following items before proceeding.</p>'); ?>
					<ol>
						<li><?=_e('Database name'); ?></li>
						<li><?=_e('Database username'); ?></li>
						<li><?=_e('Database password'); ?></li>
						<li><?=_e('Database host'); ?></li>
						<li><?=_e('Table prefix (if you want to run more than one WordPress in a single database)'); ?></li>
					</ol>
						<?=_e($intro_text); ?>
					<a href=<?=_e('setup_lib.php?step=1'); ?> class="btn btn-default">Let's Start!</a>
<?PHP
			setup_footer();
			break;

		case 1:
			checkInstallStatus();
			setup_header();
?>
			<p><?=_e('Enter your database details below. Contact your host in case you don\'t know them.'); ?></p>
			<form role="form" action="<?=_e('setup_lib.php?step=2'); ?>" method="post">
				<div class="form-group">
					<label for="database">Database name</label>
					<input placeholder="<?=_e('Your Database name'); ?>" type="text" class="form-control" id="database" name="database" required>
				</div>

				<div class="form-group">
					<label for="username">MySQL username</label>
					<input placeholder="<?=_e('Your MySQL username'); ?>" type="text" class="form-control" id="username" name="username" required>
				</div>

				<div class="form-group">
					<label for="password">MySQL password</label>
					<input placeholder="<?=_e('Your MySQL password'); ?>" type="text" class="form-control" id="password" name="password">
				</div>

				<div class="form-group">
					<label for="host">MySQL host</label>
					<input placeholder="<?=_e('Your MySQL host'); ?>" type="text" class="form-control" id="host" name="host" required>
				</div>

				<div class="form-group">
					<label for="prefix">Table prefix</label>
					<input placeholder="<?=_e('Your Table prefix'); ?>" type="text" class="form-control" id="prefix" name="prefix" required>
				</div>
				<button class="btn btn-default" type="submit" name="sub"><?=_e('Next Step &raquo;');?></button>
			<form>
<?PHP
			setup_footer();
		break;

		case 2:

			$host = trim(clean($_POST['host']));
			$password = trim(clean($_POST['password']));
			$uname = trim(clean($_POST['username']));
			$database = trim(clean($_POST['database']));
			$prefix = trim(clean($_POST['prefix']));
			$rep = strlen($host.$password);
			$chars = '&^!~@#$%*()_+=-`:;][}{?><,.';
			/* GENERATING AUTH_KEY */

			$siteData = array($host, $uname, $database, $prefix, $chars);
			$chars = '';
			do {
				foreach ($siteData as $key => $value) {
					# code...
					if($chars == 50)
						break;
					for($i = 0; $i < $rep; $i++) {
						$chars .= $value[mt_rand(0, strlen($value)-1)];
					}
				}
			} while(strlen($chars) == 50);

			$auth_key = hash_hmac('sha512', $chars, 'Dependable Jesus');
			$auth_key = substr($auth_key, 0, 50);

			/**
			*Making sure the prefix contains only alphanumeric
			*characters and underscore character.
			*/
			if(preg_match('/[^0-9a-z_]/i', $prefix)) {
				setup_header();
				_e('<strong style="color:red;">ERROR!</strong> <p>Your Prefix can only be letters and numbers</p>'. $tryAgain);
				setup_footer();
				exit();
			}

			$doc = $_SERVER['DOCUMENT_ROOT'];
			$dirArr = explode($doc, str_replace('\\', '/', dirname(dirname( __FILE__ ))));
			$instDir = "http://".$_SERVER['HTTP_HOST'].$dirArr[1];
			define('DBHOST', $host);
			define('PASSWORD', $password);
			define('UNAME', $uname);
			define('DB', $database);
			define('PREFIX', $prefix);
			define('AUTH_KEY', $auth_key);
			define('INSTALL_DIR', $instDir);
			/*
			 *Attempting to connect to see if the
			 *provided details are correct
			 *If so then we can continue...
			*/

			load_lib_db();
			$libdb = new libdb();
			if($libdb->db_connect()) {
				$load_config_file = file_get_contents(ABSPATH.'/lib_tpl/lib_config_template.php');
				$load_config_file = str_replace('[@host]', DBHOST, $load_config_file);
				$load_config_file = str_replace('[@user]', UNAME, $load_config_file);
				$load_config_file = str_replace('[@password]', PASSWORD, $load_config_file);
				$load_config_file = str_replace('[@dbname]', DB, $load_config_file);
				$load_config_file = str_replace('[@prefix]', PREFIX, $load_config_file);
				$load_config_file = str_replace('[@auth_key]', AUTH_KEY, $load_config_file);
				$load_config_file = str_replace('[@INSTALL_DIR]', INSTALL_DIR, $load_config_file);


				$new_config = fopen(ABSPATH.'/lib_config.php', 'w');
				fwrite($new_config, $load_config_file);
				fclose($new_config);

				setup_header();
				$install_ready = sha1(md5(md5('true')));
				_e('<p>Alright! You made it, the database connection was successful, You can now....</p>');
				_e('<a href="setup_lib.php?step=3&tokken='.$install_ready.'" class="btn btn-default">Install &raquo;</a>');
				setup_footer();
				exit;
			} else
				setup_header();
				_e('<h3 style="color:red;">Unable to connect to Database</h3>');
				_e('<p>It seems the data You\'ve entered is/are not correct, please check your inputs very well.</p>');
				_e($tryAgain);
				setup_footer();
				exit();
		break;
		case 3:
			if($_GET['tokken'] == sha1(md5(md5('true')))) {
				load_install();
			} else {
				header('location: '.INSTALL_DIR.'/setup_lib.php');
			}
		break;
		case 4:

			//checkInstallStatus();
			$school = clean($_POST['school']);
			$uname = trim(clean($_POST['username']));
			$password = clean($_POST['password']);
			$email = clean($_POST['email']);
			$fname = trim(clean($_POST['firstname']));
			$lname = trim(clean($_POST['lastname']));
			$lib_name = clean($_POST['lib_name']);
			$skin = 'skin-blue';
			$layout = 'sidebar-mini';
			$status = 'On';

			// Loading Config, Auth and database classes
			load_lib_config();
			load_lib_db();
			load_auth();
			// Loading the SQL template and replacing some Data
			$load_query = file_get_contents(ABSPATH.'/lib_tpl/lib_db.sql');
			$load_query = str_replace('[@prefix]', PREFIX , $load_query);
			$due_period = '14';
			$status = 'On';
			$lockAfter = '15';
			$web_confQ = 'INSERT INTO '.PREFIX.'lib_config VALUES("'.$lib_name.'", "'.$due_period.'", "'.$status.'", "'.$school.'", "'.$skin.'", "'.$layout.'", "'.$lockAfter.'")';

			// Attempting to write to Database
			$db = new libdb();
			$auth = new Auth();
			$code = $auth->_getRand();
			$password = $code.$password;
			$password = $auth->hashData($password);
			if($db->db_connect()) {
				if($db->query($load_query)) {
					if($db->query("INSERT INTO ".PREFIX."admins VALUES(NULL, \"$fname\", \"$lname\", \"$uname\", \"$email\", \"$password\", 'superDUPER', \"$code\")")) {
						$saveCONF = $db->query($web_confQ);
						setup_header();
						_e('<p>Alright! You made it, the Installation was successful, You can now start using LIBRAta. <br/> Login to start using LIBRAta.</p>');
						_e('<a href="'.INSTALL_DIR.'/login.php" class="btn btn-primary btn-flat">Login &raquo;</a>');
						setup_footer();
					} else {
						setup_header();
							_e("Cannot Insert Admin Data!");
						setup_footer();
					}
				} else {
					setup_header();
						_e("Cannot Query the Database");
					setup_footer();
				}

			}
		break;

	}
?>
