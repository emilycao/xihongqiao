var mongodb = require('mongodb').MongoClient;
var settings = require('../settings');
function Post (entName,fund,money,code,entTime,gardenTime) {
	this.entName = entName;
	this.fund = fund;
	this.money = money;
	this.code = code;
	this.entTime = entTime;
	this.gardenTime = gardenTime;
}
module.exports = Post;

Post.prototype.save = function (callback) {
	var post = {
		entName: this.entName,
		fund: this.fund,
		money: this.money,
		code: this.code,
		entTime: this.entTime,
		gardenTime: this.gardenTime
	};
	//打开数据库
    mongodb.connect(settings.url, function (err, db) {
        if (err) {
            return callback(err); //错误返回err信息
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);	//如果错误返回err
            }
            collection.insert(post, {
                safe: true
            }, function (err) {
                db.close();
                if (err) {
                    return callback(err); //如果错误返回err
                }
                callback(null); //成功，err为null
            });
        });
    });
};

Post.get = function(entName,callback) {
     mongodb.connect(settings.url, function (err, db) {
        if (err) {
            return callback(err); //错误返回err信息
        }
        db.collection('posts', function (err,collection) {
            if (err) {
                db.close();
                return callback(err);   //如果错误返回err
            }
            var query = {};
            if (entName) {
                query.entName = entName;
            }
            collection.find(query).sort({
                time: -1
            }).toArray(function (err,docs) {
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null,docs);
            });
        });
    });
}