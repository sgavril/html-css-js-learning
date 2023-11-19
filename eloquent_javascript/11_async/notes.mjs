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

// Isolating from callbacks: define a wrapper for defineRequestType
// Simplifies the process of defining new request types
function requestType(name, handler) {
    defineRequestType(name, (nest, content, source,
        callback) => {
    try {
        Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
        failure => callback(failure));
    } catch (exception) {
        callback(exception);
    }
    });
}

// Collections of promises running at the same time
// Use Promise.all (waits for all to resolve then resolves to an array)
requestType("ping", () => "pong"); // Define a new request type

// Determine which neighbors are available for communication
function availableneighbors(nest) {
    // For each neighbor, send a 'ping' request
    // request returns a promise that is resolved if ping is successful
    let requests = nest.neighbors.map(neighbor => {
        return request(nest, neighbor, "ping")
            .then( () => true, () => false); // if successful return true
    });
    return Promise.all(requests).then(result => { // wait for all ping requests to settle
        return nest.neighbors.filter((_, i) => result[i]); // filter available neighbors
    });
}

// network flooding
import { everywhere } from "./crow-tech.mjs";

// avoid sending same messae forever:
//  each nest keeps an array of gossip strings
//  reminder: everywhere runs code on every nost
//  here we adda property to the state of a nest called gossip
everywhere(nest => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors){
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "gossip", message);
    }
}

// define the gossip request type
requestType("gossip", (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} recieved gossip '${
        message}' from ${source}`);
    sendGossip(nest, message, source);
})

// sendGossip(bigOak, "Kids with airgun in the park");
// Message attempt sent
// Message attempt sent
// Fabienne's Garden recieved gossip 'Kids with airgun in the park' from Cow Pasture
// Message attempt sent
// A hollow above the third big branch from the bottom. Several pieces of bread and a pile of acorns.
// Tall Poplar recieved gossip 'Kids with airgun in the park' from Butcher Shop
// Chateau recieved gossip 'Kids with airgun in the park' from Butcher Shop
// Hawthorn recieved gossip 'Kids with airgun in the park' from Gilles' Garden
// Great Pine recieved gossip 'Kids with airgun in the park' from Gilles' Garden
// Message attempt sent
// Message attempt sent
// Big Maple recieved gossip 'Kids with airgun in the park' from Fabienne's Garden
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Woods recieved gossip 'Kids with airgun in the park' from Fabienne's Garden
// Message attempt sent
// Message attempt sent
// Jacques' Farm recieved gossip 'Kids with airgun in the park' from Hawthorn
// Sportsgrounds recieved gossip 'Kids with airgun in the park' from Tall Poplar
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Church Tower recieved gossip 'Kids with airgun in the park' from Big Maple
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent
// Message attempt sent

// Message routing - one node talks to another
// do not want network flooding
// set up messages to hop from node to node
// but this requires knowing the network layout
// each nest only knows direct neighbors
// use flooding again, but check whether the new set of neighbors
//  matches the current set

// I want to see what the network looks like after updating:
function printConnections(nest) {
    console.log(`[${nest.name}] Current connections:`);
    for (let [name, neighbors] of nest.state.connections){
        console.log(`   ${name}: ${neighbors}`);
    }
}

requestType("connections", (nest, {name, neighbors}, source) => {
    // set up new request type
    // when a nest recieves a connections request: check if knows about
    //  the connections of the nest given to 'name'
    // If known, and the connectins are the same between known and recieved
    //  no further action needed
    // Otherwise update the new connections
    console.log(`[${nest.name}] Recieved connections for ${name}: ${neighbors}`);
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) ==
        JSON.stringify(neighbors)) return;
    console.log(`[${nest.name}] Updating connections for ${name}.`);
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);
    printConnections(nest);
});

function broadcastConnections(nest, name, exceptFor = null) {
    // broadcast the connections of a specific nest
    // goes through every neighbor of the caller nest and sends a connections request
    //
    console.log(`[${nest.name}] Broadcasting connections for ${name} to neighbors.`);
    for (let neighbor of nest.neighbors) {
        console.log(`[${nest.name}] Skipping broadcast to ${neighbor} (source of update).`);
        if (neighbor == exceptFor) continue;
        console.log(`[${nest.name}] Sending connections for ${name} to ${neighbor}.`);
        request(nest, neighbor, "connections", {
            name, neighbors: nest.state.connections.get(name)
        });
    }
}

everywhere(nest => {
    nest.state.connections = new Map();
    nest.state.connections.set(nest.name, nest.neigbors);
    broadcastConnections(nest, nest.name);
});


// After we broadcast connections, we have a map of the current network graph
// now we need to find routes
// findRoute from ch.7 for reference
// function findRoute(graph, from, to) {
//     // Keep a work list (array of places to explore next)
//     // + the route that got us there
//     let work = [{at: from, route: []}]; // Initialize with start pos. + empty route
//     for (let i = 0; i < work.length; i++) {
//         let {at, route} = work[i];
//         for (let place of graph[at]) {
//             // If place is the goal, finished route is returned
//             if (place == to) return route.concat(place);
//             // Otherwise (haven't looked at place) add item to list
//             if (!work.some(w => w.at == place)) {
//                 work.push({at: place, route: route.concat(place)});
//             }
//         }
//     }
// }

// Find a route between to points in a network represented by connections
// Network is an adjacency list
function findRoute(from, to, connections) {
    // Initialize the work array to keep track of places to explore next
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {                 // loop through the work list
        let {at, via} = work[i];                            // destructure to get at and via
        for (let next of connections.get(at) || [] ) {      // explore neighbouring nodes
            if (next == to) return via;                     // if dest reached return via
            if (!work.some(w => w.at == next)) {            // if neighbour unexplored (not present in work)
                work.push({at: next, via: via || next});    // add neighbour to work for future exploration
            }
        }
    }
    return null;                                            // if no route found
}

// Now build a function to handle long-distance messages
function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
      return request(nest, target, type, content);
    } else {
      let via = findRoute(nest.name, target,
                          nest.state.connections);
      if (!via) throw new Error(`No route to ${target}`);
      return request(nest, via, "route",
                     {target, type, content});
    }
  }

  requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
  });

// routeRequest(bigOak, "Church Tower", "note", "Incoming jackdaws!");

// Async functions
// Crows can store duplicate info -
// retrieving a piece of information may need to look at other nests

// first define a new type of request
// when a nest recieves a "storage" request, it will execute provided fn
requestType("storage", (nest, name) => storage(nest, name));

// Find a piece of information in the storage of a nest
// First search locally, and if not found, then search remote
function findInStorageLinear(nest, name) {
    return storage(nest, name).then(found => {
        if (found != null) return found;
        else return findInRemoteStorage(nest, name);
    });
}

// Below is the above function using async
async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        try {
            let found = await routeRequest(nest, source, "storage", name);
            if (found != null) return found;
        } catch (_) {}
    }
    throw new Error("Not found");
}

// return an array of all nests that the given nest can
// directly communicate with
// connections is a Map, so can't use Object.keys
// so instead iterators can be converted to array using Array.from
function network(nest) {
    return Array.from(nest.state.connections.keys());
}

function findInRemoteStorage(nest, name) {
    // filter out the current nest
    let sources = network(nest).filter(n => n != nest.name);

    // define next() to iteratively request info from random nests
    function next() {
        if (sources.length == 0) {
            return Promise.reject(new Error("Not found"));
        } else {
            let source = sources[Math.floor(Math.random() * sources.length)];
            sources = sources.filter(n => n != source);
            return routeRequest(nest, source, "storage", name)
                .then(value => value != null ? value : next(),
                    next);
        }
    }
    return next();
}

// findInStorage(bigOak, "events on 2017-12-21").then(console.log);

// Generators
// ability to pause a function then resume is not unique to async
// generator functions are similar but without the promise
// Calling a generator returns an iterator
function* powers(n) {
    for (let current = n;; current *= n) {
        yield current;
    }
}

for (let power of powers(3)) {
    if (power > 50) break;
    console.log(power);
}