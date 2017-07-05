<div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1 id="Home2">
            Administrative Dashbaord
            <small class="lib_Name">[@libName]</small>
          </h1>
          <ol class="breadcrumb">
            <li><a id="Home" href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li></li>
          </ol>
        </section>

        <!-- Main content -->
        <section class="content" id="maincontent">
          <!-- Your Page Content Here -->


          <!--- Libraary satistics -->
        <div class="row" id="libDetails">
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-aqua"><i class="ion ion-ios-gear-outline"></i></span>
                  <div class="info-box-content">
                  <span class="glyphicon"></span>
                    <span class="info-box-text">Books</span>
                    <span class="books-number info-box-number"></span>
                  </div><!-- /.info-box-content -->
                </div><!-- /.info-box -->
              </div><!-- /.col -->
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-red"><i class="fa fa-google-plus"></i></span>
                  <div class="info-box-content">
                  <span class="glyphicon"></span>
                    <span class="info-box-text">users</span>
                    <span class="users-number info-box-number"></span>
                  </div><!-- /.info-box-content -->
                </div><!-- /.info-box -->
              </div><!-- /.col -->

              <!-- fix for small devices only -->
              <div class="clearfix visible-sm-block"></div>

              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-green"><i class="ion ion-ios-cart-outline"></i></span>
                  <div class="info-box-content">
                  <span class="glyphicon"></span>
                    <span class="info-box-text">Books Borrowed</span>
                    <span class="borrows-number info-box-number"></span>
                  </div><!-- /.info-box-content -->
                </div><!-- /.info-box -->
              </div><!-- /.col -->
              <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                  <span class="info-box-icon bg-yellow"><i class="ion ion-ios-people-outline"></i></span>
                  <div class="info-box-content">
                  <span class="glyphicon"></span>
                    <span class="info-box-text">Books not Returned</span>
                    <span class="due-number info-box-number"></span>
                  </div><!-- /.info-box-content -->
                </div><!-- /.info-box -->
              </div><!-- /.col -->
              <!-- Library statiscs end -->
          </div>


          <!-- OTHERS  -->
          <div class="row" id="AJAX">
              <div class="col-md-4">

                <div class="box box-default">
                  <div class="box-header with-border">
                    <h3 class="box-title ajax">LibrAta Tips</h3>
                    <div class="box-tools pull-right">
                      <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div>
                  </div><!-- /.box-header -->
                  <div  id="loadPlaceAjax" class="box-body">
                    <div id="loaderGIF"></div>
                    <div id="profile_form"></div>
                    <div id="eachAdmin"></div>
                    <div style="display:none;" id="ajaxButtonsCopy">
                      <div class="button-group">
                        <button onclick='uDelete()' class="btn btn-danger btn-flat btn-sm">Delete</button>
                        <button onclick='pReset()' id="pReset" class="btn btn-primary btn-flat btn-sm">Reset Password</button>
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary btn-flat btn-sm dropdown-toggle" data-toggle="dropdown">Section <span class="caret"></span></button>
                            <ul class="dropdown-menu" role="menu">
                              <li><a onclick="changeSection('superDUPER')" href="#">General</a></li>
                              <li><a onclick="changeSection('catalogue')" href="#">Catalogue</a></li>
                              <li><a onclick="changeSection('circulation')" href="#">Circulation</a></li>
                            </ul>
                        </div>
                      </div>
                    </div>
                    <div id="ajaxrow1" class="row">
                      <div class="lib-tips col-md-12">
                      </div><!-- /.col -->
                    </div><!-- /.row -->

                    <!-- Admin form -->
                    <div style="display:none;" id="newAdmin">
                      <center><img src="img/addUser.png" height="100px" width="100px"/></center>
                      <form id="adminForm" action="" method="post">
                        <div class="form-group">
                          <input class="form-control" name="email" placeholder="Email" type="email">
                        </div>
                        <div class="form-group">
                          <label>Password will be generated automatically and can be changed later.</label>
                        </div>

                        <div class="form-group">
                          <input class="form-control" name="username" placeholder="Username" type="text">
                        </div>

                        <div class="form-group">
                          <input class="form-control" name="firstname" placeholder="Firstname" type="text">
                        </div>

                        <div class="form-group">
                          <input class="form-control" name="lastname" placeholder="Lastname" type="text">
                        </div>

                        <select name="section" class="form-group">
                          <option value="">CHOOSE SECTION</option>
                          <option value="catalogue">CATALOGUE</option>
                          <option value="circulation">CIRCULATION</option>
                          <option value="superDUPER">GENERAL</option>
                        </select>

                        <div id="schmidt" class="box-footer clearfix">

                      </div>
                      </form>
                      <button onclick="cancel('#newAdmin', '#ajaxrow1', 1)" class="pull-left btn btn-danger btn-flat" id=""><i class="fa fa-arrow-circle-left"></i> Cancel </button>
                          <input type="submit"  value="Submit &raquo;" class="pull-right btn btn-primary btn-flat" id="sendAddition"></input>
                    </div>
                    <div id="nBookPlace"></div>
                     <div id="lib_settingsPlace"></div>
                  </div><!-- /.box-body -->
                <!-- /.footer -->
                </div><!-- /.box -->


                <!-- PRODUCT LIST -->
                <div class="box box-primary">
                  <div class="box-header with-border">
                    <h3 class="box-title" >Recently Added Books</h3>
                    <div class="box-tools pull-right">
                      <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                    </div>
                  </div><!-- /.box-header -->
                  <div class="box-body">
                    <div id="lib_books">
                      <ul class="books-list products-list product-list-in-box">
                        <!-- /.item -->
                      </ul>
                    </div>
                  </div><!-- /.box-body -->
                  <div class="box-footer text-center">
                    <a onclick="viewbooks()" href="javascript::;" class="uppercase">View All Books</a>
                  </div><!-- /.box-footer -->
                </div><!-- /.box -->

                    <!-- USERS LIST -->
                    <div class="box box-danger">
                      <div class="box-header with-border">
                        <h3 class="box-title">Administrators</h3>
                        <div class="box-tools pull-right">
                          <span id="numAdmin" class="label label-danger"></span>
                          <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        </div>
                      </div><!-- /.box-header -->
                      <div id="lib_admin" class="box-body no-padding">
                        <ul class="users-list clearfix">
                          <!-- ADMINISTRATOR LIST -->
                        </ul><!-- /.users-list -->
                      </div><!-- /.box-body -->
                    </div><!--/.box -->

              </div>


          <div class="col-md-8">
              <!-- MAP & BOX PANE -->
            <div class="box box-success">
                <div class="box-header with-border">
                  <h3 class="box-title ajax2" id="imageSlide">Image Slide</h3>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  </div>
                </div><!-- /.box-header -->
                <div class="box-body" id="loadPlaceAjax2">
                  <div id="libCarousel" class="carousel slide" data-ride="carousel">
                            <!-- Indicators -->
                            <ol class="carousel-indicators">
                              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                              <li data-target="#myCarousel" data-slide-to="1"></li>
                              <li data-target="#myCarousel" data-slide-to="2"></li>
                              <li data-target="#myCarousel" data-slide-to="3"></li>
                            </ol>

                            <!-- Wrapper for slides -->
                            <div class="carousel-inner" role="listbox">
                              [@slides]
                            </div>


                  </div>
                  <div id="eachBook"></div>
                  <div id="loaderGIF2"></div>
                </div><!-- /.box-body -->
              </div><!-- /.box -->

              <!-- TABLE: LATEST ORDERS -->
              <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">Latest Borrow</h3><h5 id="lbnoStatus"></h5>
                  <div class="box-tools pull-right">
                    <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                  </div>
                </div><!-- /.box-header -->
                <div class="box-body">
                  <div class="table-responsive">
                    <table class="table no-margin">
                      <thead>
                        <tr>
                          <th>Access Number</th>
                          <th>Book Title</th>
                          <th>Status</th>
                          <th>User</th>
                        </tr>
                      </thead>
                      <tbody class="borrows-list">
                        <!-- Borrow List -->
                      </tbody>
                    </table>
                  </div><!-- /.table-responsive -->
                </div><!-- /.box-body -->
                <div class="box-footer clearfix">
                  <a href="#Home" onclick="prepBorrow()" class="btn btn-sm btn-info btn-flat pull-left" id="newBorrow">New Borrow</a>
                  <a href="#Home" class="btn btn-sm btn-default btn-flat pull-right" id="viewBorrow">View All Borrows</a>
                </div><!-- /.box-footer -->
              </div><!-- /.box -->
            </div>
          </div>
          <div class="row">



          </div>

        </section><!-- /.content -->
        <section class="content" id="ajaxContent">

        </section>
      </div>
