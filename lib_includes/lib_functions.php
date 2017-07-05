<?PHP
	/**
	*LIBRAta 1.0 Functions
	*@Description functions
	*@Package LIBRAta
	*/
	//define( 'ABSPATH', dirname(dirname(__FILE__)).'/' );
	/*A function that just echo things */
	function _e($stream) {
		echo $stream;
	}

	function _x($stream) {
		 exit($stream);
	}

	/*This function do basic cleaning for data
	*/
	function clean($data) {
		$data = strip_tags(stripslashes(stripcslashes($data)));
		return $data;
	}

	/* This function loads the Database core Handler for
	 *LIBRAta
	 */
	function load_lib_db() {
		if(file_exists(ABSPATH.'/lib_includes/lib_dbcore.php'))
			require_once('lib_dbcore.php');
	}

	/* This function loads the Config file for
	 *LIBRAta
	 */
	function load_config() {
		if(file_exists(ABSPATH.'/lib_config.php'))
			require_once(ABSPATH.'/lib_config.php');
	}

	/* This function loads the Auth class for
	 *LIBRAta
	 */
	function load_auth() {
		if(file_exists(ABSPATH.'/lib_includes/class/Auth.php'))
			require_once('class/Auth.php');
	}

	/* This function loads the Database core Handler for
	 *LIBRAta
	 */
	function load_lib_config() {
		if(file_exists(ABSPATH.'/lib_config.php'))
			require_once(ABSPATH.'/lib_config.php');
	}

	/* This function loads the Template engine for
	 *LIBRAta
	 */
	function load_lib_template() {
		if(file_exists(ABSPATH.'/lib_includes/class/template.php'))
			require_once(ABSPATH.'/lib_includes/class/template.php');
	}

	/* This function loads the install script for
	 *LIBRAta
	 */
	function load_install() {
		if(file_exists(ABSPATH.'/lib_admin/lib_install.php'))
			require_once(ABSPATH.'/lib_admin/lib_install.php');
	}

	/* This function encrypts the $data
	 */
	function _crypt($data) {
		load_config();
		return base64_encode(AUTH_KEY.$data);
	}

	/* This function decrypts the $data
	 */
	function _decrypt($data) {
		load_config();
		$data = base64_decode($data);
		$data = explode(AUTH_KEY, $data);
		return $data[1];
	}

	function abbrev($text) {
			$expl = explode(' ', $text);
			$abbr = '';
			foreach($expl as $key => $value) {
				$abbr .= substr($value, 0, 1);
			}
			return $abbr;
	}

	function getUserSpecificStatus() {
		$section = _crypt($_SESSION['section']);
		return $section;
	}

	function chkInstall() {
		//Runtime check
		if(!file_exists(ABSPATH.'lib_config.php')) {
			header('location: lib_admin/setup_lib.php');
			exit();
		}
	}

	function getLibrAtaOption($libdb) {
		$sql = 'SELECT * FROM '.PREFIX.'lib_config LIMIT 1';
		if($libdb->db_connect()) {
			$libdb->query($sql, 'select');
			return $libdb->data;
		} else {
			exit('<H3 style="color:red;">ERROR: Cannot connect to Database, please check your configuration file.</h3>');
		}
	}

	function filter_priviledge($privData) {
		$priviledges = explode(',', $privData);
		$admin_previldge = explode(',', $_SESSION['priviledge']);
		$no_access = array();
		foreach ($priviledges as $key => $priviledge) {
			if(!in_array($priviledge, $admin_previldge)) {
				$no_access[] = $priviledge;
			}
		}
		return $no_access;
	}

	function bacfkup_table($libdb, $tables = '*') {
				$link = mysql_connect($host,$user,$pass);
				mysql_select_db($name,$link);

				//get all of the tables
				if($tables == '*')
				{
					$tables = array();
					$result = $this->query('SHOW TABLES', 'select');
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
							$return.= 'INSERT INTO '.$table.' VALUES(';
							for($j=0; $j<$num_fields; $j++)
							{
								$row[$j] = addslashes($row[$j]);
								$row[$j] = ereg_replace("\n","\\n",$row[$j]);
								if (isset($row[$j])) { $return.= '"'.$row[$j].'"' ; } else { $return.= '""'; }
								if ($j<($num_fields-1)) { $return.= ','; }
							}
							$return.= ");\n";
						}
					}
					$return.="\n\n\n";
				}

				//save file
				$handle = fopen('db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql','w+');
				fwrite($handle,$return);
				fclose($handle);
			}

?>
