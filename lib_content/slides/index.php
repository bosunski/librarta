<?PHP
	error_reporting(E_ALL);
	ob_start();
	session_start();
	define('ABSPATH', dirname(dirname(dirname( __FILE__ ))).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_auth();load_lib_config();load_lib_db();
	$libdb = new libdb();
	$auth = new Auth();
	$data = (isset($_GET['data'])) ? $_GET['data'] : '';
	$arr = array();
	$conf = array();
	$conSql = 'SELECT * FROM '.PREFIX.'lib_config';
	if($libdb->db_connect()) {
		$libdb->query($conSql, 'select');
		if($libdb->done) {
			$conf = $libdb->data;
			$libdb->data = array();
		} else {
			_x('Cannot Get Library Configuration.');
		}
		switch($data) {
			#Get the Slides of the Library
			case 'getPics':
				$extentions = array('jpg', 'jpeg', 'png', 'gif');
				$pics = array();
				foreach ($extentions as $key => $value) {
					$p = glob('*.'.$value);
					foreach($p as $k => $v) {
						$pics[] = $v;
					}
				}
				$arr = $pics;
			break;

			#Deletes Slide
			case 'delslide':
				if(file_exists($_GET['src'])) {
					if(unlink($_GET['src'])) {
						_e('done');
					}
				}
			break;

			case 'spic':
				$target_dir = ABSPATH."lib_content/slides/";
				$target_file = $target_dir . basename($_FILES["fspic"]["name"]);
				$uploadOk = 1;
				$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
				// Check if image file is a actual image or fake image
				if(isset($_POST["submit"])) {
				    $check = getimagesize($_FILES["fspic"]["tmp_name"]);
				    if($check !== false) {
				        _x("File is an image - " . $check["mime"] . ".");
				        $uploadOk = 1;
				    } else {
				        _x("File is not an image.");
				        $uploadOk = 0;
				    }
				}
				// Check if file already exists
				if(file_exists($target_file)) {
				    _x("Sorry, file already exists.");
				    $uploadOk = 0;
				}
				// Check file size
				if ($_FILES["fspic"]["size"] > 2000000) {
				    _x("Sorry, your file is too large.");
				    $uploadOk = 0;
				}
				// Allow certain file formats
				if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
				    _x("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
				    $uploadOk = 0;
				}
				// Check if $uploadOk is set to 0 by an error
				if ($uploadOk == 0) {
				    _x("Sorry, your file was not uploaded.");
				// if everything is ok, try to upload file
				} else {
				    if(move_uploaded_file($_FILES["fspic"]["tmp_name"], $target_file)) {
				        _e("done");
				    } else {
				        echo "Sorry, there was an error uploading your file.";
				    }
				}
			break;
		}
	} else {
		_e("CANNOT COMMUNICATE WITH THE DATABASE PLEASE TRY AGAIN OR RELOAD THIS PAGE");
	}
	
	if(!empty($arr)) {
		_e(json_encode($arr));
	}
	
	ob_end_flush();

?>