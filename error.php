<link rel="stylesheet" href="css/styles.css">
<?php
if (isset($_GET['error'])) {
   $error = $_GET['error'];
   echo '<span style="font-size:20px;">'.$error.'</span>';
}
