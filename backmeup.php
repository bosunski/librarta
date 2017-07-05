<?php
	
	function backup_table($libdb, $tables = '*') {
		if(!$libdb->db_connect()) {
			_x('Error: Unable to connect to Database!');
		}

		//get all of the tables
		if($tables == '*') {
			$tables = array();
			$result = $libdb->query('SHOW TABLES', 'select');
			foreach ($result as $key) {
				$tables[] = $result[0];
			}
		} else {
			$tables = is_array($tables) ? $tables : explode(',',$tables);
		}
		
		//cycle through
		$return = '';
		foreach($tables as $table) {
			$result = $libdb->qry('SELECT * FROM '.$table);
			$tbl_data = $libdb->data;
			$num_fields = $libdb->rowsReturned;
			//$return .= 'DROP TABLE '.$table.';';
			$find = 'CREATE TABLE';
			$replace = 'CREATE TABLE IF NOT EXISTS';
			$resul = $libdb->qry('SHOW CREATE TABLE '.$table);
			//$return .= "\n\n".str_replace($find, $replace, $libdb->data[1]).";\n\n";
				$x = 0;
				for($m = 0; $m < count($tbl_data); $m++) {
					$curr = $tbl_data[$m];
					if(count($curr) > 1) {
						$return .= 'INSERT INTO ' . $table.' VALUES(';
						foreach($curr as $key => $value) {
							for ($i=0; $i < count($tbl_data); $i++) { 
								$value = addslashes($value);
								$value = str_replace("\n", "\\n", $value);
								if(isset($value)) { $return.= '"' . $value . '"' ; } else { $return.= '""'; }
								if($i < (count($tbl_data))-1) { $return.= ','; }
							}
						}
						$return .= ");\n";
					} elseif(count($curr) == 1) {

					}	
				}
			$return .= "\n\n\n";
		}
		//echo $return;
		$return = str_replace(PREFIX, '[@prefix]', $return);
		
		//save file
		$bkname = 'db-backup-'.time().'-'.(md5(implode(',', $tables))).'.sql';
		$libdb->set('bkname', $bkname);
		$handle = fopen(ABSPATH . 'lib_content/backup/' . $bkname,'w+');
		if(fwrite($handle, $return)) {
			fclose($handle);
			return true;
		}
		return false;
	}

	function restore_table($libdb) {
		$target_dir = ABSPATH."lib_content/backup/";
		$target_file = $target_dir . basename(clean(str_replace(' ', '_', $_FILES["bck"]["name"])));
		$uploadOk = 1;
		$fileType = pathinfo($target_file,PATHINFO_EXTENSION);

		if($_FILES["lpic"]["size"] > 2000000) {
		    _x("Sorry, your file is too large.");
		    $uploadOk = 0;
		}

		if($fileType != "sql") {
		    _x("Sorry, only SQL files are allowed.");
		    $uploadOk = 0;
		}
		if ($uploadOk == 0) {
		    _x("Sorry, your file was not uploaded. Please try again.");
		} else {
		    if(move_uploaded_file(str_replace(' ', '_', $_FILES["bck"]["tmp_name"]), $target_file)) {
		    	$logo = basename(clean(str_replace(' ', '_', $_FILES["bck"]["name"])));
		    	$sql = file_get_contents($target_file);
		    	$sql = str_replace('[@prefix]', PREFIX, $sql);
		    	$libdb->qry($sql);
		    	if($libdb->done)
		    		_e('done');
		    } else {
		        echo "Sorry, there was an error uploading your file.";
		    }
		}
		return false;
	}

	error_reporting(E_ALL^E_NOTICE);
	ob_start();
	session_start();
	define('ABSPATH', dirname( __FILE__ ).'/');
	require(ABSPATH . '/lib_includes/lib_functions.php');
	load_lib_config();load_lib_db();
	$libdb = libdb::getInstance();
	$tables = PREFIX.'lib_config,'.PREFIX.'admins,'.PREFIX.'users,'.PREFIX.'borrows,'.PREFIX.'logged_in_admin,'.PREFIX.'books';
	if($_SERVER['REQUEST_METHOD'] != 'POST') {
		if(backup_table($libdb, $tables)) {
			$bkname = $libdb->get('bkname');
			header('location: '. INSTALL_DIR . '/lib_content/backup/' . $bkname);
		}
	} else {
		if(restore_table($libdb)) {
			//$bkname = $libdb->get('bkname');
			//header('location: '. INSTALL_DIR . '/lib_content/backup/' . $bkname);
			echo 'done';
		} else {
			_e('Restoration Unsuccessful!');
		}
	}
	

?>