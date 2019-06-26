package com.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.entity.JourneyDetails;
import com.service.JourneyDetailsService;

@Controller
@RequestMapping("journeyDetails")
public class JourneyDetailsController {
	@Resource
	JourneyDetailsService journeyDetailsService;
	
	//按行程详情id查询
	@RequestMapping("queryjdid")
	public String queryjdid(Model m,int jdid) {
		m.addAttribute("journeyDetails",journeyDetailsService.queryjdid(jdid));
		return "back/journeyDetails_detail";
	}
	@RequestMapping("update")
	public String update(JourneyDetails j) {
		journeyDetailsService.update(j);
		return "back/bindex";
	}
}
