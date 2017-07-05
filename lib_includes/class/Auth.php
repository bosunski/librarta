<?PHP
	define('LIBRATA_KEY', 'with God all things are possible');

	class Auth {
		private $_siteKey;
		public $_isAdmin = false;
		public $_isLogin = false;
		public $authErr = '';

		public function __construct() {
			$this->_siteKey = LIBRATA_KEY;
		}
		
		private function randomString($length = 50) {
			$characters = '0123456789abcdefghijklmnopqrstuvwxyz';
			$string = '';
			for($p = 0; $p < $length; $p++) {
				$string .= $characters[mt_rand(0, strlen($characters)-1)];
			}
			
			return $string;
		}

		public function _getRand($length = 50) {
			return $this->randomString($length);
		}
		
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

		public function hashData($data) {
			return hash_hmac('sha512', $data, $this->_siteKey);
		}
		
		public function isAdmin() {
			if($selection['isAdmin'] == 1) {
				return true;
			}
			return false;
		}
		
		public function login($email, $password) {
			//select user from DB on $email
			$selection = 'SELECT * from '.PREFIX.'admins WHERE email="'.$email.'"';
			$dbh = new libdb();
			$arr = array();
			if($dbh->db_connect()) {
				$dbh->query($selection, 'select');
					if(!$dbh->done) {
						$this->authErr = $dbh->error;
					} else {
						//If the record is not found

						if($dbh->rowsReturned != 0) {
						$arr = $dbh->data;

					//salt and hash password
						$password = $arr['salt'].$password;
						$password = $this->hashData($password);
						 if($password == $arr['password']) {
						 	$aid = $arr['admin_id'];
						 		/*This is a weak spot destined for strenghtening*/
						 			$del = $dbh->query("DELETE FROM ".PREFIX."logged_in_admin WHERE admin_id =\"$aid\"");
									$random = $this->randomString();
									$token = $_SERVER['HTTP_USER_AGENT'].$random;
									$token = $this->hashData($token);
									$_SESSION['username'] = $arr['username'];
									$_SESSION['status'] = 'Online';
									$_SESSION['section'] = $arr['section'];
									$_SESSION['priviledge'] = $arr['priviledge'];
									$this->_isAdmin = ($arr['section'] == 'superDuper') ? true : false; 
									$_SESSION['token'] = $token;
									$_SESSION['email'] = $email;
									$_SESSION['lock'] = false;
									$_SESSION['name'] = $arr['fname'].' '.$arr['lname'];
									$_SESSION['password'] = $password;
									$_SESSION['password'] = $password;
									$_SESSION['salt'] = $arr['salt'];
									$_SESSION['admin_id'] = _crypt($arr['admin_id']);
									$uid = $arr['admin_id'];
									$sessionID = session_id();
									$sql = 'INSERT INTO '.PREFIX.'logged_in_admin VALUES(null, '.$uid.', "'.$sessionID.'", "'.$token.'", NOW())';
									$exe = $dbh->query($sql);
									if($exe) {
										//Login successful
										$this->_isLogin = true;
									} else {
										//Database Error
										$this->authErr = $dbh->error;
									}

						} else {
						     //Incorrect password
						 	   return 2;
						}
					} else {
						//Incorrect email
						return 2;
					}

					}
			} else {
				$this->authErr = $dbh->error;
			}
		}
		
		public function checkSession() {
			$dbh = new libdb();
			//Select the ROW from loggedin member
			if($dbh->db_connect()) {
				$sql = 'SELECT * FROM '.PREFIX.'logged_in_admin WHERE admin_id='._decrypt($_SESSION['admin_id']);
				$dbh->query($sql, 'select');
				if(!$dbh->done) {
						$this->authErr = $dbh->error;
					} else {
						//If the record is not found
						if($dbh->rowsReturned != 0) {
						$arr = $dbh->data;
						//Check ID and token
						if(session_id() == $arr['session_id'] && $_SESSION['token'] == $arr['token']) {
							//ID and token match refresh the session for the next request
							$this->refreshSession();
							return true;
						}
					} else {
						return false;
					}
				}
			}
			return false;
		}
		
		private function refreshSession() {
			//regenerate id
			session_regenerate_id();
			//regenerate token
			$random = $this->randomString();
			//Build the token
			$token = $_SERVER['HTTP_USER_AGENT'].$random;
			$token = $this->hashData($token);
			$_SESSION['token'] = $token;
		}

		public function logout() {
			$_SESSION = array();
			session_destroy();
			unset($_SESSION);
			return true;
		}
	}
?>