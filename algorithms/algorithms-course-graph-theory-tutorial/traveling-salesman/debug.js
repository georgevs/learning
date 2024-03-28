const labelState = (rs) => (
  new Map(
    Array.from(rs.entries())
    .map(([s, v]) => [
      labelSet(s), 
      new Map(Array.from(v.entries()).map(([i, w]) => [labelSet(1 << i), w]))
    ])
  )
);

const labels = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
const labelSet = (s) => (
  labels.reduce((acc, l, i) => (s & (1 << i)) != 0 ? acc + l : acc, '')
);

module.exports = { labelSet, labelState };
