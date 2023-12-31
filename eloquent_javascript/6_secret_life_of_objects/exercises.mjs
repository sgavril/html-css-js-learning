// Vector type
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(vec2) {
        return new Vec(this.x + vec2.x, this.y + vec2.y);
    }
    minus(vec2) {
        return new Vec(this.x - vec2.x, this.y - vec2.y);
    }
    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}
console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

// Groups
class Group {
    constructor() { this.members = []; }

    has(value) { return this.members.includes(value); }

    add(value) { this.has(value) ? value: this.members.push(value); }

    delete(value) {
        // const index = this.members.indexOf(value);
        // if (index != -1) {
        //     this.members.splice(index, 1);
        // }

        // Using filter
        this.member = this.members.filter(member => member !== value);
    }

    static from(iterableObject) {
        const group = new Group();
        for (let value of iterableObject) {
            group.add(value);
        }
        return group;
    }

    [Symbol.iterator]() { return new GroupIterator(this); }
}

// Iterable
class GroupIterator {
    constructor(group) {
        this.group = group;
        this.index=0;
    }

    next() {
        if (this.index >= this.group.members.length) return { done: true };
        const value = this.group.members[this.index];
        this.index++;
        return { value, done: false};
    }
}

// Edit Nov 23 2023 + note from ch. 11
// iterators can be written more simply using generator functions
Group.prototype[Symbol.iterator] = function*() {
    for (let i = 0; i < this.members.length; i++) {
        yield this.members[i];
    }
};

// Borrowing a method
let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "h"));