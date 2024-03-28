// Max Flow Ford-Fulkerson method - https://youtu.be/09_LlHjoEiY?t=17910

const Graph = require('./graph');

class Edge {
  constructor(from, to) {
    this.from_ = from;
    this.to_ = to;
  }
  from() { return this.from_ }
  to() { return this.to_ }
  acceptable() { return this.residualCapacity() > 0 }
}

class FlowEdge extends Edge {
  constructor(from, to, capacity, flow = 0) {
    super(from, to);
    this.flow_ = flow;
    this.capacity_ = capacity;
  }
  flow() { return this.flow_ }
  capacity() { return this.capacity_ }
  residualCapacity() { return this.capacity_ - this.flow_ }
  augmentFlow(delta) { this.flow_ += delta }
}

class ResidualEdge extends Edge {
  constructor(flowEdge) {
    super(flowEdge.to(), flowEdge.from());
    this.flowEdge_ = flowEdge;
  }
  residualCapacity() { return this.flowEdge_.flow() }
  augmentFlow(delta) { this.flowEdge_.augmentFlow(-delta) }
}

class FlowGraph extends Graph {
  constructor(n, xs, s, t) {
    const exs = xs.flatMap(([v1, v2, c]) => {
      const fe = new FlowEdge(v1, v2, c);
      const re = new ResidualEdge(fe);
      return [fe, re];
    });
    super(n, exs);
    this.s = s;
    this.t = t;
  }
  source() { return this.s }
  sink() { return this.t }
}

module.exports = FlowGraph;
