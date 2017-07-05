<?PHP
	session_start();
	define('ABSPATH', dirname( __FILE__ ).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	
	if($_SERVER["REQUEST_METHOD"] == 'POST') {
		load_config();
		load_lib_db();
		load_auth();
		$auth = new Auth();
		$email = (isset($_POST['email'])) ? clean(trim($_POST['email'])) : $_SESSION['email'];
		$pass = clean($_POST['pass']);
		//$fSQL = 'SELECT * FROM '.PREFIX.'admins WHERE email="'.$email.'" AND password="'.$pass.'" LIMIT 1';
		
		$dbh = new libdb();
		if($dbh->db_connect()) {
			if($auth->login($email, $pass) == 2) {
				_e('<p style="color:red;">Invalid Details, please check thouroughly!</p>');
			} else {
				if($auth->authErr == '') {
					_e('true');
				} else {
					_e($auth->authErr);
				}
			}
		}

	} else {

	}
?>