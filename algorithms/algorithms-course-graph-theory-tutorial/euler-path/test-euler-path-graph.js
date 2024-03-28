const { asserteq } = require('../asserteq');
const eulerPathGraph = require('./euler-path-graph');

const g1 = (graph) => graph(5, [
  [0,1],[0,2],[0,3],
  [1,0],[1,4],
  [2,0],[2,3],[2,4],
  [3,0],[3,2],[3,4],
  [4,1],[4,2],[4,3]
]);

const g2 = (graph) => graph(5, [
  [0,1],[0,2],
  [1,0],[1,2],[1,3],[1,4],
  [2,0],[2,1],[2,3],[2,4],
  [3,1],[3,2],[3,4],
  [4,1],[4,2],[4,3]
]);

const g3 = (graph) => graph(6, [
  [0,1],[0,2],[0,2],[0,3],
  [1,0],[1,3],
  [2,0],[2,0],[2,4],[2,4],
  [3,0],[3,1],[3,4],[3,5],
  [4,2],[4,2],[4,3],[4,5],
  [5,3],[5,4]
]);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ eulerPathGraph, graph, eulerPath }, n) => loop(Number.parseInt(n) || 1, () => {
  if (graph) { testGraph(graph) }
  if (eulerPathGraph) { testEulerPathGraph(eulerPathGraph) }
  if (eulerPath) { testEulerPath(eulerPath) }
});
const testGraph = (graph) => {
  const degrees = (g) => g.vertices().map(g.degree);
  asserteq([3, 2, 3, 3, 3], degrees(g1(graph)));
  asserteq([2, 4, 4, 3, 3], degrees(g2(graph)));
  asserteq([4, 2, 4, 4, 4, 2], degrees(g3(graph)));
};
const testEulerPathGraph = (eulerPathGraph) => {
  asserteq(false, g1(eulerPathGraph).hasEulerPath());
  asserteq(true, g2(eulerPathGraph).hasEulerPath());
  asserteq(true, g3(eulerPathGraph).hasEulerPath());
};
const testEulerPath = (eulerPath) => {
  asserteq([], eulerPath(g1(eulerPathGraph)));
  asserteq([3, 1, 0, 2, 1, 4, 2, 3, 4], eulerPath(g2(eulerPathGraph)));
  asserteq([0, 1, 3, 0, 2, 4, 3, 5, 4, 2, 0], eulerPath(g3(eulerPathGraph)));
};

module.exports = test;

if (require.main === module) {
  test({ digraph: require('./graph') });
  test(require('./euler-path-graph'));
  test(require('./euler-path'));
}
