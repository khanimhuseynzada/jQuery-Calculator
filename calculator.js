
$(document).ready(function () {
  mode="light";
  $(".sign").prop("disabled",true);
  
  var history =[];
  var newStr = history.join('').trim()
  var result = 0;
  var prevEntry = 0;
  var operation = null;
  var currentEntry = '0';

  updateScreen(result);

  $("button").on("click", function () {

    var buttonPressed = $(this).html();

    if (!isNaN(buttonPressed)) {
   
      if (currentEntry == '0') {
        currentEntry = buttonPressed;
      }
      else {
        currentEntry = currentEntry + buttonPressed;
      }
      $(".sign").prop("disabled",false);
    }

    else if (isOperation(buttonPressed)) {
    
    
   

      if(history.length!=0){
        currentEntry = calculate(prevEntry, currentEntry, operation);
      }

      operation = buttonPressed;
      prevEntry = parseFloat(currentEntry);
      currentEntry = "";  
      history.push(prevEntry,operation);
      $(".sign").prop("disabled",true);
      $("#calc-history").text(history.join(''));

    }

    else if (buttonPressed == "AC") {
      $("#calc-result").text("");
      $("#calc-history").text("");
      while(history.length) {history.pop();}
      result = 0;
      currentEntry = "";
      prevEntry = 0;
      
    }

    else if (buttonPressed == "+/-") {
      currentEntry*=-1;
    }

    else if (buttonPressed == ".") {
      currentEntry += '.';
    }

    else if (buttonPressed == "%") {
      currentEntry = currentEntry / 100;
    }

    else if (buttonPressed == "=") {
      history.push(currentEntry,buttonPressed);
      $("#calc-history").text(history.join(''));
      
      while(history.length) {history.pop();}
   
     currentEntry = calculate(prevEntry, currentEntry, operation);
    }   
      
    updateScreen(currentEntry);
  });


$(".slider").click(function(){

if(mode=="light"){
$("#calc-container").css("background-color","#555A60");
$(".buttons").css("color","white");
$(".sign").css("background-color","#6D6A65");
$(".sign").css("color","#f4ab41");
$("#ac").css("color","#f4ab41");
$("#equal-sign").css("background-color","#6D6A65");
$("#equal-sign").css("color","#f4ab41");

mode="dark";
}
else{
$("#calc-container").css("background-color","white");
$(".buttons").css("color","#555A60");
$(".sign").css("color","#f4ab41");
$(".sign").css("background-color","#e3e9ec");
$("#ac").css("color","#f4ab41");
$("#equal-sign").css("background-color","#e3e9ec");
$("#equal-sign").css("color","#f4ab41");

mode="light";
}


});



});


isOperation = function (op) {


  if (op == "+" || op == "-" || op == "÷" || op == "×")
    return true;
  else return false;
}


calculate = function (num1, num2, operator) {
  // history.push(num1);
  // history.push(num2);
  // history.push(operator);
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {

    case '+':
      
      return result = num1 + num2;
      break;

    case '×':
      return result = num1 * num2;
      break;

    case '-':
      return result = num1 - num2;
      break;

    case '÷':
      return result = num1 / num2;
      break;

  }

}


updateScreen = function (displayValue) {
  var displayValue = displayValue.toString();
  $('#calc-result').html(displayValue.substring(0, 10));

  
}

