var mongodb = require('mongodb').MongoClient;
var settings = require('../settings');
function Student (userId,userName,accountName,accountPassword,roleType,schoolName,schoolClassName) {
	this.userId = userId;
	this.userName = userName;
	this.accountName = accountName;
	this.accountPassword = accountPassword;
	this.roleType = roleType;
	this.schoolName = schoolName;
    this.schoolClassName = schoolClassName;
}
module.exports = Student;

Student.get = function(userName,callback) {
     mongodb.connect(settings.url, function (err, db) {
        if (err) {
            return callback(err); //错误返回err信息
        }
        db.collection('students', function (err,collection) {
            if (err) {
                db.close();
                return callback(err);   //如果错误返回err
            }
            var query = {};
            if (userName) {
                query.userName = userName;
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