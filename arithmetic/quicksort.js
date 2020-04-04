function Quicksort(left,
	right, x) {
	if(left > right)
		return;
	var i = left;
	var j = right;
	var key = x[left];
	while(i < j) {
		while(i < j && parseInt(x[j]) >= parseInt(key)) {
			j--;
		}
		x[i] = x[j];
		while(i < j && parseInt(x[i]) < parseInt(key)) {
			i++;
		}
		x[j] = x[i];
	}
	x[j] = key;
	Quicksort(left, j - 1, x);
	Quicksort(j + 1, right, x);
}
$("#focusedInput").focusin(function() {
	var str = document.getElementById("focusedInput");
	str.value = "";
});
$("#btn").click(function() {
	var str = document.getElementById("focusedInput").value;
	if(str == null)
		return;
	var reg1 = /\s+/g;//匹配多个空格
	str = str.trim().replace(reg1, " ");//将匹配的多个空格替换为一个空格
	var reg = /^([-+]?\d* ?)+$/;//匹配多个（正负数字和单个空格）
	if(!reg.test(str)) {
		$("#message").html('<div class="alert alert-error"><button class="close" data-dismiss="alert">&times;</button><strong>Error!</strong> 请按正确的格式输出！！！</div>');
		return;
	}
	var arr = str.split(" ");
	Quicksort(0, arr.length - 1, arr);
	$("#message").html('<div class="alert alert-success"><button class="close" data-dismiss="alert">&times;</button><strong>Success!</strong>快速排序后的元素为:' + arr + '</div>');
});