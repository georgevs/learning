/*
seq 1 | xargs -L1 time node -e 'require("./test")(require(process.argv[1]),process.argv[2])'
*/

const { asserteq } = require('../asserteq');
const { ccgxs } = require('../sample-graph-data');
const { graph } = require('../graph');

const ccg = graph(ccgxs);

const loop = (n, fn) => { for (let i = 0; i < n; ++i) fn(i) };
const test = ({ connectedComponents }, n) => loop(Number.parseInt(n) || 1, () => {
  asserteq([[0,4,8,13,14],[1,5,16,17],[6,7,11],[2,3,9,10,15],[12]], connectedComponents(ccgxs));
});

module.exports = test;
