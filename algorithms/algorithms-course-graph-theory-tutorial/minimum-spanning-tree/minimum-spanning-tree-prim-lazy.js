const queue = require('../priority-queue-heap');

const minimumSpanningTree = (g) => {
  const n = g.vertices().length;
  if (n == 0) { return [] }

  const rs = [];
  const sortByWeight = (l, r) => l[2] - r[2];
  const q = queue(sortByWeight);
  const s = new Set;

  const iter = (v) => {
    // console.log('v', v);
    s.add(v);
    g.edges(v).forEach(enqueue);
    const [e, u] = dequeue();
    rs.push(e);
    if (rs.length + 1 < n) { iter(u) }
  };

  const enqueue = (e) => {
    const [v1, v2] = e;
    if (!s.has(v1) || !s.has(v2)) { q.enqueue(e) }
  };
  
  const dequeue = () => {
    for (;;) {
      if (q.empty()) { throw Error() }
      const e = q.dequeue();
      // console.log('e', e);
      const [v1, v2] = e;
      if (!s.has(v1)) { return [e, v1] }
      if (!s.has(v2)) { return [e, v2] }
    }
  };

  try { iter(g.vertices()[0]) } catch { return [] }
  return rs;
};

module.exports = minimumSpanningTree;

if (require.main === module) {
  require('./test')(minimumSpanningTree);
}
