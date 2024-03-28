const { asserteq, UnorderedArray: UA } = require('../asserteq');
const { graph } = require('../graph');

const [A, B, C, D, E, F, G, H, I] = Array.from('ABCDEFGHI').map(Symbol);

const bg = graph([
  [A,B],[A,C],
  [B,A],[B,C],
  [C,A],[C,B],[C,D],[C,F],
  [D,C],[D,E],
  [E,D],
  [F,C],[F,G],[F,I],
  [G,F],[G,H],
  [H,G],[H,I],
  [I,F],[I,H]
]);

const bg2 = graph([
  [A,B],[A,C],[A,D],
  [B,A],[B,C],[B,D],
  [C,A],[C,B],[C,D],
  [D,A],[D,B],[D,C]
]);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ bridges, articulationPoints }, n) => loop(Number.parseInt(n) || 1, () => {
  if (articulationPoints) {
    asserteq(UA.of(C, D, F), articulationPoints(bg));
    asserteq([], articulationPoints(bg2));
  }
  if (bridges) {
    asserteq(UA.of(UA.of(C,D), UA.of(C,F), UA.of(D,E)), bridges(bg));
    asserteq([], bridges(bg2));
  }
});

module.exports = test;

if (require.main === module) {
  test({ bridges: require('./bridges') });
  test({ bridges: require('./bridges-fcc') });
  test({ articulationPoints: require('./articulation-points-fcc') });
}
