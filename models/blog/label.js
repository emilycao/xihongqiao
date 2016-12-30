var mongoose = require('../../models/db.js'),
    Schema = mongoose.Schema;
var labelSchema = new Schema({
	blogid: {
		type: Schema.Types.ObjectId,//这里即为子表的外键，关联主表。  ref后的blogs代表的是主表blogs的Model。
		ref:'blogs'
	},
	label: {
		type: String //标签名
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
    return mongoose.model('labels',labelSchema);
};