var mongoose = require('/db/mongoose.js'),
	Schema = mongoose.Schema;

var MusicSchema = mongoose.Schema({
	name: String,
	title: String,
	comment: {
		language: String,
		short_description: String,
		text: String
	},
	artist: String,
	year: String,
	album: String,
	/*收录时间*/
	addDate: {
		type: Date,
		default: Date.now
	},
	path: String
});
var Music = mongoose.model('music', MusicSchema);

module.exports = Music;