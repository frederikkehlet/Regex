<?php
include '../config/config.php';
if (isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['city']) &&
isset($_POST['postalCode']) && isset($_POST['address']) && isset($_POST['email']) && isset($_POST['phone'])) {
   if (!empty($_POST['firstName']) && !empty($_POST['lastName']) && !empty($_POST['city']) &&
   !empty($_POST['postalCode']) && !empty($_POST['address']) && !empty($_POST['email'])) {
      // validate email
      if (!filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)) {
         exit('606');
      }

      // validate phone
      if (!empty($_POST['phone']) && !is_numeric($_POST['phone'])) {
         exit('607');
      }

      $sql = "INSERT INTO users (first_name,last_name,email,phone) VALUES(?,?,?,?)";
      $stmt = $mysqli->prepare($sql);
      $stmt->bind_param('ssss', $firstName,$lastName,$email,$phone);

      $firstName  = $_POST['firstName'];
      $lastName   = $_POST['lastName'];
      $city       = $_POST['city'];
      $postalCode = $_POST['postalCode'];
      $address    = $_POST['address'];
      $email      = $_POST['email'];
      $phone      = $_POST['phone'];

      $stmt->execute();
      $stmt->close();
      exit('200');
   }
   exit('0'); // some variables are empty
}
exit('-1'); // some variables are unset
