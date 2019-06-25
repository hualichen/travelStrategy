package com.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.AdminsDao;

@Service
public class AdminsService {
	@Resource
	AdminsDao adm;
	
	public int login(String admName,String admPwd) {
		return adm.login(admName, admPwd);
	}
}
