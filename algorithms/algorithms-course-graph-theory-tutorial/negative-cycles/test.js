/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { ncdgxs } = require('../sample-graph-data');
const { directedGraph } = require('../graph');

const ncdg = directedGraph(ncdgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ negativeCycle }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([1, 3, 2], negativeCycle(ncdg));
});

module.exports = test;
