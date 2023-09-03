const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

function buildGraph(edges) {
let graph = Object.create(null);
function addEdge(from, to) {
    if (graph[from] == null) { graph[from] = [to]; }
    else { graph[from].push(to); }
}
for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
}
return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

// Task: robot moves around the village
// Picks up parcel and delivers to destination
// Condense the state of the village to minimal values
//    - robot current location
//    - collection of undelivered parcels
//      - each of which has location and destination address
// State should not change when robot moves -
// we just compute a new state

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) { return this; }
        else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}