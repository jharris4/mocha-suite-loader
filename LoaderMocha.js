var Mocha = require('mocha/lib/mocha.js');

function LoaderMocha(options) {
    this.options = options || {};
    if (!this.options.ui) {
        this.options.ui = "bdd";
    }
    this.context = {};
    this.mocha = new Mocha({ reporter: function() {} });
    this.mocha.ui(this.options.ui);
    this.mocha.suite.emit('pre-require', this.context, null, this.mocha);
}

LoaderMocha.prototype.setupTestContext = function(global) {
    if (this.context) {
        for (var contextVar in this.context) {
            global[contextVar] = this.context[contextVar];
        }
    }
};

LoaderMocha.prototype.suite = function() {
    return this.mocha.suite;
}

LoaderMocha.prototype.teardownTestContext = function(global) {
    if (this.context) {
        for (var contextVar in this.context) {
            delete global[contextVar];
        }
    }
};

exports = module.exports = LoaderMocha;