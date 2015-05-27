var mongoose = require('/db/mongoose.js'),
	Schema = mongoose.Schema;

var MusicSchema = mongoose.Schema({
	name: String,
	title: String,
	description: String,
	author: String,
	age: String,
	/*收录时间*/
	addDate: {
		type: Date,
		default: Date.now
	},
	file: [{
		type: Schema.Types.ObjectId,
		ref: 'musicFile'
	}]
});
var Music = mongoose.model('music', MusicSchema);

module.exports = Music;