const square = function(x) {
    return x * x;
}
console.log(square(12));

// Returns undefined
const makeNoise = function() {
    console.log("Pling!");
}
makeNoise();

// Scopes and bindings
let x = 10;
if (true) {
    let y = 20;
    var z = 30;
    console.log(x + y + z);
}
console.log(x + z);

// Bindings with the same name
const halve = function(n) {
    return n / 2;
}

let n = 10;
console.log(halve(100));
console.log(n);

// Nested scopes
const hummus = function(factor) {
    const ingredient = function(amount, unit, name) {
        let ingredientAmount = amount * factor;
        if (ingredientAmount > 1) {
            unit += "s";
        }
        console.log(`${ingredientAmount} ${unit} ${name}`);
    };
    ingredient(1, "can", "chickpeas");
    ingredient(0.25, "cup", "tahini");
    ingredient(0.25, "cup", "lemon juice");
    ingredient(1, "clove", "garlic");
    ingredient(2, "tablespoon", "olive oil");
    ingredient(0.5, "teaspoon", "cumin");
};
hummus(2)

// Functions as values
let launchMissiles = function() {
    missileSystem.launch("now");
};
safeMode=true;
if (safeMode) {
    launchMissiles = function() { /* do nothing */};
}


// Function is hoisted to the top of their containing scope
console.log("The future says:", future());
function future() {
    return "You'll never have flying cars.";
}

// Arrow functions, kind of like lambda expressions
const power = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
        result *= base;
    }
    return result
}
const square1 = (x) => {return x * x; };
const square2 = x => x * x;

// The call stack, below exceeds Maximum call stack size
// function chicken() {
//     return egg();
// }

// function egg() {
//     return chicken();
// }
// console.log(chicken() + "came first.")

// Closure AKA access to the parent scope's variables
// even after the parent function has executed
function wrapValue(n) {
    let local = n;
    return () => local;
}
let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
console.log(wrap2());

// Think of function values as containing both the code
// in their body + the environment in which they were created
function multiplier(factor) {
    return number => number * factor;
}
let twice = multiplier(2);
console.log(twice(5));

// Recursion
function powerRecursive(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

// Recursive solution to puzzle
function findSolution(target) {
    function find(current, history) {
        if (current == target) { return history; }
        else if (current > target) { return null; }
        else {
            return find(current + 5, `(${history} + 5)`) ||
                   find(current * 3, `(${history} * 3)`);
        }
    }
    return find(1, "1");
}
console.log(findSolution(24));

// Growing functions - basic implementation
// function printFarmInventory(cows, chickens) {
//     let cowString = String(cows);
//     while (cowString.length < 3) {
//         cowString = "0" + cowString;
//     }
//     console.log(`${cowString} Cows`);
//     let chickenString = String(chickens);
//     while (chickenString.length < 3) {
//         chickenString = "0" + chickenString;
//     }
//     console.log(`${chickenString} Chickens`);
// }
// printFarmInventory(7, 11)

// Growing functions - slightly better
// But function still does 3 things: print, zero-padding and label
// function printZeroPaddedWithLabel(number, label) {
//     let numberString = String(number);
//     while (numberString.length < 3) {
//         numberString = "0" + numberString;
//     }
//     console.log(`${numberString} ${label}`)
// }

// function printFarmInventory(cows, chickens, pigs) {
//     printZeroPaddedWithLabel(cows, "Cows");
//     printZeroPaddedWithLabel(chickens, "Chickens");
//     printZeroPaddedWithLabel(pigs, "Pigs");
//   }

// Growing functions - modular
function zeroPad(number, width) {
    let string = String(number);
    while (string.length < width) {
        string = "0" + string;
    }
    return string;
}

function printFarmInventory(cows, chickens, pigs) {
    console.log(`${zeroPad(cows, 3)} Cows`);
    console.log(`${zeroPad(chickens, 3)} Chickens`);
    console.log(`${zeroPad(pigs, 3)} Pigs`);
}

printFarmInventory(7, 16, 3);