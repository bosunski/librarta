<?php

$filename='database_backup_'.date('G_a_m_d_y').'.sql';

$result=exec('mysqldump test --password= --user=root --single-transaction >/var/backups/'.$filename,$output);

if($output==''){/* no output is good */}
else {/* we have something to log the output here*/}
?>