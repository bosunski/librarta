<?php
//error_reporting(E_ALL^E_NOTICE);
	ob_start();
	session_start();
	define('ABSPATH', dirname(dirname( __FILE__ )).'/');
	require( ABSPATH . '/lib_includes/lib_functions.php' );
	load_auth();load_lib_config();load_lib_db();
$dbUser = 'root';               // db User 
$dbPass = '';               // db User Password 
$dbName = 'test';            // db name 
$dest   = ABSPATH.'/'; // Path to directory                

 class mysql_dump
{
    private $cmd;

    function mysql_dump($user, $pass, $name, $path)
    {
        $this->cmd = "mysqldump -q -X -u root -pgabriel10 test el_options we____admins > E:/dump.txt";
    }
    function backup()
    {
        passthru($this->cmd, $retval);

        if(!empty($retval))
        {
            print_r($retval);
        }
    }
}
// initilize mysqldump
$dump = new mysql_dump('root', '', 'test', ABSPATH.'/');
// backup database
$dump->backup();
 ?> 