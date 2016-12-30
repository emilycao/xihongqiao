var crypto = require('crypto'),
	  user = require('../models/sysuser/user.js'), //用户
	  blog = require('../models/blog/blog.js'),
	  label = require('../models/blog/label.js'),
	  product = require('../models/product/product.js'),
	  category = require('../models/product/category.js'),
	  deptAdd = require('../models/department/deptAdd.js'),//部门管理添加
	  Post = require('../models/post.js'),
	  Student = require('../models/student.js'),
	  site = require('../config/site.js'),
	  dbHelper = require('../models/dbHelper.js');

module.exports = function(app) {
	app.get('/',function (req,res,next) {
		 res.redirect('/login');
	});
	app.get('/register',checkNotLogin);
	app.get('/register',function (req,res) {
		res.render('register', { 
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	});
	app.post('/register',checkNotLogin);
	app.post('/register',function (req,res) {
		var User = user.getModel();
		var uname = req.body.uname,
			email = req.body.email;
		var md5 = crypto.createHash('md5'),
			upwd = md5.update(req.body.upwd).digest('hex');
		User.findOne({name:uname},function (err,doc) {
			if (err) {
				req.flash('error','网络异常错误！');
				return res.redirect('/register');
				console.log(err);
			}else if(doc) {
				req.flash('error', '用户名已存在！');
				return res.redirect('/register');//返回注册页
			}else {
				User.create({
					name: uname,
					password: upwd,
					email: email
				},function (err,doc) {
					if (err) {
						res.send(500);
						console.log(err);
					}else{
						req.flash('success', '用户名创建成功！');
						res.redirect('/index');//注册成功后返回主页
					}
				});
			}
		});
	});
	app.get('/login',checkNotLogin);
	app.get('/login',function (req,res) {
		res.render('login', { 
	      user: req.session.user,
	      success: req.flash('success').toString(),
	      error: req.flash('error').toString()
	    });
	});
	app.post('/login',checkNotLogin);
	app.post('/login',function (req,res) {
		var User = user.getModel();
		var uname = req.body.uname; 
		var md5 = crypto.createHash('md5'),
			upwd = md5.update(req.body.upwd).digest('hex');
		User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.flash('error','用户名不存在');
            res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            if(upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.flash('error',' "密码错误"');
                //res.send(404);
            	res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                //res.send(200);
            	res.redirect("/index");
            }
        }
    });
	});
	//退出系统
	app.get('/logout',function (req,res) {
		req.session.user = null;
		req.flash('success','退出成功！');
		res.redirect('/');
	});
	//首页页面
	app.get('/index',checkLogin);
	app.get('/index',function(req,res) {
		var data = {
		    list : [
		    	{
				    "name": "首页",
				    "level":1,
				    "url":"/home"
			    },
			    {
			    	"name":"基础信息管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name": "园区概况",
				    		"url":"/blog"	
			    		},
			    		{
			    			"name": "政策法规",
				    		"url":"/blogAdd"	
			    		},
			    		{
			    			"name": "园区风采",
				    		"url":"/productAdd"	
			    		},
			    		{
			    			"name": "分园风采",
				    		"url":"/categoryAdd"	
			    		},
			    		{
			    			"name": "市政配套",
				    		"url":""	
			    		},
			    		{
			    			"name": "办事大厅",
				    		"url":""	
			    		},
			    		{
			    			"name": "办事指南",
				    		"url":""	
			    		},
			    		{
			    			"name": "关于我们",
				    		"url":""	
			    		},
			    		{
			    			"name": "楼宇管理",
				    		"url":""	
			    		},{
			    			"name": "卡片管理",
				    		"url":""	
			    		},
			    		{
			    			"name": "车位管理",
				    		"url":""	
			    		}
			    	]
			    },
			    {
			    	"name":"系统管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"部门管理",
			    			"url":"/dept"
			    		},
			    		{
			    			"name":"用户管理",
			    			"url":"/sysuser"
			    		},
			    		{
			    			"name":"角色管理",
			    			"url":"/sysrole"
			    		},
			    		{
			    			"name":"权限管理",
			    			"url":"/sysright"
			    		},
			    		{
			    			"name":"日志管理",
			    			"url":""
			    		},
			    		{
			    			"name":"审批流程管理",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"招商管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"招商概况",
			    			"url":""
			    		},
			    		{
			    			"name":"客户管理",
			    			"url":"/qzkh"
			    		},
			    		{
			    			"name":"信息管理",
			    			"url":""
			    		},
			    		{
			    			"name":"网上招商",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"资产定位管理",
			    	"level":2,
			    	"submenu": [
			    		{
			    			"name":"资产申购",
			    			"url":""
			    		},
			    		{
			    			"name":"领用调拨",
			    			"url":""
			    		},
			    		{
			    			"name":"运营维护",
			    			"url":""
			    		},
			    		{
			    			"name":"资产价值管理",
			    			"url":""
			    		},
			    		{
			    			"name":"统计分析",
			    			"url":""
			    		},
			    		{
			    			"name":"资产定位",
			    			"url":""
			    		},
			    		{
			    			"name":"人员定位",
			    			"url":""
			    		},
			    	]
			    },
			    {
			    	"name":"智慧办公平台",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"园区新闻",
			    			"url":""
			    		},
			    		{
			    			"name":"园区公告",
			    			"url":""
			    		},
			    		{
			    			"name":"园区活动",
			    			"url":""
			    		},
			    		{
			    			"name":"个人中心",
			    			"url":""
			    		},
			    		{
			    			"name":"行政办公",
			    			"url":""
			    		},
			    		{
			    			"name":"档案管理",
			    			"url":""
			    		},
			    	]
			    },
			    {
			    	"name":"服务中心",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"服务概况",
			    			"url":""
			    		},
			    		{
			    			"name":"园区服务",
			    			"url":""
			    		},
			    		{
			    			"name":"政府服务",
			    			"url":""
			    		},
			    		{
			    			"name":"企业服务",
			    			"url":""
			    		},
			    		{
			    			"name":"第三方服务",
			    			"url":""
			    		},
			    		{
			    			"name":"信用评定",
			    			"url":""
			    		},
			    		{
			    			"name":"服务机构管理",
			    			"url":""
			    		}
			    	]
			    },
			    {
			    	"name":"一卡通管理",
			    	"level":2,
			    	"submenu":[
			    		{
			    			"name":"充值管理",
			    			"url":""
			    		}
			    	]
			    }
		],
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	};
		res.render('index',data);
	});
	//home
	app.get('/home',function(req,res) {
		res.render('home');
	});
	app.get('/submit',function(req,res) {
		Post.get(null,function (err,posts) {
			if (err) {
				posts = [];
			}
			res.render('investment/submit.html',{
				posts: posts
			});
		});

	});
	/**
	 * Product
	 */
	app.get('/productAdd',checkLogin);
	app.get('/productAdd',function (req,res) {
		var Product = product.getModel();
		var Category = category.getModel();
	        var image =  'images/3.jpg',
	        	name = '侏罗纪咖啡',
		        descript = '这个产品挺好的',
		        price = 20.12,
		        probability = 100,
		        status = 1,
		        categoryId = "585b8ebdea91bedf60241236";
	    var data = {image:image,name:name,description:descript,price:price,probability:probability,status:status,categoryId:categoryId};
	    /*dbHelper.addData(Product,data,function(result) {
	        res.send(result);
	    });*/
	    Product.create(data, function(err,Productresult){
	    	if(err){
	            console.log(err);
	        }else{
	            Category.find({"_id":"585b8ebdea91bedf60241236"},{},{},function(err,result){
	                console.log("category.find==="+result);
	                console.log("product._id==="+Productresult._id);
	                
                	result[0].child.push(Productresult._id);
                	console.log("result[0]=="+result[0]);
	                Category.create(result[0],function(err){
	                   console.log('ok!')
	                });
	                
	            })
	        }
	    });
	});
	/**
	 * Category
	 */
	app.get('/categoryAdd',checkLogin);
	app.get('/categoryAdd',function (req,res) {
		var Category = category.getModel();
	        var image =  '/2.jpg',
	        	name = '剑齿龙咖啡',
		        price = 15,
		        probability = 100;
	    var data = {image:image,name:name,price:price,probability:probability};
	    dbHelper.addData(Category,data,function(result) {
	        res.send(result);
	    });
	});
	/**
	 * 博客
	 */
	app.get('/blog',checkLogin);
	app.get('/blog', function (req,res) {
		res.render('blog/bloglist.html',site.setting(req,'/blog'));
	});
	/**
	 * 博客添加
	 */
	app.get('/blogAdd',checkLogin);
	app.get('/blogAdd', function (req,res) {
		res.render('blog/blogAdd.html',site.setting(req,'/blog'));
	});
	app.post('/blogAdd',checkLogin);
	app.post('/blogAdd', function (req,res) {
		var Blog = blog.getModel();
		var title = req.body.title,
			abstract = req.body.abstract,
			post = req.body.post;
		var data = {title:title,abstract:abstract,content:post};
		dbHelper.addData(Blog,data,function(result) {
	        res.send(result);
	    });
	});

	//基本情况表
	app.get('/jbqkb',checkLogin);
	app.get('/jbqkb',function(req,res) {
		res.render('investment/qzqkhxq.html',site.setting(req,'/investment'));
	});

	app.post('/jbqkb',function(req,res) {
		var post = new Post(req.body.entName,req.body.fund,req.body.money,req.body.code,req.body.entTime,req.body.gardenTime);
		post.save(function (err) {
			if (err) {
				req.flash('error',err);
				return res.redirect('/');
			}
			req.flash('success', '发布成功!');
    		res.redirect('/submit');//发表成功跳转到主页
		});
	});

	//潜在期客户基础情况表
	app.get('/jcxx',function(req,res) {
		res.render('investment/jbqkb.html',site.setting(req,'/investment'));
	});
	
	//潜在期客户
	app.get('/qzkh',function(req,res) {
		res.render('investment/qzqkh.html',site.setting(req,'/investment'));
	});
	////潜在期客户基础情况表编辑
	app.get('/khqzbj',function(req,res) {
		res.render('investment/khqzbj.html',site.setting(req,'/investment'));
	});
	//目标期客户
	app.get('/mbqkh',function(req,res) {
		res.render('investment/mbqkh.html',site.setting(req,'/investment'));
	});
	//系统管理管理
	app.get('/dept',checkLogin);
	app.get('/dept', function (req,res) {
		res.render('system/department/department.html',site.setting(req,'/system'));
	});
	//部门管理添加
	app.get('/deptAdd',checkLogin);
	app.get('/deptAdd', function (req,res) {
		res.render('system/department/deptAdd.html',site.setting(req,'/system'));
	});
	app.post('/deptAdd',checkLogin);
	app.post('/deptAdd', function (req,res) {
		var dAdd = deptAdd.getModel();
		var name = req.body.dname,
			room = req.body.droom,
			num = req.body.dnum,
			manager = req.body.dmanager,
			tel = req.body.dtel,
			duty = req.body.duty;
		var data = {name:name,room:room,num:num,manager:manager,tel:tel,duty:duty};
		dbHelper.addData(dAdd,data,function(result) {
	        res.send(result);
	    });
	});
	app.get('/deptAdata',checkLogin);
	app.get('/deptAdata',function(req,res) {
		var dAdd = deptAdd.getModel();
		var conditions ={};
		var fields   = {};
    	var options  = {};
		var page = req.query.page || 1;
		dbHelper.pageQuery(page,10, dAdd, '', {}, {},function(error,result){
			console.log("select查询结果");
		    console.log(result);
		    res.send(result);
		});
	});
	//部门管理编辑
	app.get('/deptEdit',checkLogin);
	app.get('/deptEdit',function(req,res) {
		var dAdd = deptAdd.getModel();
		var id = req.query.id; 
		var conditions ={"_id":id};
		var fields   = {};
    	var options  = {upsert:false};
		dbHelper.findData(dAdd,conditions,fields,options,function(departments) {
		    //res.send(departments.datas);
		    var datas = departments.datas;
		    console.log(datas);
		    res.render('system/department/deptEdit.html',{
		    	departments: datas
		    });
		});
	});
	//部门管理编辑保存
	app.post('/deptEdit',checkLogin);
	app.post('/deptEdit',function(req,res) {
		var dAdd = deptAdd.getModel();
		var id = req.body.id; 
		var conditions ={"_id":id};
		var update   = {$set :req.body.bodydata};
    	var options  = {upsert:true};
    	dbHelper.updateData(dAdd,conditions,update,options,function(result){
			res.send(result);//encodeURIComponent
		})
	});
	//部门管理删除
	app.post('/deptDel',checkLogin);
	app.post('/deptDel',function(req,res) {
		var dAdd = deptAdd.getModel();
		var id = req.body.ids; 
		var sid = id.split(",");
		for(var i = 0; i < sid.length;i++) {
			var conditions = {"_id":sid[i]};
	    	dbHelper.removeData(dAdd,conditions,function (result) {
	    		console.log('删除成功！');
	    		res.send(result);
	    	});
		}
	});
	//用户管理
	app.get('/sysuser', function (req,res) {
		res.render('system/sysuser/sysuser.html',site.setting(req,'/system'));
	});
	/**
	 * 用户管理数据
	 */
	app.get('/userAdata',checkLogin);
	app.get('/userAdata',function(req,res) {
		var User = user.getModel();
		var conditions ={};
		var fields   = {};
    	var options  = {};
		var page = req.query.page || 1;
		dbHelper.pageQuery(page,10, User, '', {}, {},function(error,result){
			console.log("select查询结果");
		    console.log(result);
		    res.send(result);
		});
	});
	/**
	 * 用户管理添加
	 */
	app.get('/sysuserAdd',checkLogin);
	app.get('/sysuserAdd', function (req,res) {
		res.render('system/sysuser/sysuserAdd.html',site.setting(req,'/system'));
	});
	app.post('/sysuserAdd',checkLogin);
	app.post('/sysuserAdd', function (req,res) {
		var User = user.getModel();
		var name = req.body.dname,
			deptName = req.body.deptName,
			job = req.body.job,
			duty = req.body.dmanager,
			tel = req.body.dtel,
			moblie = req.body.moblie,
			email = req.body.email;
		var data = {name:name,deptName:deptName,job:job,duty:duty,tel:tel,moblie:moblie,email:email};
		dbHelper.addData(User,data,function(result) {
	        res.send(result);
	    });
	});
	/**
	 * 部门管理删除
	 */
	app.post('/sysuserDel',checkLogin);
	app.post('/sysuserDel',function(req,res) {
		var User = user.getModel();
		var id = req.body.ids; 
		var sid = id.split(",");
		for(var i = 0; i < sid.length;i++) {
			var conditions = {"_id":sid[i]};
	    	dbHelper.removeData(User,conditions,function (result) {
	    		console.log('删除成功！');
	    		res.send(result);
	    	});
		}
	});
	/**
	 * 部门管理编辑
	 */
	app.get('/sysuserEdit',checkLogin);
	app.get('/sysuserEdit',function(req,res) {
		var User = user.getModel();
		var id = req.query.id; 
		var conditions ={"_id":id};
		var fields   = {};
    	var options  = {upsert:false};
		dbHelper.findData(User,conditions,fields,options,function(users) {
		    //res.send(departments.datas);
		    var datas = users.datas;
		    console.log(datas);
		    res.render('system/sysuser/sysuserEdit.html',{
		    	users: datas
		    });
		});
	});
	/**
	 * 部门管理编辑保存
	 */
	app.post('/sysuserEdit',checkLogin);
	app.post('/sysuserEdit',function(req,res) {
		var User = user.getModel();
		var id = req.body.id; 
		var conditions ={"_id":id};
		var update   = {$set :req.body.bodydata};
    	var options  = {upsert:true};
    	dbHelper.updateData(User,conditions,update,options,function(result){
			res.send(result);
		})
	});
	app.get('/sysrole', function (req,res) {
		res.render('system/sysrole/sysrole.html',site.setting(req,'/system'));
	});
	app.get('/sysright', function (req,res) {
		res.render('system/sysright.html',site.setting(req,'/system'));
	});
	app.get('/student', function (req,res) {
		res.render('student');
	});
	app.get('/data', function (req,res) {
		Student.get(null,function (err,students) {
			if (err) {
				students = [];
			}
			res.send(students);
		});
	});
	function checkLogin(req, res, next) {
	    if (!req.session.user) {
	      req.flash('error', '未登录!'); 
	      return res.redirect('/login');
	    }else{
	    	next();
	    }
	  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      return res.redirect('back');//返回之前的页面
    }else{
    	next();
    }
  }
}
