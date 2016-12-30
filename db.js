var mongoose = require("mongoose"); //引入mongoose

var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});

mongoose.connect('mongodb://localhost:27017/sfdatabase'); //连接到mongoDB的todo数据库
//该地址格式：mongodb://[username:password@]host:port/database[?options]
//默认port为27017  
module.exports = mongoose;
var TodoSchema = new mongoose.Schema({
    entName: String, 
    fund: Integer , 
    money: Integer,
    code: Integer,
    entTime: Date ,
    gardenTime:  Date 
});

mongoose.model('sfdatabase', TodoSchema); //将该Schema发布为Model