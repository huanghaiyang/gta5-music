var commander = require('commander');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var dbInfo = require('../db/info');
var url = dbInfo.address;
var collection = 'configs';

commander.option('-d --dirpath <dirpath>', '设置文件夹路径').option('-s --setdirpath <setdirpath>', '设置文件夹路径，并且保存到系统中').parse(process.argv);
var dirpath = commander.dirpath;
var setdirpath = commander.setdirpath;

function setExports(value) {
	module.exports = {
		dirpath: value
	};
};

if (!dirpath) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
		var cursor = db.collection(collection).find({
			name: 'dirpath'
		});
		if (setdirpath) {
			if (cursor.length > 0) {
				db.collection(collection).update({
					name: 'dirpath',
					value: setdirpath
				}, function(err, results) {
					assert.equal(null, err);
					db.close();
					setExports(setdirpath);
				});
			} else {
				db.collection(collection).insertOne({
					name: 'dirpath',
					value: setdirpath
				}, function(err, results) {
					assert.equal(null, err);
					db.close();
					setExports(setdirpath);
				});
			}
		} else {
			if (cursor.length > 0) {
				cursor.each(function(err, doc) {
					assert.equal(null, err);
					if (doc) {
						setExports(doc.value);
					}
				});
			}
		}
	});
} else {
	setExports(dirpath);
}