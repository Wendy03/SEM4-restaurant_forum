const moment = require('moment')
module.exports = {
    ifCond: function(a, b, options) {
        if (a === b) {
            return options.fn(this)
        }
        return options.inverse(this)
    },
    moment: function(a) {
        return moment(a).fromNow()
    },
    inc: function(value, options) {
        return parseInt(value) + 1;
    }
}