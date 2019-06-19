package com.ts;

import javax.annotation.Resource;

import com.entity.Signin;
import com.service.SigninService;

public class ts {

	public static void main(String[] args) {
		SigninService dao =new SigninService();
		Signin ss = dao.findById(1);
		System.out.println(ss);
	}

}
