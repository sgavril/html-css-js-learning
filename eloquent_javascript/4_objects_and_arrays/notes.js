// Arrays
let listOfNumber = [2, 3, 5, 7, 11]
console.log(listOfNumbers[2]);

// Properties - almost all objects have them except for:
null.length;

// Methods - properties that hold function values
let doh = "Doh";
console.log(typeof doh.toUpperCase);
console.log(doh.toUpperCase());

// Methods to manipulate arrays
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
console.log(sequence.pop());
console.log(sequence);

// Objects - arbitrary collections of properties
let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
console.log(day1.wolf);
day1.wolf = false;
console.log(day1.wolf);
let descriptions = {
    work: "Went to work",
    "touched tree": "Touched a tree"
}

// Delete operator for property of an object
let anObject = {left: 1, right: 2};
delete anObject.left;
console.log(anObject.left);
console.log("left" in anObject);

// Find properties of an object
console.log(Object.keys(anObject))

// Copy all properties from one object to another
let objectA = {a:1, b: 2};
Object.assign(ObjectA, {b: 3, c:4});
console.log(objectA)

// Array of objects
// let journal = [
//     {events: ["work", "touched tree", "pizza",
//               "running", "television"],
//      squirrel: false},
//     {events: ["work", "ice cream", "cauliflower",
//               "lasagna", "touched tree", "brushed teeth"],
//      squirrel: false},
//     {events: ["weekend", "cycling", "break", "peanuts",
//               "beer"],
//      squirrel: true},
//     /* and so on... */
//   ];

// Mutability - objects are mutable
let object1 = {value:10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
console.log(object1 == object3);

object1.value = 15;
console.log(object2.value);
console.log(object3.value);

// Variables delcared with let can have bindings reassigned
let x = 10;
x = 20;
// Doing that with const will throw an error
const score = {visitors: 0, home: 0};
score.visitors = 1; // We can change this because the object is mutable
// score = {visitors: 1, home: 1}; not allowed, cannot point to a new object

// Lycanthrope's log
let journal = [];

function addEntry(events, squirrel) {
    journal.push({events, squirrel});
}

addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);


// Compute correlation coefficient
function phi(table) {
    //
}