/**
 * author aron_阿伦
 * QQ:398155437
 * [scrollSpy description]
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
function scrollSpy(target){
	this.data = [];
	this.target = target;
	this.out = "";
	this.getData = function(){
		//获取要侦查元素的高度，并存储于数组
		var ur = this;
		this.target.each(function(index, el) {
			ur.data.push($(this).attr("id")+":"+$(this).offset().top);
		});
	};
	this.getCurObj = function(scrollTop){
		//获取处于当前滚动位置的元素
		var data = this.data;
		var out = data[data.length-1].split(":")[0];
		for(var i=0; i<data.length;i++){
			var a = data[i].split(":");
			if(a[1]>scrollTop){
				if(i==0){
					out = "first";
				}else{
					out = data[i-1].split(":")[0];
				}
				break;
			}
		}
		this.out = out;
	};
	this.bindEvent = function(){
		var ul = this;
		var initArguments = arguments;
		if(initArguments.length>=1 && initArguments[0].responceItem!= undefined) {
			$(window).scroll(function(event) {
				var scrollTop = $(window).scrollTop();
				ul.getCurObj(scrollTop);
				initArguments[0].responceItem.each(function(index, el) {
					if($(this).attr("href") == "#"+ul.out)
					{
						//到达当前节点
						initArguments[0].callback($(this));
						return false;
					}
				});
			});
			/**
			 * [滚动到指定位置]
			 * @return {[type]} [description]
			 */
			initArguments[0].responceItem.click(function(e){
				//alert($(this).attr("href"));
				e.preventDefault();
				var $target = $($(this).attr("href"));
				if($target.length > 0){
					$("body,html").animate({scrollTop:$target.offset().top},1000);
				}
			});
		}else{
			$(window).scroll(function(event) {
				var scrollTop = $(window).scrollTop();
				ul.getCurObj(scrollTop);
			});
		}
	};
	this.init = function(){
		this.getData();
		arguments.length>0?this.bindEvent(arguments[0]):this.bindEvent();
	};
	
}

scrollSpy.prototype = {
	response : function(obj){
		console.log(obj);
	},
	nonResponse : function(obj){
		console.log(obj);
	}
}
