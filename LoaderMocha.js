function LoaderMocha(options) {
    this.options = options || {};
    if (!this.options.ui) {
        this.options.ui = "bdd";
    }
    this.context = {};

    require('!!script!mocha/mocha.js');

    var Mocha = window.Mocha;
    var mocha = this.mocha = new Mocha({ ui: this.options.ui, reporter: function() {} });
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
};

LoaderMocha.prototype.teardownTestContext = function(global) {
    if (this.context) {
        for (var contextVar in this.context) {
            delete global[contextVar];
        }
    }
};

exports = module.exports = LoaderMocha;