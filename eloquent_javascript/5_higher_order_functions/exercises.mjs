// Flattening
let arrays = [[1, 2, 3,], [4, 5], [6]];

let flattened = arrays.reduce((accumulator, currentValue) => {
    return accumulator.concat(currentValue);
}, []);
console.log(flattened)

// Your own loop
function loop(aValue, testFunction, updateFunction, bodyFunction) {
    for (let i = aValue; testFunction(i); i=updateFunction(i)) {
        bodyFunction(i);
    }
}
loop(3, n => n > 0, n => n-1, console.log);

// Everything
function everyLoop(array, test) {
    for (let element of array) {
        if (!test(element)) { return false};
    }
    return true;
}
console.log(everyLoop([1, 3, 5], n => n < 10));
console.log(everyLoop([2, 4, 16], n => n < 10));
console.log(everyLoop([], n => n < 10));

function everySome(array, test) {
    // Check if there is any element that does not satisfy !test(element)
    return !array.some(element => !test(element));
}
console.log(everyLoop([1, 3, 5], n => n < 10));
console.log(everySome([2, 4, 16], n => n < 10));
console.log(everySome([], n => n < 10));

// Dominant writing direction
// Compute the dominant writing direction in a string of text
import { SCRIPTS } from './scripts.mjs';
console.log(SCRIPTS[1]);

// Returns script from an input character code
function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
    }
    return null
}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
            counts.push({name, count: 1});
        } else {
            counts[known].count++;
        }
    }
    return counts;
}

// Compute the dominant writing direction in a string of text
function dominantDirection(text) {
    // Count characters by a criterion based on characterScript
    // Filter part of the result that refers to script-less characters
    let directions = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    // Get direction with reduce
    let total = directions.reduce((n, {count}) => n + count, 0);
    if (total == 0) return "No dominant direction";

    return SCRIPTS.map(({direction, count}) => {
        return `${count} ${direction}`
    }).join(", ");

}
console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));
