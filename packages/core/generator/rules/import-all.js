const { Rule } = require("../rule");
const arr = require("../arr");

const make = path => arr`scope.extend(require(${path}))`;

class importAllStatement extends Rule {
  cstToNode() {
    const { path } = this.cst;
    const processedPath = this.generate(path);
    return make(processedPath);
  }
}

module.exports = { importAllStatement };
