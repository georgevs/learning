const { asserteq, UnorderedArray: UA } = require('../asserteq');
const graph = require('./graph.js');

const g1 = (graph) => graph(7, [
  [0,1,9],[0,2,0],[0,3,5],[0,5,7],
  [1,3,-2],[1,4,3],[1,6,4],
  [2,5,6],
  [3,5,2],[3,6,3],
  [4,6,6],
  [5,6,1]
]);

const g2 = (graph) => graph(4, [[0,1,3], [2,3,4]]);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = (minimumSpanningTree, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq(UA.of([0,2,0], [0,3,5], [1,3,-2], [3,5,2], [5,6,1], [1,4,3]), minimumSpanningTree(g1(graph)));
  asserteq([], minimumSpanningTree(g2(graph)));
});

module.exports = test;

if (require.main === module) {
  test(require('./minimum-spanning-tree-prim-lazy'));
  test(require('./minimum-spanning-tree-prim-eager'));
}
