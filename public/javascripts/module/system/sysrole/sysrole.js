$('.ifm-navbar li').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var mydata = [
    {name:"管理员",time:"2016-10-14 13:02:35",describle:"系统管理员"}
    ]

$(window).bind('resize', function () {  
    $("#jqGrid").setGridWidth($(window).width()*0.99); 
    $("#jqGrid").setGridHeight($(window).height() - 240); 
});
var tHeight = $(window).height() -240;
$("#jqGrid").jqGrid({ 
    data: mydata, 
    datatype: "local", 
    height: tHeight, 
    rowjob: 10, 
    rowList: [10,20,30], 
    colNames:['角色名','生成时间','角色描述'],
    colModel:[ 
    {name:'name',index:'name',width:'20%'}, 
    {name:'time',index:'time',width:'20%'}, 
    {name:'describle',index:'describle',align:"center",width:'60%'}
    ], 
    pager: "#jqGridPager", 
    viewrecords: true,
    multiselect: true,
    altRows: true,
    autowidth: true ,
    loadComplete : function() {
        $("#jqGrid").setGridWidth($(window).width()*0.99);
    }

});