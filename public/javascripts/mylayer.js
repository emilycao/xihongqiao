/**
* 弹出框
*/
function openWin(url,title,width,height,maxmin){
    var defWidth =  '56%';//默认宽度
    var defHeight = '55%';//默认高度
	if(width == undefined || width == null || width == ""){
		width = defWidth;
	}
	if(height == undefined || height == null || height == ""){
	   height = defHeight;
	}
	maxmin=maxmin==undefined?true:maxmin;
    var index = layer.open({
      type: 2,
      title: title,
      shadeClose: false,
      shade: 0.3,
	  maxmin: maxmin, //开启最大化最小化按钮
      area: [width,height],
      content:url
    });
    //layer.getFrameIndex().push(index);
}

/**
* 关闭当前弹出框
*/
function closeWin(){
    //当前弹出框层
    var currIndex =  parent.layer.getFrameIndex(window.name);
 	   parent.layer.close(currIndex);
}

/**
* 关闭所有打开的弹出框
*/
function closeAllWin(){
 	layer.closeAll();
 	layer.dialogIndex.length=0;
}

/* 提示信息*/
function toast(msg){
    layer.msg(msg, {
      time: 2000//2秒关闭（如果不配置，默认是3秒）
    }, function(){
     
    });
}

/* 询问框*/
function confirm(msg,callback){
	layer.confirm(msg, function(index){
	  callback();
	  layer.close(index);
	});  
}

/**
 * 多个弹出框嵌套时，获取当前弹出框的父弹出框的index
 * @returns
 */
function getParentIndex(){
	return layer.dialogArr[layer.dialogArr.length-2];
}

/**
 * 获取当前弹出框的index
 * @returns
 */
function getSelfIndex(){
	return layer.dialogArr[layer.dialogArr.length-1];
}

function getGrandIndex(){
	return layer.dialogArr[layer.dialogArr.length-3];
}
