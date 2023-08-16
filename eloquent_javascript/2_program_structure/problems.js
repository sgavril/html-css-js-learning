// Looping a triangle
stars = '#'
for (let i = 0; i <= 7; i += 1) {
    console.log(stars)
    stars += '#'
}

// FizzBuzz - basic
// for (let i = 1; i <= 100; i += 1) {
//     if (i % 3 == 0) { console.log("Fizz") }
//     else if (i % 5 == 0) { console.log("Buzz") }
//     else { console.log(i) }
// }

// Modified FizzBuzz - simple solution
// for (let i = 1; i <= 100; i += 1) {
//     if (i % 3 == 0 & i % 5 == 0) { console.log("FizzBuzz")}
//     else if (i % 3 == 0) { console.log("Fizz") }
//     else if (i % 5 == 0) { console.log("Buzz") }
//     else { console.log(i) }
// }

// Modified FizzBuzz - short circuit evaluation
for (let i = 1; i <= 100; i++) {
    let output = '';

    if (i % 3 == 0) output += 'Fizz';
    if (i % 5 == 0) output += 'Buzz';

    console.log(output || i)
}

// Chessboard
let size = 8;

for (i = 0; i < size; i++) {
    string = ''
    for (j = 0; j < size; j++) {
        if ((i + j) % 2 == 0) { string += '#'}
        else { string += ' '}
    }
    console.log(string)
}