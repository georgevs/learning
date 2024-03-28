const stringify = (g) => {
  const toStringGraph = (g) => Array.from(g.vertices()).sort(orderVertice).map(toStringEdges).filter(Boolean).join(';');
  const toStringEdges = (v1) => 
    [Array.from((g.weights || g.neighbours)(v1)).map(toStringEdge).join(',')]
    .filter(Boolean)
    .map(s => toStringVertice(v1) + '/' + s)
    .pop();
  const toStringEdge = (x) => Array.isArray(x) ? (toStringVertice(x[0]) + ' ' + x[1]) : toStringVertice(x);
  const toStringVertice = (v) => typeof v === 'symbol' ? (v.toString().match(/Symbol\((.+)\)/)[1]) : String(v);
  const orderVertice = (lhs, rhs) => toStringVertice(lhs).localeCompare(toStringVertice(rhs));
  return toStringGraph(g);
};

module.exports = stringify;

if (require.main === module) {
  const { asserteq, UnorderedArray } = require('./asserteq');
  const { graph, directedGraph, weightedGraph, weightedDirectedGraph } = require('./graph');

  const [A,B,C,D,E,F,G,H,I] = Array.from('ABCDEFGHI').map(Symbol);
  const xs = [
    [A, B, 1], [A, D, 2],
    [B, C, 3], [B, E, 4], [B, F, 5],
    [C, D, 6],
    [D, E, 7],
    [E, F, 8]
  ];
  const xs1 = [
    [A,B],[A,C],
    [B,A],[B,C],
    [C,A],[C,B],[C,D],[C,F],
    [D,C],[D,E],
    [E,D],
    [F,C],[F,G],[F,I],
    [G,F],[G,H],
    [H,G],[H,I],
    [I,F],[I,H]
  ];

  const g = graph(xs);
  const g1 = graph(xs1);
  const dg = directedGraph(xs);
  const wg = weightedGraph(xs);
  const wdg = weightedDirectedGraph(xs);

  asserteq('A/B,D;B/A,C,E,F;C/B,D;D/A,C,E;E/B,D,F;F/B,E', stringify(g));
  asserteq('A/B,C;B/A,C;C/A,B,D,F;D/C,E;E/D;F/C,G,I;G/F,H;H/G,I;I/F,H', stringify(g1));
  asserteq('A/B,D;B/C,E,F;C/D;D/E;E/F', stringify(dg));
  asserteq('A/B 1,D 2;B/A 1,C 3,E 4,F 5;C/B 3,D 6;D/A 2,C 6,E 7;E/B 4,D 7,F 8;F/B 5,E 8', stringify(wg));
  asserteq('A/B 1,D 2;B/C 3,E 4,F 5;C/D 6;D/E 7;E/F 8', stringify(wdg));
}
