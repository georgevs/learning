// algorithm: Eager Dijkstra's single source shortest paths
// https://youtu.be/09_LlHjoEiY?t=5745

const queue = require('../indexed-priority-queue-heap');

const shortestPaths = (g, s) => {
  const vs = new Set;
  const orderByWeight = ({ w: lhs }, { w: rhs }) => lhs - rhs;
  const q = queue(orderByWeight);
  const ws = new Map(g.vertices().map(v => [v, Infinity]));
  
  ws.set(s, 0);
  q.insert(s, { v: s, w: 0 });
  while (!q.empty()) {
    const { v: v1, w: w1 } = q.poll();  
    vs.add(v1);
    for (const [v2, xw] of g.weights(v1)) {
      if (vs.has(v2)) { continue }  // skip more expensive routes
      const w2 = w1 + xw;
      if (w2 < ws.get(v2)) {
        ws.set(v2, w2);
        (q.contains(v2) ? q.update : q.insert)(v2, { v: v2, w: w2 });
      }
    }
  }

  return Array.from(ws.entries());
};

module.exports = shortestPaths;

if (require.main === module) {
  require('./test')({ eagerDijkstra: shortestPaths });
}
