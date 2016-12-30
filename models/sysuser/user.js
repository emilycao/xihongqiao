var mongoose = require('../../models/db.js'),
    Schema = mongoose.Schema;
//schema 就是如何定义数据的结构
var UserSchema = new Schema({
    name: {
        type: String,
      },
    password: {
        type: String,
    },
    password1: {
        type: String,
    },
    deptName: {
        type: String,
    },
    job: {
        type: String,
    },
    duty: {
        type: String,
    },
    tel: {
        type: Number,
    },
    moblie: {
        type: Number,
    },
    email: { 
        type: String, 
    },
    logindate: { 
        type: Date,
        "default": Date.now
     }
});
//生成方法getModel给予调用，返回user模型
module.exports = { 
    getModel: function () { 
        return _getModel();
    }
};

//通过db将表user和Schema结构连接在一起，没有表的话会自动产生。
var _getModel = function () { 
    return mongoose.model('users',UserSchema);
};
/*var TestEntity = new userlist({

});
var userDb = function() {};
userDb.prototype.save = function(obj, callback) {
    var newUser = new userlist(obj);
    newUser.save(function (err) {
        if (err) {
            callback(err);
        }else {
            callback(null);
        }
    });
};
userDb.prototype.find = function (name,callback) {
    userlist.findOne({name:name},function (err,obj) {
        callback(err,obj);
    });
}
module.exports = new userDb();*/

