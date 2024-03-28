const findPath = (g, s, t) => {
  const iter = (v, vs, p) => {
    if (v === t) { return p }
    for (const e of g.outEdges(v)) {
      if (e.acceptable()) {
        const u = e.to();
        if (!vs.has(u)) {
          const r = iter(u, new Set([...vs, u]), [...p, e]);
          if (r !== undefined) { return r }
        }
      }
    }
  }
  return iter(s, new Set([s]), []);
};

module.exports = findPath;

if (require.main === module) {
  require('./test-find-path')(module.exports, process.argv[2]);
}
