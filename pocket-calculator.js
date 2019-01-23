var displayArray = [];
var visualArray = [];
var storedArray = [];
var invertArray = [];
var decimal = false;
var evalLog = [];
var sciNotation;
var exponent;

function display(output) {
    if (output) {
        if (output == "." && displayArray.length == 0) {
            displayArray.push("0");
        } 
        
        if (output != "0" && displayArray[displayArray.length-2] == "." && (displayArray[displayArray.length-1] == "0"|| displayArray[displayArray.length-1] == "-0")) {
            displayArray[displayArray.length-1] = output;
        } else if (displayArray[0] == "-0" && output != "." && displayArray.length < 2) {
            displayArray[0] = "-" + output;
        } else if (!(output == 0 && displayArray.length == 0)) {
            displayArray.push(output);
        } 
        if (output == ".") {
            displayArray.push("0");           
        }
    }
    visualArray.length = 0;
    visualArray = displayArray.slice();
    if (displayArray.length < 10) {
        if (decimal == false) {
            if (displayArray.length > 3) {
                visualArray.splice(visualArray.length - 3, 0 , ",");
            }
            if (displayArray.length > 6) {
                visualArray.splice(visualArray.length - 7, 0 , ",");
            }
        }
        if (decimal == true) {
            if (visualArray.indexOf(".") > 3) {
                visualArray.splice(visualArray.indexOf(".") - 3, 0 , ",");
            }
            if (visualArray.indexOf(".") > 7) {
                visualArray.splice(visualArray.indexOf(".") - 7, 0 , ",");
            }
        }
        if (visualArray[0] == "0" && decimal == false) {
            visualArray.shift();
        }
        document.getElementById("displayArea").innerHTML = visualArray.join("");
    } else if (displayArray.length > 9 && output == null) {
        if (decimal == false) {
            sciNotation = (Number(displayArray.join(""))/10**(displayArray.length-1)).toFixed(2);
            exponent = displayArray.length - 1;
        } else if (decimal == true && displayArray[0] == "0") {
            sciNotation = visualArray.splice(0, visualArray.lastIndexOf("0")).toString();
            Number(sciNotation.splice(1, 0, ".")).toFixed(2);
            exponent = displayArray.indexOf(".")-(displayArray.lastIndexOf("0")+2);
        } else if (decimal == true && displayArray[0] != 0) {
            sciNotation = (Number(displayArray.join(""))/10**(displayArray.indexOf(".")-1)).toFixed(2);
            exponent = displayArray.indexOf(".");
        }
        if (visualArray[0] == "0" && decimal == false) {
            visualArray.shift();
        }
        document.getElementById("displayArea").innerHTML = sciNotation.toString() + "E " + exponent.toString();
    }
    visualArray.length = 0;
    if (!document.getElementById("displayArea").innerHTML) {
        document.getElementById("displayArea").innerHTML = "0";
    }

}

function store() {
    storedArray.push(Number(displayArray.join("")));
    displayArray.length = 0;
    decimal = false;
}

function buttonAC() {
    displayArray.length = 0;
    storedArray.length = 0;
    decimal = false;
    document.getElementById("displayArea").innerHTML = "0";
}

function buttonDecimal() {
    if (decimal == false) {
        decimal = true;
        display(".");
    }
}

function button1() {
    display("1");
}

function button2() {
    display("2");
}

function button3() {
    display("3");
}

function button4() {
    display("4");
}

function button5() {
    display("5");
}

function button6() {
    display("6");
}

function button7() {
    display("7");
}

function button8() {
    display("8");
}

function button9() {
    display("9");
}

function button0() {
    display("0");
}

function buttonPlus() {
    if (displayArray.length == 0) {
        evalLog.pop();
    } else {
        store();
    }
    evalLog.push("+");
}

function buttonMinus() {
    if (displayArray.length == 0) {
        evalLog.pop();
    } else {
        store();
    }    
    evalLog.push("-");
}

function buttonDivide() {
    if (displayArray.length == 0) {
        evalLog.pop();
    } else {
        store();
    }
    evalLog.push("/");
}

function buttonMultiply() {
    if (displayArray.length == 0) {
        evalLog.pop();
    } else {
        store();
    }
    evalLog.push("*");
}

function buttonNegative() {
    if (displayArray[0] == null) {
        displayArray.push("0");
    }
    displayArray[0] = "-" + displayArray[0];
    display();
}

function buttonPercent() {
    buttonDivide();
    display(100);
    buttonEval();
}

function buttonEval() {
    if (storedArray.length > 0) {
        store();
        console.log
        for (let i = 0; i <= storedArray.length; i++) {
            if (evalLog[i] === "*") {
                storedArray[i] = storedArray[i]*storedArray[i+1];
                storedArray.splice(i + 1, 1);
                evalLog.splice(i, 1);
            } else if (evalLog[i] === "/") {
                storedArray[i] = storedArray[i]/storedArray[i+1];
                storedArray.splice(i + 1, 1);
                evalLog.splice(i, 1);
            }
        }
        for (let i = 0; i <= storedArray.length; i++) {
            if (evalLog[i] === "+") {
                storedArray[i] = storedArray[i]+storedArray[i+1];
                storedArray.splice(i+ 1, 1);
                evalLog.splice(i, 1);
            } else if (evalLog[i] === "-") {
                storedArray[i] = storedArray[i]-storedArray[i+1];
                storedArray.splice(i + 1, 1);
                evalLog.splice(i, 1);
            }
        }
        displayArray = storedArray[0].toString().split("");
        if (displayArray.includes(".")) {
            decimal = true;
        }
        storedArray.length = 0;
        display();
        store();
    }
}
