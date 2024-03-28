const combinations = (k, n) => {
  const iter = (r, i, l) => (
    (i < k && l + k - i <= n) ?
      [].concat(
        iter(r, i, l + 1), 
        iter(r + (1 << l), i + 1, l + 1)
      )
    : (i == k) ? [r]
    : []
  );
  return (k > 0) ? iter(0, 0, 0) : [];
};

module.exports = combinations;

if (require.main === module) {
  const { asserteq, UnorderedArray: UA } = require('./asserteq');

  asserteq([], combinations(5, 4));
  asserteq([], combinations(0, 5));
  asserteq(UA.of(0b00001, 0b00010, 0b00100, 0b01000, 0b10000), combinations(1, 5));
  asserteq(UA.of(
    0b00111, 0b01011, 0b01101, 0b10011, 0b10101, 0b11001, 
    0b01110, 0b10110, 0b11010,
    0b11100,
  ), combinations(3, 5));
  asserteq([0b11111], combinations(5, 5));
}
