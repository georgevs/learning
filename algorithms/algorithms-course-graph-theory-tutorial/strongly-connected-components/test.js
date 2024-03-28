const { asserteq, UnorderedArray: UA } = require('../asserteq');
const stringify = require('../graph-stringify');

const [A,B,C,D,E,F,G,H,I] = Array.from('ABCDEFGHI').map(Symbol);
const xs = [
  [A, B], [A, C],
  [B, A], [B, D],
  [C, A], [C, D],
  [D, F],
  [E, C], [E, F], [E, H],
  // F has no outgoing edges
  [G, E],
  [H, G],
  [I, G], [I, H]
];

const xs2 = [
  [A,B],[A,C],
  [B,A],[A,D],
  [C,D],
  [D,E],[D,F],
  [E,C],[E,F],[E,G],
  [F,H],
  [G,F],
  [H,G]
];

const xs3 = [
  [A,B],
  [B,C],[B,E],[B,F],
  [C,D],[C,G],
  [D,C],[D,H],
  [E,A],[E,F],
  [F,G],
  [G,F],[G,H],
  [H,H]
];

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ graph, stronglyConnectedComponentsTarjan, stronglyConnectedComponentsCLRS }, n) => loop(Number.parseInt(n) || 1, () => {
  [stronglyConnectedComponentsTarjan, stronglyConnectedComponentsCLRS].filter(Boolean).forEach(testSCC(require('./graph')));
  [graph].filter(Boolean).forEach(testGraph);
});
const testSCC = (graph) => (stronglyConnectedComponents) => {
  asserteq(UA.of(UA.of(A, B, C), [D], [F], UA.of(E, G, H), [I]), stronglyConnectedComponents(graph(xs)));
  asserteq(UA.of(UA.of(A,B), UA.of(C,D,E), UA.of(F,G,H)), stronglyConnectedComponents(graph(xs2)));
  asserteq(UA.of(UA.of(A,B,E), UA.of(C,D), UA.of(F,G), [H]), stronglyConnectedComponents(graph(xs3)));
};
const testGraph = (graph) => {
  asserteq(UA.of(A, B, C, D, E, F, G, H, I), Array.from(graph(xs).vertices()));
  asserteq('A/B,C;B/A,D;C/A,D;D/F;E/C,F,H;G/E;H/G;I/G,H', stringify(graph(xs)));
}

module.exports = test;

if (require.main === module) {
  test({ stronglyConnectedComponentsTarjan: require('./strongly-connected-components-tarjan') });
  test({ stronglyConnectedComponentsCLRS: require('./strongly-connected-components-clrs') });
  test({ graph: require('./graph') });
}
