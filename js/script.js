$(document).ready(function() {
   $.get({
      url: './cities/cities.json',
      dataType: 'json',
      success: function(data) {
         $.each(data, function(index, value) {
            $('.cities').append("<option value='"+ data[index]['name'] +"'>"
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
      if (InputIsEmpty($('.postal-code-input').val())) {
         SetDefaultStyles('.postal-code-input');
         checkIfAllInputsAreValidated();
      } else {
         if (regex_postal_code.test($('.postal-code-input').val()) === true) {
            SetValidatedStyles('.postal-code-input');
            checkIfAllInputsAreValidated();
         } else {
            SetDefaultStyles('.postal-code-input');
            checkIfAllInputsAreValidated();
         }
      }
   };

   $('.postal-code-input').keyup(function() {
      checkPostalCode();
   });

   $("#email-input").keyup(function() {
      if (InputIsEmpty($(this).val())) {
         SetDefaultStyles($(this));
         RemoveErrorMessage('.email-error');
         checkIfAllInputsAreValidated();
      } else {
         if (regex_email.test($(this).val()) === true) {
            // db lookup
            $.ajax({
               url: './database.php',
               method: 'post',
               data: { email: $(this).val() },
               success: function(data) {
                  if (data) {
                     console.log(data);
                     SetErrorMessage('.email-error','Email already exists');
                     SetErrorStyles('#email-input');
                  } else {
                     SetValidatedStyles($("#email-input"));
                     RemoveErrorMessage('.email-error');
                     checkIfAllInputsAreValidated();
                  }
               }
            });
         } else {
            SetDefaultStyles($(this));
            RemoveErrorMessage('.email-error');
            checkIfAllInputsAreValidated();
         }
      }
   });

   $("#first-name, #last-name").keyup(function() {
      if (InputIsEmpty($(this).val())) {
         SetDefaultStyles($(this));
         checkIfAllInputsAreValidated();
      } else {
         if (regex_name.test($(this).val()) === true) {
            SetValidatedStyles($(this));
            checkIfAllInputsAreValidated();
         } else {
            SetDefaultStyles($(this));
            checkIfAllInputsAreValidated();
         }
      }
   });

   $('.street-name-input').keyup(function() {
      if (InputIsEmpty($(this).val())) {
         SetDefaultStyles($(this));
         checkIfAllInputsAreValidated();
      } else {
         if (regex_street_name.test($(this).val()) === true) {
            SetValidatedStyles($(this));
            checkIfAllInputsAreValidated();
         } else {
            SetDefaultStyles($(this));
            checkIfAllInputsAreValidated();
         }
      }
   });

   $('.phone-input').keyup(function() {
      if (InputIsEmpty($(this).val())) {
         SetDefaultStyles($(this));
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

   function checkIfAllInputsAreValidated() {
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
