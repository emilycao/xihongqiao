function getLength (str) {
	return str.replace(/[^\x00-xff]/g, "xx").length;
}
function findStr(str, n) {
    var temp = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == n) {
            temp++;
        }
    }
    return temp;
}
window.onload = function () {
	var input = document.getElementsByTagName('input');
	var msg = document.getElementsByClassName('msg');
	var count = document.getElementById('count');
	var intensity = document.getElementsByTagName('em');
	var registerbtn = document.getElementById('register');
	var name_length = 0;
	var _state = false;
	console.log(intensity.length);
	input[0].onfocus = function () {
		msg[0].style.display = "block";
	}
	input[0].onkeyup = function() {
        count.style.visibility = "visible";
        name_length = getLength(this.value);
        count.innerHTML = name_length + "个字符";
        if (name_length == 0) {
            count.style.visibility = "hidden";
        }
    }
    input[0].onblur = function() {
        //含有非法字符 不能为空 长度超25 长度少于6个字符
        var re = /[^\w\u4e00-\u9fa5]/g;
        if (re.test(this.value)) {
            msg[0].innerHTML = "<i class='fa fa-close'>含有非法字符</i>";
            _state = false;
        } else if (this.value == "") {
            msg[0].innerHTML = "<i class='fa fa-close'>不能为空</i>";
            _state = false;
        } else if (name_length > 25) {
            msg[0].innerHTML = "<i class='fa fa-close'>不能超出25个字符</i>";
            _state = false;
        } else if (name_length < 6) {
            msg[0].innerHTML = "<i class='fa fa-close'>不能少于6个字符</i>";
            _state = false;
        } else {
            msg[0].innerHTML = "<i class='fa fa-check-square'>OK!</i>";
            _state = true;
        }
        checkform();
    }
    input[1].onfocus = function () {
    	msg[1].style.display = "block";
    	msg[1].innerHTML = "<i class='fa fa-lightbulb-o'>6-16个字符，不能单独使用字母、数字或符号</i>"
    }
    input[1].onkeyup = function() {
        if (this.value.length > 5) {
            intensity[1].className = "active";
            input[2].removeAttribute("disabled");
            msg[2].style.display = "block";
        } else {
            intensity[1].className = "";
            input[2].setAttribute("disabled", "");
            msg[2].style.display = "none";
        }
        if (this.value.length > 10) {
            intensity[2].className = "active";
            input[2].removeAttribute("disabled");
            msg[2].style.display = "block";
        } else {
            intensity[2].className = "";
        }
    }
    input[1].onblur = function() {
        //不能为空 不能相同字符 长度6-16 不能全数字 不能全字母 
        var m = findStr(input[1].value, input[1].value[0]);
        var re_n = /[^\d]/g;
        var re_t = /[^a-zA-Z]/g;
        if (this.value == "") {
            msg[1].innerHTML = "<i class='fa fa-close'>不能为空</i>";
            _state = false;
        } else if (m == this.value.length) {
            msg[1].innerHTML = "<i class='fa fa-close'>不能为相同字符</i>";
            _state = false;
        } else if (this.value.length < 6 || this.value.legth > 16) {
            msg[1].innerHTML = "<i class='fa fa-close'>长度应为6-16个字符</i>";
            _state = false;
        } else if (!re_n.test(this.value)) {
            msg[1].innerHTML = "<i class='fa fa-close'>不能全部为数字</i>";
            _state = false;
        } else if (!re_t.test(this.value)) {
            msg[1].innerHTML = "<i class='fa fa-close'>不能全部为字母</i>";
            _state = false;
        } else {
            msg[1].innerHTML = "<i class='fa fa-check-square'>OK!</i>";
            _state = true;
        }
       checkform();
    }
    input[2].onblur = function() {
        if (input[2].value != input[1].value) {
            msg[2].innerHTML = "<i class='fa fa-close'>两次输入不一致</i>";
            _state = false;
        } else {
            msg[2].innerHTML = "<i class='fa fa-check-square'>OK!</i>";
            _state = true;
        }
        checkform();
    }
    input[3].onblur = function() {
        var re_e = /^[\w_\-\.]+@[\w]+\.([\w]{2,4})$/g;
        if (!re_e.test(this.value)) {
            msg[3].innerHTML = "<i class='fa fa-close'>请输入正确的邮箱格式</i>";
            msg[3].style.display = "block";
            _state = false;
        } else {
            msg[3].innerHTML = "<i class='fa fa-check-square'>OK!</i>";
            msg[3].style.display = "block";
            _state = true;
        }
        checkform();
    }
    function checkform() {
        if (_state) {
            registerbtn.removeAttribute("disabled");
            // registerbtn.className+=" "+"readySubmit";
        } else {
            registerbtn.setAttribute("disabled", "");
            //registerbtn.className = registerbtn.className.replace( new RegExp( "(\\s|^)" + "readySubmit" + "(\\s|$)" ), " " );  
            // registerbtn.className = registerbtn.className.replace( /(\s|^)readySubmit(\s|$)/g, " " );       
        }
    }
}