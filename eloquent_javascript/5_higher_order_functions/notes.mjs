// higher-order functions
// Abstract over actions
function greaterThan(n) {
    return m => m > n;
}

let greaterThan10 = greaterThan(10);

// Functions that change other functions
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3, 2, 1);

// Functions that provide new types of control flow
function unless(test, then) {
    if (!test) then();
}

const repeat = (n, action) => { for (let i=0; i<n; i++) { action(i); }}
repeat(3, n => {unless(n%2 == 1, () => { console.log(n, "is even."); }); } )

// built-in array method forEach is a higher-order function
// returns an error when running with node, not sure why
//["A", "B"].forEach(l => console.log(l));

// scripts data set
import { SCRIPTS } from './scripts.mjs';
console.log(SCRIPTS[1]);

// filtering arrays - a pure function that does not modif ythe array
function filterCustom(array, test) {
    let passed = [];
    for (let element of array) {
        if (test(element)) {
            passed.push(element);
        }
    }
    return passed;
}

console.log(filterCustom(SCRIPTS, script => script.living));

// Otherwise, filter is a standard array method
console.log(SCRIPTS.filter(s => s.direction == "ttb"));

// Transforming with map
// transforms an array by applying a function to all elements
// building a new array from the returned values
// output array has same length as input array but contents
// are mapped to a new form
function mapCustom(array, transform) {
    let mapped = [];
    for (let element of array) {
        mapped.push(transform(element));
    }
    return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(mapCustom(rtlScripts, s => s.name));