package com.dao;

import org.apache.ibatis.annotations.Mapper;
import com.entity.Users;;
@Mapper
public interface UsersDao {
	public Users userLogin(String usName,String usPwd);
}
