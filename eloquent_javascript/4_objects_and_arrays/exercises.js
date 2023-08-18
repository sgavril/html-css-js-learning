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

// Deep comparison