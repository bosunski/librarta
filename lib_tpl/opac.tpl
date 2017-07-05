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
    <style type="text/css">

    </style>
  </head>
  <body class="sidebar-collapse fixed [@skin]">
    [@lock]
    [@modal]
    <div style="display:none;" class="wrapper">
        [@nav]
      <!-- Content Wrapper. Contains page content -->
      [@page_content]
      <!-- Main Footer -->
      [@footer]

    </div><!-- ./wrapper -->

    <!-- REQUIRED JS SCRIPTS -->

    <!-- jQuery 2.1.4 -->
    <script src="plugins/jQuery/jQuery-2.1.4.min.js" type="text/javascript"></script>
    <!-- CUSTOM JS FILE ---->
    <script type="text/javascript" src="plugins/lib/opac.dev.js"></script>
    <!-- Data Tables -->
    <script src="plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="plugins/datatables/dataTables.bootstrap.min.js"></script>
  </body>
</html>
