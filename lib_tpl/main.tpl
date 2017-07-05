<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>[@title]</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- DataTables -->
    <link rel="stylesheet" href="plugins/datatables/dataTables.bootstrap.css">
    <link href="dist/css/AdminLTE.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
    <link rel="icon" href="../lib_content/logo/[@icon]" type="image/png"/>
  </head>
  <body class="[@layout] [@skin] sidebar-mini">
    [@lock]
    [@modal]
    <div class="wrapper">
     <!--- Nav   ---->
      [@nav]
      <!-- Left side column. contains the logo and sidebar -->
      [@sidebar]

      <!-- Content Wrapper. Contains page content -->
      [@page_content]
      <!-- Main Footer -->
      [@footer]

    </div>
    <div id="trash" style="display:none"></div><!-- ./wrapper -->

    <!-- REQUIRED JS SCRIPTS -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="plugins/lib/lib.dev.js"></script>
    <script src="bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
    <script src="dist/js/app.min.js" type="text/javascript"></script>
    <script src="plugins/slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
  </body>
</html>
