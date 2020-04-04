//展示活动
$("#but1").click(function() {
	count = "" + document.getElementById("focusedInput").value.trim();//获取作业个数
	if (count == "")
		return;
	var reg = /^[0-9]+$/;//正则校验必须是数字
	if (!reg.test(count)) {
		$("#message1").html('<div class="alert alert-error"><button class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> 请输入正确的作业个数！！！</div>');
		return;
	}
	var str1 = '',
		str2 = '';
	for (var i = 1; i <= count; i++) {
		str1 += '<li><a href="#tab' + i + '" data-toggle="tab">作业' + i + '</a></li>';
		str2 += '<div class="tab-pane" id="tab' + i + '"><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="focusedInput">机器一处理时间:</label><div class="controls"><input class="input-xlarge focused" id="startInput' + i + '" type="text" value=""></div></div><div class="control-group"><label class="control-label" for="focusedInput">机器二处理时间:</label><div class="controls"><input class="input-xlarge focused" id="endInput' + i + '" type="text" value=""></div></div></fieldset></form></div>';
	}
	$("#step")[0].innerHTML = str1;
	temp = $("#tabs")[0].innerHTML;
	$("#tabs")[0].innerHTML = str2 + temp;
	$("#show1").css('display', 'none');
	$("#show2").css('display', 'block');
	$("#show3").css('display', 'none');
	$('#rootwizard').bootstrapWizard({
		onTabShow: function(tab, navigation, index) {
			var $total = navigation.find('li').length;
			var $current = index + 1;
			var $percent = ($current / $total) * 100;
			$('#rootwizard').find('.bar').css({
				width: $percent + '%'
			});
			// If it's the last tab then hide the last button and show the finish instead
			if ($current >= $total) {
				$('#rootwizard').find('.pager .next').hide();
				$('#rootwizard').find('.pager .finish').show();
				$('#rootwizard').find('.pager .finish').removeClass('disabled');
			} else {
				$('#rootwizard').find('.pager .next').show();
				$('#rootwizard').find('.pager .finish').hide();
			}
		}
	});
});


function Backtrack(t) {
	if (t > count) {
		for (var i = 1; i <= count; i++)
			bestx[i] = x[i];
		bestf = f;
	} else {
		for (var j = t; j <= count; j++) {
			f1 += objs[x[j]][1];
			f2[t] = (f1 > f2[t - 1] ? f1 : f2[t - 1]) + objs[x[j]][2];
			f += f2[t];
			if (f < bestf) {
				var temp = x[t];
				x[t]=x[j];
				x[j]= temp;
				Backtrack(t + 1);
				temp = x[t];
				x[t]=x[j];
				x[j]= temp;
			}
			f1 -= objs[x[j]][1];
			f -= f2[t];
		}
	}
}
//获取活动起始值
function insert() {
	objs = new Array();
	for (var i = 0; i <= count; i++) {
		objs[i] = new Array();
		for (var j = 0; j < 3; j++) {
			objs[i][j] = 0;
		}
	}
	x = new Array();
	bestx = new Array();
	f1 = 0;
	f2 = new Array();
	f = 0;
	bestf = 1000000;
	for (var i = 1; i <= count; i++) {//页面数据赋值
		var sta = document.getElementById("startInput" + i).value;
		var end = document.getElementById("endInput" + i).value;
		objs[i][1] = parseInt(sta.trim());
		objs[i][2] = parseInt(end.trim());
	}
	for (var i = 0; i <= count; i++) {
		x[i] = i;
		//---
		bestx[i] = 0;
		f2[i] = 0;
	}
	Backtrack(1);
	var message = "活动安排次序为：	";
	for (var i = 1; i <= count; i++)
		message += "	" + bestx[i];
	message += ";最优解为：" + bestf;
	$("#message2").html('<div class="alert alert-success alert-block"><a class="close" data-dismiss="alert" href="#">&times;</a><h4 class="alert-heading">Success!</h4><h6>' + message + '</h6></div>');
}
//finsh confirm提交
function conf() {
	$("#show1").css('display', 'none');
	$("#show2").css('display', 'none');
	$("#show3").css('display', 'block');
	insert();
};
//输入框制空
$("#focusedInput").focusin(function() {
	$("#focusedInput").val("");
});