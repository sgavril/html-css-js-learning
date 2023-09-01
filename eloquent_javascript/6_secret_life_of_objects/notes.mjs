// Methods
let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says '${line}'`);
}
rabbit.speak("I'm alive.");

// Function called as a method:
// The binding called `this` automatically points to object
// that it was called on
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
hungryRabbit.speak("I could use a carrot right now.");

speak.call(hungryRabbit, "Burp!");

// Arrow functions do not bind their own this
// But do see the binding of the scope around them
function normalize() {
    console.log(this.coords.map(n => n/ this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});

// Most objects have a prototype (fallback source of properties)
let empty = {};
console.log(empty.toString);
console.log(empty.toString());

console.log(Object.getPrototypeOf({}) == Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));

// Functions derive from Function.protoype
console.log(Object.getPrototypeOf(Math.max) == Function.prototype);
console.log(Object.getPrototypeOf([]) == Array.prototype);

// Use Object.create to create an Object using a prototype:
let protoRabbit = {
    speak(line) {
        console.log(` The ${this.type} rabbit says '${line}'`);
    }
} ;
let aKillerRabbit = Object.create(protoRabbit);
aKillerRabbit.type = "killer";
aKillerRabbit.speak("SKREEEE!");

// Classes - constructor function (tells us what properties an instance should have)
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

// Alternative syntax for constructor
function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
let weirdRabbit = new Rabbit("weird");

// Constructor prototypes are Functions
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// While prototype properties hold the prototype used for instances
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);

// Class notation as of 2015
// Class decalarations only allow methods (properties that hold functions)
// class Rabbit { // Starts a class declaration
//     constructor(type) { // Define a constructor
//         this.type = type;
//     }
//     speak(line) { // Any number of methods may be written
//         console.log(`The ${this.type} rabbit says '${line}'`);
//     }
// }

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// Class can be used in statements and expressions
// As an expression, it just produces the constructor
let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());

// Overriding properties
// When adding a property, the property is added to the object itself
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth);
console.log(blackRabbit.teeth);

// Overriding is useful, ie. for standard function and array prototypes:
console.log(Array.prototype.toString == Object.prototype.toString);
console.log([1, 2].toString());
console.log(Object.prototype.toString.call([1,2]));

// Map - data structure associates keys with other values
let agesCustom = {
    Boris: 39,
    Liang: 22,
    Julia: 62
}
console.log(`Julia is ${agesCustom["Julia"]}`);
console.log("Is Jack's age known?", "Jack" in agesCustom);
console.log("Is toString's age known?", "toString" in agesCustom);

// So, we can see using plain objects as maps is dangeorus
// Ways to avoid: 1) create object with no prototype
console.log("toString" in Object.create(null));

// Map class from JavaScript - get, set and has
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(`Julia is ${ages.get("Julia")}`);
console.log("Is Jack's age known?", ages.has("Jack"));
console.log(ages.has("toString"));

// If for some reason we do need to treat Object as map
// can use Object.keys to return the keys of that Object
// and not the prototype
console.log({x:1}.hasOwnProperty("x"));
console.log({x:1}.hasOwnProperty("toString"));

// Polymorphism: code working with values of different shapes
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));

// Symbols - values that are unique
let sym = Symbol("name");
console.log(sym == Symbol("name"));
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// Good for defining interfaces that can live alongside other properties
const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
console.log([1,2][toStringSymbol]());
// Include symbol properties in object expressions/classes using []
let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());

// Iterator interfaces
// Object is considered iterable if it has a Symbol.iterator
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

// Implementing an iterable data structure
class Matrix {
    // Act as a two-dimensional array
    constructor(width, height, element = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                this.content[y*width + x] = element(x, y);
            }
        }
    }
    get(x, y) { return this.content[y* this.width + x]; }
    set(x, y, value) { this.content[y * this.width + x] = value; }
}

class MatrixIterator {
    constructor(matrix) {
        this.x = 0;
        this.y = 0;
        this.matrix = matrix;
    }

    next() {
        if (this.y == this.matrix.height) return {done: true};

        let value = {x: this.x, y:this.y, value: this.matrix.get(this.x, this.y)};
        this.x++;
        if (this.x == this.matrix.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
}

Matrix.prototype[Symbol.iterator] = function() {
    return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x}, ${y}`);
for (let {x, y, value} of matrix) {
    console.log(x, y, value);
}

// Getters, setters, statics
// Can include properties that hold non-function values
let varyingSize = {
    get size() {
        return Math.floor(Math.random() * 100);
    }
};
console.log(varyingSize.size);

// Inheritance
class SymmetricMatrix extends Matrix {
    constructor(size, element = (x, y) => undefined) {
        super(size, size, (x, y) => {
            if (x < y) return element(y, x);
            else return element (x, y);
        })
    }
    set(x, y, value) {
        super.set(x, y, value);
        if (x != y) { super.set(y, x, value);}
    }
}

// instanceof
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
console.log(new SymmetricMatrix(2) instanceof Matrix);
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
