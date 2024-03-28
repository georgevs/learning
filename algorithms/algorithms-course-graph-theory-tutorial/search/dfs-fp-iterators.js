const { compose, ifilter: filter } = require('../fp');

const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first === undefined) { return false }

  const vs = new Set();
  const filterUnvisited = filter(v => !vs.has(v));
  const unvisitedNeighbours = compose(filterUnvisited);
  const s = [first];
  do {
    const v = s.pop();
    vs.add(v);
    if (fn(v)) { return true }
    s.push(...unvisitedNeighbours(g.neighbours(v)));
  } while (s.length > 0);
  return false;
};

module.exports = { enumVertices };
