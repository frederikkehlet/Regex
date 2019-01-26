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
            $('.cities').append("<option value=''>Could not load cities</option>");
            console.error(xhr.status + ": " + textStatus);
         }
      }
   });

   var city;
   $('.cities').change(function() {
      checkPostalCode();
      city = $('.cities option:selected').text();
      $.post('cities/codes_and_cities.json', function(data) {
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
         if (regex_postal_code.test($('.postal-code-input').val())) {
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
         if (regex_email.test($(this).val())) {
            // db lookup
            $.ajax({
               url: './scripts/validate_email.php',
               method: 'post',
               data: { email: $(this).val() },
               success: function(data) {
                  if (data) {
                     SetErrorMessage('.email-error','Email already exists');
                     SetErrorStyles('#email-input');
                  } else {
                     SetValidatedStyles($("#email-input"));
                     RemoveErrorMessage('.email-error');
                     checkIfAllInputsAreValidated();
                  }
               },
               complete: function(xhr, textStatus) {
                  console.log(xhr.status + ": " + textStatus);
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

   $('.address-input').keyup(function() {
      if (InputIsEmpty($(this).val())) {
         SetDefaultStyles($(this));
         checkIfAllInputsAreValidated();
      } else {
         if (regex_street_name.test($(this).val())) {
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
         if (regex_phone_number.test($(this).val())) {
            $(this).css("border","1px solid green")
            .css("color","green");
         } else {
            $(this).css("border","1px solid rgba(0,0,0, .15)")
            .css("color","black");
         }
      }
   });

   function checkIfAllInputsAreValidated() {
      if (AllInputAreValid())
         $('#index-submit').attr("disabled",false);
      else
         $('#index-submit').attr("disabled",true);
   }

   $("#index-submit").click(function(e) {
      e.preventDefault();
      // ajax call to validate input
      $.post({
         url: './scripts/insert.php',
         data: {
            firstName: $('#first-name').val(),
            lastName: $('#last-name').val(),
            city: $('.cities option:selected').text(),
            postalCode: $('.postal-code-input').val(),
            address: $('.address-input').val(),
            email: $('#email-input').val(),
            phone: $('.phone-input').val()
         },
         success: function(data) {
            if (data == '200') {
               console.log("Inserted succesfully");
               // if validation is ok
               $("#index-form").animate({right:"5%"},250).animate({left:"95%"},500, function() {
                  $(this).hide();
                  $(".upload-succesful").html("Upload succesful").fadeIn(1000);
               });
            } else if (data == '607') {
               console.log("Wrong or invalid format");
            } else if (data == '0') {
               console.log("Empty variables");
            }  else if (data == '-1') {
               console.log("Unset variables");
            } else {
               console.log("Error");
            }
            // continue when insert.php is done
         },
         complete: function(xhr,textStatus) {
            console.log(xhr.status + ": " + textStatus);
         }
      });
   });
});
