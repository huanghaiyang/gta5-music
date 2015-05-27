var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pili-music');

module.exports = mongoose;