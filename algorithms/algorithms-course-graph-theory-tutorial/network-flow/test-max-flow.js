const { asserteq,  } = require('../asserteq');
const FlowGraph = require('./flow-graph');

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = (maxFlow, n) => loop(Number.parseInt(n) || 1, () => {
  const g1 = new FlowGraph(11, [
    [0,3,2],[0,4,4],
    [1,4,5],[1,5,6],
    [2,3,4],[2,7,8],
    [3,6,7],[3,7,1],
    [4,5,8],[4,6,3],[4,8,3],
    [5,8,3],
    [6,9,1],
    [7,9,3],
    [8,9,4],
    [10,0,7],[10,1,2],[10,2,1]
  ], 10, 9);

  asserteq(7, maxFlow(g1));
});

module.exports = test;

if (require.main === module) {
  test(require('./max-flow-dfs-recursive'));
  test(require('./max-flow-edmonds-karp-bfs'));
  test(require('./max-flow-edmonds-karp-bfs-recursive'));
}
