package com.dao;

import java.util.List;
import java.util.Map;

import com.entity.Advertising;

public interface AdvertisingDao {
	//查询轮播广告
	public List<Map<String,Object>> findAdvertising();
	
	public int addAdvertising(Advertising ad);

}
