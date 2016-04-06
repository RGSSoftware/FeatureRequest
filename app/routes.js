var feature = require('./models/feature');

module.exports = function (app) {

    app.get('/api/features', function (req, res) {
        
        feature.find(function (err, features) {
            if (err) {
                res.send(err);
            }

            res.json(features);
        });
    });

};

