<?PHP
	error_reporting(0);
	ob_start();
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require(ABSPATH . 'lib_includes/lib_functions.php');
	load_lib_config();load_lib_db();
	$libdb = libdb::getInstance();
	$tables = PREFIX.'lib_config,'.PREFIX.'admins,'.PREFIX.'users,'.PREFIX.'borrows,'.PREFIX.'logged_in_admin,'.PREFIX.'books';
		//backup_tables(DBHOST,UNAME,PASSWORD,DB, $tables);

	if($_SERVER['REQUEST_METHOD'] != 'POST') {
		if(backup_tables(DBHOST,UNAME,PASSWORD,DB, $tables)) {
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

	/* backup the db OR just a table */
	function backup_tables($host,$user,$pass,$name,$tables = '*')
	{
		$dir = glob(ABSPATH.'lib_content/backup/*.sql');
		foreach ($dir as $key => $value) {
			unlink($value);
		}
		
		$link = mysql_connect($host,$user,$pass);
		mysql_select_db($name,$link);
		
		//get all of the tables
		if($tables == '*')
		{
			$tables = array();
			$result = mysql_query('SHOW TABLES');
			while($row = mysql_fetch_row($result))
			{
				$tables[] = $row[0];
			}
		}
		else
		{
			$tables = is_array($tables) ? $tables : explode(',',$tables);
		}
		
		//cycle through
		$return = '';
		foreach($tables as $table)
		{
			$result = mysql_query('SELECT * FROM '.$table);
			$num_fields = mysql_num_fields($result);
			
			$return .= 'DROP TABLE '.$table.';';
			$row2 = mysql_fetch_row(mysql_query('SHOW CREATE TABLE '.$table));
			$return.= "\n\n".$row2[1].";\n\n";
			
			for ($i = 0; $i < $num_fields; $i++) 
			{
				while($row = mysql_fetch_row($result))
				{
					$return .= 'INSERT INTO '.$table.' VALUES(';
					for($j=0; $j<$num_fields; $j++) 
					{
						$row[$j] = addslashes($row[$j]);
						$row[$j] = ereg_replace("\n","\\n",$row[$j]);
						if (isset($row[$j])) { $return .= '"'.$row[$j].'"' ; } else { $return.= '""'; }
						if ($j<($num_fields-1)) { $return.= ','; }
					}
					$return.= ");\n";
				}
			}
			$return.="\n\n\n";
		}
		
		//Deleting previous backups
		$sql_files = glob(ABSPATH . 'lib_content/backup/*');
		foreach ($sql_files as $key => $value) {
			unlink($value);
		}

		//save file
		$bkname = 'lib_content/backup/library-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql';
		$handle = fopen(ABSPATH.$bkname, 'w+');
		fwrite($handle,$return);
		if(fclose($handle)) {
			header('location: ' . INSTALL_DIR.'/'.$bkname);
			return true; 
		}
		return false;
	}

	function restore_table($libdb) {
		$target_dir = ABSPATH."lib_content/backup/";
		$target_file = $target_dir . basename(clean(str_replace(' ', '_', $_FILES["bck"]["name"])));
		$uploadOk = 1;
		$fileType = pathinfo($target_file,PATHINFO_EXTENSION);

		if($_FILES["bck"]["size"] > 2000000) {
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
		    	//_e('this' . $_FILES["bck"]["tmp_name"]);
		    	$logo = basename(clean(str_replace(' ', '_', $_FILES["bck"]["name"])));
		    	$sql = file_get_contents($target_file);
		    	$sql = str_replace('[@prefix]', PREFIX, $sql);

		    	//_e($sql); ---------------------- I'm Here
		    	$libdb->qry($sql);

		    	if($libdb->done) {

		    		return true;
		    	} else {}
		    } else {
		        echo "Sorry, there was an error uploading your file.";
		    }
		}
		return false;
	}
?>