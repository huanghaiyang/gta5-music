var mongoose = require('/db/mongoose.js');

var MusicFileSchema = mongoose.Schema({
	path: String,
	description: String
});
MusicFileSchema.methods.getFormat = function() {
	return this.path.replace(/.*\./, "");
};
var MusicFile = mongoose.model('musicFile', MusicFileSchema)

module.exports = MusicFile;