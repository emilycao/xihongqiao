$(function() {
	$('#deptForm').validate({
		rules: {
			name: {
				required: true
			},
			room: {
				required: true
			},
			num: {
				required: true
			},
			manager: {
				required: true
			},
			tel: {
				required: true,
				isTelephone:true
			},
			duty: {
				required: true
			}
		},
		messages : {
			name: {
				required: '部门名称'
			},
			room: {
				required: '部门房间'
			},
			num: {
				required: '部门人数'
			},
			manager: {
				required: '部门经理'
			},
			tel: {
				required: '部门电话'
			},
			duty: {
				required: '部门职责'
			}
		},
		submitHandler: function() {
			save();
		}
	});
   
});
function save(){
	var $name = $('#name').val();
	var $room = $('#room').val();
	var $num = $('#num').val();
	var $manager = $('#manager').val();
	var $tel = $('#tel').val();
	var $duty = $('#duty').val();
	var $_id = $("#_id").val();
	var data = {"id":$_id,"bodydata":{"name":$name,"room":$room,"num":$num,"manager":$manager,"tel":$tel,"duty":$duty}};
	$.ajax({
		type : 'post',
		url : '/deptEdit',
		cache : false,
		dataType : 'json',
		data : data, 
		global : false,
		success : function(data) {
			$('.submit').attr('disabled','disabled')
			toast('提交成功！');
			//parent.location.reload();
			parent.reloadGrid();//重新加载
			closeWin();
		},
		error : function(err) {
			toast("保存失败");
		}
	});
}
