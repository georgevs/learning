const findPath = require('./find-path-dfs-recursive');
const maxFlow = require('./max-flow-ford-fulkerson');

module.exports = maxFlow(findPath);

if (require.main === module) {
  require('./test-max-flow')(module.exports, process.argv[2]);
}
