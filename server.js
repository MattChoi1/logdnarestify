/*
This is the server.js. 
	It does the following:
	1. Create a server
	2. Create a controller that manages different js files in the directory for easier references
	3. Process post, get, and delete methods
*/


var restify = require('restify');
var	TimeObject = require('./TimeObjectSchema');
var	fs = require('fs');
var	mongoose = require('mongoose');
var controllers = {};
var controllersPath = process.cwd(); //get current directory


//read each file in the directory
fs.readdirSync(controllersPath).forEach(function (file) { 
    if (file.indexOf('.js') != -1) {
    	//get all js files and save it as a dictionry under "controllers" variable
        controllers[file.split('.')[0]] = require(controllersPath + '/' + file); 
    }
})


//declare usages of parsers
var server = restify.createServer(); 
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());


//process post, get, and delete methods
server.post('/time/set/', controllers.time.createTime);
server.del('/time/delete/:id/', controllers.time.deleteTime);
server.get('/time/get/:id/', controllers.time.viewTime);


//listen to designated port
var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port +'\n');
});






