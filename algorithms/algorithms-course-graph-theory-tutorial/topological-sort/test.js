const { asserteq } = require('../asserteq');
const { logf } = require('../log');
const { directedGraph } = require('../graph');

const [A,B,C,D,E,F,G,H,I,J,K,L,M] = Array.from('ABCDEFGHIJKLM').map(Symbol);
const xs = [
  [A,D],
  [B,D],
  [C,A],[C,B],
  [D,H],[D,G],
  [E,A],[E,D],[E,F],
  [F,J],[F,K],
  [G,I],
  [H,I],[H,J],
  [I,L],
  [J,L],[J,M],
  [K,J]
];

const g = directedGraph(xs);

const isTopologicalOrderOf = logf('', (g, s) => {
  if (s === undefined) { return false }
  for (const v1 of g.vertices()) {
    for (const v2 of g.neighbours(v1)) {
      const i1 = s.indexOf(v1), i2 = s.indexOf(v2);
      if (i1 == -1 || i2 == -1 || i2 < i1) { return false }
    }
  }
  return true;
});

const test = (topologicalSort) => {
  asserteq(true, isTopologicalOrderOf(g, [C,B,E,F,K,A,D,G,H,I,J,L,M]));
  asserteq(true, isTopologicalOrderOf(g, topologicalSort(g)));
};

module.exports = test;

if (require.main === module) {
  test(require('./topological-sort'));
}
