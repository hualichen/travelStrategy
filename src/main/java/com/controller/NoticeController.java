package com.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.service.NoticeService;

//公告表
@Controller
@RequestMapping("notice")
public class NoticeController {
	@Resource
	NoticeService noticeService;
	
	@RequestMapping("findNoticeAll")
	public String findNoticeAll(Model model) {
		model.addAttribute("noticeInfo", noticeService.findNotice());
		return "noticeManage";
	}
}
