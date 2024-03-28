// algorithm: bridges
// https://youtu.be/09_LlHjoEiY?t=9084

const { directedGraph } = require('../graph');
const dfs = require('../dfs');

const bridges = (gv) => {
  const { vertexToIndex, indexToVertex } = mapVerticesToIndeces(gv);
  const { getUniqueEdges } = uniqueDirectedEdges(gv);

  const vxs = getUniqueEdges();
  const gi = directedGraph(convertEdges(vertexToIndex, vxs));
  const { indexToLowestReachableIndex } = lowestReachableIndex(gi);

  const ixs = bridgeEdges({ indexToLowestReachableIndex }, gi);
  return convertEdges(indexToVertex, ixs);
};

const convertEdges = (fn, xs) => xs.map(x => x.map(fn));

const bridgeEdges = ({ indexToLowestReachableIndex }, gi) => {
  const r = [];
  const addEdgeIfBridge = (v1, v2) => { if (v1 < indexToLowestReachableIndex(v2)) { r.push([v1, v2]) } };
  dfs({ addEdge: addEdgeIfBridge }, gi);
  return r;
};

const lowestReachableIndex = (gi) => {
  const m = new Map(gi.vertices().map(v => [v, Infinity]));
  const indexToLowestReachableIndex = m.get.bind(m);
  const updateLowestReachableIndexFor = (s) => (v) => { m.set(s, Math.min(m.get(s), v)) };
  gi.vertices().forEach(s => dfs({ addVertex: updateLowestReachableIndexFor(s) }, gi, s));
  return { indexToLowestReachableIndex };
};

const uniqueDirectedEdges = (g) => {
  const m = new Map;
  const addEdgeIfUnique = (v1, v2) => {
    if ((m.get(v1) || []).indexOf(v2) !== -1 || (m.get(v2) || []).indexOf(v1) !== -1) { return }
    let l;
    const l1 = m.get(v1) ?? (m.set(v1, l = []), l);
    l1.push(v2);
  };
  const getUniqueEdges = () => Array.from(m.entries()).flatMap(([v1, vs]) => vs.map(v2 => [v1, v2]));
  dfs({ addEdge: addEdgeIfUnique }, g);
  return { getUniqueEdges };
};

const mapVerticesToIndeces = (gv) => {
  let i = 0;
  const mvi = new Map;
  const miv = new Map;
  const vertexToIndex = mvi.get.bind(mvi);
  const indexToVertex = miv.get.bind(miv);
  const mapToNextIndex = (v) => {
    mvi.set(v, i);
    miv.set(i, v);
    ++i;
  };
  dfs({ addVertex: mapToNextIndex }, gv);
  return { vertexToIndex, indexToVertex };
};

module.exports = bridges;

if (require.main === module) {
  require('./test')({ bridges }, Number(process.argv[2]) || 1);
}
