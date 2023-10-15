// Asynchronous programming

// Callback functions: start an action, and then
// callback fn is called with a result
// setTimeout(() => console.log("Tick"), 500);

import { bigOak } from './crow-tech.mjs';
// console.log(bigOak)

// readStorage method
// Read the storage item with key "food caches" (retrieved asynchronously)
// Then provided callback is executed once first request is done
bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    });
});

// Send method expects: target nest, type of request & request content
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
            () => console.log("Note delivered."));


import {defineRequestType} from "./crow-tech.mjs";
defineRequestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
});


// Promises
let fiften = Promise.resolve(15);
fiften.then(value => console.log(`Got ${value}`));

// Promise-based interface for readStorage
function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    })
}
storage(bigOak, "enemies").then(value => console.log("Got", value));