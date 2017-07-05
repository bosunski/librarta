<?PHP
	session_start();
	if(isset($_SESSION['section'])) {
		switch($_SESSION['section']) {
			case 'catalogue':
				header('location: lib_admin/');
			break;
			case 'circulation':
				header('location: lib_admin/');
			break;
			case 'superDUPER':
				header('location: lib_admin/');
			break;
			default:
				header('location: login.php');
			break;
		}
	} else {
		header("location: login.php");
	}
	
?>