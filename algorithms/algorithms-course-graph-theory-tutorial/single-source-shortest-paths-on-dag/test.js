const { asserteq, UnorderedArray: UA } = require('../asserteq');
const { weightedDirectedGraph } = require('../graph');

const [A,B,C,D,E,F,G,H] = Array.from('ABCDEFGH').map(Symbol);

// directed graph with ONLY positive weights
const wdg = weightedDirectedGraph([
  [0,1,4],[0,2,1],
  [1,3,1],
  [2,1,2],[2,3,5],
  [3,4,3]
]);

// directed graph with NEGATIVE WEIGHTS
const nwdg = weightedDirectedGraph([
  [A,B,3],[A,C,6],
  [B,C,4],[B,D,4],[B,E,11],
  [C,D,8],[C,G,11],
  [D,E,-4],[D,F,5],[D,G,2],
  [E,H,9],
  [F,H,1],
  [G,H,2]
]);

// directed graph with LOOPS
const lwdg = weightedDirectedGraph([
  [0,1,5],[0,2,1],
  [1,2,2],[1,3,3],[1,4,20],
  [2,1,3],[2,4,12],
  [3,2,3],[3,4,2],[3,5,6],
  [4,5,1]
]);

// directed graph with NEGATIVE LOOPS
const nlwdg = weightedDirectedGraph([
  [0,1,5],
  [1,2,20],[1,5,30],[1,6,60],
  [2,3,10],[2,4,75],
  [3,2,-15],
  [4,9,100],
  [5,4,25],[5,6,5],[5,8,50],
  [6,7,-50],
  [7,8,-10]
]); 

const test = ({ 
  bellmanFordShortestPaths,
  dijkstraFindShortestPath,
  eagerDijkstra,
  lazyDijkstra,
  topologicalSortShortestPaths,
}) => {
  // single source shortests paths...
  [bellmanFordShortestPaths, eagerDijkstra, lazyDijkstra, topologicalSortShortestPaths].filter(Boolean).forEach(fn => {
    asserteq(UA.of([0, 0], [1, 3], [2, 1], [3, 4], [4, 7]), fn(wdg, 0));
  });
  [bellmanFordShortestPaths, topologicalSortShortestPaths].filter(Boolean).forEach(fn => {
    // negative weights
    asserteq(UA.of([A, 0], [B, 3], [C, 6], [D, 7], [E, 3], [F, 12], [G, 9], [H, 11]), fn(nwdg, A));
  });
  [bellmanFordShortestPaths, eagerDijkstra, lazyDijkstra].filter(Boolean).forEach(fn => {
    // loops
    asserteq(UA.of([0, 0], [1, 4], [2, 1], [3, 7], [4, 9], [5, 10]), fn(lwdg, 0));
  });
  [bellmanFordShortestPaths].filter(Boolean).forEach(fn => {
    // negative loops
    asserteq(UA.of([0,0],[1,5],[2,-Infinity],[3,-Infinity],[4,-Infinity],[5,35],[6,40],[7,-10],[8,-20],[9,-Infinity]), fn(nlwdg, 0));
  });

  // find shortest path...
  [dijkstraFindShortestPath].filter(Boolean).forEach(fn => {
    asserteq([0, 2, 1, 3, 4], fn(wdg, 0, 4));
  });
};

module.exports = test;

if (require.main === module) {
  const targets = [
    { topologicalSortShortestPaths: require('./shortest-paths-topological-sort') },
    { bellmanFordShortestPaths: require('./shortest-paths-bellman-ford') },
    { lazyDijkstra: require('./shortest-paths-lazy-dijkstra') },
    { eagerDijkstra: require('./shortest-paths-eager-dijkstra') },
    { dijkstraFindShortestPath: require('./find-shortest-path-lazy-dijkstra') }
  ];
  targets.forEach(test);
}
