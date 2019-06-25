package com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.service.AdminsService;

@Controller
@RequestMapping("adm")
public class AdminsController {

	@Resource
	AdminsService adm;
	
	@RequestMapping("login")
	@ResponseBody
	public String login(String admName,String admPwd,HttpSession session) {
		System.out.println("登陆");
		System.out.println(admName+"1234"+admPwd);
		session.setAttribute("admName",admName);
		int res=adm.login(admName, admPwd);
		return res==1?"yes":"no";
	}
}
