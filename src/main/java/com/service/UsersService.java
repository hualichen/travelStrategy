package com.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.UsersDao;
import com.entity.Users;

@Service
public class UsersService {
	@Resource
	UsersDao dao;
	
	public Users userLogin(String usName,String usPwd) {
		return  dao.userLogin(usName, usPwd);
	}
}
