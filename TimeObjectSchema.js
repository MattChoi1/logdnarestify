/*
This is the TimeObjectSchema.js. 
	It does the following:
	1. It creates detailed scheme of our Time object and declares each variable type. (uses mongoose)
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectSchema = new Schema({
	_id: Number,
	UTCTime: String,
	Zone: String,
	CurrentTime: String 
});

module.exports = mongoose.model('Time',ObjectSchema);





