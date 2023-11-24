import { bigOak } from './crow-tech.mjs';

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

// Promise-based interface for readStorage
function storage(nest, name) {
    // Create and return a new promise
    return new Promise(resolve => {
        // Call the asynchronous action
        nest.readStorage(name, result => resolve(result)); //Callback
    })
}

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


// Used when we only want to check two places: local or remote
function anyStorage(nest, source, name) {
    // Check for an item in local storage of current node
    // or specified remote node 'source'
    // if source is the current node, access the local storage
    // if source is a different node, send a request to that node
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

// First implementation
// Wrong + checks all nests instead of following breadcrumb
async function locateScalpelAttempt1(nest){
    let source = await storage(nest, 'scalpel');
    if (source != null) return source;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        try {
            let found = await anyStorage(nest, source, 'scalpel');
            if (found != null) return found;
        } catch (_) {}
    }
}

async function locateScalpel(nest) {
    let currentNest = nest.name;
    while (true) {
        //
        let nextNest = await anyStorage(nest, currentNest, 'scalpel');
        if (nextNest === currentNest) return currentNest;
        currentNest = nextNest;
    }
}

// function locateScalpel2(nest) {

// }

locateScalpel(bigOak).then(console.log);
