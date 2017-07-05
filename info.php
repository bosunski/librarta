<?PHP
	$leagues = array();
	$games = array();
	$b = $_SERVER['DOCUMENT_ROOT'];
	$a = explode($b, str_replace('\\', '/', dirname( __FILE__ )));
	$installDir = "location: http://".$_SERVER['HTTP_HOST'].$a[1]."/";
	//echo $b;

	//phpinfo();
	// I'm working on finding a way to know where LIBRata wa installed
		
?>