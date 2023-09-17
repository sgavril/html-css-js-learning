// Modules - attempt to avoid a 'ball of mud'
// A piece of program that species
//  1) what it relies on
//  2) what other functionality it provides

// Improvised modules
const weekDay = function() {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                    "Thursday", "Friday", "Saturday"];

    return {
        name(number) { return names[number]; },
        number(name) { return names.indexOf(name); }
    };
}();

console.log(weekDay.name(weekDay.number("Sunday")));

// Evaluating data as code
// Below can be bad: breaks properties of scopes
const x = 1;
function evalAndReturnX(code) {
    eval(code); // Executes a string in the current scope
    return x;
}
console.log(evalAndReturnX("var x = 2"));
console.log(x);

// Another way of interpreting data as code
// Function constructor
// Wraps code to get its own scope
let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));

// CommonJS
// requre - call with a dependency -> module is loaded
// and interface is returned
// modules automatically get their own scope
// below is a date-formatting function:
// using two packages and exports a single function
import ordinal from "ordinal";
// below is destructuring to create a binding of an imported interface
import { days, months } from "date-names";

export function formatDate(date, format) {
    return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
        if (tag == 'YYYY') return date.getFullYear();
        if (tag == 'M') return date.getMonth();
        if (tag == 'MMMM') return months[date.getMonth()];
        if (tag == 'D') return date.getDate();
        if (tag == 'Do') return ordinal(date.getDate());
        if (tag == 'dddd') return days[date.getDay()];
    });
};

// using the above module
// const {formatDate} = require("./format-date");
console.log(formatDate(new Date(2017, 9, 13), "ddd the Do"));