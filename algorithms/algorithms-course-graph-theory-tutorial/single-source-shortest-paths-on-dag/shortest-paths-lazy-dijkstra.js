// algorithm: Lazy Dijkstra's single source shortest paths
// https://youtu.be/09_LlHjoEiY?t=4989

const queue = require('../priority-queue-heap');

const shortestPaths = (g, s) => {
  const ws = new Map(g.vertices().map(v => [v, Infinity]));
  const orderByWeight = ({ w: lhs }, { w: rhs }) => lhs - rhs;
  const q = queue(orderByWeight);
  const vs = new Set;

  ws.set(s, 0);
  q.enqueue({ v: s, w: 0 });

  do {
    const { v: v1, w: w1 } = q.dequeue();
    if (vs.has(v1)) { continue }
    vs.add(v1);
    for (const [v2, xw] of g.weights(v1)) {
      if (vs.has(v2)) { continue }
      const w2 = w1 + xw;
      if (w2 < ws.get(v2)) {
        ws.set(v2, w2);
        q.enqueue({ v: v2, w: w2 });
      }
    }
  } while (!q.empty());

  return Array.from(ws.entries());
};

module.exports = shortestPaths;

if (require.main === module) {
  require('./test')({ lazyDijkstra: shortestPaths });
}
