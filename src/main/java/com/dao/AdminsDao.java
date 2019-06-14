package com.dao;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminsDao {
	
	public int login(String admName,String admPwd);
	
}
