/*
Initialize the JS plugins
*/
function closeSendingBox(){
	$('#sending').css('visibility','hidden');
}
function checkInputSize(){
	var input = $('#status').val();
//	alert(input);
	var statusLength = $("#status").val().length;
//	alert(statusLength);
	if(statusLength == 0){
		$('#sending').text("对树洞要诚实，至少告诉我点东西啊~");
		$('#sending').css('visibility','visible');
		setTimeout(closeSendingBox,3000);
		abort();
	}
	if(statusLength >140){
		$('#sending').text("太多了太多了，只能140个字哦~");
		$('#sending').css('visibility','visible');
		setTimeout(closeSendingBox,3000);
		abort();
	}
}

$(window).load(function() {
	$("#sending").css('visibility','hidden');

	$("#btn_send").click(function(){
//		alert("ajax started");
		$('#sending').text("树洞发送中..");
		$('#sending').css('visibility','visible');
		checkInputSize();
		$.ajax({
			type: "post",
			url: "../php/html/index.php",
			data: {'status':$('#status').val()},
			success: function(result){
				$('#sending').text("发送成功");
				$('#status').val('');
				setTimeout(closeSendingBox,3000);
//				alert("SUCCESS!!!\n" + "result: "+result);
			},
			error: function(data, textStatus){	
				$('#sending').text("发送失败,请重试");
				setTimeout(closeSendingBox,4000);
//				alert("FAILED:\n" + "data: " + data + "\n status: " + textStatus);
			}
		});
	});
});