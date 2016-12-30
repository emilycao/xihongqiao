var mongoose = require('../../models/db.js'),
    Schema = mongoose.Schema;
var Product = new Schema({
    image : {
              type : String
          },
    description : {
                      type : String
                  },
    price : {
                type : Number,
                require : true
            },
    probability : {
                      type : Number,
                      require : true
                  },
    status :{
                type : Number,
                require : true,
                default : 1
            },
    categoryId:{
        type:String,
        require:true
    },
    name : {
        type :String,
        require : true
    }
},{
    _id : true,
    autoIndex : true
});

//生成方法getModel给予调用，返回user模型
module.exports = { 
    getModel: function () { 
        return _getModel();
    }
};

//通过db将表departments和Schema结构连接在一起，没有表的话会自动产生。
var _getModel = function () { 
    return mongoose.model('Product',Product);
};