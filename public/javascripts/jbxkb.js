//菜单点击切换效果
$('.ifm-navbar a').click(function () {
    $(this).addClass('current').siblings().removeClass('current');
});
//上传图片
$('#file-fr').fileinput({
    uploadUrl: '#',
    allowedFileExtensions : ['jpg', 'png','gif'],
});
//表格
//$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';
var mydata = [
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} ,
    {id:"1",invdate:"2010-05-24",human:"张三",method:"电话",content:"约好参观时间",status:"潜在",operate:""} 
];
$(window).bind('resize', function () {  
    var width = $('.frm2').width();  
    jqGrid.setGridWidth(width); 
    $("#gridTable").setGridHeight($(window).height() - $('.frm1').height() - 222); 
});  
var tHeight = $(window).height() - $('.frm1').height() - 222;
$("#jqGrid").jqGrid({ 
    data: mydata, 
    datatype: "local", 
    height: tHeight, 
    rowNum: 10, 
    rowList: [10,20,30], 
    colNames:['序号','跟进时间', '跟进人员', '跟进方式','跟进内容','客户状态','操作'], 
    colModel:[ 
    {name:'id',index:'id', sorttype:"int",align:"center",width:'8%'}, 
    {name:'invdate',index:'invdate', sorttype:"date", formatter:"date",width:'8%'}, 
    {name:'human',index:'human',width:'8%'}, 
    {name:'method',index:'method',align:"center",width:'8%'}, 
    {name:'content',index:'content',align:"left",width:'50%'}, 
    {name:'status',index:'status',align:"center",width:'8%'}, 
    {name:'operate',index:'operate',  sortable:false,width:'10%',align:'center',
        formatter:function(cellvalue, options, obj) {
            return '<a href="/khqzbj"><img  src="../images/edit_icon.png"/></a><a href=""><img src="../images/del_icon.png" style="margin-left: 6px;"/></a>';
        }
    } 
    ], 
    pager: "#jqGridPager", 
    viewrecords: true,
    altRows: true,
    autowidth: true ,
    loadComplete : function() {
        $("#jqGrid").setGridWidth($('.frm2').width());
    }

});
//表单验证
$('#jcxx').validate({
    rules: {
        entName : {
            required: true
        },
        fund : {
            required: true,
            number: true
        },
        money : {
            required: true,
            number: true
        },
        qyzh : {
            required: true
        },
        jyfw : {
            required: true
        },
        zyyw : {
            required: true
        },
        zycp : {
            required: true
        },
        wrjcp : {
            required: true
        },
        yncz : {
            required: true,
            number: true
        },
        encz : {
            required: true,
            number: true
        },
        sncz : {
           required: true,
           number: true 
        },
        ynss : {
            required: true,
            number: true
        },
        enss : {
            required: true,
            number: true
        },
        snss : {
           required: true,
           number: true 
        },
        sname : {
           required: true 
        },
        IDnum : {
           required: true,
           isIdCard: true
        },
        tel : {
           required: true,
           isTel: true
        }
    },
    messages : {
        entName : {
            required: '请输入企业名称'
        },
        fund : {
            required: '请输入注册资金',
            number: '请输入数字'
        },
        money : {
           required: '请输入注册资金',
            number: '请输入数字' 
        },
        qyzh : {
            required: '请输入企业字号'
        },
        jyfw : {
            required: '请输入经营范围'
        },
        zyyw : {
            required: '请输入主营业务'
        },
        zycp : {
            required: '请输入主要自有技术及产品'
        },
        wrjcp : {
            required: '请输入无人机关联技术及产品'
        },
        yncz : {
            required: '请输入第一年年产值',
            number: '请输入数字'
        },
        encz : {
            required: '请输入第二年年产值',
            number: '请输入数字'
        },
        sncz : {
           required: '请输入第三年年产值',
           number: '请输入数字'
        },
        ynss : {
            required: '请输入第一年年税收',
            number: '请输入数字'
        },
        enss : {
            required: '请输入第二年年税收',
            number: '请输入数字'
        },
        snss : {
           required: '请输入第三年年税收',
           number: '请输入数字'
        },
        sname : {
           required: '请输入名称或姓名' 
        },
        IDnum : {
           required: '请输入证照号'
        },
        tel : {
           required: '请输入联系电话'
        }
    },
    errorPlacement: function (error, element) {
        if (element.is(":radio"))
        error.appendTo(element.parent());
        else if (element.is(":checkbox"))
        error.appendTo(element.parent().parent());
        else
        error.appendTo(element.parent()); 
        
    },
   
});
 /*submitHandler:function(form){
        save();
    }
function save(){
        $.ajax({
            type : 'post',
            url : '/jbqkb',
            cache : false,
            dataType : 'json',
            data : $("#jcxx").serializeArray(),
            global : false,
            success : function(map) {
              if(map.success==true){
                    alert('成功！');
              }else{
                  
              }   
            },
            error : function() {
                alert('保存失败！');
            }
        });
}*/
//投资人增加
var attachfiles=1; 
var InputsWrapper = $(".InputsWrapper");
var AddButton = $("#AddMoreFileBox");
$(AddButton).click(function (e) {
    if(attachfiles!= 0) {
        $('#trJoin td')[0].rowSpan = attachfiles + 2;
        var newRow = attfile.insertRow();
        var col1 = newRow.insertCell(0);
        var col2 = newRow.insertCell(1);
        var col3 = newRow.insertCell(2);
        newRow.setAttribute('id','trInsert' + attachfiles);
        col1.innerHTML = '<td><input class="form-control" id="investor['+attachfiles+'].sname" name="investor['+attachfiles+'].sname" placeholder="" type="text" required></td>';
        col2.innerHTML = '<td><input class="form-control" id="investor['+attachfiles+'].IDnum" name="investor['+attachfiles+'].IDnum" placeholder="" type="text" required></td>';
        col2.colSpan = '4';
        col3.innerHTML = '<td><input class="form-control" id="investor['+attachfiles+'].tel" name="investor['+attachfiles+'].tel" placeholder="" type="text" required><input type="button" onclick="delInput(trInsert' + attachfiles +')" value="删除"/></td>';
        $('#trInsert0').after(newRow);
        attachfiles++;
    }
});
//投资人删除
function delInput(id) {
    $(id).empty();
    var ss = $('#trJoin td')[0].rowSpan;
    if(ss >1 ) {
        $('#trJoin td')[0].rowSpan = ss - 1;
        ss--;
    } else {
        $('#trJoin td')[0].rowSpan = 1;
    }
};

//股东增加
var num=1; 
var InputsCon = $(".InputsCon");
var AddMoreLine = $("#AddMoreLine");
$(AddMoreLine).click(function (e) {
    if(num!= 0) {
        var newRow = attfile.insertRow();
        var col1 = newRow.insertCell(0);
        var col2 = newRow.insertCell(1);
        var col3 = newRow.insertCell(2);
        var col4 = newRow.insertCell(3);
        var col5 = newRow.insertCell(4);
        newRow.setAttribute('id','trAdd' + num);
        col1.innerHTML = '<td><input class="form-control" id="stockholder['+num+'].gdName" name="['+num+'].gdName" placeholder="" type="text"></td>';
        col1.colSpan = '2';
        col2.innerHTML = '<td>是<input type="radio" id="stockholder['+num+'].ssy" name="stockholder['+num+'].ssy">否<input type="radio" id="stockholder['+num+'].ssn" name="stockholder['+num+'].ssn"></td>';
        col2.align = 'center';
        col3.innerHTML = '<td>是<input type="radio" id="stockholder['+num+'].jwy" name="stockholder['+num+'].jwy">否<input type="radio" id="stockholder['+num+'].jwn" name="stockholder['+num+'].jwn"></td>';
        col3.align = 'center';
        col4.innerHTML = '<td><input class="form-control" id="stockholder['+num+'].gf" name="stockholder['+num+'].gf" placeholder="" type="text"></td>';
        col5.innerHTML = '<td><input class="form-control" id="stockholder['+num+'].tzfs" name="stockholder['+num+'].tzfs" placeholder="" type="text"><input type="button" onclick="delRow(trAdd' + num +')" value="删除"/></td>';
        col5.colSpan = '2';
        $('#trAdd0').after(newRow);
        num++;
    }
});
//投资人删除
function delRow(id) {
    $(id).empty();
};


//滚动条
var oheight = $(window).height() - 57;
$(window).resize(function () {
	$('.ifm-wrap').css('height',$(window).height() - 57);
});
$('.baseInfo').slimScroll({
width: '100%',
height: oheight/1.5 - 30,
size: '6px',
color: '#468DE5',
position: 'right',
distance: '3px',
start: 'top',
opacity: '1',
alwaysVisible: false,
disableFadeOut: false,
railVisible: true,
railColor: '#333',
railOpacity: .2,
railDraggable: true,
allowPageScroll: true,
wheelStep: 10,
borderRadius: '10px',
railBorderRadius: '10px'
});
$('.main').slimScroll({
width: '100%',
height: oheight - 30,
size: '6px',
color: '#468DE5',
position: 'right',
distance: '3px',
start: 'top',
opacity: '1',
alwaysVisible: false,
disableFadeOut: false,
railVisible: true,
railColor: '#333',
railOpacity: .2,
railDraggable: true,
allowPageScroll: true,
wheelStep: 10,
borderRadius: '10px',
railBorderRadius: '10px'
});
$('.cltTracking').slimScroll({
width: '100%',
height: oheight-oheight/1.5 - 36,
size: '6px',
color: '#468DE5',
position: 'right',
distance: '3px',
start: 'top',
opacity: '1',
alwaysVisible: false,
disableFadeOut: false,
railVisible: true,
railColor: '#333',
railOpacity: .2,
railDraggable: true,
allowPageScroll: true,
wheelStep: 10,
borderRadius: '10px',
railBorderRadius: '10px'
});
