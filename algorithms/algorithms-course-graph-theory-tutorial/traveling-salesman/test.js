const { asserteq } = require('../asserteq');

const m = [
  [0,4,1,9],
  [3,0,6,11],
  [4,1,0,2],
  [6,5,-4,0]
];

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ minRouteCost, minRoutePath }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq(9, minRouteCost(m, 0));
  asserteq([0,3,2,1], minRoutePath(m, 0));
});

module.exports = test;

if (require.main === module) {
  test(require('./traveling-salesman'));
}
