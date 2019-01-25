// regular expression used for emails
var regex_email = /^[A-z0-9._-]{1,50}@[a-z0-9]+\.[a-z]{2,}(\.[a-z]{2})?$/;

// regular expression for first and last names
var regex_name = /^[A-ZÆØÅ\']{1}([a-zæøå -\']+)?$/;

// regular expression for country codes
var regex_country_code = /^[A-Z]{2}$/;

// regular expression for postal codes
var regex_postal_code = /^[0-9]{4}$/;

// regular expression for street names
var regex_street_name = /[A-z\.\' -ÆØÅæøå]{1,}[0-9]{1,}/;

// regular expression for numbers
var regex_phone_number = /^[0-9]{8}$/;
