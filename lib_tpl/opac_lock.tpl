  <div id="lkscr" style="display:none;" class="lockscreen-wrapper overlay">

      <div class="lockscreen-logo">
       <img style="max-height:200px; max-width:200px;" src="[@logo]"/><br/>
        <b class="lib_Name">[@lib_name]<br/></b><h5>Online Public Access Catalogue</h5>
      </div>

      <!-- START LOCK SCREEN ITEM -->
      <div class="lockscreen-item">
        <!-- lockscreen image -->
        <div class="lockscreen-image">
          <img src="[@adminPic160]" alt="User Image">
        </div>
        <!-- /.lockscreen-image -->

        <!-- lockscreen credentials (contains the form) -->
        <form id="lockForm" class="lockscreen-credentials">
          <div class="input-group">
            <input id="lpassword" name="pass" class="form-control" placeholder="Password" type="password">
            
        </form><!-- /.lockscreen credentials -->
        <div class="input-group-btn">
            <button id="unlockOP" class="btn btn-primary"><i class="fa fa-arrow-right text-muted"></i></button>
        </div>

      </div><!-- /.lockscreen-item -->
    </div>
    <center>
      <div id="info"></div>
    </center>
      <div class="help-block text-center">
        Enter 'OPAC' to access OPAC.
      </div>
      <div class="text-center">
        <a id="helpOPAC" class="btn btn-primary">Need help? Click Me!</a>
      </div>
    
    </div>