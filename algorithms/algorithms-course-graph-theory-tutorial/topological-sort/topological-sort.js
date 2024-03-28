const topologicalSort = (g) => {
  const rs = [];
  const vs = new Set;
  const visitIfNotVisited = v => vs.has(v) || visit(v);
  const visit = (v) => {
    vs.add(v);
    g.neighbours(v).forEach(visitIfNotVisited);
    rs.unshift(v);
  };
  g.vertices().forEach(visitIfNotVisited);
  return rs;
};

module.exports = topologicalSort;

if (require.main === module) {
  require('./test')(topologicalSort);
}
