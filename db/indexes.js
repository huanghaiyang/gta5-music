/*为数据库创建索引*/
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var dbInfo = require('./info');

var url = dbInfo.address;

// 各表索引定义
var collections = {
	musics: [{
		name: 1
	}, {
		title: 1
	}, {
		album: 1
	}, {
		artist: 1
	}, {
		addDate: 1
	}]
};

/*打开数据库连接并操作*/
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log("connect success.");
	for (var i in collections) {
		for (var j in collections[i]) {
			db.collection(i).ensureIndex(collections[i][j]);
		}
	}
	db.close();
});