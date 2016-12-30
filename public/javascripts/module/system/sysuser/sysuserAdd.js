$(function() {
	$('#deptForm').validate({
		rules: {
			name: {
				required: true
			},
			deptName: {
				required: true
			},
			job: {
				required: true
			},
			moblie: {
				required: true,
				isTelephone:true
			}
		},
		messages : {
			name: {
				required: '请输入用户名'
			},
			deptName: {
				required: '请输入所属部门'
			},
			job: {
				required: '请输入工作职务'
			},
			moblie: {
				required: '请输入移动电话'
			}
		},
		submitHandler: function() {
			save();
		}
	});
   
});
function save(){
	var $name = $('#name').val();
	var $deptName = $('#deptName').val();
	var $job = $('#job').val();
	var $duty = $('#duty').val();
	var $tel = $('#tel').val();
	var $moblie = $('#moblie').val();
	var $email = $('#email').val();
	var data = {"dname":$name,"deptName":$deptName,"job":$job,"duty":$duty,"dtel":$tel,"moblie":$moblie,"email":$email};
	$.ajax({
		type : 'post',
		url : '/sysuserAdd',
		cache : false,
		dataType : 'json',
		data :data, 
		global : false,
		success : function(data) {
			$('.submit').attr('disabled','disabled')
			parent.toast('提交成功！');
			//parent.location.reload();
			parent.reloadGrid();//重新加载
			closeWin();
		},
		error : function(err) {
			//toast("保存失败");
		}
	});
}
