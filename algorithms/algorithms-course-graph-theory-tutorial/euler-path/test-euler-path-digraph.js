const { asserteq } = require('../asserteq');
const eulerPathDigraph = require('./euler-path-digraph');

const dg1 = (digraph) => digraph(7, [
  [1, 2], [1, 3],
  [2, 2], [2, 4], [2, 4],  // self edge, double edge
  [3, 1], [3, 2], [3, 5],
  [4, 3], [4, 6],
  [5, 6],
  [6, 3]
]);

const dg2 = (digraph) => digraph(4, [
  [0,2],[0,2],
  [1,0],
  [2,1],[2,3],
  [3,0]
]);

const dg3 = (digraph) => digraph(4, [
  [0,1],[0,2],
  [1,3],
  [3,2]
]);

const dg4 = (digraph) => digraph(6,[
  [1,1],[1,2],[1,3],
  [2,4],
  [3,4],[3,5],
  [4,1],[4,3],[4,4],
  [5,4]
]);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ digraph, eulerPathDigraph, eulerPath }, n) => loop(Number.parseInt(n) || 1, () => {
  if (digraph) { testDigraph(digraph) }
  if (eulerPathDigraph) { testEulerPathDigraph(eulerPathDigraph) }
  if (eulerPath) { testEulerPath(eulerPath) }
});
const testDigraph = (digraph) => {
  const degrees = (g) => g.vertices().map(v => g.outEdges(v).length + g.inEdges(v).length);
  asserteq([0, 3, 6, 6, 4, 2, 3], degrees(dg1(digraph)));
  asserteq([4, 2, 4, 2], degrees(dg2(digraph)));
  asserteq([2, 2, 2, 2], degrees(dg3(digraph)));
  asserteq([0, 5, 2, 4, 7, 2], degrees(dg4(digraph)));
};
const testEulerPathDigraph = (eulerPathDigraph) => {
  asserteq(true, dg1(eulerPathDigraph).hasEulerPath());
  asserteq(true, dg2(eulerPathDigraph).hasEulerPath());
  asserteq(false, dg3(eulerPathDigraph).hasEulerPath());
  asserteq(true, dg4(eulerPathDigraph).hasEulerPath());
};
const testEulerPath = (eulerPath) => {
  asserteq([1, 2, 2, 4, 3, 1, 3, 2, 4, 6, 3, 5, 6], eulerPath(dg1(eulerPathDigraph)));
  asserteq([0, 2, 1, 0, 2, 3, 0], eulerPath(dg2(eulerPathDigraph)));
  asserteq([], eulerPath(dg3(eulerPathDigraph)));
  asserteq([1, 1, 2, 4, 1, 3, 4, 3, 5, 4, 4], eulerPath(dg4(eulerPathDigraph)));
};

module.exports = test;

if (require.main === module) {
  test({ digraph: require('./digraph') });
  test(require('./euler-path-digraph'));
  test(require('./euler-path'));
}
