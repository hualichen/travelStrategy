package com.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.util.toText;

@Controller
public class toPage {
	
	@RequestMapping(value = "/toPage",method = RequestMethod.GET)
	public String bindex(HttpServletRequest request) {
		String url=request.getParameter("url");
		return url;
	}
	@RequestMapping("text2")
	@ResponseBody
	public String text2(Model model) {
		String con="";
		try {
			con=toText.readFileContent("D:\\text\\t.txt");
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("con");
		System.out.println(con);
		model.addAttribute("con", con);
		return con;
	}
	
	
	@RequestMapping("text")
	public String text(Model model) {
		String con="";
		try {
			con=toText.readFileContent("D:\\text\\t.txt");
		} catch (IOException e) {
			e.printStackTrace();
		}
		System.out.println("con");
		System.out.println(con);
		model.addAttribute("con", con);
		return "front/ulogin";
	}
	
	@RequestMapping("texts")
	@ResponseBody
	public String texts(String str) {
		FileOutputStream fop = null;
		File file;
		try {
			file = new File("D:\\text\\t.txt");//初始化file
			fop = new FileOutputStream(file);//初始化输出流
			// 若文件不存在,则创建它
			if (!file.exists()) {
				file.createNewFile();
			}
			// 获取字节的内容数组
			byte[] contentInBytes = str.getBytes();
			fop.write(contentInBytes);//写出到指定路径文件中字节的内容数组
			fop.flush();
			fop.close();
			System.out.println("Done");
		} catch (IOException e) { //捕捉异常
			e.printStackTrace();
		} finally {
			try {
				if (fop != null) {
					fop.close();
			}
			} catch (IOException e) { //捕捉异常
				e.printStackTrace();
			}
		}
		System.out.println(str);
		return "1";
	}
	
}
