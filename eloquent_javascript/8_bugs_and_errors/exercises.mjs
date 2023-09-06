// Retry
class MultiplicatorUnitFailure extends Error{}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) { return a* b; }
    else { throw new MultiplicatorUnitFailure("KLUNK"); }
}

// recursive
function reliableMultiply(a, b) {
    try { return primitiveMultiply(a, b); }
    catch(e) {
        if (e instanceof MultiplicatorUnitFailure) {
            console.log("Mutliplication failure. Retrying... ");
            return reliableMultiply(a, b);
        }
        else { throw e; }
    }
}

console.log(reliableMultiply(8, 8));

// retry loop implementation
function reliableMultiplyLoop(a, b) {
    while(true) {
        try { return primitiveMultiply(a, b); }
        catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) { throw e; }
        }
        // If it is MultiplicatorUnitFailure, just keep trying.
        console.log("Multiplication fialure. Retrying...");
    }
}
console.log(reliableMultiplyLoop(8, 8));

// The locked box:
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    // Unlocks the box
    const wasInitiallyLocked = box.locked;

    if (box.locked) { box.unlock(); }

    // Runs the function
    try {
        body();
    } catch(e) {
        console.log("Something happened, could not apply operation to box!");
    } finally {
        if (wasInitiallyLocked) { box.lock(); }
    };
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
    console.log("Pushed one gold piece.");
  });