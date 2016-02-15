var date = {
	'debug':true,
	// 取得目前時間
	'get_date_obj':function(){
		this.date_obj = new Date('2016-02-05');
		if(this.debug){console.log('目前完整時間 : '+this.date_obj);}
	},
	'date_obj':{}, // 目前時間物件
	// 取得計算用時間
	'get_run_date':function(date){
		if(date!=undefined && date!='')
		{
			var check_arr = date.split(' ');
		
			if(check_arr[1]==undefined || check_arr[1].trim()=='')
			{
				date = date+'T00:00:00Z';
			}
			else
			{
				date = check_arr[0]+'T'+check_arr[1]+'Z';
			}
			this.default_inster_value = date;
			this.run_date = new Date(date);
		}
		else
		{
			this.run_date = this.date_obj;
		}
	}, // 取得運算時間物件
	'run_date':{}, // 運算時間物件
	'year':function(){return this.date_obj.getFullYear();},
	'month':function(){return this.padLeft(this.date_obj.getMonth()+1);},
	'date':function(){return this.padLeft(this.date_obj.getDate());},
	'hour':function(){return this.padLeft(this.date_obj.getHours());},
	'minute':function(){return this.padLeft(this.date_obj.getMinutes());},
	'second':function(){return this.padLeft(this.date_obj.getSeconds());},
	'week':function(){return new String(this.date_obj.getDay()+1)},
	'differ':{}, // 相差時間
	'date_arr':[],
	'time_arr':[],
	'today':'', // 今天日期
	'now':'', // 目前時間
	'default_inster_value':{}, // 導入值
	// 重新捉時間
	'reset':function(newValue){
		var runValue = "";
		runValue = (newValue==undefined) ? this.default_inster_value : newValue ;
		this.init(tunValue);
	}, // 重捉時間
	// 左邊補0 (字串, 不足長度)
	'padLeft':function(str, lenght=2)
	{
		str = new String(str);
		if(this.debug){console.log('字串 : '+str+' / 時間字串長度 : '+str.length);}
		if(str.length >= lenght){return str;}
		else{return this.padLeft("0" +str, lenght);}
	},
	// 初始執行
	'init':function(now)
	{
		var debug = this.debug;
		
		this.get_date_obj();
		
		
		// 取年~日陣列
		this.date_arr.push(this.year());
		this.date_arr.push(this.month());
		this.date_arr.push(this.date());
		
		// 取時間陣列
		this.time_arr.push(this.hour());
		this.time_arr.push(this.minute());
		this.time_arr.push(this.second());
		
		this.today = this.date_arr.join('-'); // 今天日期
		this.now = this.today+' '+this.time_arr.join(':'); // 目前時間
		
		if(debug){console.log('今天是 : '+this.today);}
		if(debug){console.log('現在是 : '+this.now);}
		
		this.get_run_date(now); // 取運算日期
		if(debug){console.log('要計算的日期是 : '+this.default_inster_value);}
		
		var differ_time = this.date_obj.getTime() - this.run_date.getTime();
		
		// 取得相差值
		this.differ = 
		{
			'second':Math.floor(differ_time/1000),
			'minute':Math.floor(differ_time/60000),
			'hour':Math.floor(differ_time/3600000),
			'day':Math.floor(differ_time/86400000)
		};
		
		if(debug){console.log('相差時間:'+this.date_obj.getTime()+'/'+this.run_date.getTime()+'='+(this.date_obj.getTime() - this.run_date.getTime()));}
		if(debug){console.log(this.differ);}
		if(debug){console.log('-----****除錯完成****-----');}
	}
}
// 2016-02-04 00:00:00 2016-02-05 10:57:39
date.init('2016-02-03');
//alert(date.now+'_run ok.');