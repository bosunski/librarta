<?PHP
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_lib_db();load_auth();load_lib_config();
	$auth = new Auth();
	$db = new libdb();
	$section = (isset($_SESSION['section'])) ? $_SESSION['section'] : null;
	$arr = array();
	$bArr = array();
	$borrowEmpty = false;
	$conf = getLibrAtaOption($db);
	$no_access = filter_priviledge($conf['priviledges']);
	if(in_array('booka', $no_access) || $_SESSION['section'] == 'superDUPER') {
		$record = $_GET['record'];
		//if(strlen($record) < 68 ) {
			//exit();
		//}
		$realRecord = _decrypt($record);

		
		

		if($db->db_connect()) {
			$sql = "SELECT * FROM ".PREFIX."users WHERE uid=".$realRecord;
			$db->query($sql, 'select');
			if($db->done) {
				if($db->rowsReturned == 1) {
					$lib_no = $db->data['lib_no'];
					$separation = ' ';
					//$sql2 = "SELECT * FROM ".PREFIX."borrows WHERE lib_no=\"$lib_no\"";
					$sql2 = "SELECT * FROM ".PREFIX."borrows LEFT JOIN ".PREFIX.
							"books ON ".PREFIX."books.acc_no =".PREFIX."borrows.acc_no
							LEFT JOIN ".PREFIX.
								"admins ON ".PREFIX."admins.admin_id=".PREFIX."borrows.admin_id
							WHERE lib_no=\"$lib_no\"";
					$arr['personal'] = $db->data;

					//Purging previous data
					$db->data = array();

					$db->query($sql2, 'select');
					if($db->done) {
						if($db->rowsReturned > 0) {
							$arr['borrows'] = $db->data;
						} else {
							$borrowEmpty = true;
						}
					} else {
						_e($db->error);
					}

				} else {
					_x("INVALID USER");
				}
			} else {
				_e($db->error);
				_x("AN ERROR HAS OCCURED CONTACT THE ADMINISTRATOR OR DEVELOPER");
			}
		} else {
			
			 	_x("AN ERROR HAS OCCURED CONTACT THE ADMINISTRATOR OR DEVELOPER");
			 
		}
	} else {
		exit("UNAUTHOURISED ACCESS!");
	}
?>
<!Doctype html>
<html>
	<head>
		
	</head>
	<body style="font-family:candara;">
		<H4>Library Transactions for <?=$arr['personal']['fname'].' '.$arr['personal']['lname']; ?></H4>
		<span>Todays Date: <?=date('F d, Y, G:ia', time()); ?></span><br/>
		<span>Name: <?=$arr['personal']['fname'].' '.$arr['personal']['lname']; ?></span><br/>
		<span>User type: <?=strtoupper($arr['personal']['user_type']); ?></span><br/>
		<span>Card Number: <?=$arr['personal']['lib_no']; ?></span><br/>
		<span>Facaulty: <?=$arr['personal']['facaulty']; ?></span><br/>
		<span>Department: <?=$arr['personal']['department']; ?></span>
		<H4>Transactions</H4>
		<table border="1" style="border-collapse:collapse;">
			<thead>
				<tr><td>Material</td><td>Access Number</td><td>Date borrowed</td><td>Days Remaining</td><td>Status</td></tr>
			</thead>
			<?PHP
			if(!isset($arr['borrows'][1])) {
					$timeRem = round((strtotime($arr['borrows']['due_date'])-time()) / 60 / 60 / 24);
					$remDay = ($timeRem <= 0) ? '+'. -1*$timeRem. ' due.' : $timeRem .' days';
					$accno = $arr['borrows']['acc_no'];
					$title = $arr['borrows']['title'];
					$timeBr = $arr['borrows']['date'];
					$dateBr = date("F d, Y", strtotime($timeBr));
					$status = ($timeRem <= 0) ? 'Due' : $arr['borrows']['status'];
			?>
				<tr><td><?=$title; ?></td><td><?=$accno; ?></td><td><?=$dateBr; ?></td><td><?=$remDay; ?></td><td><?=$status; ?></td></tr>
			<?PHP
			} else {
				foreach ($arr['borrows'] as $key => $value) {
					# code...
					$timeRem = round((strtotime($value['due_date'])-time()) / 60 / 60 / 24);
					$remDay = ($timeRem <= 0) ? '+'. -1*$timeRem. ' due.' : $timeRem .' days';
					$accno = $value['acc_no'];
					$title = $value['title'];
					$timeBr = $value['date'];
					$dateBr = date("F d, Y", strtotime($timeBr));
					$status = ($timeRem <= 0) ? 'Due' : $value['status'];
			?>
			<tr><td><?=$title; ?></td><td><?=$accno; ?></td><td><?=$dateBr; ?></td><td><?=$remDay; ?></td><td><?=$status; ?></td></tr>
			<?PHP } }?>
		</table>
		<span>Total Borrow: <?=$arr['personal']['nBorrow']; ?></span><br/>
		<span>Total Renewal: <?=$arr['personal']['nRenewal']; ?></span>
	</body>
</html>