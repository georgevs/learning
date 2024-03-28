const enumVertices = (fn, g) => {
  const first = g.vertices().next().value;
  if (first === undefined) { return false }
  
  const vs = new Set([first]);
  const s = [first];
  do {
    const v = s.shift();
    if (fn(v)) { return true }
    for (const v2 of g.neighbours(v)) {
      if (!vs.has(v2)) {
        vs.add(v2);
        s.push(v2);
      }
    }
  } while (s.length > 0);
  
  return false;
};

module.exports = { enumVertices };
