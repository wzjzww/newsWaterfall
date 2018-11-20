var curPage = 1
var perPageCount = 30
var colSumHeight = []
// Exposure.init($('.foot'),function(){
// 	getData(function(data){
// 		var $node = renderData(data)
// 		Waterfall.start($nodes)
// 	})
// })

 // function getData(callback){
 // 	$.ajax ({
	// 	url: 'http://platform.sina.com.cn/slide/album_tech',
	// 	dataType: 'jsonp',
	// 	jsonp: 'jsoncallback',
	// 	data: {
	// 		app_key: '1271687855',
	// 		format: 'json',
	// 		size: 'img',
	// 		num: perPageCount,
	// 		page: curPage
	// 	},
	// 	success: function(ret){
	// 		if(ret.status.code == 0){
	// 			// var dataArr = ret.data
	// 			// var $node = renderData(dataArr)
	// 			// render($nodes)
	// 			callback(ret.data)
	// 			curPage++
	// 		}
	// 	}
	// })
 // }





var $target = $('.foot')
$(window).on('scroll',function(){
	checkShow()
})
checkShow()
function checkShow(){
	if(isShow($target)){
		dosth()
	}
}
function isShow($el){
	var scrollH = $(window).scrollTop()
	var winH = $(window).height()
	var top = $el.offset().top
	if(top < winH + scrollH){
		return true
	}else{
		return false
	}
}
// function showImg($el){
// 	$el.attr('src',$el.attr('data-src'))
// 	$el.attr('isloading',true)
// }

function dosth(){
	$.ajax ({
		url: 'https://platform.sina.com.cn/slide/album_tech',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		data: {
			app_key: '1271687855',
			format: 'json',
			size: 'img',
			num: perPageCount,
			page: curPage
		},
		success: function(ret){
			if(ret.status.code == 0){
				var dataArr = ret.data
				var $node = renderData(dataArr)
				// Waterfall.init($nodes)
				render($nodes)
				// callback(ret.data)
				curPage++
			}
		}
	})
}


// function place(nodeList){
// 	$.each(nodeList,function(index,item){
// 		var $node = getNode(item)
// 		$node.find('img').load(function(){
// 			$('.item').append($node)
// 			waterFallPlace($node)
// 		})
// 	})


// }
var nodeWidth = $nodes.outerWidth(true)
var colNum = parseInt($('.item').width()/nodeWidth)
for(var i= 0;i<colNum;i++){
	colSumHeight.push(0)
}
function waterFallPlace($nodes){
	$nodes.each(function(){
		var $cur = $(this)
		// $(this).find('img').on('load',function(){
		var idx = 0
		var minSumHeight = colSumHeight[0]
		for( var i = 0; i<colSumHeight.length; i++ ){
			if(colSumHeight[i] < minSumHeight){
				idx = i
				minSumHeight = colSumHeight[i]
			}
		}
		$cur.css({
			left: nodeWidth*idx,
			top: minSumHeight,
			opacity: 1
		})
		colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx]
		$('.item').height(Math.max.apply(null,colSumHeight))
	})
	// })
}
// 	if(colSumHeight.length == 0){
// 		for(var i = 0; i<colNum; i++){
// 			colSumHeight.push(0)
// 		}
// 	}

// 	$nodes.each(function(){
// 		var $cur = $(this)
// 		$(this).find('img').on('load',function(){
// 			var idx = 0
// 			var minSumHeight = colSumHeight[0]
// 			for( var i = 0; i<colSumHeight.length; i++ ){
// 				if(colSumHeight[i] < minSumHeight){
// 					idx = i
// 					minSumHeight = colSumHeight[i]
// 				}
// 			}
// 			$cur.css({
// 				left: nodeWidth*idx,
// 				top: minSumHeight
// 			})
// 			colSumHeight[idx] = $cur.outerHeight(true) + colSumHeight[idx]
// 		})
// 	})
// }
// render()
	// $(window).on('resize',function(){
	// 	render()
	// })

function renderData(items) {
	var tpl = ''
	var $nodes
	for( var i = 0;i<items.length;i++){
		tpl += '<li class="block clearfix">';
		tpl += '<a href="" class="img">';
		tpl += '<img src="' + items[i].img_url+'" alt="">';
		tpl += '<h4 class="head">' + items[i].short_name+'</h4>';
		tpl += '<p class="intro">' + items[i].short_intro+'</p>';
		tpl += '</a>';
		tpl += '</li>';
	}
	var $nodes = $(tpl)
	$('.item').append($nodes)
	return $nodes
}