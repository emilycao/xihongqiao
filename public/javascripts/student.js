//数据成功拿到后就渲染jqgrid  
// 配置jqGrid的属性 
$.jgrid.defaults.styleUI = 'Bootstrap'; 
jQuery("#jqGrid01").jqGrid({  

    url: '/data',//从服务器拿来的数据  
    datatype: "json",//显示数据的方式，因为通过ajax拿到数据了，所以是本地的  
    jsonReader: {//描述json 数据格式的数组  
        repeatitems: false// 如果设为false，则jqGrid在解析json时，会根据name来搜索对应的数据元素（即可以json中元素可以不按顺序）；而所使用的name是来自于colModel中的name设定。  
    },  
    height: 250, // Auto height step 2,  
    rowNum: 10,//在grid上初始显示记录条数  
    rowList: [10, 20, 30],//一个下拉选择框，用来改变显示记录数  
    colNames: ['useId', 'userName', 'accountName', 'accountPassword', 'roleType', 'schoolName', 'schoolClassName', 'active',''],//列显示名称，是一个数组对象  
    colModel: [//配置显示的列属性  
        /** 
         *  对应后台返回数据datas中的userId 
         *  hidden:控制该列不显示 
         */  
        {name: 'useId', index: 'useId', width: 60,hidden:true},  
        /** 
        *  对应后台返回数据datas中的userName 
        *  editable：定义字段是否可编辑 
        */  
        {  
            name: 'userName',  
            index: 'userName',  
            width: 100,  
            editable: true,  
            editoptions: {size: "20", maxlength: "30"}//当执行修改和新增的操作时，会显示输入框，输入框的配置  
        },  
        /** 
        *  对应后台返回数据datas中的accountName 
        *  editable：定义字段是否可编辑 
        */  
        {  
            name: 'accountName',  
            index: 'accountName',  
            width: 100,  
            editable: true,  
            editoptions: {size: "20", maxlength: "30"}  
        },  
        /** 
        *  对应后台返回数据datas中的accountPassword 
        *  search：定义此列是否可以作为搜索列 
        *  注：由于不想让用户看到密码，所以将改列的内容改为一个重置按钮，点击可以修改密码 
        */  
        {  
            name: 'accountPassword',  
            index: 'accountPassword',  
            width: 120,  
            search:false  
        },  
        /** 
        *  对应后台返回数据datas中的roleType 
        *  editrules：设置编辑字段的控件的规则 
        *  edittype：控件该字段在修改或者新增时类型 select为下拉菜单 
        */  
        {  
            name: 'roleType',  
            index: 'roleType',  
            width: 80,  
            editable: true,  
            editrules: true,  
            edittype: "select",  
        },  
        /** 
        *  对应后台返回数据datas中的schoolName 
        */  
        {  
            name: 'schoolName',  
            index: 'schoolName',  
            width: 150,  
            editable: true,  
            editrules: true,  
            edittype: "select",  
            editoptions: {
                dataEvents: [//给当前控件追加事件处理
                    {
                        type: 'change',                 //下拉选择的时候
                        fn: function (e) {              //触发方法
                            //获取当前下拉框的id名字（这是点击编辑按钮时才需要的，因为点击编辑按钮后，schoolName的下拉框会变成1_schoolName,其中”1“是行号）
                            var itemName = this.id;     
                            var selectNum = itemName.match(/^\d+/);//（这是点击编辑按钮时才需要的）将id中的数字获取出来
                            var schoolName =this.value; //获取选中的学校名称
                            getSchoolClass(selectNum,schoolName); //调用获取班级data的方法
                        }
                    }
                ]
            }

        },  
        /** 
        *  对应后台返回数据datas中的schoolClassName 
        *  value：在修改或者新增时下拉框显示的数据 
        */  
        {  
            name: 'schoolClassName',  
            index: 'schoolClassName',  
            width: 150,  
            editable: true,  
            edittype: "select",  
            editoptions: {value: {'请选择班级': '请选择班级'}}  
        },  
        /** 
        *  该字段是在前端自定义的字段 
        *  sortable：    设置该字段是否进行排序 
        */  
        {  
            name: 'active', index: 'active', width: 60,sortable : false  
        },  
        /** 
        *  改列显示编辑、保存、重置按钮，在编辑操作会用到 
        */  
        {  
            name : 'act',index : 'act',width : 75,sortable : false,search:false  
        },  
    ],  
    pager: "#jqGridPager01",//定义翻页用的导航栏，必须是有效的html元素(即定义的div块)。  
    viewrecords: true,//定义是否要显示总记录数  
    caption: "User Management",//表格名称  
    hidegrid: false,//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效  
    multiselect: true,//定义是否可以多选  
    altRows: true,  
    rownumbers: true,//如果为ture则会在表格左边新增一列，显示行顺序号  

    /** 
     *   当从服务器返回响应时执行的方法 
     *   ----我的理解是加载表格完成后执行的方法---- 
     */  
    loadComplete: function () {  
		//获取学校data  
      	getSchool();
        //设置Reset按钮  
        setReset();  
        //设置最后一列的修改按钮  
        setEdit();  
    },  
});  
/** 
 *  获取班级列表 
 */  
function getSchoolClass(selectNum, schoolName) {  
    var str = ""; //用来存放option值  

    //将增加操作的弹出菜单中的schoolClassName的下拉框内容清空（因为每次切换内容都需要变更）  
    $("select#schoolClassName").empty();  

    //将修改操作中的1_schoolClassName（1是行号）的下拉框内容清空（因为每次切换内容都需要变更）  
    $("select#" + selectNum + "_schoolClassName").empty();  
    if (schoolName == '请选择学校') {  
        str += "<option>" + "请选择班级" + "</option>";  
    }  
    else {  
        var schoolId;  
        for (var i = 0; i < schoolResult.length; i++) {  
            //通过与本地学校data的匹对，获取学校的id  
            if (schoolName.toString() == schoolResult[i].schoolName) {  
                schoolId = schoolResult[i].schoolId;  
                //与后台进行操作  
                $.ajax({  
                    url: '/schoolClassFindAction',  
                    async: false,  
                    cache: false,  
                    dataType: "json",  
                    data: {  
                        schoolId: schoolId,  //传入学校id，到后台获取json  
                        schoolClassName: ""  
                    },  
                    success: function (result) {  
                        // alert(JSON.stringify(result));  
                        if (result.success == 1) {  
                              
                            var schoolClass = result.result;   //取出班级data  
                            for (var i = 0; i < schoolClass.length; i++) {   //循环生成option，并且连接成String对象  
                                str += "<option schoolid='" + schoolClass[i].schoolClassId + "' value='" + schoolClass[i].schoolClassName + "'>" + schoolClass[i].schoolClassName + "</option>";  
                                //alert(str);  
                            }  
                        }  
                        else {  
                            str += "<option>" + "暂无班级" + "</option>";  
                        }  
                    }  
                });  
                break;  
            }  
        }  
    }  
    //获取下面下拉框schoolClassName对象  
    var schoolClassName = $("select#schoolClassName");     
    schoolClassName.append(str);//渲染option  
      
    //获取下面下拉框selectNum_schoolClassName对象  
    var schoolClassName2 = $("select#" + selectNum + "_schoolClassName");     
    schoolClassName2.append(str);//渲染option  
}   
/** 
 * set reset Button 
 */  
function setReset(){  
    var ids = jQuery("#jqGrid01").jqGrid('getDataIDs');//返回当前grid里所有数据的id  
    for (var i = 0; i < ids.length; i++) {  
        var id = ids[i];  
        var rowData = $("#jqGrid01").getRowData(id);  
        var reSetBtn = "<a href='#' style='color:#f60' onclick='return resetAction("+id+")' >ReSet</a>";//将要新增的html代码转为对象，resetAction(id)是重置密码的逻辑实现方法，参数是行id  
        jQuery("#jqGrid01").jqGrid('setRowData', ids[i], {accountPassword: reSetBtn});//setRowData方法更新行的值，ids[i]为行id，参数3：要更新的列  
    }  
}  
function resetAction(id) {  
          
         $.ajax({  
              url: '/resetPass',  
              async: false,  
              cache: false,  
              dataType: "json",  
              data: {  
                 id: datas[id-1].userId,  //由于id是从1开始的，所以id-1找到本地数据中对应的那条数据，并将userid传给服务器  
              },  
              success: function (result) {  
                 // alert(JSON.stringify(result));  
                 if (result.success == 1) {  
                    alert("重置密码成功");  
                 }  
                 else {  
            alert("重置密码失败");  
                
                 }  
         }  
      });  
}  
/** 
 * set edit Button 
 */  
function setEdit(){  
    var ids = jQuery("#jqGrid01").jqGrid('getDataIDs');//返回当前grid里所有数据的id  
      
    for ( var i = 0; i < ids.length; i++) {  
        var cl = ids[i];  
        var be = "<button type='button' class='btn btn-default btn-xs' aria-label='LeftAlign' onclick=\"editRows("+cl+")\"> " +//调用编辑方法，修改操作用到  
                "<span class = 'glyphicon glyphicon-edit' aria-hidden = 'true' ></span></button>";//设置icon  
        var se = "<button type='button' class='btn btn-default btn-xs' aria-label='LeftAlign' onclick=\"saveRows("+cl+")\" > " +//调用保存方法，修改操作用到  
                "<span class = 'glyphicon glyphicon-ok' aria-hidden = 'true' ></span></button>";//设置icon  
        var ce = "<button type='button' class='btn btn-default btn-xs' aria-label='LeftAlign' onclick=\"jQuery('#jqGrid01').restoreRow('" + cl + "');\" > " +//调用重置方法，修改操作用到  
                "<span class = 'glyphicon glyphicon-remove' aria-hidden = 'true' ></span></button>";//设置icon  
        jQuery("#jqGrid01").jqGrid('setRowData', ids[i],  
                {  
                    act : be + se + ce  
                });  
    }  
}  
// 配置导航条属性  
jQuery("#jqGrid01").navGrid('#jqGridPager01', {  
    //设置为false需要自己重新重新该方法  
    edit: false,  
    add: false,  
    del: false,  
    search: true  
},{},{},{},{multipleSearch:true})  
/** 
 *  增加自定义按钮——add按钮 
 *  参数1：导航条div名称 
 *  参数2：按钮名称，可以为空 
 *  参数3：按钮的图标，string类型，必须为jquery UI theme图标 
 *  onClickButton：点击该按钮时候的操作 
 */  
.navButtonAdd('#jqGridPager01', {  
    caption: "", buttonicon: "ui-icon-circle-plus", onClickButton: function () {  
        //增加一行操作  
        addRows();  
    },  
    position: "first"//first或者last，按钮位置  
})  
.navButtonAdd('#jqGridPager01', {  
    caption: "", buttonicon: "ui-icon-trash", onClickButton: function () {  
        //删除一行操作  
        removeRows();  
    },  
    position: "first"  
})  
//分隔符  
.navSeparatorAdd("#jqGridPager01", {sepclass: "ui-separator", sepcontent: ''}); 
$("#jqGrid01").jqGrid('setGridWidth', $(".content-pager").width(), true);  