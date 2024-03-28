// algorithm: Bellman-Ford single source shortest path O(EV)

const shortestPaths = (g, s) => {
  const ws = new Map(g.vertices().map(v => [v, Infinity]));
  const n = g.vertices().length;
  const xs = g.vertices().flatMap(v1 => g.weights(v1).map(([v2, xw]) => [v1, v2, xw]));

  ws.set(s, 0);

  for (let i = 0; i < n; ++i) {
    for (const [v1, v2, xw] of xs) {
      const w2 = ws.get(v1) + xw;
      if (w2 < ws.get(v2)) {
        ws.set(v2, w2);
      }
    }
  }

  // run twice to handle possible NEGATIVE LOOPS
  for (let i = 0; i < n; ++i) {
    for (const [v1, v2, xw] of xs) {
      const w2 = ws.get(v1) + xw;
      if (w2 < ws.get(v2)) {
        ws.set(v2, -Infinity);   // <--- NEGATIVE LOOP causes the weight to be INFINITY
      }
    }
  }

  return Array.from(ws.entries());
};

module.exports = shortestPaths;

if (require.main === module) {
  require('./test')({ bellmanFordShortestPaths: shortestPaths });
}
