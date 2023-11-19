import * as CrowTech from './crow-tech.mjs';

// storageFor
let bigOakStorage = CrowTech.storageFor("Big Oak");
console.log(bigOakStorage)
console.log("Scalpel is at: ", bigOakStorage.scalpel);
console.log("Food caches: ", bigOakStorage["food caches"]);

// Network
