var uuid = require('node-uuid');
var mongodb = require('mongodb'); // 引入mongodb依赖
var dataconfig = require('../config/dataconfig.js'); // 引入mongodb配置
/*
创建mongodb操作对象
*/
var Mainpulation = {
    /*
    @selectall 方法返回全部所有数据
    @dataname  数据库名称
    @dealdata   回调处理函数  格式function(result){};
    */
    selectall: function(dataname, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        //  var tmp1 = {title:'hellodsad'};
                        //  var tmp2 = {title:'worlddsad'};
                        //  collection.insert([tmp1,tmp2],{safe:true},function(err,result){
                        //          console.log(result);
                        //  });
                        collection.find().toArray(function(err, docs) {
                            console.log('find');
                            dealdata(docs);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
    @findAndModify 方法返回查找和修改数据
    @dataname  数据库名称
    @name 查找的名字
    @value 查找值
    @id 自增id
    @dealdata   回调处理函数  格式function(result){};
    */
    findAndModify: function(dataname,name,value,id,dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        console.log("数据库连接成功");
                        collection.findAndModify({name:value}, [],{$inc:{id:1}},function(err,rst){
                            if(err){
                                console.log("error");
                                dealdata("error");
                            }else{
                                dealdata("ok");
                            }
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
    @selectone 查询符合条件的数据
    @dataname 数据库名称
    @selectlanguage 查询控制语句  格式{index:value,index,value};
    @dealdata   回调处理函数  格式function(result){};
    */
    select: function(dataname, selectlanguage, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        collection.find(selectlanguage).toArray(function(err, docs) {
                            console.log('find');
                            dealdata(docs);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
    @insert添加数据格式json格式
    @dataname 数据库名称
    @dealdata 回调函数处理函数有一个result参数
    */
    insert: function(dataname, insertlanguage, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        var uuidBinary = new Buffer(uuid.v1({}, []));
                        var id = mongodb.BSONPure.Binary(uuidBinary, mongodb.BSONPure.Binary.SUBTYPE_UUID);
                        collection.insert(insertlanguage, {
                            safe: true
                        }, function(err, result) {
                            console.log(result+'插入成功');
                            dealdata(result);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
     @update 修改数据的方法
     @update添加数据格式json格式
     @dataname 数据库名称
     @dealdata 回调函数处理函数有一个result参数
     */
    update: function(dataname, updatelanguage,updatecondition, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        collection.update(updatecondition,updatelanguage, {
                            safe: true
                        }, function(err, result) {
                            console.log(result+'修改成功');
                            dealdata(result);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
    @remove  删除数据的方法
    @dataname 数据库名称
    @removelanguage 删除数据的条件
    @dealdata 回调函数处理函数有一个result参数
    */
    remove: function(dataname, removelanguage, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        collection.remove(removelanguage, {
                            safe: true
                        }, function(err, result) {
                            dealdata(result);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    },
    /*
    @remove  删除全部数据的方法
    @dataname 数据库名称
    @dealdata 回调函数处理函数有一个result参数
    */
    removeall: function(dataname, dealdata) {
        var server = new mongodb.Server(dataconfig.dataurl, dataconfig.dataport, {
            auto_reconnect: true
        }); // 创建mongodb服务
        var db = new mongodb.Db(dataconfig.dataname, server, {
            safe: true
        });
        db.open(function(err, db) {
            if (err) {
                console.log('数据库打开失败');
            } else {
                db.createCollection(dataname, {
                    safe: true
                }, function(err, collection) {
                    if (err) {
                        console.log('数据库连接失败');
                    } else {
                        collection.remove({}, {
                            safe: true
                        }, function(err, result) {
                            dealdata(result);
                            db.close();
                        });
                    }
                })
            }
        })
        db.on("close", function(err, data) {
            if (err) {
                console.log("数据库关闭失败");
            }
            console.log('数据库已经关闭');
        });
    }
};
module.exports = Mainpulation;


