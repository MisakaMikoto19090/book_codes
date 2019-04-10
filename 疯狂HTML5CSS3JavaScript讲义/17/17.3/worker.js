﻿onmessage = function(event)
{
	// 将数据提取出来。
	var data = JSON.parse(event.data);
	// 取出start参数
	var start = data.start;
	// 取出end参数
	var end = data.end;
	// 取出count参数
	var count = data.count;
	var result = "";
	search:
	for (var n = start ; n <= end ; n++)
	{
		for (var i = 2; i <= Math.sqrt(n); i ++)
		{
			// 如果除以n的余数为0，开始判断下一个数字。
			if (n % i == 0)
			{
				continue search;
			}
		}
		// 搜集找到的质数
		result += (n + ",");
	}
	// 再次启动Worker线程
	var sub = new Worker("subworker.js");
	// 把需要处理的数据传入启动的Worker线程中
	sub.postMessage({result: result , count : count});
	sub.onmessage = function(event)
	{
		// 发送消息，将会触发前台JavaScript脚本中
		// Worker对象的onmessage方法
		postMessage(event.data);
	}
}