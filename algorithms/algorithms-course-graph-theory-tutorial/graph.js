const stringify = require('./graph-stringify');

const unweightedGraph = ({ directed }) => (xs) => {
  const g = new Map;
  const vertices = () => Array.from(g.keys());
  const neighbours = (v) => g.get(v);
  const addVertex = (v) =>  { let l; return (g.get(v) ?? (g.set(v, l = []), l)) };
  const addEdge = ([v1, v2]) => { 
    const l1 = addVertex(v1), l2 = addVertex(v2);
    if (l1.indexOf(v2) === -1) { l1.push(v2) }
    if (!directed && l2.indexOf(v1) === -1) { l2.push(v1) }
  };
  xs.forEach(addEdge);
  const r = { vertices, neighbours };
  r.toString = stringify.bind(null, r);
  return r;
};

const weightedGraph = ({ directed }) => (xs) => {
  const g = new Map;
  const vertices = () => Array.from(g.keys());
  const neighbours = (v) => g.get(v).map(([v2]) => v2);
  const weights = (v) => g.get(v);
  const addVertex = (v) =>  { let l; return (g.get(v) ?? (g.set(v, l = []), l)) };
  const addEdge = ([v1, v2, w]) => { 
    const l1 = addVertex(v1), l2 = addVertex(v2);
    if (l1.findIndex(([v]) => v === v2) === -1) { l1.push([v2, w]) }
    if (!directed && l2.findIndex(([v]) => v === v1) === -1) { l2.push([v1, w]) }
  };
  xs.forEach(addEdge);
  const r = { vertices, neighbours, weights };
  r.toString = stringify.bind(null, r);
  return r;
};

module.exports = {   
  graph: unweightedGraph({ directed: false }),
  directedGraph: unweightedGraph({ directed: true }),
  weightedGraph: weightedGraph({ directed: false }),
  weightedDirectedGraph: weightedGraph({ directed: true })
};

if (require.main === module) {
  const { asserteq, UnorderedArray } = require('./asserteq');

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

  const g = unweightedGraph({ directed: false })(xs);
  const g1 = unweightedGraph({ directed: false })(xs1);
  const dg = unweightedGraph({ directed: true })(xs);
  const wg = weightedGraph({ directed: false })(xs);
  const wdg = weightedGraph({ directed: true })(xs);

  const assertVertices = (expected) => (g) => asserteq(expected, UnorderedArray.from(g.vertices()));
  [g, dg, wg, wdg].forEach(assertVertices([A, B, C, D, E, F]));

  const assertNeighbours = (expected) => (g) => asserteq(expected, UnorderedArray.from(Array.from(g.vertices()).map(v => [v, UnorderedArray.from(g.neighbours(v))])));
  [g, wg].forEach(assertNeighbours([
    [A, [B, D]],
    [B, [A, C, E, F]],
    [C, [B, D]],
    [D, [A, C, E]],
    [E, [B, D, F]],
    [F, [B, E]]
  ]));
  [dg, wdg].forEach(assertNeighbours([
    [A, [B, D]],
    [B, [C, E, F]],
    [C, [D]],
    [D, [E]],
    [E, [F]],
    [F, []]
  ]));

  const assertWeights = (expected) => (wg) => asserteq(expected, UnorderedArray.from(Array.from(wg.vertices()).map(v => [v, wg.weights(v)])));
  assertWeights([
    [A, [[B, 1], [D, 2]]],
    [B, [[A, 1], [C, 3], [E, 4], [F, 5]]],
    [C, [[B, 3], [D, 6]]],
    [D, [[A, 2], [E, 7]]],
    [E, [[B, 4], [D, 7], [F, 8]]],
    [F, [[B, 5], [E, 8]]]
  ], wg);
  assertWeights([
    [A, [[B, 1], [D, 2]]],
    [B, [[C, 3], [E, 4], [F, 5]]],
    [C, [[D, 6]]],
    [D, [[E, 7]]],
    [E, [[F, 8]]],
    [F, []],
  ], wdg);
}
