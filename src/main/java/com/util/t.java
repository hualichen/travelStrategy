package com.util;

public class t {

	/*public static void main(String[] args) {
		MD5 md5 = new MD5();
		String test = md5.MD5Encode("123457bdccsk");
		System.out.println(test);
	}*/
	public static void main(String[] args) throws Exception {
		MD5Util md5 = new MD5Util();
		String test = md5.md5Encode("1234dfdg");
		System.out.println(test.equals("7abc486f20169e94d077909ca7cceef2"));
	}

}
