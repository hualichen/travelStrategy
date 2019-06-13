package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class toBackPage {
	
	@RequestMapping("index")
	public String index() {
		return "back/index";
	}
	
	@RequestMapping("login")
	public String login() {
		return "back/login";
	}
	@RequestMapping("product_list")
	public String product_list() {
		return "back/product_list";
	}
	@RequestMapping("product_detail")
	public String product_detail() {
		return "back/product_detail";
	}
	@RequestMapping("recycle_bin")
	public String recycle_bin() {
		return "back/recycle_bin";
	}
	@RequestMapping("order_list")
	public String order_list() {
		return "back/order_list";
	}
	@RequestMapping("order_detail")
	public String order_detail() {
		return "back/order_detail";
	}
	@RequestMapping("user_list")
	public String user_list() {
		return "back/user_list";
	}
	@RequestMapping("user_detail")
	public String user_detail() {
		return "back/user_detail";
	}
	@RequestMapping("user_rank")
	public String user_rank() {
		return "back/user_rank";
	}
	@RequestMapping("adjust_funding")
	public String adjust_funding() {
		return "back/adjust_funding";
	}
	@RequestMapping("setting")
	public String setting() {
		return "back/setting";
	}
	@RequestMapping("express_list")
	public String express_list() {
		return "back/express_list";
	}
	@RequestMapping("pay_list")
	public String pay_list() {
		return "back/pay_list";
	}
	@RequestMapping("discharge_statistic")
	public String discharge_statistic() {
		return "back/discharge_statistic";
	}
	@RequestMapping("sales_volume")
	public String sales_volume() {
		return "back/sales_volume";
	}
	
}
