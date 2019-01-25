<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
   <meta charset="utf-8">
   <title>Regex</title>
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
   <link rel="stylesheet" href="css/styles.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
   <form id="index-form" method="post">
      <!-- grid container for first and last name-->
      <span class="input-section-title">Name</span>
      <hr>
      <div class="container-name">
         <div class="form-group first-name-field">
            <label for="first-name">First name<span class="input-required">*</span></label>
            <input class="form-control name-input" id="first-name" type="text"
            name="first-name" required>
         </div>
         <div class="form-group last-name-field">
            <label for="last-name">Last name<span class="input-required">*</span></label>
            <input class="form-control name-input" id="last-name" type="text"
            name="last-name" required>
         </div>
      </div>

      <!-- grid container for country, city and postal code -->
      <span class="input-section-title">Address</span>
      <hr>
      <div class="container-location">
         <div class="form-group city-select-field">
            <label for="city">City<span class="input-required">*</span></label>
            <select class="form-control cities" name="cities" required>
               <option value="">Select a city...</option>
            </select>
         </div>
         <div class="form-group postal-code-field">
            <label for="postal-code">Postal code<span class="input-required">*</span></label>
            <input class="form-control postal-code-input" type="text" name="postal-code" required>
         </div>
         <div class="form-group address-field">
            <label for="street-name">Street<span class="input-required">*</span></label>
            <input class="form-control street-name-input" type="text" name="street-name" required>
         </div>
      </div>

      <!-- grid container for email and phone number -->
      <span class="input-section-title">Contact information</span>
      <hr>
      <div class="container-information">
         <div class="form-group email-field" style="position:relative;">
            <label for="email">Email<span class="input-required">*</span></label>
            <input  class="form-control" id="email-input" type="email" name="email" pattern="[A-z0-9._-]{1,50}@[a-z]+\.[a-z]{2,}\.?([a-z]{2})?" required>
            <span class="email-error" style="position:absolute;top:60px;"></span>
         </div>
         <div class="form-group phone-field">
            <label for="phone">Phone number</label>
            <input class="form-control phone-input" type="tel" name="phone" pattern="[0-9]+">
         </div>
      </div>

      <!-- grid container for button -->
      <div class="container-submit">
         <span class="error"></span>
         <button type="submit" class="btn btn-primary" id="index-submit" disabled="true">Submit</button>
      </div>
      <span>Fields marked with <span class="input-required">*</span> are required</span>
   </form>
   <div class="upload-succesful"></div>
   <script src="js/regularExpressions.js"></script>
   <script src="js/customFunctions.js"></script>
   <script src="js/script.js"></script>
</body>
</html>
