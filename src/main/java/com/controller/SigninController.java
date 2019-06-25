package com.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Signin;
import com.entity.Users;
import com.service.SigninService;
import com.util.toTime;
@Controller
@RequestMapping("sign")
public class SigninController {
	@Resource
	SigninService signinService;
	//签到
	@RequestMapping("signin")
	@ResponseBody
	public Integer signin(HttpSession session) throws Exception {
		Integer tag=-1;
		Users userinfo=(Users) session.getAttribute("userinfo");
		//已经登录
		if(null!=userinfo) {
			//根据用户编号查询签到表
			Signin signin = signinService.findById(userinfo.getUsid());
			if(null==signin) {
				//第一次签到	tag=1	
				signinService.addSignin(new Signin(null, userinfo.getUsid(), 1, new Date(),1));
				tag=1;
			}else {
				//不是第一次签到			
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				int day =toTime.moreTime(format.format(signin.getSiTime()),new Date()); 
				//已经签过到了
				if(day==0){
					tag=0;
				}else if(day==1){
					//day==1证明是连续签到	签到次数加1 tag=累计签到+1
					tag=signin.getSiNum()+1;
					signinService.updSignin(new Signin(signin.getSiid(), signin.getUsid(), 1,new Date(), signin.getSiNum()+1));
					
				}else if(day>1) {
					//day>1证明没有连续签到	tag=1签到次数为1
					tag=1;
					signinService.updSignin(new Signin(signin.getSiid(), signin.getUsid(), 1,new Date(), 1));
				}
			}
		}else{
			// 没有登录
			tag=-1;
		}
		return tag;
	}
}
