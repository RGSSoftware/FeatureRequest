var MongoClient = require('mongodb').MongoClient;
var database = require('./config/database');

MongoClient.connect(database.localUrl, function(err, db) {
    db.collection('clients').insert([
                                    {"name": "Client B"},
                                    {"name": "Client A"},
                                    {"name": "Client C"}],
                                    function(err, result) {
    
      db.collection('products').insert([{"area": "Policies"},
                                        {"area": "Billing"},
                                        {"area": "Claims"},
                                        {"area": "Reports"}],
                                        function(err, result) {
                                            console.log("Did init Db.");
                                            db.close();
      });
    });
    
});
