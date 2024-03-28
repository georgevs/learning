const findPath = (g, s, t) => {
  const solve = (z, q, r) => {
    if (q.length == 0 || q[0] === t) { return r }
    const u = q.shift();
    g.outEdges(u)
      .filter(e => e.acceptable() && !z.has(e.to()))
      .forEach(e => { z.add(e.to()); q.push(e.to()); r.set(e.to(), e) });
    return solve(z, q, r);
  };
  const path = (r, p, e) => (
    e === undefined ? undefined
    : e.from() === s ? (p.unshift(e), p)
    : path(r, (p.unshift(e), p), r.get(e.from()))
  );
  const r = solve(new Set([s]), [s], new Map);
  return path(r, [], r.get(t));
};

module.exports = findPath;

if (require.main === module) {
  require('./test-find-path')(module.exports, process.argv[2]);
}
