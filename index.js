/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Jon Harris @jharris4
*/
var path = require("path");
var loaderUtils = require("loader-utils");

module.exports = function() {};
module.exports.pitch = function(req) {
	this.cacheable && this.cacheable();
	var query = loaderUtils.parseQuery(this.query);
    var ui = JSON.stringify(query["interface"] || "bdd");
    var decorate = query["decorate"] === 'true';
	var source = [];
	if(this.target == "web") {
		source.push("var LoaderMocha = require(" + JSON.stringify(path.join(__dirname, "LoaderMocha.js")) + ");");
		source.push("var loaderMocha = new LoaderMocha({ ui: " + ui + "})");
		source.push("loaderMocha.setupTestContext(window);");
		source.push("require(" + JSON.stringify("!!" + req) + ")");
		source.push("loaderMocha.teardownTestContext(window);");
        source.push("var suite = loaderMocha.suite();");
        source.push("console.log(\"this.query: \", " + JSON.stringify(this.query) + ");");
        source.push("console.log(\"query: \", " + JSON.stringify(query) + ");");
        source.push("console.log(\"query ui: " + JSON.stringify(query["ui"]) + "\");");
        source.push("console.log(\"query decorate: " + JSON.stringify(query["decorate"]) + "\");");
        if (decorate) {
            source.push("suite.module = {};");
            source.push("suite.module.id = " + module.id + ";");
            source.push("suite.module.file = " + this.resource + ";");
        }
		source.push("var exports = module.exports = suite;");

	} else {
		throw new Error("Unsupported target environment " + this.target);
	}
	return source.join("\n");
}
