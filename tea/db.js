var mongo = require('mongodb');
var tea = tea || {};
tea.db = exports;
tea.db.server = '127.0.0.1';
tea.db.port = 27017;
tea.db.db = null; 
tea.db.dbName = ''; 
tea.db.collection = ''; 
tea.db.open = function (mongoInfo,callback){ 
	this.dbName = mongoInfo.dbName;
	if(!this.db) this.db = new mongo.Db(mongoInfo.dbName, new mongo.Server('127.0.0.1', 27017, {}), {}); 
	this.db.open(function(err,db){ 
		this.db = db; 
		if(callback) callback(db); 
	}); 
	return this;
}
tea.db.find = function(collection,query,callback,isFindOne){ 
	this.db.collection(collection, function(err, collection) {
		var func = isFindOne ? 'findOne' : 'find';
		collection[func](query,function(err,cursor){
			if(!isFindOne) { 
				cursor.toArray(function(err,items){ 
					if(callback) callback(items); 
				});
			}else{ 
				if(callback) callback(cursor);  	            
				} 
		});
	});
}
tea.db.findOne = function(collection,query,callback){ 
	this.find(collection,query,callback,1); 
}
tea.db.close = function(){ 
	if(tea.db.db) tea.db.db.close(); 
} 
tea.db.hello = function(){ 
	console.log('Hello World'); 

} 