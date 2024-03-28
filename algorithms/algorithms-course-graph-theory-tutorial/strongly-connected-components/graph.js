const stringify = require('../graph-stringify');

const graph = (xs) => {
  const g = new Map;
  const vertices = () => ensureOrder(g.keys());
  const neighbours = (v) => ensureOrder(g.get(v));
  const addVertex = (v) => (g.get(v) ?? g.set(v, new Set).get(v));
  const addEdge = ([v1, v2]) => { addVertex(v1).add(v2); addVertex(v2) };
  const edges = () => xs;

  // order for better debugging
  const ensureOrder = (vs) => Array.from(vs).sort(sortByKey);
  const sortByKey = (lhs, rhs) => lhs.toString().localeCompare(rhs.toString());

  xs.forEach(addEdge);
  return { vertices, neighbours, edges };
};

const graphEx = (xs) => {
  const g = graph(xs);
  return { ...g, toString: stringify.bind(null, g) };
} 

module.exports = graphEx;

if (require.main === module) {
  require('./test')({ graph });
}
