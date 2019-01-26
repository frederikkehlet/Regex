<?php
include '../config/config.php';
if (isset($_POST['email'])) {
   $email = filter_var($_POST['email'],FILTER_VALIDATE_EMAIL);

   $sql = "SELECT * FROM users WHERE email='$email';";
   $result = $mysqli->query($sql);

   echo $result->num_rows != 0;
} else {
   header("location: ../index.php");
}
