const path = require("path");
const { getPlatform } = require("../lib/platforms");
const { getBuildTarget, getDestinationFromConfig, build } = require("./build");
const { CONFIGFILE_NAME, getPackageConfig } = require("clio-manifest");
const { error } = require("../lib/colors");

exports.command = "host [source]";

exports.describe = "Compile and host Clio file";

exports.builder = {
  source: {
    describe: "source file to host",
    type: "string",
    default: path.resolve("."),
  },
};

exports.handler = (argv) => {
  host(argv.source);
};

async function host(projectPath, ...platformOptions) {
  try {
    await build(projectPath, null, { skipBundle: true });

    const config = getPackageConfig(path.join(projectPath, CONFIGFILE_NAME));
    const target = getBuildTarget(null, config); // No target override
    const destination = getDestinationFromConfig(projectPath, target, config);
    const platform = getPlatform(target);
    if (!platform) {
      throw new Error(`Platform "${target}" is not supported.`);
    }

    return await platform.run(destination, ["--host"], ...platformOptions);
  } catch (e) {
    error(e);
  }
}

exports.host = host;
