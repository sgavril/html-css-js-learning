const JOURNAL = require("./jacques_journal");

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
    return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

// Array loops - regular loop
for (let i=0; i < JOURNAL.length; i++) {
    let entry = JOURNAL[i];
    // Do something with the entry
}

// Array loops - more concise
for (let entry of JOURNAL) {
    console.log(`${entry.events.length} events.`)
}

// The final analysis -  correlation for every type of event
// First find every type of event
function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event)
            }
        }
    }
    return events;
}

console.log(journalEvents(JOURNAL));

// Now we can see the correlations
// Add a filter for < -0.1 or > 0.1
for (let event of journalEvents(JOURNAL)) {
    let correlation = phi(tableFor(event, JOURNAL));
    if (correlation > 0.1 || correlation < -0.1){
        console.log(event + ":", phi(tableFor(event, JOURNAL)));
    }
}

// Further exploration
for (let entry of JOURNAL) {
    if (entry.events.includes("peanuts") &&
       !entry.events.includes("brushed teeth")) {
      entry.events.push("peanut teeth");
    }
  }
  console.log(phi(tableFor("peanut teeth", JOURNAL)));

// Further arrayology
// Shift and unshift are like push/pop for the start of an array
let todoList = [];
function remember(task) {
    todoList.push(task);
}
function getTask() {
    return todoList.shift();
}
function rememberUrgently(task) {
    todoList.unshift(task);
}

// indexOf and lastIndexOf
console.log([1, 2, 3, 2, 1].indexOf(2));
console.log([1, 2, 3, 2, 1].lastIndexOf(2)); // Search from the end instead
// slice ; start inclusive, end exclusive
console.log([0, 1, 2, 3, 4].slice(2, 4));
console.log([0, 1, 2, 3, 4].slice(2));
// concat
function remove(array, index) {
    return array.slice(0, index)
        .concat(array.slice(index+1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));

// Strings - their properties
let kim = "Kim"
kim.age = 88; // strings are immutable types 
console.log(kim.age); // undefined

// Strings - built-in properties
console.log("coconuts".slice(4, 7));
console.log("coconut".indexOf("u"));
console.log("one two three".indexOf("ee")); // Can search > 1 char unlike array method
console.log("  okay \n ".trim()); // Rm whitespace from staart and end
console.log(String(6).padStart(3, "0"));
// Splitting and joining below
let sentence = "Secretarybirds specialize in stomping"; 
let words = sentence.split(" ");
console.log(words);
console.log(words.join(". "));
// Repeating
console.log("LA".repeat(3));
console.log("LA".repeat(3).length);

// Rest paramaters - parameter is bound to an array containing all further args
function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
        if (number > result) result = number;
    }
    return result
    ;
}
console.log(max(4, 1, 9, -2));
// Can also use notation to call a function with array argument
let numbers = [5, 1, 7];
console.log(max(...numbers));
// And can spread one array into another
let words2 = ["never", "fully"];
console.log(["will", ...words, "understand"]);

// The Math object
function randomPointOnCircle(radius) {
    let angle = Math.random() * 2 * Math.PI;
    return {x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)};
  }
  console.log(randomPointOnCircle(2));
console.log(Math.random());
console.log(Math.floor(Math.random() * 10));

// Destructuring - arrays
function phi2([n00, n01, n10, n11]) {
    return (n11 * n00 - n10 * n01) /
      Math.sqrt((n10 + n11) * (n00 + n01) *
                (n01 + n11) * (n00 + n10));
  }
// Destructuring - objects
let {name} = {name: "Faraji", age: 23};
console.log(name);

//JSON
let string = JSON.stringify({squirrel: false,
    events: ["weekend"]});
console.log(string);
console.log(JSON.parse(string).events);
