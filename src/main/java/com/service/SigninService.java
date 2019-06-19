package com.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.dao.SigninDao;
import com.entity.Signin;
@Service
public class SigninService {
	@Resource
	SigninDao signinDao;	
	//添加
	public Integer addSignin(Signin signin) {
		return signinDao.addSignin(signin);
	}
	//修改
	public Integer updSignin(Signin signin) {
		return signinDao.updSignin(signin);
	}	
	public Signin findById(Integer usid) {
		return signinDao.findById(usid);
	}
}
