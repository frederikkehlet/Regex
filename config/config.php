<?php
define("DB_NAME","mydatabase");
define("DB_HOST","localhost");
define("DB_USERNAME","root");
define("DB_PASSWORD","");

$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($mysqli->connect_errno) {
   die("Failed to connect to the database: " . $mysqli->connect_errno . ": " . $mysqli->connect_error);
}
