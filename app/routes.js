var feature = require('./models/feature');
var client = require('./models/client');
var product = require('./models/product');

module.exports = function (app) {

    app.get('/api/features', function (req, res) {
        
        var ObjectId = require('mongoose').Types.ObjectId;
        
        var query = {};
        if (req.query.clientId){ 
            query["clientId"] = new ObjectId(req.query.clientId);
        } 
        
        query["priority"] =  Number(req.query.priority);
        
        if(!query["clientId"] && !query["priority"]){
         query = {};
        }
        
        feature.find(query, function (err, features) {
            if (err) {
                res.send(err);
            }
    
            res.json(features);
        });
    });
    
    app.post('/api/features',function (req,res){

        var featureModel = new feature(); 
        featureModel.insertFeature(JSON.parse(JSON.stringify(req.body)), function (err, features) {
            if (err) {
                res.send(err);
            }
    
            res.json([features]);
        });
    })
    
    app.get('/api/clients', function (req, res) {
        var ObjectId = require('mongoose').Types.ObjectId;
        
        var query = {};
        if(req.query.id){
            query["_id"] = new ObjectId(req.query.id);
            
        }
        client.find(query).
        exec(function (err, clients) {
            if (err) {
                res.send(err);
            }
            res.json(clients);
        });
    });
    
    app.get('/api/products', function (req, res) {
        
        var ObjectId = require('mongoose').Types.ObjectId;
        
        var query = {};
        if(req.query.id){
            query["_id"] = new ObjectId(req.query.id);
            
        }
        product.find(query).
        exec(function (err, products) {
                        if (err) {
                res.send(err);
            }
    
            res.json(products);
        });
    });
    
};

