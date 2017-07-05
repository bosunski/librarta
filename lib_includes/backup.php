<?PHP
	//connect
	$link = mysql_connect($host,$user,$pass);
	mysql_select_db($name,$link);

	//get all the tables
	$query = 'SHOW TABLES FROM '.$name;
	$result = mysql_query($query,$link) or die('cannot show tables');
	if(mysql_num_rows($result))
	{
		//prep output
		$tab = "\t";
		$br = "\n";
		$xml = '<?xml version="1.0" encoding="UTF-8"?>'.$br;
		$xml.= '<database name="'.$name.'">'.$br;
		
		//for every table...
		while($table = mysql_fetch_row($result))
		{
			//prep table out
			$xml.= $tab.'<table name="'.$table[0].'">'.$br;
			
			//get the rows
			$query3 = 'SELECT * FROM '.$table[0];
			$records = mysql_query($query3,$link) or die('cannot select from table: '.$table[0]);
			
			//table attributes
			$attributes = array('name','blob','maxlength','multiple_key','not_null','numeric','primary_key','table','type','default','unique_key','unsigned','zerofill');
			$xml.= $tab.$tab.'<columns>'.$br;
			$x = 0;
			while($x < mysql_num_fields($records))
			{
				$meta = mysql_fetch_field($records,$x);
				$xml.= $tab.$tab.$tab.'<column ';
				foreach($attributes as $attribute)
				{
					$xml.= $attribute.'="'.$meta->$attribute.'" ';
				}
				$xml.= '/>'.$br;
				$x++;
			}
			$xml.= $tab.$tab.'</columns>'.$br;
			
			//stick the records
			$xml.= $tab.$tab.'<records>'.$br;
			while($record = mysql_fetch_assoc($records))
			{
				$xml.= $tab.$tab.$tab.'<record>'.$br;
				foreach($record as $key=>$value)
				{
					$xml.= $tab.$tab.$tab.$tab.'<'.$key.'>'.htmlspecialchars(stripslashes($value)).'</'.$key.'>'.$br;
				}
				$xml.= $tab.$tab.$tab.'</record>'.$br;
			}
			$xml.= $tab.$tab.'</records>'.$br;
			$xml.= $tab.'</table>'.$br;
		}
		$xml.= '</database>';
		
		//save file
		$handle = fopen($name.'-backup-'.time().'.xml','w+');
		fwrite($handle,$xml);
		fclose($handle);
	}
?>