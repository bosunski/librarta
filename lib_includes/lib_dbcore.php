<?PHP
	if($_SERVER['PHP_SELF'] == '/class/lib_dbcore.php')
		header('location: http://'.$_SERVER['HTTP_HOST'].'/index.php');

	class libdb {
			/* The database Handle variable 
			 */
			public $dbh;
			
			/* An instance variable of this class{encapsulation}
			 */
			private static $instance;
			
			/* The last error of the Database process 
			 */
			public $error;

			/* The rows returned by the last select query
			 */
			public $rowsReturned;

			/* The columns returned by the last select query
			 */
			public $columnsReturned;
			
			/* The status of the last Action True/False
			 */
			public $done;

			/*The last insertId in a table
			 */
			public $lastInsertId;
			
			/* The Nummbers of rows/colums affected by a Query
			 * like Delete, Update, Alter ....
			 */
			 
			 public $rowsAffected;
			 
			 /* The data returned by a select query
			  */
			  public $data = array();
			  
			  /* The number of rows affected
			   */
			  
			public $libdb;
			private $bkname;

			public function backup_table($tables = '*') {
				if(!$this->db_connect()) {
					_x('Error: Unable to connect to Database!');
				}
				//get all of the tables
				if($tables == '*')
				{
					$tables = array();
					$result = $this->query('SHOW TABLES', 'select');
					foreach ($result as $key) {
						$tables[] = $result[0];
					}
				}
				else {
					$tables = is_array($tables) ? $tables : explode(',',$tables);
				}
				
				//cycle through
				$return = '';
				foreach($tables as $table) {
					$result = $this->query('SELECT * FROM '.$table, 'select');
					$num_fields = $this->rowsReturned;
					
					$return .= 'DROP TABLE '.$table.';';
					$resul = $this->dbh->query('SHOW CREATE TABLE '.$table);
					$row2 = $resul->fetch();
					$return .= "\n\n".$row2[1].";\n\n";
					for($i = 0; $i < $num_fields; $i++) {
						echo $i;
						while($row = $resul->fetch(PDO::FETCH_NUM)) {
							echo 'AA';
							$return .= 'INSERT INTO '.$table.' VALUES(';
							for($j=0; $j < $num_fields; $j++) {
								$row[$j] = addslashes($row[$j]);
								$row[$j] = ereg_replace("\n","\\n",$row[$j]);
								if(isset($row[$j])) { $return.= '"' . $row[$j] . '"' ; } else { $return.= '""'; }
								if($j<($num_fields-1)) { $return.= ','; }
							}
							$return .= ");\n";
						}
					}
					$return .= "\n\n\n";
				}
				
				//save file
				$this->bkname = 'db-backup-'.time().'-'.(md5(implode(',',$tables))).'.sql';
				$handle = fopen($this->bkname,'w+');
				//if(fwrite($handle, $return)) {
					fclose($handle);
					return true;
				//}
				return false;
			}

			public function get($var) {
				return $this->{$var};
			}
			public function __construct() {
			}
			
			public static function getInstance() {
				if(! isset(self::$instance)) {
					$object = __CLASS__;
					self::$instance = new $object;
				}
				return self::$instance;
			}
			
			public function db_connect() {
				$dsn = 'mysql:host='.DBHOST.';dbname='.DB;
				try {
					$this->dbh = new PDO($dsn, UNAME, PASSWORD);
					$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					return true;
				} catch(PDOException $e) {
					$this->error = $e->getMessage();
					return false;
				}
			}
			
			public function qry($sql) {
				$exe = $this->dbh->query($sql);
				if($exe) {
					$this->rowsReturned = $exe->rowCount();
					if($this->rowsReturned > 0 && $this->rowsReturned == 1) {
						$row = $exe->fetch(PDO::FETCH_NUM);
						$this->data = $row;
					} else {
						while($row = $exe->fetch(PDO::FETCH_NUM)) {
							$this->data[] = $row;
						}
					}
					$this->done = true;
					return true;
				} else {
					return false;
				}
			}

			/**
			 *@description Queries the database base on the $type argments
			 *@package lib_dbcore.php
			 */
			
			public function query($sql, $type='') {
				$this->data = array();
				switch($type) { 
					case '': 
						{
							$exe = $this->dbh->query($sql);
							if($exe) {
								$this->done = true;
								return true;
							} else {
								return false;
							}
						} 
					break;

					//Performs insertions
					case 'insert':
						{
							$exe = $this->dbh->query($sql);
							if($exe) {
								$this->lastInsertId = $this->dbh->lastInsertId();
								$this->done = true;
							} else {
								$this->error = $this->dbh->errorInfo()[2];
								$this->done = false;
							}
						}
					break;

					//Performs selections
					case 'select':
						{
							$exe = $this->dbh->query($sql);
							if($exe) {
								$this->rowsReturned = $exe->rowCount();

								if($this->rowsReturned > 0 && $this->rowsReturned == 1) {
									$row = $exe->fetch(PDO::FETCH_ASSOC);
									$this->data = $row;
								} else {
									while($row = $exe->fetch(PDO::FETCH_ASSOC)) {
										$this->data[] = $row;
									}
								}
								$this->done = true;
							} else {
								$this->error = $this->dbh->errorInfo()[2];
								$this->done = false;
							}
						}
					break;

					//Performs deletions
					case 'delete':
						{
							$exe = $this->dbh->query($sql);
							if($exe) {
								$this->rowsAffected = $exe->rowCount();
								$this->done = true;
							} else {
								$this->error = $this->dbh->errorInfo()[2];
								$this->done = false;
							}
						}
					break;

					//Performs updates
					case 'update':
						{
							$exe = $this->dbh->query($sql);
							if($exe) {
								$this->rowsAffected = $exe->rowCount();
								$this->done = true;
							} else {
								$this->error = $this->dbh->errorInfo()[2];
								$this->done = false;
							}
						}
					break;
				}
				return false;
			}
			 
			 /**
			 *@description Gets stuffs from the database using $type[] argument
			 *@package lib_dbcore.php
			 */
			 
			public function _get($key, $type) {
				switch($type) {

					case 'book':
						$sql = 'SELECT * FROM '.PREFIX.'books WHERE acc_no = "'.$key.'"';
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							return false;
						}
					break;

					case 'conf':
						$sql = 'SELECT * FROM '.PREFIX.'books WHERE acc_no = "'.$key.'"';
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							//$arra = $db->_get();
						}
					break;

					#Gets the borrow based on the acc_no
					case 'sBorrow':
						$sql = 'SELECT * FROM '.PREFIX.'borrows WHERE acc_no = "'.$key.'"';
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $this->_get();
						}
					break;


					#Gets the borrow based on the lib_no and acc_no
					case 'borrow':
						$keyArr = explode('[@]', $key);
						$key1 = $keyArr[0];
						$key2 = $keyArr[1];
						$sql = 'SELECT * FROM '.PREFIX.'borrows LEFT JOIN '
								.PREFIX.'books on '.PREFIX.'books.acc_no = '
								.PREFIX.'borrows.acc_no LEFT JOIN '
								.PREFIX.'admins on '.PREFIX.'admins.admin_id = '
								.PREFIX.'borrows.admin_id WHERE ' .PREFIX.'borrows.acc_no = "'.$key1.'" AND lib_no = "'.$key2.'" LIMIT 1 ';
						//$sql = 'SELECT * FROM '.PREFIX.'borrow' ;
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $db->_get();
						}
					break;
					
					#Gets the user based on the ID
					case 'user':
						$sql = 'SELECT * FROM '.PREFIX.'users WHERE uid = '.$key;
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $this->_get();
						}
					break;

					#Gets the Library user based on the LIB_NO
					case 'userLib_no':
						$sql = "SELECT * FROM ".PREFIX."users WHERE lib_no = \"$key\"";
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							return false;
						}
					break;

					
					#Gets the Book based on the ACC_NO
					case 'bookAcc_no':
						$sql = "SELECT * FROM ".PREFIX."books WHERE acc_no = \"$key\"";
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $this->_get();
						}
					break;

					case 'admin':
						$sql = 'SELECT * FROM '.PREFIX.'admins WHERE admin_id = '.$key;
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							
						}
					break;

					case 'admin2':
						$sql = 'SELECT * FROM '.PREFIX.'admins WHERE email = "'.$key.'"';
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $db->_get();
						}
					break;
					
					case 'borrow':
						$sql = 'SELECT * FROM '.PREFIX.'borrows WHERE acc_no = '.$key;
						$this->query($sql, 'select');
						if($this->done) {
							return $this->data;
						} else {
							$arra = $db->_get();
						}
					break;
				}
			}

			public function set($var, $val)  {
				$this->{$var} = $val;
			}
	}
?>