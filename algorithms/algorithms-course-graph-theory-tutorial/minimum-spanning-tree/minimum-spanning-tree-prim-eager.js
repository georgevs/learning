const queue = require('../indexed-priority-queue-heap-simple');

const minimumSpanningTree = (g) => {
  const n = g.vertices().length;
  if (n == 0) { return [] }

  const rs = [];
  const sortByWeight = (l, r) => l[2] - r[2];
  const q = queue(sortByWeight);
  const s = new Set;
  const other = ([v1, v2], v) => v1 === v ? v2 : v1;

  const iter = (v) => {
    // console.log('v', v);
    s.add(v);
    g.edges(v).forEach(e => enqueue(other(e, v), e));
    const [e, u] = dequeue();
    rs.push(e);
    if (rs.length + 1 < n) { iter(u) }
  };

  const enqueue = (u, e) => {
    if (s.has(u)) { return }
    if (!q.has(u) || e[2] < q.get(u)[2]) { q.enqueue(u, e) }
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
