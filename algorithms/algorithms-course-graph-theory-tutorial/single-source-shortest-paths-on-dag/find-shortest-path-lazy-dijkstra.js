// algorithm: Lazy Dijkstra's find optimal path
// https://youtu.be/09_LlHjoEiY?t=5491

const queue = require('../priority-queue-heap');

const shortestPaths = (g, s, e) => {
  const ws = new Map(g.vertices().map(v => [v, Infinity]));
  const rs = new Map(g.vertices().map(v => [v, v]));
  const orderByWeight = ({ w: lhs }, { w: rhs }) => lhs - rhs;
  const q = queue(orderByWeight);
  const vs = new Set;

  ws.set(s, 0);
  q.enqueue({ v: s, w: 0 });

  do {
    const { v: v1, w: w1 } = q.dequeue();
    if (v1 === e) { break }   // stop early optimiation
    if (vs.has(v1)) { continue }
    vs.add(v1);
    for (const [v2, xw] of g.weights(v1)) {
      if (vs.has(v2)) { continue }
      const w2 = w1 + xw;
      if (w2 < ws.get(v2)) {
        ws.set(v2, w2);
        rs.set(v2, v1);
        q.enqueue({ v: v2, w: w2 });
      }
    }
  } while (!q.empty());

  return { ws, rs };
};

const findShortestPath = (g, s, e) => {
  const { ws, rs } = shortestPaths(g, s, e);
  const vs = [];
  if (ws.get(e) !== Infinity) {
    let v = e, r = rs.get(v);
    while (v !== r) { vs.unshift(v); v = r; r = rs.get(v) }
    vs.unshift(v);
  }
  return vs;
};

module.exports = findShortestPath;

if (require.main === module) {
  require('./test')({ dijkstraFindShortestPath: findShortestPath });
}
