//展示活动
$("#but1").click(function() {
	count = "" + document.getElementById("focusedInput").value.trim();
	if(count == "")
		return;
	var reg = /^[0-9]+$/;
	if(!reg.test(count)) {
		$("#message1").html('<div class="alert alert-error"><button class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> 请输入正确的活动个数！！！</div>');
		return;
	}
	var str1 = '',
		str2 = '';
	for(var i = 1; i <= count; i++) {
		str1 += '<li><a href="#tab' + i + '" data-toggle="tab">活动' + i + '</a></li>';
		str2 += '<div class="tab-pane" id="tab' + i + '"><form class="form-horizontal"><fieldset><div class="control-group"><label class="control-label" for="focusedInput">活动开始时间:</label><div class="controls"><input class="input-xlarge focused" id="startInput' + i + '" type="text" value=""></div></div><div class="control-group"><label class="control-label" for="focusedInput">活动结束时间:</label><div class="controls"><input class="input-xlarge focused" id="endInput' + i + '" type="text" value=""></div></div></fieldset></form></div>';
	}
	$("#step")[0].innerHTML = str1;
	temp=$("#tabs")[0].innerHTML;
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
			if($current >= $total) {
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
//类定义
function odj(num, sta, end) {
	this.flag = false;
	this.sta = sta;
	this.end = end;
	this.num = num;
}
//获取活动起始值
function insert() {
	var objs = new Array();
	var ans = 1;
	for(var i = 0; i < count; i++) {
		var sta = document.getElementById("startInput" + (i + 1)).value;
		var end = document.getElementById("endInput" + (i + 1)).value;
		objs[i] = new odj(i + 1, sta, end);
	}
	objs.sort(function cmp(a, b) { //sort比较器
		if(parseInt(a.end) == parseInt(b.end))
			return parseInt(b.sta) - paseint(a.sta);
		return parseInt(a.end) - parseInt(b.end);
	});
	objs[0].flag = true;
	//核心
	for(var i = 0; i < count; i++) {
		for(var j = i + 1; j < count; j++) {
			if(parseInt(objs[j].sta) >= parseInt(objs[i].end)) {
				objs[j].flag = true;
				ans++;
				i = j - 1;
				break;
			}
		}
	}
	var message = "";
	for(var i = 0; i < objs.length; i++) {
		if(objs[i].flag == true)
			message += "活动" + objs[i].num + ":	" + objs[i].sta + "," + objs[i].end + ";	";

	}
	$("#message2").html('<div class="alert alert-success alert-block"><a class="close" data-dismiss="alert" href="#">&times;</a><h4 class="alert-heading">Success!</h4><h6>被安排的活动有' + ans + '个:  ' + message + '</h6></div>');
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