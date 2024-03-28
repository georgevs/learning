const logff = (log) => true ? { log, logf: (p, fn) => p ? (...args) => (log(p,...args), fn(...args)) : fn } : { log: () => void 0, logf: (_, fn) => fn };
module.exports = logff(console.log);
