// Max Flow Ford-Fulkerson method - https://youtu.be/09_LlHjoEiY?t=17910

const maxFlow = (findPath) => (fg) => {
  let p;
  while ((p = findPath(fg, fg.source(), fg.sink()))) {
    augmentFlow(p);
  }
  return totalFlowToSink(fg);
};

const totalFlowToSink = (fg) => (
  fg.inEdges(fg.sink()).reduce((acc, e) => acc + e.flow(), 0)
);

const augmentFlow = (p) => {
  const d = residualCapacityOf(p);
  p.forEach(e => e.augmentFlow(d));
};

const residualCapacityOf = (p) => (
  Math.min(...p.map(e => e.residualCapacity()))
);

module.exports = maxFlow;
