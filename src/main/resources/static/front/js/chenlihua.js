function Signin(){
	$.ajax({
		type:"post",
		url:"sign/signin",
		success:function(data){
			if(data==0){
				alert("已经签过的了");
			}else if(data==-1){				
				var res = confirm("请先登录！");
				if(res == true){
					window.location.href="toPage?url=front/ulogin";
				}
			}else if(data>0){
				alert("您已经签到"+data+"天");
			}
		},error:function(){
			alert("签到错误");
		}
	}); 
}
