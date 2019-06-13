package com.controller;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class toPage {
	
	@RequestMapping(value = "/toPage",method = RequestMethod.GET)
	public String bindex(HttpServletRequest request) {
		String url=request.getParameter("url");
		return url;
	}
	
	
	
}
