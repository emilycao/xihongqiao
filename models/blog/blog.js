var mongoose = require('../../models/db.js'),
    Schema = mongoose.Schema;
var blogSchema = new Schema({
	title: {
		type: String //博客题目
	},
	abstract: {
		type: String //摘要
	},
	content: {
		type: String //文章内容
	},
	click: {
		type: Number //点击量
	},
	createtime: {
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

//通过db将表departments和Schema结构连接在一起，没有表的话会自动产生。
var _getModel = function () { 
    return mongoose.model('blogs',blogSchema);
};