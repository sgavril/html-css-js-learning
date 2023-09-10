// Modules - attempt to avoid a 'ball of mud'
// A piece of program that species
//  1) what it relies on
//  2) what other functionality it provides

// Improvied modules
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