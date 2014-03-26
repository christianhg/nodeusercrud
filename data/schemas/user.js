var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: { 
			unique: true 
		} 
	},
	name: {
		first: {
			type: String,
			required: true
		},
		last: {
			type: String,
			required: true
		}
	}
});
module.exports = UserSchema;