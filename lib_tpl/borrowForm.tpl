 <!-- Borrow Form -->
 <div id="borrowForm">
   <form id="bForm" action="#" method="post">
      <div class="form-group">
        <input class="form-control lb_number" name="lib_no" placeholder="Library Number" type="text" required>
        <div id="lb_number_status"></div>
      </div>
      <div class="form-group">
        <input class="form-control acc_no" name="acc_no" placeholder="Book Access code" type="text" required>
        <div id="acc_number_status"></div>
      </div>
      <div class="box-footer clearfix">
        <button onclick="cancel('#borrowForm', '#ajaxrow1', 1)" class="pull-left btn btn-danger btn-flat" id=""><i class="fa fa-arrow-circle-left"></i> Cancel </button>
        <button onclick="borrow()" class="pull-right btn btn-default btn-flat borrow_Nbook" id="">Borrow <i class="fa fa-arrow-circle-right"></i></button>
      </div>
  </form>

  
</div>


<!-- Profile Form -->
<div id="profileForm">
  <center><img src="img/default.png" hieght="100px" width="100px"/></center>
   <form id="pForm" action="#" method="post">
      <div class="form-group">
        <input class="form-control p_fname" name="fname" placeholder="Firstname" type="text" required>
        <div id="fname_status"></div>
      </div>

      
      <div class="form-group">
        <input class="form-control p_lname" name="lname" placeholder="Lastname" type="text" required>
        <div id="lname_status"></div>
      </div>
      <div class="form-group">
        <input class="form-control p_uname" name="uname" placeholder="Username" type="text" required>
        <div id="uname_status"></div>
      </div>
      <div class="form-group">
        <input class="form-control p_password" name="password" placeholder="Password" type="password" >
        <div id="password_status"></div>
      </div>
      <div class="box-footer clearfix">
        <button onclick="cancel('#profileForm', '#ajaxrow1')" class="pull-left btn btn-danger btn-flat" id=""><i class="fa fa-arrow-circle-left"></i> Cancel </button>
        <button onclick="saveProfile()" class="pull-right btn btn-default btn-flat borrow_Nbook" id="">Save <i class="fa fa-arrow-circle-right"></i></button>
      </div>
  </form>
</div>


<!-- Settings Form -->
<div id="settingsForm">
  <center><img src="img/settings.png" hieght="100px" width="100px"/></center>
   <form id="sForm" action="#" method="post">
      <div class="form-group">
        <span id="libname_status">Library Name:</span>
        <input class="form-control p_libname" name="libname" placeholder="Library Name" type="text" required>
      </div>
      <div class="form-group">
        <span id="school_status">School/Institution/Organisation Name:</span>
        <input class="form-control p_school" name="school" placeholder="School Name" type="text" required>
      </div>
      <span id="skin_status">Skin: </span>
      <select name="lib_skin" class="form-group s_skin">
        <option value="">CHOOSE SKIN</option>
        <option value="skin-blue">BLUE</option>
        <option value="skin-black">BLACK</option>
        <option value="skin-yellow">YELLOW</option>
        <option value="skin-green">GREEN</option>
      </select>
      
      <br/><span id="layout_status">Layout: </span>
      <select name="lib_layout" class="form-group s_layout">
        <option value="">CHOOSE LAYOUT</option>
        <option value="fixed">FIXED</option>
        <option value="layout-boxed">BOX LAYOUT</option>
        <option value="layout-top-nav">TOP NAV</option>
      </select>
      <div class="form-group"> 
        <span id="libb_status">Library Status(<span id="lbStat" style="color:green;">On</span>):</span>
        <input class="p_status" name="lib_status" type="checkbox" value="on" required><span id="lib_ajax_status"></span>
      </div>
      <div class="form-group"> 
        <span id="due_status">Borrow Due Period:</span>
        <input class="p_due" maxlength="2" size="4" name="due_period" placeholder="Due Period" type="digit" required> Days.
      </div>
      <div class="form-group"> 
        <span id="blimit">Borrow Limit:</span>
        <input class="p_limit" maxlength="2" size="4" name="blimit" placeholder="Due Period" type="digit" required> Books.
      </div>
      
  </form>
  <div class="box-footer clearfix">
        <div class="btn-group">
            <button type="button" onclick="cancel('#lib_settingsPlace', '#ajaxrow1', 1)" class="pull-left btn btn-danger btn-sm btn-flat"><i class="fa fa-arrow-circle-left"></i> Cancel </button>
            <button onclick="resetSettings()" type="button" class="btn btn-sm btn-primary">Reset Default</button>
            <button onclick="saveSettings()" type="button" class="pull-right btn btn-default btn-flat btn-sm borrow_Nbook">Save <i class="fa fa-arrow-circle-right"></i></button>
        </div>
      </div>
</div>

<!-- Settings Form -->
<div id="picsForm">
   <form id="lPicForm" enctype="multipart/form-data" action="#" method="post">
      <div class="form-group">
        <span id="lpic_status">Library Logo(200px by 200px Recommended):</span>
        <input class="lpic" name="lpic" type="file" required>
         <button id="uplLogo" class="btn btn-flat btn-sm btn-primary pull-right">Upload &raquo;</button>
      </div> <br/>
  </form>
 
  <H3>Manage Slide Images</H3>
  <span> Click [x] to delete any image.</span>
  <ul class="pic-list products-list product-list-in-box">
  </ul>
  <button id="tuplSl" class="btn btn-flat btn-sm btn-default">Upload new Slide</button>
      

    <div class="box-footer clearfix">
          <div class="btn-group">
              <button type="button" onclick="cancel('#lib_settingsPlace', '#ajaxrow1', 1)" class="pull-left btn btn-danger btn-sm btn-flat"><i class="fa fa-arrow-circle-left"></i> Cancel </button>
          </div>
    </div>
</div>

<!-- Restore Form -->
<div id="restoreForm">
   <form id="lPicForm" enctype="multipart/form-data" action="#" method="post">
      <div class="form-group">
        <span id="lpic_status">Library Data (.sql file):</span><br/>
        <span id="dstatus"></span>
        <input class="bck" name="bck" type="file" required>
         <button id="uplLogo" class="btn btn-flat btn-sm btn-primary pull-right">Upload &raquo;</button>
      </div> <br/>
  </form>
</div>


<!-- Transaction Form -->
<div id="chkTForm">
   <form action="#" method="post">
      <div class="form-group">
        <input class="form-control chkt_acc_no" name="acc_no" placeholder="Book Access Number" type="email">
      </div>
  </form>

  <div class="box-footer clearfix">
    <button onclick="cancel('#chkTForm', '#ajaxrow1')" class="pull-left btn btn-danger btn-flat" id=""><i class="fa fa-arrow-circle-left"></i> Cancel </button>
    <button onclick="checkT()" class="pull-right btn btn-default btn-flat" id="">Check <i class="fa fa-arrow-circle-right"></i></button>
  </div>
</div>


<!-- New Book form -->
<div id="newBook">
    <form id="nBookForm" action="" method="post">
      <select name="bThumb" class="form-group">
        <option value="">CHOOSE TYPE</option>
        <option value="catalogue">BOOK</option>
        <option value="circulation">REFERENCE</option>
        <option value="general">MAGAZINE</option>
      </select>
      <div class="form-group">
        <input class="form-control" name="bAcc_no" placeholder="Book Access Number" type="text">
      </div>
      <div class="form-group">
        <input class="form-control" name="bCall_no" placeholder="LOC Number" type="text">
      </div>
      <div class="form-group">
        <input class="form-control" name="bTitle" placeholder="Title of Material" type="text">
      </div>
      <div class="form-group">
        <input class="form-control" name="bAuthor" placeholder="Author" type="text">
      </div>

      <div class="form-group">
        <input class="form-control" name="bPublisher" placeholder="Publisher" type="text">
      </div>

      <div class="form-group">
        <input class="form-control" name="bISBN" placeholder="ISBN or any" type="text">
      </div>
      
    </form> 
    <div id="schmidt" class="box-footer clearfix">
        <button onclick="cancel('#profile_form', '#ajaxrow1', 1)" class="pull-left btn btn-danger btn-flat" id=""><i class="fa fa-arrow-circle-left"></i> Cancel </button>
        <input type="submit"  onclick="addBook()" value="Submit &raquo;" class="pull-right btn btn-primary btn-flat" id="sendAddBook"></input>
    </div>
  </div>