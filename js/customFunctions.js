function InputIsEmpty(value) {
   return value == "";
}

function AllInputAreValid() {
   return (
      $("#first-name").hasClass("validated") &&
      $("#last-name").hasClass("validated") &&
      $(".postal-code-input").hasClass("validated") &&
      $('.address-input').hasClass("validated") &&
      $("#email-input").hasClass("validated")
      && $('.cities option:selected').text() != ""
   );
}

function SetDefaultStyles(selector) {
   $(selector).css("border","1px solid rgba(0,0,0, .15)").css("color","black");
   $(selector).removeClass("validated");
}

function SetValidatedStyles(selector) {
   $(selector).css("border","1px solid green").css("color","green");
   $(selector).addClass("validated");
}

function SetErrorStyles(selector) {
   $(selector).css("color","red").css("border","1px solid red");
}

function RemoveErrorMessage(selector) {
   $(selector).html("");
}

function SetErrorMessage(selector,message) {
   $(selector).html(message);
}
