"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Emmanuel Cortes
   Date: 3.25.19  
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calculator
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/

window.onload = init;

function init() {
      // A collection of input element with the class of calcButtons
      var calcButtons = document.getElementsByClassName("calcButton");

      // Runs the buttonClick() function for every click
      for (var i = 0; i < calcButtons.length; i++) {
            calcButtons[i].onclick = buttonClick;
      }

      document.getElementById("calcWindow").onkeydown = calcKeys;
}

// Will register the button that was clicked on the calculator into the window
function buttonClick(e) {
      // This variable will get the value of the calcWindow element ID
      var calcValue = document.getElementById("calcWindow").value;

      // This variable will get the value of the decimals element ID
      var calcDecimal = document.getElementById("decimals").value;

      var buttonValue = e.target.value;

      // This switch case will change the value of the buttonValue variable based upon the button that was clicked
      switch (buttonValue) {
            case "del":
                  calcValue = "";
                  break;

            case "bksp":
                  calcValue = eraseChar(calcValue);
                  break;

            case "enter":
                  calcValue += "=" + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "prev":
                  calcValue += lastEq(calcValue);
                  break;
            default:
                  calcValue += buttonValue;
                  break;
      }
      // The value of the element ID of calcWindow is set equal to the calcValue
      document.getElementById("calcWindow").value = calcValue;
}
// This command will allow for the cursor focus to be on the text area element
document.getElementById("calcWindow").focus();

// Adds functions to key pressed within the calculator window 
function calcKeys(e) {
      var calcValue = document.getElementById("calcWindow").value;

      var calcDecimal = document.getElementById("decimals").value;

      // This switch case will allow certain keys on the keyboard to set the calcValue variable equal to its appropriate value.
      switch (e.key) {
            case "Delete":
                  calcValue = "";
                  break;
            case "Enter":
                  calcValue += "=" + evalEq(calcValue, calcDecimal) + "\n";
                  break;
            case "ArrowUp":
                  calcValue += lastEq(calcWindow.value);
                  e.preventDefault();
      }
      // The calcWindow element ID is set equal to the calcValue variable
      document.getElementById("calcWindow").value = calcValue;
}



/* ===================================================================== */

function eraseChar(textStr) {
      return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
      var lines = textStr.split(/\r?\n/);
      var lastLine = lines[lines.length - 1];
      var eqValue = eval(lastLine);
      return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
      var lines = textStr.split(/\r?\n/);
      var lastExp = lines[lines.length - 2];
      return lastExp.substr(0, lastExp.indexOf("=")).trim();
}