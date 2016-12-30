$(function() {
	$('#blogAdd').validate({
		rules: {
			title: {
				required: true
			},
			abstract: {
				required: true
			},
			post: {
				required: true
			}
		},
		messages : {
			title: {
				required: '请输入标题'
			},
			abstract: {
				required: '请输入摘要'
			},
			post: {
				required: '请输入内容'
			}
		},
		submitHandler: function() {
			save();
		}
	});
   
});
function save(){
	var $title = $('#title').val();
	var $abstract = $('#abstract').val();
	var $post = $('#post').val();
	var data = {"title":$name,"abstract":$abstract,"post":$post};
	alert(data);
	$.ajax({
		type : 'post',
		url : '/blogAdd',
		cache : false,
		dataType : 'json',
		data :data, 
		global : false,
		success : function(data) {
			$('.submit').attr('disabled','disabled')
			parent.toast('提交成功！');
			parent.reloadGrid();//重新加载
			closeWin();
		},
		error : function(err) {
			//toast("保存失败");
		}
	});
}
