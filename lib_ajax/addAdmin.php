<?PHP
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_auth();load_lib_config();
	$auth = new Auth();
	$section = (isset($_SESSION['section'])) ? $_SESSION['section'] : null;
	if(getUserSpecificStatus() == _crypt('superDUPER')) {
		

		$email = $_POST['email'];
		//$pass = $_POST['password'];
		$username = trim(clean($_POST['username']));
		$fname = trim(clean($_POST['firstname']));
		$lname = trim(clean($_POST['lastname']));
		$section = trim(clean($_POST['section']));
		$section = ($section == 'general') ? 'superDUPER' : $section;

		if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			_e("INVALID EMAIL ADDRESS PLEASE CHECK THOROUGHLY!");
			exit();
		}

		if(preg_match('/[^a-z]/i', $fname) || preg_match('/[^a-z]/i', $lname)) {
			_e("FIRSTNAME AND LASTNAME CAN ONLY CONTAIN LETTERS!");
			exit();
		}

		if(strlen($lname) > 20 || strlen($fname) > 20) {
			_e("The Firstname and/or Lastname exceeds the maximum of 20!");
			exit();
		}

		$new_pass = strtoupper($auth->_getRand(8));

		$salt = $auth->_getRand();
		$password = $salt.$new_pass;
		$password = $auth->hashData($password);

		//$user_specific_salt = $auth->_getRand();
		load_lib_db();
		$db = new libdb();

		if($db->db_connect()) {
			$sql = "INSERT INTO ".PREFIX."admins VALUES (null, \"$fname\", \"$lname\", \"$username\", \"$email\", \"$password\", \"$section\", \"$salt\", '')";
			
			$arr = $db->_get($email, 'admin2');

			if($db->rowsReturned == 0) {
				$db->query($sql, 'insert');
				if($db->done) {
					_e($new_pass);
				} else {
					_e("ERROR COMMUNICATING TO THE DATABASE.\n PLEASE TRY AGAIN OR RELOAD THE PAGE.\n OR YOU CAN AS WELL CONTACT THE DEVELOPERS");
				}
			} else {
				_e("THE EMAIL YOU ENTERED ALREADY EXIST!");
			}
			
		}
	} else {
		exit("UNAUTHOURISED ACCESS!");
	}
	




?>