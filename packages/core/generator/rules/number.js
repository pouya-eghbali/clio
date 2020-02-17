const { Rule } = require("../rule");
const arr = require("../arr");

const make = raw => arr`${raw}`;

class number extends Rule {
  cstToNode() {
    const { raw } = this.cst;
    return make(raw);
  }
}

module.exports = { number };
