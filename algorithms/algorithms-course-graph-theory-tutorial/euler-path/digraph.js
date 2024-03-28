const digraph = (n, xs) => {
  const vs = Array.from(Array(n), (_, i) => i);
  const oes = Array.from(vs, () => []);
  const ies = Array.from(vs, () => []);
  const vertices = () => vs;
  const outEdges = (v) => oes[v];
  const inEdges = (v) => ies[v];
  const addEdge = (e) => { 
    const [v1, v2] = e; 
    oes[v1].push(e);
    ies[v2].push(e);
  };
  xs.forEach(addEdge);
  return { vertices, outEdges, inEdges };
};

module.exports = digraph;

if (require.main === module) {
  require('./test-euler-path-digraph')({ digraph });
}
