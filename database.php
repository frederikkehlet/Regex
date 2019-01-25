<?php
include 'config/config.php';
$email = filter_var($_POST['email'],FILTER_VALIDATE_EMAIL);

$sql = "SELECT * FROM users WHERE email='$email';";
$result = $mysqli->query($sql);

echo $result->num_rows != 0;
