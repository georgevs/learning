const findPath = (g, s, t) => {
  const solve = () => {
    const vs = new Set([s]);
    const q = [s];
    const r = new Map;
    while (q.length > 0) {
      const u = q.shift();
      for (const e of g.outEdges(u)) {
        if (e.acceptable()) {
          const v = e.to();
          if (v == t) { r.set(v, e); return r }
          if (!vs.has(v)) {
            vs.add(v);
            q.push(v);
            r.set(v, e);
          }
        }
      }
    }
  };
  const path = (r) => {
    if (!r) { return }
    const p = [];
    let e;
    for (e = r.get(t); e.from() !== s; e = r.get(e.from())) {
      p.unshift(e);
    }
    p.unshift(e);
    return p;
  };
  return path(solve());
};

module.exports = findPath;

if (require.main === module) {
  require('./test-find-path')(module.exports, process.argv[2]);
}
