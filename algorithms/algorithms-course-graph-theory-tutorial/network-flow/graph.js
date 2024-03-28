class Graph {
  constructor(n, exs) {
    this.vs = Array.from(Array(n), (_, v) => v);
    this.oxs = Array.from(this.vs, () => []);
    this.ixs = Array.from(this.vs, () => []);
    this.exs = new Set;
    exs.forEach(e => {
      this.oxs[e.from()].push(e);
      this.ixs[e.to()].push(e);
      this.exs.add(e);
    });
  }
  vertices() { return this.vs }
  edges() { return this.exs }
  outEdges(v) { return this.oxs[v] }
  inEdges(v) { return this.ixs[v] }
}

module.exports = Graph;
