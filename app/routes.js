var feature = require('./models/feature');
var client = require('./models/client');

module.exports = function (app) {

    app.get('/api/features', function (req, res) {
        
        feature.find(function (err, features) {
            if (err) {
                res.send(err);
            }

            res.json(features);
        });
    });
    
    app.get('/api/clients', function (req, res) {
        
        var query = client.find().
        exec(function (err, clients) {
                        if (err) {
                res.send(err);
            }

            res.json(clients);
        });
        
       
        
       
    });
    
    
    

};

