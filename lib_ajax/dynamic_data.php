<?PHP
	error_reporting(E_ALL^E_NOTICE);
	ob_start();
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_auth();load_lib_config();load_lib_db();
	$libdb = new libdb();
	$auth = new Auth();
	$data = (isset($_GET['data'])) ? $_GET['data'] : '';
	$arr = array();
	$conf = getLibrAtaOption($libdb);
	$no_access = filter_priviledge($conf['priviledges']);

	if($libdb->db_connect()) {
		switch($data) {
			case 'updatePriviledge':
				if($_SESSION['section'] == 'superDUPER') {
					$new_priv = array($_POST['backs'], $_POST['borrowsR'], $_POST['booka']);
					foreach ($new_priv as $key => $value) {
						if(!in_array($value, explode(',', $conf['priviledges']))) {
							unset($new_priv[$key]);
						}
					}
					$old_priv = explode(',', $_SESSION['priviledge']);
					$all_priv = array_merge($old_priv, $new_priv);
					$priv_text = implode(',', $new_priv);

					$sql = "UPDATE ".PREFIX."admins SET priviledge=\"$priv_text\" WHERE admin_id="._decrypt($_GET['uid']);
					$libdb->query($sql, 'update');
					if($libdb->done) {
						if($libdb->rowsAffected == 1) {
							_e('done');
						} else {
							_e('No changes made.');
						}
					} else {
						_e('not done');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			case 'admin': 
				{
					$sql = "SELECT * FROM ".PREFIX."admins";

					$libdb->query($sql, 'select');
					if($libdb->done) {
						$arr = $libdb->data;
						foreach ($arr as $key => $value) {
							$arr[$key]['admin_id'] = _crypt($arr[$key]['admin_id']);
							if($arr[$key]['admin_id'] == $_SESSION['admin_id']) {
								unset($arr[$key]);
							}
						}
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
				} 
			break;



			#edit books
			case 'ed_book':
				{
					if(in_array('booka', $no_access) || $_SESSION['section'] == 'superDUPER') {
						if(isset($_POST['book_id'])) {
							$book_id = _decrypt($_POST['book_id']);
							$acc_no = clean(trim($_POST['acc_no']));
							$title = clean($_POST['title']);
							$author = clean($_POST['author']);
							$publisher = clean($_POST['publisher']);
							$ISBN = clean($_POST['ISBN']);
							$call_number = clean($_POST['call_number']);

							if(preg_match('/[^0-9]/i', $ISBN)) {
								_x('ISBN can only be Numbers');
							}
							$sql = "UPDATE ".PREFIX."books SET acc_no=\"$acc_no\", 
									title=\"$title\", author=\"$author\", publisher=\"$publisher\", 
									ISBN=\"$ISBN\", call_number=\"$call_number\" WHERE book_id=".$book_id;

							$libdb->query($sql, 'update');
							if($libdb->done) {
								if($libdb->rowsAffected == 1) {
									_e("done");
								} else {
									_e("No Changes made.");
								}
							} else {
								_e('An error occured contact admin.');
							}
						} else{
							_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
						}
					} else {
						_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
					}
					
				}
			break;

			#Delete book
			case 'del_book':
				{
					if(in_array('booka', $no_access) || $_SESSION['section'] == 'superDUPER') {
						$id = (isset($_GET['book_id'])) ? _decrypt($_GET['book_id']) : '';
						$bSql = 'DELETE FROM '.PREFIX.'books WHERE book_id='.(int)_decrypt($_GET['book_id']);
						$dSql = 'DELETE FROM '.PREFIX.'borrows WHERE acc_no="'.$_GET['acc_no'].'"';
						$libdb->query($dSql, 'delete');
						if($libdb->done) {
							$libdb->query($bSql, 'delete');
							if($libdb->done) {
								if($libdb->rowsAffected == 1)
									_e('done');
							}	
						} else {
							_e($libdb->error);
						}
					} else {
						_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
					}
				} 
			break;

			#Load books 
			case 'books': 
				{
					$limit = $_GET['limit'];
					$limit = ($limit == 'all') ? '' : 'LIMIT '.$limit;
					$sql = "SELECT * FROM ".PREFIX."books ORDER BY date DESC ".$limit;
					$libdb->query($sql, 'select');
					if($libdb->done) {
						$arr = array();
						$arr = $libdb->data;
						//var_dump($arr);
						if($libdb->rowsReturned > 0) {
							if(!isset($arr[1])) {
								$accno = $arr['acc_no'];
								$bData = $libdb->_get($accno, 'sBorrow');
								if($libdb->rowsReturned == 1) {
									$arr['bStatus'] = 'Not Available for Borrowing.';
								} else {
									$arr['bStatus'] = 'Available for Borrowing.';
								}
								$arr['book_id'] = _crypt($arr['book_id']);
							} else {
								foreach ($arr as $key => $value) {
									# code...
									$accno = $value['acc_no'];
									$bData = $libdb->_get($accno, 'sBorrow');
									if($libdb->rowsReturned == 1) {
										$arr[$key]['bStatus'] = 'Not Available for Borrowing.';
									} else {
										$arr[$key]['bStatus'] = 'Available for Borrowing.';
									}
									$arr[$key]['book_id'] = _crypt($value['book_id']);
								}
							}
						} else {
							_x(json_encode(array()));
						}
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
				} 
			break;

			#get the Specific keys for sections
			case 'getKeys':
				$arr['general'] = _crypt('superDUPER');
				$arr['cat'] = _crypt('catalogue');
				$arr['circ'] = _crypt('circulation');
				$arr['abspath'] = ABSPATH;
			break;
			case 'getUserAdmin': 
				{ 
					$id = (isset($_GET['id'])) ? $_GET['id'] : 1;
					$uSql = 'SELECT * FROM '.PREFIX.'admins WHERE admin_id='.(int)_decrypt($_GET['id']);
					$libdb->query($uSql, 'select');
					if($libdb->done) {
						$arr = $libdb->data;
						$priv = explode(',', $arr['priviledge']);
						foreach ($priv as $key => $value) {
							$priv[$value] = $value;
						}
						$arr['admin_id'] = _crypt($arr['admin_id']);
						$arr['priviledge'] = $priv;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
				} 
			break; 

			case 'getUser': 
				{ 
					$id = (isset($_GET['lib_no'])) ? $_GET['lib_no'] : 'XP4G1F54';
					$uSql = 'SELECT * FROM '.PREFIX.'users WHERE lib_no="'.clean(trim($_GET['lib_no'])).'"';
					$libdb->query($uSql, 'select');
					if($libdb->done) {
						$arr = $libdb->data;
						$arr['uid'] = _crypt($arr['uid']);
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
				}

			break; 

			case 'delete': 
				{	
					if($_SESSION['section'] == 'superDUPER') {
						$id = (isset($_GET['delete'])) ? _decrypt($_GET['id']) : '';
						$dSql = 'DELETE FROM '.PREFIX.'admins WHERE admin_id='.(int)_decrypt($_GET['admin_id']);
						$libdb->query($dSql, 'delete');
						if($libdb->done) {
							if($libdb->rowsAffected == 1)
								_e('done');
						} else {
							_e($libdb->error);
						}
					} else {
						_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
					}
				} 
			break;

			case 'resetPass':
				if($_SESSION['section'] == 'superDUPER') {
					$userData = $libdb->_get((int)_decrypt($_GET['admin_id']), 'admin');
					$newPass = $auth->_getRand(8);
					$password = $userData['salt'].$newPass;
					$password = $auth->hashData($password);

					$sQl = 'UPDATE '.PREFIX.'admins SET password="'.$password.'" WHERE admin_id='.(int)_decrypt($_GET['admin_id']);
					$libdb->query($sQl, 'update');
					if($libdb->rowsAffected == 1) {
						_e($newPass);
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
				
			break;

			case 'changeSection':
				/* There is a bug here (not really a bug) 
					how to know if its the same section that the admins
					is presently was selected.
				*/
				if($_SESSION['section'] == 'superDUPER') {
					$options = array('catalogue', 'circulation', 'superDUPER');
					$section = (in_array($_GET['section'], $options)) ? $_GET['section'] : null;
					if($section != null) {
						$sQl = 'UPDATE '.PREFIX.'admins SET section="'.$section.'" WHERE admin_id='.(int)_decrypt($_GET['admin_id']);
						$libdb->query($sQl, 'update');
						if($libdb->done) {
							if($libdb->rowsAffected == 1)
								_e('done');
						} else {
							_e('AN ERROR HAS OCCURED, CONTACT THE SYSTEM ADMINISTRATOR');
						}
					} else {
						_e('AN ERROR OCCURED, PLEASE TRY AGAIN.');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
				
			break;

			case 'chklbno':
			#Also check for invalid characters
				$lbno = (isset($_GET['lib_no'])) ? trim($_GET['lib_no']) : null;
				if($lbno != null) {
					if(preg_match('/[^a-zA-Z0-9]/i', $lbno))
						exit('false');
					if(strlen($lbno) > 8)
						exit('false');
					$pData = $libdb->_get($lbno, 'userLib_no');
					if($libdb->rowsReturned == 1) {
						_e('true');
					} else {
						_e('false');
					}
				}
			break;

			case 'chkaccno':
			#Also check for invalid characters
				$accno = (isset($_GET['acc_no'])) ? trim($_GET['acc_no']) : null;
				if($accno != null) {
					if(preg_match('/[^a-zA-Z0-9]/i', $accno))
						exit('false');
					if(strlen($accno) > 8)
						exit('false');
					$pData = $libdb->_get($accno, 'bookAcc_no');
					if($libdb->rowsReturned == 1) {
						_e('true');
					} else {
						_e('false');
					}
				}
			break;

			#Get book details--------------------------
			case 'getBook':
			#Also check for invalid characters
				$accno = (isset($_GET['acc_no'])) ? trim($_GET['acc_no']) : null;
				if($accno != null) {
					if(preg_match('/[^a-zA-Z0-9]/i', $accno))
						_x('falsex');
					if(strlen($accno) > 8)
						_x('falsep');
					$pData = $libdb->_get($accno, 'book');

					if($libdb->rowsReturned == 1) {
						$arr = $pData;
						$bData = $libdb->_get($accno, 'sBorrow');
						if($libdb->rowsReturned == 1) {
							$arr['bStatus'] = 'Not Available for Borrowing.';
						} else {
							$arr['bStatus'] = 'Available for Borrowing.';
						}
					} else {
						_e('falsey');
					}
				}
			break;

			#Get borrow details
			case 'getBorrow':
			#Also check for invalid characters
				$accno = (isset($_GET['acc_no']) && isset($_GET['lib_no'])) ? trim($_GET['acc_no']).'[@]'.trim($_GET['lib_no']) : null;
				if($accno != null) {
					if(preg_match('/[^a-zA-Z0-9@\[\]]/i', $accno))
						_x('false');
					if(strlen($accno) > 19)
						_x('false');
					$pData = $libdb->_get($accno, 'borrow');
					if($libdb->rowsReturned == 1) {
						$arr = $pData;
					} else {
						_e('false');
					}
				}
			break;

			#Purges the library history
			case 'pHistory':
				if(getUserSpecificStatus() == _crypt('superDUPER')) {
					$status = 'Returned';
					$sql = "DELETE FROM ".PREFIX."borrows WHERE status =\"$status\"";
					$libdb->query($sql, 'delete');
					if($libdb->done) {
						if($libdb->rowsAffected > 0) {
							_e('done');
						} else {
							_e('not done');
						}
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			#Resets the Library Settings
			case 'resetSettings':
				if($_SESSION['section'] == 'superDUPER') {
					$skin = 'skin-green';
					$layout = 'layout-boxed';
					$sql = "UPDATE ".PREFIX."lib_config SET layout=\"$layout\", skin=\"$skin\", due_period=14, blimit=10";
					$libdb->query($sql, 'update');
					if($libdb->done) {
						_e('done');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			#Borrowing of book
			case 'borrow':
				if(in_array('borrowsR', $no_access) || $_SESSION['section'] == 'superDUPER' ) {
					$acc_no = trim(clean($_POST['acc_no']));
					$lib_no = trim(clean($_POST['lib_no']));
					$bdata = $libdb->_get($acc_no, 'book');

					if($libdb->rowsReturned != 1) {
						_x('Book Access number is not found in Database.');
					}
					$udata = $libdb->_get($lib_no, 'userLib_no');

					if($libdb->rowsReturned != 1) {
						_x('User Library number is not found in Database.');
					}
					$status = 'Returned';
					$dsql = "SELECT * FROM " . PREFIX . "borrows WHERE acc_no=\"$acc_no\" AND status!=\"$status\"";
					$libdb->query($dsql, 'select');
					if($libdb->done) {
						if($libdb->rowsReturned > 0)
							_x("This Book has been borrowed by another user, and not returned yet.");
					}

					$lmsql = "SELECT COUNT(*) AS borrows FROM ".PREFIX."borrows WHERE lib_no=\"$lib_no\"";
					$libdb->query($lmsql, 'select');
					if($libdb->done) {
						$exe = $libdb->data;
						if($exe['borrows'] >= $conf['blimit']) {
							_x('Borrow Limit has been reached by this user.');
						}
					}
					
					$pData = $libdb->_get($acc_no, 'bookAcc_no');
					$title = $pData['title'];
					if($title == '' || $title == nul) {
						$title = 'No title';
					}
					if($acc_no == '' || $lib_no == '') 
						exit();
					$admin_id = (int)_decrypt($_SESSION['admin_id']);
					$aData = $libdb->_get($admin_id, 'admin');
					$aName = $aData['fname']. ' '. $aData['lname'];
					$date = date("D M d Y H:i:s", time());
					$due_date = date("D  M d Y H:i:s", strtotime("+".$conf['due_period']." days"));
					$status = 'borrowed';
					$sql = "INSERT INTO ".PREFIX."borrows VALUES (null, \"$acc_no\", \"$title\" , \"$lib_no\", \"$admin_id\", \"$aName\", NOW(), \"$due_date\", \"$status\")";
					$sql2 = "UPDATE ".PREFIX."users set nBorrow=nBorrow+1 WHERE lib_no=\"$lib_no\"";
					#Queries to check for Duplicate entries
					$chSql = "SELECT * FROM ".PREFIX."borrows WHERE acc_no=\"$acc_no\" AND lib_no=\"$lib_no\"";
					$libdb->query($chSql, 'select');
					if($libdb->done) {
						if($libdb->rowsReturned > 0) 
							exit('duplicate');
						$libdb->query($sql, 'insert');
						if($libdb->done) {
							$libdb->query($sql2, 'update');
							if($libdb->done)
								_x('done');
						} else {
							_e('false');
						}
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			case 'renewBook':
				if(in_array('borrowsR', $no_access) || $_SESSION['section'] == 'superDUPER') {
					$acc_no = $_GET['acc_no'];
					$lib_no = $_GET['lib_no'];
					$date = date('D  M d Y H:i:s', time());
					$status = 'Borrowed';
					$due_date = date('D  M d Y H:i:s', strtotime("+".$conf['due_period']." days"));
					$admin_id = _decrypt($_SESSION['admin_id']);
					$sql = "UPDATE ".PREFIX."borrows SET admin_id=\"$admin_id\" , due_date=\"$due_date\", date=NOW(), status=\"$status\" WHERE acc_no=\"$acc_no\" AND lib_no=\"$lib_no\"";
					$sql2 = "UPDATE ".PREFIX."users set nRenewal=nRenewal+1 WHERE lib_no=\"$lib_no\"";
					$libdb->query($sql, 'update');

					if($libdb->done) {
						if($libdb->rowsAffected > 0) 
							$libdb->query($sql2, 'update');
							if($libdb->done)
								_x('done');
					} else {
						_x('false');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			case 'delTra':
				if(in_array('borrowsR', $no_access) || $_SESSION['section'] == 'superDUPER') {
					$acc_no = $_GET['acc_no'];
					$lib_no = $_GET['lib_no'];
					$status = 'returned';
					$sql = "UPDATE ".PREFIX."borrows SET status=\"$status\" WHERE acc_no=\"$acc_no\" AND lib_no=\"$lib_no\"";
					$libdb->query($sql, 'delete');

					if($libdb->done) {
						if($libdb->rowsAffected > 0) 
							_x('done');
					} else {
						_('false');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;
			#Gets a tip;
			case 'getTips':
				$tips = explode('||', file_get_contents(ABSPATH.'lib_admin/dist/librata_tips.txt'));
				shuffle($tips);
				_e($tips[0]);
			break;

			#Gets all the data for page refresh
			case 'getAll':
					$sqlAdmins = "SELECT * FROM ".PREFIX."admins";
					$libdb->query($sqlAdmins, 'select');
					if($libdb->done) {
						foreach ($libdb->data as $key => $value) {
							$libdb->data[$key]['admin_id'] = _crypt($libdb->data[$key]['admin_id']);
							if($libdb->data[$key]['admin_id'] == $_SESSION['admin_id']) {
								unset($libdb->data[$key]);
							}
						}

						$arr['adminlist'] = $libdb->data;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}

					#Books
					$libdb->data = array();
					$sqlBooks = "SELECT * FROM ".PREFIX."books ORDER BY date DESC LIMIT 5";
					$libdb->query($sqlBooks, 'select');
					if($libdb->done) {
						if($libdb->rowsReturned > 0) {
							if(!isset($libdb->data[1])) {
								$libdb->data['book_id'] = _crypt($libdb->data['book_id']);
							} else {
								foreach ($libdb->data as $key => $value) {
									$libdb->data[$key]['book_id'] = _crypt($value['book_id']);
								}
							}
						}
						$arr['booksList'] = $libdb->data;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}

					#Borrows
					$libdb->data = array();
					$bstatus = 'Borrowed';
					$rstatus = 'Returned';
					$dstatus = 'Due';
					$sqlBorrows = "SELECT * FROM ".PREFIX."borrows LEFT JOIN "
						.PREFIX."books on ".PREFIX."books.acc_no = "
						.PREFIX."borrows.acc_no LEFT JOIN "
						.PREFIX."admins on ".PREFIX."admins.admin_id = "
						.PREFIX."borrows.admin_id WHERE status != \"$rstatus\" ORDER BY ".PREFIX."borrows.date DESC LIMIT 5";
					$libdb->query($sqlBorrows, 'select');
					if($libdb->done) {
						$arr['borrowsList'] = $libdb->data;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}

					#Others
					$sqlOthers = "SELECT count(a.admin_id) as admins, 
								(select count(b.book_id) from ".PREFIX."books as b) as books, 
								(select count(br.b_id) from  ".PREFIX."borrows as br WHERE br.status = \"$bstatus\") as borrows, 
								(select count(br.b_id) from  ".PREFIX."borrows as br WHERE br.status = \"$dstatus\") as dues, 
								(select count(u.uid) from  ".PREFIX."users as u) as users 
								FROM ".PREFIX."admins as a";
					$libdb->query($sqlOthers, 'select');
					if($libdb->done) {
						$arr['otherData'] = $libdb->data;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
			break;

			#Gets the latest 5 Borrows
			case 'borrows':
				$limit = $_GET['limit'];
				$limit = ($limit == 'all') ? '' : 'LIMIT '.$limit;
				$status = 'Returned';
				$sql = "SELECT * FROM ".PREFIX."borrows LEFT JOIN "
						.PREFIX."books on ".PREFIX."books.acc_no = "
						.PREFIX."borrows.acc_no LEFT JOIN "
						.PREFIX."admins on ".PREFIX."admins.admin_id = "
						.PREFIX."borrows.admin_id WHERE status != \"$status\" ORDER BY ".PREFIX."borrows.date DESC ".$limit;
					$libdb->query($sql, 'select');
					if($libdb->done) {
						$arr = $libdb->data;
					} else {
						_e("AN ERROR HAS OCCURED PLEASE TRY RELOADING THIS PAGE AND TRY AGAIN!");
					}
			break;

			#Get the profile of the current user
			case 'getProfile':
				$arr['uname'] = $_SESSION['username'];
				$nameArr = explode(' ', $_SESSION['name']);
				$arr['fname'] = $nameArr[0];
				$arr['lname'] = $nameArr[1];
			break;

			#Get the Settings of the Library
			case 'getSettings':
				$arr = $conf;
			break;


			case 'lpic':
				if($_SESSION['section'] == 'superDUPER') {
					$target_dir = ABSPATH."lib_content/logo/";
					$target_file = $target_dir . basename(clean(str_replace(' ', '_', $_FILES["lpic"]["name"])));
					$uploadOk = 1;
					$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

					// Check if image file is an actual image or fake image
					if(isset($_POST["submit"])) {
					    $check = getimagesize($_FILES["lpic"]["tmp_name"]);
					    if($check !== false) {
					        _x("File is an image - " . $check["mime"] . ".");
					        $uploadOk = 1;
					    } else {
					        _x("File is not an image.");
					        $uploadOk = 0;
					    }
					}
					if (file_exists($target_file)) {
					    _x("Sorry, file already exists.");
					    $uploadOk = 0;
					}
					if ($_FILES["lpic"]["size"] > 2000000) {
					    _x("Sorry, your file is too large.");
					    $uploadOk = 0;
					}
					if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
					    _x("Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
					    $uploadOk = 0;
					}
					if ($uploadOk == 0) {
					    _x("Sorry, your file was not uploaded.");
					} else {
						$extentions = array('jpg', 'jpeg', 'png', 'gif');
						$pics = array();
						foreach ($extentions as $key => $value) {
							$p = glob(ABSPATH.'lib_content/logo/*.'.$value);
							foreach($p as $k => $v) {
								if(basename($v) != 'logo.jpg')
									unlink($v);
							}
						}
					$arr = $pics;
					    if (move_uploaded_file(str_replace(' ', '_', $_FILES["lpic"]["tmp_name"]), $target_file)) {
					    	$logo = basename(clean(str_replace(' ', '_', $_FILES["lpic"]["name"])));
					    	$sql = "UPDATE ".PREFIX."lib_config SET logo='$logo'";
					    	$libdb->query($sql, 'update');
					    	if($libdb->done) {
					    		echo "done";
					    	}
					    } else {
					        echo "Sorry, there was an error uploading your file.";
					    }
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			#edit profile of the current user
			case 'setProfile':
				if(preg_match('/[^a-zA-Z]/i', $_POST['fname'])) {
					exit('Firstname can only be alphabet');
				}

				if(preg_match('/[^a-zA-Z]/i', $_POST['lname'])) {
					exit('Lastname can only be alphabet');
				}
				if (preg_match('/[^a-z0-9]/i', $_POST['uname'])) {
					exit('Username contains invalid characters');
				}
				$password = '';

				if(isset($_POST['password']) && $_POST['password'] != '' ) {
					$password = $_SESSION['salt'].$_POST['password'];
					$password = $auth->hashData($password);
				}
				
				$passQuery = ($password != '') ? ', password="'.$password.'"' : ' ';

				$sql = "UPDATE ".PREFIX."admins SET fname=\"".clean(trim($_POST['fname']))."\", lname= \"".clean(trim($_POST['lname']))."\", username= \"".clean(trim($_POST['uname']))."\"".$passQuery." WHERE admin_id="._decrypt($_SESSION['admin_id']);
				$libdb->query($sql,'update');
				
				if($libdb->done) {
					if($libdb->rowsAffected == 1) {
						_x('done');
					} elseif($libdb->rowsAffected==0) {
						_x('Nothing to update');
					}
				} else {
					_x('An error ocuured!');
				}
			break;


			#edit profile of the current user
			case 'setSettings':
				if($_SESSION['section'] == 'superDUPER') {
					if(preg_match('/[^a-z ]/i', $_POST['libname'])) {
						exit('Library name can only be alphabet.');
					}

					if(preg_match('/[^a-z ]/i', $_POST['school'])) {
						exit('School/Organisation name can only be alphabet.');
					}
					if (preg_match('/[^0-9]/i', $_POST['due_period'])) {
						exit('Only Numbers are allowed for Due period.');
					}
					$skins = array('skin-blue', 'skin-green', 'skin-yellow', 'skin-black');
					$skinState = false;
					$layoutState = false;
					foreach ($skins as $key => $value) {
						if(clean(trim($_POST['lib_skin'])) == $value) {
							$skinState = true;
						}
					}
					if(!$skinState) 
						_x("Invalid Skin Selected");
					$layouts = array('fixed', 'layout-boxed', 'layout-top-nav');
					foreach ($layouts as $key => $value) {
						if(clean(trim($_POST['lib_layout'])) == $value) {
							$layoutState = true;
						}
					}
					if(!$layoutState) 
						_x("Invalid Layout Selected");

					
					$status = (isset($_POST['lib_status'])) ? $_POST['lib_status'] : 'off';
					$sql = "UPDATE ".PREFIX."lib_config SET lib_name=\"".clean($_POST['libname'])."\", due_period= \"".$_POST['due_period']."\", blimit= \"".$_POST['blimit']."\", status= \"".clean(trim($status))."\", school= \"".clean($_POST['school'])."\", skin= \"".clean(trim($_POST['lib_skin']))."\" , layout= \"".clean(trim($_POST['lib_layout']))."\" WHERE 1";
					$libdb->query($sql,'update');
					
					if($libdb->done) {
						if($libdb->rowsAffected == 1) {
							_x('done');
						} elseif($libdb->rowsAffected == 0) {
							_x('Nothing to update');
						}
					} else {
						_x('An error ocuured!');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
				}
			break;

			#Adds new Book
			case 'newBook':
				if(in_array('booka', $no_access) || $_SESSION['section'] == 'superDUPER') {
					if(preg_match('/[^a-zA-Z0-9 ]/i', $_POST['bTitle'])) {
						exit('Title can only be alphabet');
					}

					if(preg_match('/[^0-9]/i', $_POST['bISBN'])) {
						exit('ISBN can only be Numbers');
					}
					if (preg_match('/[^a-z.\s\b]/i', $_POST['bAuthor'])) {
						exit('Author contains invalid characters');
					}
					if (preg_match('/[^a-zA-Z0-9]/i', $_POST['bAcc_no'])) {
						exit('Access number contains invalid characters');
					}

					$chkAcc = $libdb->_get(clean(trim($_POST['bAcc_no'])), 'book');
					if($libdb->rowsReturned == 1)
						_x("The Access number already exist in the Database.");
					/* Other strict checks can still be performed in the next version */
					$sql = "INSERT INTO ".PREFIX."books VALUES(NULL, \"".clean(trim($_POST['bAcc_no']))."\", 
							\"".clean(trim($_POST['bISBN']))."\", \"".clean(trim($_POST['bTitle']))."\" , 
							\"".clean($_POST['bAuthor'])."\", \"".clean(trim($_POST['bPublisher']))."\", 
							\"".clean(trim($_POST['bCall_no']))."\", \"".clean(trim($_POST['bThumb']))."\", 
							NOW())";
					$libdb->query($sql,'insert');
					if($libdb->done) {
						_x('done');
					} else {
						_x('An error ocuured!');
					}
				} else {
					_x('You do not have the proper priviledge to perform this action! Please contact your administrator.');
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