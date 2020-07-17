const fs = require("fs");
const path = require("path");

const makeStartScript = (config, target, destination) => {
  const { transports, workers, main, executor } = config;
  fs.writeFileSync(
    path.join(destination, "rpc.json"),
    JSON.stringify({ transports, workers, executor }, null, 2)
  );
  fs.writeFileSync(
    path.join(destination, "start.js"),
    `const { rpc } = require("clio-internals");\n` +
      `const config = require("./rpc.json");\n` +
      `const scope = require("./${main}.js");\n` +
      `rpc.init(scope, config);`
  );
};

module.exports.makeStartScript = makeStartScript;