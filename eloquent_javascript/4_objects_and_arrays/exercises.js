// Sum of a range
function range(start, end, step=1) {
	let output_range = [];
    if (step > 0) {
        for (i=start; i <= end; i+=step) {
            output_range.push(i);
        }
    }
    else {
        for (i=start; i>=end; i+=step) {
            output_range.push(i);
        }
    }
    return output_range;
}

function sum(input_array) {
	sum = 0;
  	for (i=0; i<input_array.length; i++) {
    	sum += input_array[i];
    }
  	return sum;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sum(range(1, 10)));
// → 55
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]

// Reversing an array
function reverseArray(inputArray) {
    newArray = [];
    for (let i=0; i<inputArray.length; i++) {
        newArray.unshift(inputArray[i]);
    }
    return newArray
}

// First attempt at reverseInPlace
// function reverseArrayInPlace(inputArray) {
//     newArray = [];
//     for (let i=0; i<inputArray.length; i++) {
//         let opposite = inputArray.length - i;
//         let tmp = inputArray[i];
//         inputArray[i] = inputArray[opposite];
//         inputArray[opposite] = tmp;
//     }
//     return newArray
// }

function reverseArrayInPlace(inputArray) {
    for (i=0; i<=Math.floor(inputArray.length/2); i++) {
        let tmp = inputArray[i];
        opposite = inputArray.length - 1 - i;
        inputArray[i] = inputArray[opposite];
        inputArray[opposite] = tmp;
    }
    return inputArray
}

// A list
function arrayToList(inputArray) {
    let list = null;
    for (i=inputArray.length - 1; i>=0; i--) {
        list = {value: inputArray[i], rest: list};
    }
    return list
}

function listToArray(inputList) {
    outputArray = [];
    for (let node=inputList; node; node=node.rest) {
        if (node.value != undefined) {
            outputArray.push(node.value);
        }
    }
    return outputArray
}

function prependFirstAttempt(element, inputList) {
    arrayForm = listToArray(inputList);
    arrayForm.unshift(element);
    return arrayToList(arrayForm)
}

function prepend(element, inputList) {
    return {value: element, rest: inputList};
}

function nth(inputList, position) {
    if (!inputList) { return undefined; }
    if (position == 0) { return inputList.value; }
    else { return nth(inputList['rest'], position - 1); }
}

console.log(nth(arrayToList([10, 20, 30]), 1));

// Deep comparison
// `==` and `===` check whther objects refer to same spot in memory
// NOT whether the contents are identical
let objA = { key: 'value'};
let objB = { key: 'value'};
console.log(objA == objB); // returns false

function deepEqual(val1, val2) {
    if (typeof val1 == "object" && val1 != null && typeof val2 == "object" && val2 != null) {
        const keysVal1 = Object.keys(val1);
        const keysVal2 = Object.keys(val2);

        if (keysVal1.length != keysVal2.length) { return false; }

        for (let key of keysVal1) {
            if (!keysVal2.includes(key) || !deepEqual(val1[key], val2[key])) {
                return false;
            }
        }
        return true;
    } else { return val1 === val2;}
}