/*
seq 5 | xargs -L1 time node search/test dfs-iterative 100000

5 x 100000
-------------------
0.58 bfs-iterative
0.58 dfs-recursive
0.64 dfs-iterative
0.69 dfs-fp-array
0.73 dfs-fp-transducer-push
0.88 dfs-fp-transducer-concat
1.08 dfs-fp-generators
1.26 dfs-fp-iterators
*/

const { asserteq, UnorderedArray } = require('../asserteq');
const { dagxs, vertices: [A, B, C, D, E, F, G, H] } = require('../sample-graph-data');
const { graph, directedGraph } = require('../graph');

const dag = directedGraph(dagxs);

const acc = (fn) => (...args) => { const rs = []; fn((v) => (rs.push(v), void 0), ...args); return rs };
const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };

const test = ({ enumVertices, enumPaths, bfs }, n) => loop(Number.parseInt(n) || 1, () => {
  if (enumVertices) {
    const assertEnumVertices = (expected) => (g) => asserteq(expected, UnorderedArray.from(acc(enumVertices)(g)));
    [dag].forEach(assertEnumVertices([A, B, C, D, E, F, G, H]));
  }

  if (enumPaths) {
  }

  if (bfs?.enumVertices) {
    const xs = [
      [A, B], [A, D],
      [B, A], [B, C], [B, E], [B, F],
      [C, B], [C, D],
      [D, A], [D, C], [D, E],
      [E, B], [E, D], [E, F],
      [F,B],[F,E]
    ];

    const assertEnumVertices = (enumVertices) => asserteq([A, B, D, C, E, F], acc(enumVertices)(graph(xs)));
    bfs.enumVertices.forEach(assertEnumVertices);
  }
});

module.exports = test;

if (require.main === module) {
  const [testPath, targetRelPath, n] = process.argv.slice(1);
  const path = require('path');
  const allTargetsRelPaths = [
    'bfs-iterative',
    'bfs',
    'dfs-fp-array',
    'dfs-fp-generators',
    'dfs-fp-iterators',
    'dfs-fp-transducers-concat',
    'dfs-fp-transducers-push',
    'dfs-iterative',
    'dfs-recursive'
  ];
  const targetRelPaths = targetRelPath ? [targetRelPath] : allTargetsRelPaths;
  targetRelPaths.forEach(targetRelPath => test(require(path.join(path.dirname(testPath), targetRelPath)), n));
}
