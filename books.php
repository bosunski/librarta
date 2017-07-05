<?PHP
	ob_start();
	session_start();
	define('ABSPATH', dirname( __FILE__ ).'/');
	require( ABSPATH . 'lib_includes/lib_functions.php' );
	$title = "LIBRAta LOGIN &raquo;";

	load_config();
	load_lib_db();
	load_auth();
	$auth = new Auth();
	$libdb = new libdb();
	$lib_no = 'SJ9IKPX';
	$lmsql = "SELECT COUNT(*) AS borrows FROM ".PREFIX."borrows WHERE lib_no=\"$lib_no\"";
	//$libdb->query($lmsql, 'select');
	//if($libdb->done) {
		//echo 'done';
	//}


	$array = array('The', 'Great', 'Lindsay', 'Lohan', 'Of', 'Physics', 'English', 'Lorem', 'Discus', 'Chemistry', 'Yoruba');
	$levels = array(100, 200, 300, 400, 500, 600, 700);
	$count = 1;
	do {
		$acc_no = strtoupper($auth->_getRand(8));
		$ISBN = '3783464625221117648747478';
		$publisher = 'bosunski';
		$author = 'The Shepherd';
		$text = '';
		$school_no = '20141893';
		$rand = array_rand($array, 3);
		$text .= $array[$rand[0]].' ';
		$text .= $array[$rand[1]].' ';
		$text .= $array[$rand[2]];
		$thumb = 'bosunski@gmail.com';
		$call = '08169545481';

		$sql = "INSERT INTO ".PREFIX."books VALUES(null, \"$acc_no\", \"$ISBN\", \"$text\", \"$author\", \"$publisher\", \"$call\", \"$thumb\", NOW())";
		$sqql = "INSERT INTO ".PREFIX."users VALUES(null, \"$acc_no\", \"$school_no\", \"$acc_no\", \"$author\", \"$levels[0]\", \"$publisher\", \"$publisher\", \"$publisher\", \"$call\", \"$thumb\", 'regular', NOW(), 0, 0)";
		if($libdb->db_connect()) {
			$libdb->query($sqql, 'insert');
			if($libdb->done) {

			} else {
				_e($libdb->error);
			}
		}

		shuffle($array);
		shuffle($levels);
		$count++;
	} while($count != 100);
_e('done');

?>
