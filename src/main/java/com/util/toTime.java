package com.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class toTime {
	//获取时间差 data2当前时间  
	public static int moreTime(String date1,Date date2){
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = sdf.parse(date1);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int days = (int) ((date2.getTime() - date.getTime()) / (1000*3600*24));
		return days;
	}
}
