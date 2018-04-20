//let userAge = prompt ("Please enter your age");
//
//if (userAge == 0){
//    alert ("Baby");
//} else if (userAge <0 | userAge > 200) {
//    alert ("lying");
//} else {
//    alert ("OK!");
//}



timesTables();

function timesTables() {
    let tableBase = parseInt(prompt("Please enter the Times Table to use (-1 to quit)"));
    let startPoint, endPoint;
    while (tableBase !== -1) {
        if (tableBase <= 12 && tableBase >= 1) {
            startPoint = (prompt("Please enter the start position"));
            endPoint = (prompt("Please enter the end position"));
            if (endPoint < startPoint) {
                while (endPoint < startPoint) {
                    endPoint = (prompt(`Please enter a value larger than ${startPoint}`));
                };
            }
            for (let i = startPoint; i <= endPoint; i++) {
                document.write((i * tableBase) + "<br>");
            }
            tableBase = parseInt(prompt("Please enter the Times Table to use (-1 to quit)"));
        } else {
            tableBase = parseInt(prompt("Please enter a values between 1 and 12 (-1 to quit)"));
        }
    }
}