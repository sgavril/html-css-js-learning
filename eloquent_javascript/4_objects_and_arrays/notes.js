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
let journal = [
    {events: ["work", "touched tree", "pizza",
              "running", "television"],
     squirrel: false},
    {events: ["work", "ice cream", "cauliflower",
              "lasagna", "touched tree", "brushed teeth"],
     squirrel: false},
    {events: ["weekend", "cycling", "break", "peanuts",
              "beer"],
     squirrel: true},
    /* and so on... */
  ];