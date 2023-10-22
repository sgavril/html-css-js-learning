// Asynchronous programming

// Callback functions: start an action, and then
// callback fn is called with a result
// setTimeout(() => console.log("Tick"), 500);

import { bigOak } from './crow-tech.mjs';
// console.log(bigOak)

// readStorage method
// Read the storage item with key "food caches" (retrieved asynchronously)
// Then provided callback is executed once first request is done
bigOak.readStorage("food caches", caches => { // call readStorage on bigOak
    let firstCache = caches[0]; // callback function that will be called with data once read is done
    bigOak.readStorage(firstCache, info => { // retrieved data is assumed to be an array, get item 1
        console.log(info);                   // read the storage on the newly retrieved item
    });
});
// but the above leads to callback hell

// // Send method expects: target nest, type of request & request content
bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7PM",
            () => console.log("Note delivered."));


import {defineRequestType} from "./crow-tech.mjs";
defineRequestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
});


// Promises
// let fiften = Promise.resolve(15);
// fiften.then(value => console.log(`Got ${value}`));

// Promise-based interface for readStorage
function storage(nest, name) {
    // Create and return a new promise
    return new Promise(resolve => {
        // Call the asynchronous action
        nest.readStorage(name, result => resolve(result)); //Callback
    })
}

// storage calls our function which returns a promise
// eventually resolves with the value produced by bigOak.readStorage
storage(bigOak, "enemies").then(value => console.log("Got", value));

// Failure
// Convention: errors must be handled within callback
//  ie. there is no built-in way to propagate errors
// Promises are slightly better: either resolved or rejected
//  ex. create a new promise and immediately reject
new Promise((_, reject) => reject(new Error("Fail")))
    .then(value => console.log("Handler 1")) // then handler skipped
    .catch(reason => {                       // returns rejected promise
        console.log("caught failure " + reason);
        return "nothing";
    })
    .then(value => console.log("Handler 2", value));


// Networks

class Timeout extends Error {} // create specific type of error for timeouts

// request sends a network request
//  - nest: local nest (node) sending request
//  - target: target nest (node)
//  - type: of request
//  - content: of request
function request(nest, target, type, content) {
    // return a Promise that will either be resolved or rejected
    return new Promise((resolve, reject) => {
        let done = false; // track whether request is completed
        function attempt(n) { // attempt send, handle retries + timeouts
            nest.send(target, type, content, (failed, value) => { // attempt send
                done=true;                                        // callback handles response
                console.log("Message attempt sent");
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout( () => {
                if (done) return;
                else if (n < 3) attempt(n+1);
                else reject(new Timeout("Timed out"));
            }, 250);
        }
        attempt(1);
    });
}