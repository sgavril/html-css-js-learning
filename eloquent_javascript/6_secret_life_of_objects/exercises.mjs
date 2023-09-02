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
}

// Iterable
