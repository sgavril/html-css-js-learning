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

// Summarizing with reduce
// AKA computing a single value
// Parameters are the array + combination function + start value
function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
        current = combine(current, element);
    }
    return current;
}
// Standard array reduce lets you leave off start argument
// and will just take the first element
console.log(reduce([1, 2, 3, 4], (a, b) => a + b))
//Using reduce twice to find the script with the most characters
// First use destructuring to reduce ranges of a script by summing their sizes
function characterCount(script) {
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}

// Then call reduce again to find the largest script by repeatedly
// comparing two scripts and returning the larger one
console.log(SCRIPTS.reduce((a, b) => {
    return characterCount(a) < characterCount(b) ? b : a;
}));

// Composability - previous example without higher-order functions
let biggest = null;
for (let script of SCRIPTS) {
    if (biggest == null || characterCount(biggest) < characterCount(script)) {
        biggest = script;
    }
}
console.log(biggest);
// Higher-order functions shine when we need to compose functions
// Here we will find the average year of origin for living + dead scripts
// Build up new arrays when running filter and map
function average(array) {
    return array.reduce((a,b) => a+b) / array.length;
}

console.log(Math.round(average(SCRIPTS.filter(s => s.living).map(s => s.year))));
console.log(Math.round(average(SCRIPTS.filter(s => !s.living).map(s => s.year))));

// Writing the above computation as a big loop would be:
let total = 0, count = 0;
for (let script of SCRIPTS) {
    if (script.living) {
        total += script.year;
        count += 1;
    }
}
console.log(Math.round(total / count)); // Approach does less work but is less readable

// Strings and character codes
// What script is each piece of text using?
// some() tests whether at least one element in the array passes the test
//  It is also a higher order function ; takes a test fn and tells us
//  whether that function returns true for any elements in the array
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null;
}
console.log(characterScript(121));
const script = characterScript('a'.codePointAt(0)); // returns 97
console.log(script.name); // Output should be "Latin"

// Two unit code challenges - emojis to the rescue??
let horseShoe = "🐴👟";
console.log(horseShoe.length);
console.log(horseShoe[0]);
console.log(horseShoe.charCodeAt(0)); // Gives a code unit (not full character code)
console.log(horseShoe.codePointAt(0)); // Gives a full Unicode character)
// To iterate over a string, we need to deal with whether a character
//  takes up one or two code units
//  for/of loops can be used on strings, giving us real characters
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
    console.log(char);
}

// Recognizing text - counting the # of characters in each script
// Start with this abstraction
function countBy(items, groupName) {
    // Takes a collection (anything "loopable")
    // and a function computing a group name
    // Returns an array of objects each naming a group + # of obj
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name); // Find first value for which given fn returns true
        if (known == -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}
console.log(countBy([1, 2, 3, 4, 5], n => n> 2 ));
const text = "hello";
const counts = countBy(text, char => {
    if ("aeiou".includes(char)) {
        return "vowel";
    } else {
        return "consonant";
    }
});
console.log(counts);

// Function to analyze a text: determine the % of chars belonging to each script
// Using helper functions
function textScripts(text) {
    // Step 1: count scripts
    let scripts = countBy(text, char => { // Count occurrences of each script in the text
        let script = characterScript(char.codePointAt(0)); // Get the unicode code point of the character
        return script ? script.name: "none"; // Return the name of the script to which a character belongs
    }).filter(({name}) => name != "none");

    let total = scripts.reduce((n, {count}) => n + count, 0); // Calculate total # of chars
    if (total == 0) return "No scripts found.";

    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
    }).join(", ");
}
console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));