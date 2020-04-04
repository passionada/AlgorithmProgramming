//展示活动
$("#but1").click(function() {
	count = "" + document.getElementById("focusedInput").value.trim();
	if(count == "")
		return;
	var reg = /^[0-9]+$/;
	if(!reg.test(count)) {
		$("#message1").html('<div class="alert alert-error"><button class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> 请输入正确的三角形层数！！！</div>');
		return;
	}
	var str = '';
	for(var i = 1; i <= count; i++) {
		str += '<label class="control-label" for="focusedInput">第' + i + '层：</label><div class="controls"><input class="input-xlarge focused" id="focusedInput' + i + '" type="text" value=""></div><hr />';
	}
	var pre = $("#inputs")[0].innerHTML;
	$("#inputs")[0].innerHTML = str + pre;
	$("#show1").css('display', 'none');
	$("#show2").css('display', 'block');
	if(parseInt(count) == 5)
		$("#ceshi").css('display', 'block');
	$("#show3").css('display', 'none');
});

function input(num) { //每层的正则校验和字符数组的返回
	var str = document.getElementById("focusedInput" + num).value;
	if(str == null)
		return;
	var reg1 = /\s+/g;
	str = str.trim().replace(reg1, " ");
	var reg = /^([-+]?\d* ?)+$/;
	if(!reg.test(str)) {
		$("#message2").html('<div class="alert alert-error"><button class="close" data-dismiss="alert">&times;</button><strong>Error!</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-第' + num + '层-&nbsp;&nbsp;&nbsp; 数据输入有误！！！</div>');
		return null;
	}
	var arr = ("0 " + str).split(" ");
	return arr;
}
//算法核心
function insert() {
	map = new Array();
	var str = "";
	var number = parseInt(count);
	for(var i = 1; i <= number; i++) {
		var temp = input(i);
		if(temp == null)
			return null;
		else
			map[i] = temp;
	}
	sum = new Array();
	for(var i = 0; i <= number; i++) {
		sum[i] = new Array();
		for(var j = 0; j <= number; j++) {
			sum[i][j] = 0;
		}
	}

	//核心代码
	for(var i = 1; i < number; i++)
		sum[number][i] = parseInt(map[number][i]); //从最底层开始
	for(var i = number - 1; i >= 1; i--)
		for(var j = 1; j <= i; j++) {
			sum[i][j] = (sum[i + 1][j] > sum[i + 1][j + 1] ? sum[i + 1][j] : sum[i + 1][j + 1]) + parseInt(map[i][j]);
		}

	for(var i = 1; i <= number; i++) {
		str += "<br />第" + i + "层:	";
		for(var j = 1; j <= i; j++)
			str += sum[i][j] + "	";
		str += "<br />";
	}
	$("#message3").html('<div class="alert alert-success"><button class="close" data-dismiss="alert">&times;</button><strong>Success!</strong><br />SUM数组元素：' + str + '<br />三角形的顶至底的路径经过的数字和的最大值为:' + sum[1][1] + '</div>');
}

//finsh confirm提交
function conf() {
	if(insert() != null)
		return;
	$("#show1").css('display', 'none');
	$("#show2").css('display', 'none');
	$("#show3").css('display', 'block');
	$("#ceshi").css('display', 'none');
};
//输入框制空
$("#focusedInput").focusin(function() {
	$("#focusedInput").val("");
});
$("#ceshi").click(function() {
	$("#focusedInput1").val("7");
	$("#focusedInput2").val("3 8");
	$("#focusedInput3").val("8 1 0");
	$("#focusedInput4").val("2 7 4 4");
	$("#focusedInput5").val("4 5 2 6 5");
});