const graph = (n, xs) => {
  const vs = Array.from(Array(n), (_, v) => v);
  const vxs = Array.from(vs, () => []);
  const vertices = () => vs;
  const edges = (v) => vxs[v];
  const addEdge = (e) => {
    const [v1, v2] = e;
    // if (v1 <= v2) {
      vxs[v1].push(e);
      vxs[v2].push(e);
    // }
  };
  xs.forEach(addEdge);
  return { vertices, edges };
};

module.exports = graph;

if (require.main === module) {
  require('./test')({ graph });  
}
