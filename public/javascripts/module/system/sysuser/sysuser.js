$('.ifm-navbar li').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
$(window).bind('resize', function () {  
    $("#jqGrid").setGridWidth($(window).width()*0.99); 
    $("#jqGrid").setGridHeight($(window).height() - 240); 
}); 
var tHeight = $(window).height() -240;
$("#jqGrid").jqGrid({ 
    url:"/userAdata", 
   datatype: "json",//显示数据的方式，因为通过ajax拿到数据了，所以是本地的  
    jsonReader: {//描述json 数据格式的数组 
        root : "datas", 
        total : "total", //总数
        page : "page",  //页数
        records : "records", //记录
        repeatitems: false// 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。  
    },  
    height: tHeight, 
    rowNum: 10, 
    rowList: [10,20,30], 
    colNames:['用户id','用户名','所属部门','工作岗位','工作职务','办公电话','移动电话','电子邮箱',"最近变更时间"],
    colModel:[ 
    {name : '_id',index : '_id',width : '8%',align : 'center', sortable : false,hidden : true}, 
    {name:'name',index:'name',width:'10%'}, 
    {name:'deptName',index:'deptName',width:'10%'}, 
    {name:'job',index:'job',align:"center",width:'10%'}, 
    {name:'duty',index:'duty',align:"left",width:'25%'}, 
    {name:'tel',index:'tel',align:"center",width:'10%'}, 
    {name:'moblie',index:'moblie',align:'center',width:'10%'},
    {name:'email',index:'email',align:'center',width:'10%'}, 
    {name:'logindate',index:'logindate',align:'center',width:'15%'} 
    ], 
    pager: "#jqGridPager", 
    viewrecords: true,
    multiselect: true,
    altRows: true,
    autowidth: true ,
    loadComplete: function(){
        //如果数据不存在，提示信息 
        var re_records = $("#jqGrid").getGridParam('records');
        if(re_records == 0 || re_records == null) {
            if($(".norecords").html() == null) {
                $("#jqGrid").parent().append("<div class=\"norecords\">没有符合数据</div>");
            }
            $(".norecords").show();
        }else{//如果存在记录，则隐藏提示信息。
            $(".norecords").hide();
        }
        $("#jqGrid").setGridWidth($(window).width()*0.99);
    }

}).navGrid("#jqGridPager",{edit:false,add:false,del:false,search:false});

/* 加载 */
function reloadGrid() {
    $("#jqGrid").jqGrid('setGridParam', {
        page : 1,
        postData : {
            name : $('#name').val(),
        }
    }).trigger("reloadGrid");
}

//添加按钮 $(window.parent.document)
$('.add').on('click', function(){
  openWin('/sysuserAdd','部门管理添加','50%','40%');
});

//编辑
$('.edit').on('click', function() {
    //返回当前grid中复选框所选中的数据id
    var ids = $('#jqGrid').jqGrid('getGridParam', 'selarrrow');
    //alert("当前选中行ID：" + ids);  
    if (ids.length != 1) {
        // 弹出提示信息
        toast("请选择一条数据进行编辑！");
        return;
    }
    // 返回指定id行的数据
    var rowdatas = $("#jqGrid").jqGrid('getRowData', ids[0]);
    var sysuserId = rowdatas._id;
    openWin('/sysuserEdit?id='+sysuserId, '编辑');
    //openWin('/deptEdit/'+deptId, '编辑');
})

/* 批量删除 */
$('.del').click(function() {
    // 返回当前grid中复选框所选择的数据的id
    var ids = $('#jqGrid').jqGrid('getGridParam', 'selarrrow');
    if (ids.length == 0) {
        // 弹出提示信息
        toast("请选择需要删除的数据！");
        return;
    }

    var deptIds = [];
    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        // 返回指定id行的数据
        var rowdatas = $("#jqGrid").jqGrid('getRowData', id);
        deptIds[i] = rowdatas._id;
    }
    var paramJson = deptIds.toString();
    var param = {
        "ids" : paramJson
    };
    del(param);
});

//删除
function del(param) {
    confirm('确认删除吗?',function () {
        $.ajax({ 
            url: '/sysuserDel',
            type:'post',
            dataType:'json',
            data:param,
            success: function(json){
                    toast('提交成功！');
                    reloadGrid();//重新加载
                },
            error: function(err) {
                parent.toast('删除失败！');
            }
        });
    });
};