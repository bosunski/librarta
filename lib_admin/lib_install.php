<?PHP
	setup_header();
		_e('<h3 style="color:green;">Welcome to LibrAta!</h3>');
?>
<p><?=_e('A Library software that gets the job done.'); ?></p>
<p><?=_e('Enter your Library details below. And as well as your Administrator details.<br/><br/>You can always change these settings later.'); ?></p>
			<form role="form" action="<?=_e('setup_lib.php?step=4'); ?>" method="post">
				<div class="form-group">
					<label for="database">Name of Library</label>
					<input placeholder="<?=_e('Library name'); ?>" type="text" class="form-control" id="database" name="lib_name" required>
				</div>
				
				<div class="form-group">
					<label for="database">Name of Institution/Organisation</label>
					<input placeholder="<?=_e('Institution/Organisation name'); ?>" type="text" class="form-control" id="database" name="school" required>
				</div>
				
				<div class="form-group">
					<label for="username">Admin username</label>
					<input placeholder="<?=_e('Administrator username'); ?>" type="text" class="form-control" id="username" name="username" required>
				</div>
				
				<div class="form-group">
					<label for="password">Admin password</label>
					<input placeholder="<?=_e('Administrator password'); ?>" type="text" class="form-control" id="password" name="password" required>
				</div>
				
				<div class="form-group">
					<label for="email">Admin E-mail</label>
					<input placeholder="<?=_e('Administrator E-mail'); ?>" type="text" class="form-control" id="email" name="email" required>
				</div>
				
				<div class="form-group">
					<label for="prefix">Firstname</label>
					<input placeholder="<?=_e('Firstname'); ?>" type="text" class="form-control" id="prefix" name="firstname" required>
				</div>
				
				<div class="form-group">
					<label for="prefix">Lastname</label>
					<input placeholder="<?=_e('Lastname'); ?>" type="text" class="form-control" id="prefix" name="lastname" required>
				</div>
				<button class="btn btn-default" type="submit" name="sub"><?=_e('Install LibrAta &raquo;');?></button>
			<form>
<?PHP
			setup_footer();
?>