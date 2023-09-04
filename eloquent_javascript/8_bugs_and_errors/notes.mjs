// Strict mode
function canYouSpotTheProblem() {
    "use strict";
    // for (counter = 0; counter < 10; counter++) {
    for (let counter = 0; counter < 10; counter++) {
        console.log("Happy happy");
    }
}
canYouSpotTheProblem();

// this binding + strict mode
// Apparently this works without strict mode but even without it
// I get the same error
function Person(name) { this.name = name; }
// let ferdinand = Person("Ferindand"); // missing new
let ferdinand = new Person("Ferindand");

// Types - use TypeScript

// Testing
function test(label, body) {
    if (!body()) console.log(`Failed: ${label}`);
}
test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
})

// Debugging
function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        console.log(n);
        result = String(n % base) + result;
        n = Math.floor(n / base);
    } while (n > 0);
    return sign + result;
}
console.log(numberToString(13, 10));

// Error propagation - prompt does not work on node terminal?
// function promptNumber(question) {
//     let result = Number(prompt(question));
//     if (Number.isNaN(result)) return null;
//     else return result;
// }

// console.log(promptNumber("How many trees do you see?"));

function lastElement(array) {
    if (array.length == 0) { return {failed: true}; }
    else { return {element: array[array.length - 1]}; }
}

console.log(lastElement([5,4,3,2,1]));

// Exceptions
// function promptDirection(question) {
//     let result = prompt(question);
//     if (result.toLowerCase() == "left") return "L";
//     if (result.toLowerCase() == "right") return "R";
//     throw new Error("Invalid direction: " + result);
//   }

//   function look() {
//     if (promptDirection("Which way?") == "L") {
//       return "a house";
//     } else {
//       return "two angry bears";
//     }
//   }

//   try {
//     console.log("You see", look());
//   } catch (error) {
//     console.log("Something went wrong: " + error);
//   }

