package com.dao;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Signin;
@Mapper
public interface SigninDao {
	//添加
	public Integer addSignin(Signin signin);
	
	//修改
	public Integer updSignin(Signin signin);
	
	public Signin findById(Integer usid);
}
