 <aside class="main-sidebar">

        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">

          <!-- Sidebar user panel (optional) -->
          <div class="user-panel">
            <div class="pull-left image">
              <img src="[@adminPic160]" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
              <p class="adminName">[@AdminName]</p>
              <!-- Status -->
              <a href="#"><i class="fa fa-circle text-success"></i>[@status]</a>
            </div>
          </div>

          <!-- search form (Optional) -->
          <form id="userSearchForm" action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="userSearch" class="form-control userSearch" placeholder="Search User" />
              <div><span style="color:white;" class="userSearchPatch"></span></div>
              <span class="input-group-btn">
                <button type="submit" name="search" id="getUser" class="btn btn-flat"><img height="25" width="25" src="../lib_content/search_small.png" c></img></button>
              </span>
            </div><div><span style="color:white;" class="userSearchStatus"></span></div>
            
          </form>
          <!-- /.search form -->

          <!-- Sidebar Menu -->
          <ul class="sidebar-menu">
            <li class="header">ACTIONS MENU</li>
            <!-- Optionally, you can add icons to the links -->
            <li id="libSettings"class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Library Prefrences</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a id="lib_settings" href="#"><i class="fa fa-link"></i> <span>Library Settings</span></a></li>
                <li><a class="pHistory" href="#">Purge History</a></li>
                <li><a class="lib_pics" href="#">Manage Slides/Logo</a></li>
              </ul>
            </li>
            <li class="lib_settings"></li>
            <li class="addNewUser"><a id="addNewUser" href="#"><i class="fa fa-link"></i> <span>Add new Admin</span></a></li>
            <li id="booka"class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Books</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a id="newBook" href="#">Add a Book</a></li>
                <li><a id="viewbooks" class="viewbooks" href="#">View all Books</a></li>
              </ul>
            </li>
            <li><a id="profile" href="#"><i class="fa fa-link"></i> <span>Edit my Profile</span></a></li>
            <li id="backs"class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Backup/Restore</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a id="bacgkupdb" href="../lib_includes/backuplib.php/" target="_blank">Backup Database</a></li>
                <li><a class="restore_db" href="#">Restore Database</a></li>
              </ul>
            </li>

            <li id="borrowsR"class="treeview">
              <a href="#"><i class="fa fa-link"></i> <span>Borrow/Return</span> <i class="fa fa-angle-left pull-right"></i></a>
              <ul class="treeview-menu">
                <li><a class="borrowB" href="#">Borrow/Return a Book</a></li>
              </ul>
            </li>
             <li class="lib_settings"><a id="librATA" href="#"><i class="fa fa-link"></i> <span>About LibraATA</span></a></li>
          </ul><!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
      </aside>