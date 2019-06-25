package com.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Journey;
import com.service.JourneyDetailsService;
import com.service.JourneyService;

@Controller
@RequestMapping("Journey")
public class JourneyController {
	@Resource
	JourneyService journeyService;
	@Resource
	JourneyDetailsService journeyDetailsService;
	
	//添加成功之后按行程joid查询
	@RequestMapping("add")
	public String  add(Model m, Journey j) {
		  journeyService.add1(j);
		  for(int i=1;i<=j.joDays;i++) {
			  journeyDetailsService.addjoid(j.getJoid());
		  }
		  m.addAttribute("list", journeyDetailsService.queryjoid(j.getJoid()));
		  return "back/journey_choose";
	}
	
	
}
