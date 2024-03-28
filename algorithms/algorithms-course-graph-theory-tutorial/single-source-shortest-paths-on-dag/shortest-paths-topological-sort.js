// algorithm: Topological sort shortest paths
// https://youtu.be/09_LlHjoEiY?t=4193 

const topologicalSort = require('../topological-sort/topological-sort');

const shortestPaths = (g, s) => {
  const vs = topologicalSort(g);
  const rs = new Map(vs.map(v => [v, Infinity]));
  const visit = (v, rw) => {
    g.weights(v).forEach(([v2, w2]) => {
      const rw2 = Math.min(rw + w2, rs.get(v2));
      rs.set(v2, rw2);
      visit(v2, rw2);
    }); 
  };
  rs.set(s, 0);
  vs.forEach(v => { const rw = rs.get(v); if (rw !== Infinity) visit(v, rw) });
  return Array.from(rs.entries());
};

module.exports = shortestPaths;

if (require.main === module) {
  require('./test')({ topologicalSortShortestPaths: shortestPaths });
}
