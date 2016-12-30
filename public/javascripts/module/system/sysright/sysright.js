$('.ifm-navbar li').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var mydata = [
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} ,
    {name:"基础支撑平台",time:"2016-10-17 10:03:13",describle:"",link:"/based/labsafetyaccident/accidentStatistics",type:"1",image:"images/menu/aqsg.png"} 
];
$(window).bind('resize', function () {  
    $("#jqGrid").setGridWidth($(window).width()*0.99); 
    $("#jqGrid").setGridHeight($(window).height() - 240); 
});  
var tHeight = $(window).height() -240;
$("#jqGrid").jqGrid({ 
    data: mydata, 
    datatype: "local", 
    height: tHeight, 
    rowdescrible: 10, 
    rowList: [10,20,30], 
    colNames:['权限名称','生成时间','权限描述','连接地址','排序字段','图片地址'],
    colModel:[ 
    {name:'name',index:'name',width:'10%'}, 
    {name:'time',index:'time',width:'10%'}, 
    {name:'describle',index:'describle',align:"center",width:'10%'}, 
    {name:'link',index:'link',align:"left",width:'30%'}, 
    {name:'type',index:'type',align:"center",width:'10%'}, 
    {name:'image',index:'image',align:'center',width:'10%'}
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