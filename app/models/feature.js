var mongoose = require('mongoose');
mongoose.set('debug', true);

var feature;

var start;
var end;

var newFeature;

var schema = new mongoose.Schema({
    created_at : Date,
    title: String,
    desription: String,
    priority : Number,
    clientId: mongoose.Schema.ObjectId,
    ticketURL: String,
    productId: mongoose.Schema.ObjectId,
    targetDate: Date,
    next: mongoose.Schema.ObjectId,
    prev: mongoose.Schema.ObjectId
    });


schema.methods.insertFeature = function(params, callback) {
    var ObjectId = mongoose.Types.ObjectId;
  
    newFeature = params;
    newFeature.clientId = ObjectId(newFeature.clientId);
    newFeature.productId = ObjectId(newFeature.productId);
    newFeature.created_at = new Date();
    
    feature.findOne({"priority": newFeature.priority, "clientId" : newFeature.clientId}).then(function(foundFeature){
         
         if(foundFeature){
           return  Promise.resolve(foundFeature);
         } else {
      
            return feature.findOne({"prev" : null, "clientId" : newFeature.clientId}).then(function(headFeature){
                
                if(headFeature){
                   return Promise.resolve(headFeature);
                } else {
                    
                    newFeature.next = null;
                    newFeature.prev = null;
                    
                    return feature.create(newFeature).then(function(newNode){
                        
                        return Promise.reject(callback(null, newNode));
                     });
                }
            });
        
         }
         return foundFeature;
        
    }).then(function(startSeqNode){
 
            start = startSeqNode;
            
            if (newFeature.priority > startSeqNode.priority || newFeature.priority < start.priority){
                
                return Promise.resolve(startSeqNode);
            
            } else {
            
                return findSeqEndFromStart(startSeqNode);
            
            }
        
        }).then(function(endSeqNode){
            end = endSeqNode;
            
           if (newFeature.priority > start.priority || newFeature.priority < start.priority ){
                        
                return Promise.resolve(end);
            
            }  else {
                
               var ObjectId = mongoose.Types.ObjectId;
                
                return feature.findById(end._id).then(function(foundNode){
                   return foundNode.update( { $inc: { priority: 1 }}).then(function(){
                    
                            return findPrevAndUpdatePriority(foundNode);
            
                   });
                    return Promise.resolve(foundNode);
                });
                
            
            } 
           
        }).then(function(endSeqNode){
            
            var ObjectId = mongoose.Types.ObjectId;
            
            if (newFeature.priority > endSeqNode.priority){
                
                var id;
                if (endSeqNode.next){
                    id = ObjectId(endSeqNode.next);
                } else {
                    id = null;
                }
                
                newFeature.next = id;
                newFeature.prev = ObjectId(endSeqNode._id);
                
                return feature.create(newFeature).then(function(newNode){
                    feature.findByIdAndUpdate(endSeqNode._id, { $set: { next: ObjectId(newNode._id) }}).then(function(nextNode){
                        return Promise.resolve(newNode);
                    });
                    return Promise.resolve(newNode);
                    });
            } else if (newFeature.priority < endSeqNode.priority){
                   
                var id;
                if (endSeqNode.prev){
                    id = ObjectId(endSeqNode.prev);
                } else {
                    id = null;
    
                }
                    newFeature.next = ObjectId(endSeqNode._id);
                    newFeature.prev = id;
                    
                    return feature.create(newFeature).then(function(newNode){
                        feature.findByIdAndUpdate(endSeqNode.prev, { $set: { next: ObjectId(newNode._id) }}).then(function(prevNode){
                            feature.findByIdAndUpdate(endSeqNode._id, { $set: { prev: ObjectId(newNode._id) }}).then(function(nextNode){
                                
                            return Promise.resolve(newNode);
                            });
                            return Promise.resolve(prevNode);
                        });
                        return Promise.resolve(newNode)
                     });
      
                }
            
        }).then(function(newNode){
            return callback(null, end);
        });  
};
function findPrevAndUpdatePriority(node){
        
    if(start._id.toString() == node._id.toString()){
        if (!node.prev && newFeature.priority == node.Priority){

            return node.update( { $inc: { priority: 1 }}).then(function(){
               return Promise.resolve(node);
            });
        }
      
        node.priority = newFeature.priority + 1;
        return Promise.resolve(node);
    }
    return feature.findByIdAndUpdate(node.prev, { $inc: { priority: 1 }}).then(function(curNode){

        return findPrevAndUpdatePriority(curNode);
        
    });
};
function findSeqEndFromStart(node){
    if(!node.next){
        return Promise.resolve(node);
    }
    return feature.findById(node.next).then(function(nextNode){
       var nextPr = node.priority + 1;
       if ( nextPr != nextNode.priority){
         return Promise.resolve(node);
       } else if (nextPr == nextNode.priority){
           return findSeqEndFromStart(nextNode);
       }
    });
};

function findSeqStartGreaterThen(compare) {
    
   return feature.find({"prev" : null}).then(function(features){
            
        var cur = findNext(features[0], compare);
    
        return cur;
     });
};

function findNext(node, compare){
    
    if (!node.next){

        return Promise.resolve(node);
    }
     if(compare < node.priority){
        
        return Promise.resolve(node);
     };
    return feature.findById(node.next).then(function(nextNode){
                
        return findNext(nextNode, compare);
       
    });
};
feature = mongoose.model('feature', schema);
module.exports = feature;


