var mongoose = require('../../models/db.js'),
    Schema = mongoose.Schema;
var deptAddSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	name: {
		type: String
	},
	room: {
		type: String
	},
	num: {
		type: Number
	},
	manager: {
		type: String
	},
	tel: {
		type: Number
	},
	duty: {
		type: String
	}

});
//生成方法getModel给予调用，返回user模型
module.exports = { 
    getModel: function () { 
        return _getModel();
    }
};

//通过db将表departments和Schema结构连接在一起，没有表的话会自动产生。
var _getModel = function () { 
    return mongoose.model('departments',deptAddSchema);
};