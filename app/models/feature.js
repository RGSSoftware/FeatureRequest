var mongoose = require('mongoose');
mongoose.set('debug', true);

module.exports = mongoose.model('feature', {
    title: String
});
