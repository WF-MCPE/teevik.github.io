const glob = require("glob");
const fs = require("fs");
const yaml = require("js-yaml");

module.exports.portfolioItems = yaml.safeLoad(fs.readFileSync(`${__dirname}/portfolio-items.yml`, "utf8"));
