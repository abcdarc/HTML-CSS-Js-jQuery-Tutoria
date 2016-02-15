var _code = {}, _show = {}; // template
var show_search_mune = false,show_list_mune = false; // 是否顯示選單

function htmlEncode(value)
{
  return $('<div/>').text(value).html();
}

function htmlDecode(value)
{
  return $('<div/>').html(value).text();
}

function recode(text)
{
	text = text.replace(/&amp;lt;\[/g, '［');
	text = text.replace(/\]&amp;gt;/g, '］');
	text = text.replace(/\[\[/g, "&lt;");
	text = text.replace(/\]\]/g, "&gt;");
	text = text.replace(/\[/g, "<");
	text = text.replace(/\]/g, ">");
	text = text.replace(/［/g, '[');
	text = text.replace(/］/g, ']');
	
	return text;
}

// 文字斷行轉HTML斷行
function lnToBr(text)
{
	if(text.slice(0,1)==="\n")
	{
		// 移除前二個字串 剛好是第一個\n文字斷行
		text = text.slice(2, text.length); 
	}
	text = text.replace(/\n/g, "<br/>");
	return text;
}

// 文字斷行轉HTML斷行
function ltToSpace(text)
{
	text = text.replace(/\t\t\t\t\t/g, "　　");
	return text;
}

// 轉換成jQuery物件
function checkObj(obj)
{
	if(typeof(obj)==='string') { obj = $(obj); }
	return obj;
}

function indent(text)
{
	text = lnToBr(text);
	text = ltToSpace(text);
	
	return text;
}

function FormatView(obj)
{
	obj = checkObj(obj);
	var runNb = obj.length;
	for(var i=0; i<runNb; i++)
	{
		var runObj = obj.eq(i);
		var html = runObj.html();
		var need_indent = runObj.attr('indent')==='true';
		
		html = htmlEncode(html); // 把HTML變成可視
		html = recode(html); // 處理特殊字元
		//console.log(html);
		if(need_indent) { html = indent(html); } 
		runObj.html(html);
	}
}

function checkWin(obj)
{
	if(obj.width()<=800)
	{
		$('.html_show,.html_code').attr('style', "width:auto;float:none;padding-right:30px;");
		$('.search_mune_box, .data_list_box').hide();
	}
	else
	{
		$('.html_show,.html_code').attr('style','');
		if(show_search_mune) $('.search_mune_box').show();
		if(show_list_mune) $('.data_list_box').show();
	}
}

$(function(){
	
	// 取得區域標記模版
	_code = $('._code', '#template');
	_show = $('._show', '#template');
	
	// 格式化範例結果
	$('.html_show').each(function(e){
	
		var code_obj = $(this).prev('.html_code'); // 取得顯示html code的物件
		
		// 取得小標籤模版
		var __code = _code.clone().css({'position':'absolute','top':'0px','left':'0px'});
		var __show = _show.clone().css({'position':'absolute','top':'0px','left':'0px'});
		
		// 將html轉成可顯示格式輸出
		var code_text = htmlEncode($(this).html()); // 取得html show的HTML碼 - 轉成文字顯示
		if(code_text != undefined && code_text != '' && code_obj!=undefined)
		{
			code_text = lnToBr(code_text); // 文字斷行 轉> html斷行
			code_text = ltToSpace(code_text); // 文字斷行 轉> html斷行
			code_obj.html(code_text);
			// 加入小標籤
			$(this).append(__show);
			code_obj.append(__code);
		}
		
		// 備註區格式化
		var mark_obj = $(this).parents('code').prev('.mark');
		var mark_text = mark_obj.html();
		mark_text = lnToBr(mark_text);// 文字斷行 轉> html斷行
		mark_text = mark_text.replace(/- /g, "　-");// 文字縮排 轉> html縮排
		mark_obj.html(mark_text);
		
	});
	
	// 格式化說明文檔
	FormatView('.meg'); 
	
	// 檢查閱讀視窗 - 變更閱讀方式
	checkWin($(window));
	
	$(window).on('resize',function(){
		checkWin($(this)); // 依視窗大小調整檢視方式
	});
	
	// 浮動Header
	$(window).on('scroll',function(){
		if($(this).scrollTop()>50)
		{
			$('.breadcrumb').css({'position':'fixed', 'z-index':'3'});
		}else{
			$('.breadcrumb').css({'position':'relative'});
		}
	});
	
	$('li:eq(1)', '.breadcrumb_list').unbind('click').bind('click',function(e){
		if(show_search_mune)
		{
			$('.search_mune_box').hide();
			show_search_mune = false;
			$(this).removeClass('hover');
		}else{
			$('.search_mune_box').show();
			show_search_mune = true;
			$(this).addClass('hover');
		}
	});
	
	$('li:eq(2)', '.breadcrumb_list').unbind('click').bind('click',function(){
		if(show_list_mune)
		{
			$('.data_list_box').hide();
			show_list_mune = false;
			$(this).removeClass('hover');
		}else{
			$('.data_list_box').show();
			show_list_mune = true;
			$(this).addClass('hover');
		}
	});
	
});