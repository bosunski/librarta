  <div id="lkscr" style="display:none;" class="lockscreen-wrapper overlay">
      <div class="lockscreen-logo">
        <img style="max-height:200px; max-width:200px;" src="[@logo]"/><br/>
        <em class="lib_Name">[@lib_name]</em>
      </div>
      
      <!-- User name -->
      <div class="lockscreen-name adminName">[@AdminName]</div>

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
            <div class="input-group-btn">
              <button id="unlockB" class="btn btn-primary">
                <i class="fa fa-arrow-right text-muted"></i>
              </button>
            </div>
        </form><!-- /.lockscreen credentials -->

      </div><!-- /.lockscreen-item -->
    </div>
    <center>
      <div id="info"></div>
    </center>
      <div class="help-block text-center">
        Enter your password to retrieve your session.
      </div>
      <div class="text-center">
        <a class="btn btn-primary" href="../login.php">Or sign in as a different user</a>
      </div>
    
    </div>