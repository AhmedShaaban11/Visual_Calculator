window.onload = function () {
    
    "use strict";
    
    // The variables
    const form = document.querySelector("form"),
          showBar = document.getElementById("show-bar"),
          resultBar = document.getElementById("result-bar"),
          numberButtons = document.getElementsByClassName("numbers"),
          signButtons = document.getElementsByClassName("signs"),
          equalButton = document.getElementById("equal"),
          clearButton = document.getElementById("clear-show"),
          clearAllButton = document.getElementById("clear-all"),
          storage = [],
          clear = [];
    
    // The functions of Calculations
    const exponentiation = (firstNum, lastNum) => firstNum ** lastNum,
          multiplication = (firstNum, lastNum) => firstNum * lastNum,
          division = (firstNum, lastNum) => firstNum / lastNum,
          subtraction = (firstNum, lastNum) => firstNum - lastNum,
          addition = (firstNum, lastNum) => firstNum + lastNum;
    
    // The function which make some updates on variables values
    function updateValues(operator) {
          storage.push(operator.textContent);
        resultBar.value += showBar.value + operator.textContent;
        showBar.value = "";
        clear.splice(0, clear.length);
    }
    
    // The function which do the calculations
    function calcValue(operator, func) {
        for (let y = 0; y < storage.length; y++) {
            while (storage[y] === operator) {
                storage.splice(y, 1, func(Number(storage[y - 1]), Number(storage[y + 1])));
                storage.splice(y + 1, 1);
                storage.splice(y - 1, 1);    
            }
        }
    }
    
    
    // Code to prevent the default of form
    form.onsubmit = event => event.preventDefault();
        
    // Code to show Numbers
    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].onclick = function () {
            if (storage.length === 0 || typeof(storage[storage.length - 1]) === "string") {
                showBar.value += this.textContent;
                clear.push(this.textContent);
            } else if (storage.length === 1) {
                storage.splice(0, storage.length);
                clear.push(this.textContent);
                resultBar.value = "";
                showBar.value += this.textContent;
            }
        };
    }
    
    
    // Code to show Math operators
    for (let x = 0; x < signButtons.length; x++) {
        signButtons[x].onclick = function () {
            if (showBar.value.length > 0 && showBar.value !== "-") {
                 storage.push(showBar.value);
                updateValues(this);
            } else if (typeof(storage[storage.length - 1]) === "number") {
                updateValues(this);
            } else if (this === signButtons[3]) {
                if (showBar.value.length === 0 && typeof(storage[storage.length - 1]) !== "number") {
                    showBar.value += "-";
                    clear.push("-");
                }
            }
        };
    }
    
    
    // Code to remove the value of showBar
    clearButton.onclick = function () {
        clear.pop();
        showBar.value = clear.join("");
    };
    
    // Code to remove the value of showBar and resultBar
    clearAllButton.onclick = function () {
        showBar.value = "";
        resultBar.value = "";
        storage.splice(0, storage.length);
        clear.splice(0, clear.length);
    };
    
    // Code to show the final result
    equalButton.onclick = function () {
        if (showBar.value.length > 0) {
            storage.push(showBar.value);
            resultBar.value += showBar.value;
            showBar.value = "";
        }
        
        calcValue("^", exponentiation);
        calcValue("×", multiplication);
        calcValue("/", division);
        calcValue("-", subtraction);
        calcValue("+", addition);
        
        storage[0] = Number(storage[0]);
        if (Number.isFinite(storage[0]) === false) {
            storage.splice(0, storage.length);
            resultBar.value = "";
            alert("Enter a valid value.");
        } else {
            resultBar.value = storage[0];
        }
        
        clear.splice(0, clear.length);
    };
    
};
