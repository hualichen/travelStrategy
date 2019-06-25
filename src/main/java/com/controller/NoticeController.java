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
	public String findNoticeAll(Model model,String noTitle,String page,HttpSession session) {
		if(page.equals("on")) {
			model.addAttribute("noticeInfo", noticeService.findNotice(noTitle, 1));
			session.setAttribute("pageNum",1);
		}else {
			if(page.equals("up")) {
				Integer num=(Integer) session.getAttribute("pageNum");
				model.addAttribute("noticeInfo", noticeService.findNotice(noTitle, num-1>0?num-1:1));
				session.setAttribute("pageNum", num-1>0?num-1:1);
			}else if(page.equals("down")) {
				Integer count =noticeService.countNotice();
				count=count%9==0?count/9:count/9+1;
				Integer num=(Integer) session.getAttribute("pageNum");
				model.addAttribute("noticeInfo", noticeService.findNotice(noTitle, num+1<=count?num+1:count));
				session.setAttribute("pageNum",  num+1<=count?num+1:count);
			}
		}
		return "back/noticeManage";
	}
	
	@RequestMapping("updNoState")
	@ResponseBody
	public String updNoState(Integer noid,Integer noState) {
		System.out.println(noid+"++++++++++"+noState);
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
