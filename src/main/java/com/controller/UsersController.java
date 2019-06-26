package com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.entity.Users;
import com.service.UsersService;

@Controller
//窄化
@RequestMapping("users")
public class UsersController {
	@Resource
	UsersService  usersService;
	
	@RequestMapping("user_login")
	public String user_login(String usName,String usPwd,HttpSession session) {
		System.out.println(usName+"  "+usPwd);
		System.out.println("登录");
		Users userinfo = usersService.userLogin(usName, usPwd);
		System.out.println(userinfo);
		if(userinfo!=null) {
			session.setAttribute("userinfo", userinfo);
			Users attribute = (Users) session.getAttribute("userinfo");
			System.out.println(attribute);
		}
		return "front/index_gonglve";
	}
}
