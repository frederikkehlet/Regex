$(document).ready(function() {
   // regular expression used for emails
   var regex_email = /^[A-z0-9._-]{1,50}@[a-z]+\.[a-z]{2,}(\.[a-z]{2})?$/;

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

   $.get({
      url: './cities/cities.json',
      dataType: 'json',
      success: function(data) {
         $.each(data, function(index, value) {
            $('.cities').append("<option class='city' value='"+ data[index]['name'] +"'>"
            + data[index]['name'] +"</option>");
         })
      },
      complete: function(xhr, textStatus) {
         if (xhr.status === 200) {
            console.log(xhr.status + ": " + textStatus);
         } else {
            $('.countries').append("<option value=''>Could not load countries</option>");
            console.error(xhr.status + ": " + textStatus);
         }
      }
   });

   var city;
   $('.cities').change(function() {
      checkPostalCode();
      city = $('.cities option:selected').text();
      console.log(city);
      $.get('cities/codes_and_cities.json', function(data) {
         // parse the data
         data = JSON.parse(data);
         $('.postal-code-input').attr("value","");
         $.each(data, function(index,value) {
            if (city === data[index]['name']) {
               $('.postal-code-input').attr("value",data[index]['code']);
               return false;
            }
         });
         checkPostalCode();
      });
   });

   function checkPostalCode() {
      if ($('.postal-code-input').val() == "#") {
         $('.postal-code-input').css("border","1px solid rgba(0,0,0, .15)");
         $('.postal-code-input').removeClass("validated");
         checkAllValidated();
      } else {
         if (regex_postal_code.test($('.postal-code-input').val()) === true) {
            $('.postal-code-input').css("border","1px solid green")
            .css("color","green");
            $('.postal-code-input').addClass("validated");
            checkAllValidated();
         } else {
            $('.postal-code-input').css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
            $('.postal-code-input').removeClass("validated");
            checkAllValidated();
         }
      }
   };

   $('.postal-code-input').keyup(function() {
      checkPostalCode();
   });

   $("#email-input").keyup(function() {
      if ($(this).val() == "") {
         $(this).css("border","1px solid rgba(0,0,0, .15)");
         $('.email-error').html("");
         $(this).removeClass("validated");
         checkAllValidated();
      } else {
         if (regex_email.test($(this).val()) === true) {
            $(this).css("border","1px solid green")
            .css("color","green");
            // db lookup
            $.ajax({
               url: './database.php',
               method: 'post',
               data: {
                  email: $(this).val()
               },
               success: function(data) {
                  console.log(data);
                  if (data === '1') {
                     $('#email-input').css("color","red").css("border","1px solid red");
                     $('.email-error').html("Email already exists");
                  } else {
                     $('.email-error').html(" ");
                     $('#email-input').addClass("validated");
                     checkAllValidated();
                  }
               }
            });
         } else {
            $(this).css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
            $('.email-error').html("");
            $("#email-input").removeClass("validated");
            checkAllValidated();
         }
      }
   });

   $("#first-name, #last-name").keyup(function() {
      if ($(this).val() == "") {
         $(this).css("border","1px solid rgba(0,0,0, .15)");
         $(this).removeClass("validated");
         checkAllValidated();
      } else {
         if (regex_name.test($(this).val()) === true) {
            $(this).css("border","1px solid green")
            .css("color","green");
            $(this).addClass("validated");
            checkAllValidated();
         } else {
            $(this).css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
            $(this).removeClass("validated");
            checkAllValidated();
         }
      }
   });

   $('.street-name-input').keyup(function() {
      if ($(this).val() == "") {
         $(this).css("border","1px solid rgba(0,0,0, .15)");
         $(this).removeClass("validated");
         checkAllValidated();
      } else {
         if (regex_street_name.test($(this).val()) === true) {
            $(this).css("border","1px solid green")
            .css("color","green");
            $(this).addClass("validated");
            checkAllValidated();
         } else {
            $(this).css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
            $(this).removeClass("validated");
            checkAllValidated();
         }
      }
   });

   $('.phone-input').keyup(function() {
      if ($(this).val() == "") {
         $(this).css("border","1px solid rgba(0,0,0, .15)");
         $(this).removeClass("validated");
      } else {
         if (regex_phone_number.test($(this).val()) === true) {
            $(this).css("border","1px solid green")
            .css("color","green");
         } else {
            $(this).css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
         }
      }
   });

   function checkAllValidated() {
      if ($("#first-name").hasClass("validated")
         && $("#last-name").hasClass("validated")
         && city != ""
         && $(".postal-code-input").hasClass("validated")
         && $('.street-name-input').hasClass("validated")
         && $("#email-input").hasClass("validated")) {
               $('#index-submit').attr("disabled",false);
      } else {
         $('#index-submit').attr("disabled",true);
      }
   }

    $("#index-submit").click(function(e) {
      e.preventDefault();
      $("#index-form").animate({right:"5%"},250).animate({left:"95%"},500, function() {
         $(this).hide();
         $(".upload-succesful").html("Upload succesful").fadeIn(1000);
      });
   });
});
