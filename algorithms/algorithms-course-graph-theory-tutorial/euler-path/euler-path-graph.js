const graph = require('./graph');

const eulerPathGraph = (n, xs) => {
  const g = graph(n, xs);
  
  const first = () => {
    let i0;
    const vs = g.vertices();
    for (let i = 0; i < vs.length; ++i) {
      if (isOdd(vs[i])) { return vs[i] }
      if (i0 == undefined) { i0 = i }
    }
    return vs[i0];
  };
  
  const hasEulerPath = () => (
    g.vertices().filter(isOdd).length <= 2
  );

  const isOdd = (v) => g.edges(v).length % 2 != 0;
  const outEdges = g.edges;

  return { ...g, outEdges, first, hasEulerPath };
};

module.exports = eulerPathGraph;

if (require.main === module) {
  require('./test-euler-path-graph')({ eulerPathGraph });
}
