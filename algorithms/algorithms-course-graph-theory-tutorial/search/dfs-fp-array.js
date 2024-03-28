const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first === undefined) { return false }

  const vs = new Set();
  const unvisited = (v) => !vs.has(v);
  const s = [first];
  do {
    const v = s.pop();
    vs.add(v);
    if (fn(v)) { return true }
    s.push(...g.neighbours(v).filter(unvisited));
  } while (s.length > 0);

  return false;
};

module.exports = { enumVertices };
