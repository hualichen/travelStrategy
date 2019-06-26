package com.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.entity.Notice;
import com.service.NoticeService;

//公告表
@Controller
@RequestMapping("notice")
public class NoticeController {
	
	@Resource
	NoticeService noticeService;
	
	@RequestMapping("findNoticeAll")
	public String findNoticeAll(Model model,String noTitle,Integer page,HttpSession session) {
		Integer count =noticeService.countNotice();
		model.addAttribute("count",count%5==0?count/5:count/5+1);
		System.out.println(count%5==0?count/5:count/5+1);
		model.addAttribute("page", page);
		model.addAttribute("noticeInfo", noticeService.findNotice(noTitle,page ));
		return "back/noticeManage";
	}
	
	@RequestMapping("updNoState")
	@ResponseBody
	public String updNoState(Integer noid,Integer noState) {
		noticeService.updNoticeState(noid, noState);
		return "1";
	}
	
	@RequestMapping("addNotice")
	public String addNotice(Notice no) {
		no.setAdmid(1);
		noticeService.addNotice(no);
		return "redirect:findNoticeAll";
	}
}
