const eulerPath = (g) => {
  if (!g.hasEulerPath()) { return [] }

  const rs = [];
  const s = new Set;
  const other = ([v1, v2], v) => v1 == v ? v2 : v1;
  const dfs = (v1) => {
    for (const e of g.outEdges(v1)) {
      if (!s.has(e)) {
        s.add(e);
        dfs(other(e, v1));
      }
    }
    rs.unshift(v1);
  };
  dfs(g.first());

  return rs;
};

module.exports = eulerPath;

if (require.main === module) {
  require('./test-euler-path-graph')({ eulerPath });
  require('./test-euler-path-digraph')({ eulerPath });
}
