// higher-order functions
// Abstract over actions
function greaterThan(n) {
    return m => m > n;
}

let greaterThan10 = greaterThan(10);

// Functions that change other functions
function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
        return result;
    };
}
noisy(Math.min)(3, 2, 1);

// Functions that provide new types of control flow
function unless(test, then) {
    if (!test) then();
}

const repeat = (n, action) => { for (let i=0; i<n; i++) { action(i); }}
repeat(3, n => {unless(n%2 == 1, () => { console.log(n, "is even."); }); } )

// built-in array method forEach is a higher-order function
["A", "B"].forEach(l => console.log(l));