<div style="display:none;" id="newAdmin">
  <form id="adminForm" action="#" method="post">
    <div class="form-group">
      <input class="form-control" name="email" placeholder="Email" type="email">
    </div>
    <div class="form-group">
      <input id="adminPassGen" class="form-control" name="password" placeholder="Password" type="text">
    </div>

    <div class="form-group">
      <input class="form-control" name="username" placeholder="Username" type="text">
    </div>

    <div class="form-group">
      <input class="form-control" name="fname" placeholder="Firstname" type="text">
    </div>

    <div class="form-group">
      <input class="form-control" name="lname" placeholder="Lastname" type="text">
    </div>

    <select class="form-group">
      <option value="">CHOOSE SECTION</option>
      <option value="catalogue">CATALOGUE</option>
      <option value="circulation">CIRCULATION</option>
      <option value="general">GENERAL</option>
    </select>
  </form>
  <div id="schmidt" style="display:none;" class="box-footer clearfix">
      <button onClick="addAdmin" class="pull-right btn btn-primary btn-block btn-flat" id="sendAddition">Submit &raquo; <i class="fa fa-arrow-circle-right"></i></button>
        <script type="text/javascript">
          //$("#sendAddition").click(function() {alert("Here");});
       </script>
   </div>
</div>

