/*
This is time.js. 
    It does the following:
    1. Process instructions depending on methods given by server
    2. Open up connections with MongoDB mLab database and perform CRUD operations
*/


var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var TimeObject = require('./TimeObjectSchema');


/*
This function inserts/updates a document into "timedatabase" collection from MongoDB mLab.
If a document with already-existing id, it updates the document. Otherwise, it inserts a new document.
This function uses POST method.
*/
exports.createTime = function(req, res, next) {
    var splitTime = (req.body.UTCTime).split(':'); //get UTCTime from body
    var calculation = (parseInt(splitTime[0]) + parseInt(req.body.Zone)) % 24; //add UTC time with the offset
    var currentTime = calculation.toString() + ':'+ splitTime[1] + ':' + splitTime[2]; //save the output in currentTime
    
    //Creating Time object with schema based on TimeObjectSchema
    var TimeModel = new TimeObject({
        _id: parseInt(req.body._id),
        UTCTime: req.body.UTCTime,
        Zone: req.body.Zone,
        CurrentTime: currentTime
    });

    console.log('Created/Updated:\n '+TimeModel + '\n');
    //Open connection with MongoDB
    MongoClient.connect('mongodb://id:password@ds137801.mlab.com:37801/logdnarestify',function(err,db){
        //Search collection named "timedatabase"
        db.collection('timedatabase', function(err,collection){
            //Insert or update the document
            collection.save(TimeModel,function(err,savedData){
                if (!err) {
                    res.json(TimeModel);
                } 
            });
        });
    });
}


/*
This function searches a specific document with the user-requested id.
This function uses GET method.
*/
exports.viewTime = function(req, res, next) {
    //Open connection with MongoDB
    MongoClient.connect('mongodb://id:password@ds137801.mlab.com:37801/logdnarestify',function(err,db){
        //Search collection named "timedatabase"
        db.collection('timedatabase', function(err,collection){
            //Search document with the given id"
            collection.find({'_id':parseInt(req.params.id)}).toArray(function(err,foundData){
                if (err) {
                    res.status(500);
                    res.json({
                        type: false,
                        data: 'Error occured: ' + err
                    })
                } else {
                    res.json(foundData);
                }
            });
        });
    });
}


/*
This function searches a specific document with the user-requested id and removes it from the database.
This function uses DELETE method.
*/ 
exports.deleteTime = function(req, res, next) {
    //Open connection with MongoDB
    MongoClient.connect('mongodb://id:password@ds137801.mlab.com:37801/logdnarestify',function(err,db){
        //Search collection named "timedatabase"
        db.collection('timedatabase', function(err,collection){
            console.log(req.params.id);
            //Remove the document with the given id.
            collection.remove({'_id':parseInt(req.params.id)},function(err,foundData){
                if (err) {
                    res.status(500);
                    res.json({
                        type: false,
                        data: 'Error occured: ' + err
                    })
                } else {
                    res.json({
                        type: true,
                        data: 'TimeObject: ' + req.params.id + ' deleted successfully'
                    })
                }
            });
        });
    });
}
