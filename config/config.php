<?php
define("DB_NAME","mydatabase");
define("DB_HOST","localhost");
define("DB_USERNAME","root");
define("DB_PASSWORD","");

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);

if ($mysqli->connect_errno) {
   $error = "Error ". $mysqli->connect_errno;
   header("location: error.php?error=$error");
}
