package com.dao;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Journey;

@Mapper
public interface JourneyDao {
	
	//添加
	int add1(Journey journey);
	
}
